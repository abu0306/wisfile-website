import { notFound } from "next/navigation";
import notion from "@/lib/notion-api";
import { rootNotionPageId } from "@/lib/config";
import NotionPage from "@/components/NotionPage";
import "react-notion-x/src/styles.css";
import { parsePageId } from "notion-utils";
import { getCanonicalPageId } from "@/lib/get-canonical-page-id";
import type { Metadata } from "next";


function logBlogBuildDebug(stage: string, payload: Record<string, unknown>) {
  console.log(`[blog-build][${stage}]`, payload);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogPageId: string }>;
}): Promise<Metadata> {
  const { blogPageId } = await params;
  const pageId = parsePageId(blogPageId);

  logBlogBuildDebug("generateMetadata:start", { blogPageId, pageId });

  if (!pageId) {
    return {
      title: "Blog Post Not Found | WisFile",
      description: "The requested blog post could not be found.",
    };
  }

  try {
    const recordMap = await notion.getPage(pageId);

    logBlogBuildDebug("generateMetadata:page-fetched", {
      blogPageId,
      pageId,
      recordMap,
      hasRecordMap: Boolean(recordMap),
      hasBlocks: Boolean(recordMap?.block),
    });

    // Extract page title from Notion data
    const pageBlock = recordMap.block[pageId];
    const normalizedPageBlock =
      pageBlock && "role" in pageBlock && "value" in pageBlock
        ? pageBlock.value
        : pageBlock;
    const title = normalizedPageBlock?.properties?.title?.[0]?.[0] || "Blog Post";

    if (!normalizedPageBlock?.properties?.title?.[0]?.[0]) {
      logBlogBuildDebug("generateMetadata:title-fallback", {
        blogPageId,
        pageId,
        hasBlock: Boolean(pageBlock),
        wrappedBlock: Boolean(pageBlock && "role" in pageBlock && "value" in pageBlock),
      });
    }

    return {
      title: `${title} | Wisfile: AI-Powered File Renaming & Organizing Tool`,
      description:
        "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
        "Automatically generates clear, consistent filenames based on content. " +
        "Instantly sorts your files into logical folders for easy access. " +
        "All operations run on your device — no cloud, no data leaks.",
      alternates: {
        canonical: `https://www.wisfile.ai/blog/${blogPageId}`,
      },
      openGraph: {
        title: `${title} | Wisfile: AI-Powered File Renaming & Organizing Tool`,
        description:
          "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
          "Automatically generates clear, consistent filenames based on content.",
        url: `https://www.wisfile.ai/blog/${blogPageId}`,
        siteName: "WisFile",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        site: "@Wisfileofficial",
        title: `${title} | Wisfile: AI-Powered File Renaming & Organizing Tool`,
        description:
          "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
          "Automatically generates clear, consistent filenames based on content.",
      },
    };
  } catch (error) {
    console.error(`Error generating metadata for page ${pageId}:`, error);
    logBlogBuildDebug("generateMetadata:error", {
      blogPageId,
      pageId,
      error,
    });
    return {
      title: "Blog Post | Wisfile: AI-Powered File Renaming & Organizing Tool",
      description:
        "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
        "Automatically generates clear, consistent filenames based on content. " +
        "Instantly sorts your files into logical folders for easy access. " +
        "All operations run on your device — no cloud, no data leaks.",
      alternates: {
        canonical: `https://www.wisfile.ai/blog/${blogPageId}`,
      },
    };
  }
}

// This is a Server Component by default
export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogPageId: string }>;
}) {
  const { blogPageId } = await params;
  const pageId = parsePageId(blogPageId);

  logBlogBuildDebug("BlogPage:start", { blogPageId, pageId });

  if (!pageId) {
    return notFound();
  }

  try {
    const recordMap = await notion.getPage(pageId);

    return (
      <div className="py-12 container-custom">
        {/* Add your blog content rendering logic here */}
        <div className="max-w-none prose">
          <NotionPage recordMap={recordMap} rootPageId={rootNotionPageId} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error loading page ${pageId}:`, error);
    logBlogBuildDebug("BlogPage:error", {
      blogPageId,
      pageId,
      error,
    });
    return notFound();
  }
}

export async function generateStaticParams() {
  try {
    logBlogBuildDebug("generateStaticParams:start", { rootNotionPageId });
    const rootPage = await notion.getPage(rootNotionPageId);

    if (rootPage.collection_view) {
      // Collect all pageIds from all collection views
      // Filter for table views since they have page_sort
      const views = Object.values(rootPage.collection_view).map(
        (collectionView) => collectionView as { value: { page_sort: string[] } }
      );

      // Get pageIds from all table views
      const pageIds = views.flatMap((view) => view.value.page_sort ?? []);

      // Remove duplicates
      const uniquePageIds = Array.from(new Set(pageIds));
      logBlogBuildDebug("generateStaticParams:collected", {
        pageCount: uniquePageIds.length,
      });

      // Generate static params without validating each page individually
      // Page validation will happen in the component itself when accessed
      const staticParams = [];
      for (const pageId of uniquePageIds) {
        const canonicalId = getCanonicalPageId(pageId, rootPage, {
          uuid: true,
        });
        if (canonicalId) {
          staticParams.push({
            blogPageId: canonicalId,
          });
        }
      }

      return staticParams;
    } else {
      logBlogBuildDebug("generateStaticParams:no-collection-view", {
        rootNotionPageId,
      });
      return [];
    }
  } catch (error) {
    console.error("Error generating static params:", error);
    logBlogBuildDebug("generateStaticParams:error", {
      rootNotionPageId,
      error,
    });
    return [];
  }
}

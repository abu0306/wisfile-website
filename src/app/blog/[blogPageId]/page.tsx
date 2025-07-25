import { notFound } from "next/navigation";
import notion from "@/lib/notion-api";
import { rootNotionPageId } from "@/lib/config";
import NotionPage from "@/components/NotionPage";
import "react-notion-x/src/styles.css";
import { parsePageId } from "notion-utils";
import { getCanonicalPageId } from "@/lib/get-canonical-page-id";

// This is a Server Component by default
export default async function BlogPage({
  params,
}: {
  params: { blogPageId: string };
}) {
  const pageId = parsePageId(params.blogPageId);

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
    return notFound();
  }
}

export async function generateStaticParams() {
  try {
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
      return [];
    }
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

import { rootNotionPageId } from "@/lib/config";
import notion from "@/lib/notion-api";
import NotionPage from "@/components/NotionPage";
import "react-notion-x/src/styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Wisfile: AI-Powered File Renaming & Organizing Tool",
  description:
    "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
    "Automatically generates clear, consistent filenames based on content. " +
    "Instantly sorts your files into logical folders for easy access. " +
    "All operations run on your device — no cloud, no data leaks.",
  alternates: {
    canonical: "https://www.wisfile.ai/blog",
  },
  openGraph: {
    title: "Blog | Wisfile: AI-Powered File Renaming & Organizing Tool",
    description:
      "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
      "Automatically generates clear, consistent filenames based on content.",
    url: "https://www.wisfile.ai/blog",
    siteName: "WisFile",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Wisfileofficial",
    title: "Blog | Wisfile: AI-Powered File Renaming & Organizing Tool",
    description:
      "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
      "Automatically generates clear, consistent filenames based on content.",
  },
};

// This is a Server Component by default
export default async function BlogPage() {
  const pageId = rootNotionPageId;
  console.log(pageId);
  const recordMap = await notion.getPage(pageId);

  return (
    <div className="py-12 container-custom">
      {/* Add your blog content rendering logic here */}
      <div className="max-w-none prose">
        <NotionPage recordMap={recordMap} rootPageId={rootNotionPageId} />
      </div>
    </div>
  );
}

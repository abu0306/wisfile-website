import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download WisFile: Tidy Your Files with AI",
  description:
    "100% Local AI File Renamer and Orgnizer — No Fees, No Data Leaks. " +
    "Automatically generates clear, consistent filenames based on content. " +
    "Instantly sorts your files into logical folders for easy access. " +
    "All operations run on your device — no cloud, no data leaks.",
  alternates: {
    canonical: "https://www.wisfile.ai/downloads",
  },
  openGraph: {
    title: "Download WisFile: Tidy Your Files with AI",
    description:
      "100% Local AI File Renamer and Orgnizer — No Fees, No Data Leaks. " +
      "Automatically generates clear, consistent filenames based on content.",
    url: "https://www.wisfile.ai/downloads",
    siteName: "WisFile",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Wisfileofficial",
    title: "Download WisFile: Tidy Your Files with AI",
    description:
      "100% Local AI File Renamer and Orgnizer — No Fees, No Data Leaks. " +
      "Automatically generates clear, consistent filenames based on content.",
  },
};

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

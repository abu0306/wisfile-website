import { notFound } from "next/navigation";
import { getFaqBySlug, getAllFaqs } from "@/types/faq";
import Link from "next/link";
import type { Metadata } from "next";

interface FaqPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const faqs = getAllFaqs();
  return faqs.map((faq) => ({
    slug: faq.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const faq = await getFaqBySlug(slug);

  if (!faq) {
    return {
      title: "FAQ Not Found | WisFile",
      description: "The requested FAQ could not be found.",
    };
  }

  return {
    title: `${faq.question} | WisFile: Tidy Your Files with AI`,
    description: faq.description,
    keywords:
      faq.keywords.join(",") +
      ",WisFile,file orgCanonical URLanization,AI file manager",
    authors: [{ name: "WisFile Team" }],
    creator: "WisFile",
    publisher: "WisFile",
    robots: "index, follow",
    alternates: {
      canonical: `https://www.wisfile.ai/faq/${slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://www.wisfile.ai/faq/${slug}`,
      title: `${faq.question} | WisFile: Tidy Your Files with AI`,
      description: faq.description,
      siteName: "WisFile",
    },
    twitter: {
      card: "summary_large_image",
      site: "@Wisfileofficial",
      title: `${faq.question} | WisFile: Tidy Your Files with AI`,
      description: faq.description,
    },
  };
}

export default async function FaqDetailPage({ params }: FaqPageProps) {
  const { slug } = await params;
  const faq = await getFaqBySlug(slug);

  if (!faq) {
    notFound();
  }

  // 获取所有 FAQ 来找到上一篇和下一篇
  const allFaqs = getAllFaqs();
  const currentIndex = allFaqs.findIndex((f) => f.slug === slug);
  const prevFaq = currentIndex > 0 ? allFaqs[currentIndex - 1] : null;
  const nextFaq =
    currentIndex < allFaqs.length - 1 ? allFaqs[currentIndex + 1] : null;

  return (
    <article className="min-h-screen overflow-x-hidden pt-[125px] bg-[#FEFCF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-800 leading-relaxed
              [&>p]:mb-6 [&>p]:text-base [&>p]:leading-7
              [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mt-8 [&>h1]:mb-4
              [&>h2]:w-screen [&>h2]:relative [&>h2]:left-1/2 [&>h2]:-translate-x-1/2 [&>h2]:bg-white [&>h2]:h-[171px] [&>h2]:flex [&>h2]:items-center [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-8
              [&>h2]:pl-[max(1rem,calc((100vw-1280px)/2+1rem))] [&>h2]:sm:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] [&>h2]:lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))]
              [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-5 [&>h3]:mb-2
              [&>ul]:mb-6 [&>ol]:mb-6 [&>li]:mb-2
              [&>a]:text-blue-600 [&>a]:hover:text-blue-700
              [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600
              [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-red-600
              [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded [&>pre]:overflow-x-auto
              [&>img]:max-w-full [&>img]:h-auto [&>img]:my-6 [&>img]:mx-auto [&>img]:rounded-lg [&>img]:shadow-md [&>img]:block
              [&_strong]:font-bold [&_strong]:text-gray-900"
            dangerouslySetInnerHTML={{ __html: faq.content }}
          />
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8">
          <div className="flex items-center justify-center gap-8">
            {prevFaq ? (
              <Link
                href={`/faq/${prevFaq.slug}`}
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-md w-[187px] h-[31px]"
              >
                <span>&lt;</span>
                <span>Previous</span>
              </Link>
            ) : (
              <span className="flex items-center justify-center gap-2 text-gray-400 cursor-not-allowed border border-gray-300 rounded-md w-[187px] h-[31px]">
                <span>&lt;</span>
                <span>Previous</span>
              </span>
            )}

            {nextFaq ? (
              <Link
                href={`/faq/${nextFaq.slug}`}
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-md w-[187px] h-[31px]"
              >
                <span>Next</span>
                <span>&gt;</span>
              </Link>
            ) : (
              <span className="flex items-center justify-center gap-2 text-gray-400 cursor-not-allowed border border-gray-300 rounded-md w-[187px] h-[31px]">
                <span>Next</span>
                <span>&gt;</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

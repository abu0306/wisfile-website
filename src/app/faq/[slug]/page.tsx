import { notFound } from "next/navigation";
import {
  getFaqBySlug,
  getAllFaqs,
  getArticleRecommendations,
} from "@/lib/faq-server";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import RecommendBanner from "@/components/faq/RecommendBanner";
import ArticleRecommendations from "@/components/faq/ArticleRecommendations";
import { HomeOutlined } from "@ant-design/icons";

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
    title: `${faq.question} | Wisfile: AI-Powered File Renaming & Organizing Tool`,
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
      title: `${faq.question} | Wisfile: AI-Powered File Renaming & Organizing Tool`,
      description: faq.description,
      siteName: "WisFile",
    },
    twitter: {
      card: "summary_large_image",
      site: "@Wisfileofficial",
      title: `${faq.question} | Wisfile: AI-Powered File Renaming & Organizing Tool`,
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

  // 获取推荐文章
  const recommendations = getArticleRecommendations(faq.id);

  return (
    <article className="bg-[#FEFCF7] min-h-screen overflow-x-hidden">
      {/* Header Image */}
      {faq.headerImageUrl && (
        <div className="relative mt-[125px] w-full h-[257px] overflow-hidden">
          <Image
            src={faq.headerImageUrl}
            alt={faq.question}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          faq.headerImageUrl ? "pt-8" : "pt-[125px]"
        }`}
      >
        {/* Article Title - Full Width */}
        <div className="mb-8">
          <div className="max-w-none prose prose-lg">
            <div
              className="[&>*:not(h1)]:hidden [&>h1]:left-1/2 [&>h1]:relative [&>h1]:flex [&>h1]:flex-col [&>h1]:justify-center [&>h1]:bg-white [&>h1]:mb-8 [&>h1]:pl-[max(1rem,calc((100vw-1280px)/2+1rem))] [&>h1]:sm:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] [&>h1]:lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] [&>h1]:w-screen [&>h1]:h-[171px] [&>h1]:font-bold text-gray-800 [&>h1]:text-gray-900 [&>h1]:text-3xl leading-relaxed [&>h1]:-translate-x-1/2"
              dangerouslySetInnerHTML={{ __html: faq.content }}
            />
            {/* Breadcrumb Navigation - positioned over the h1 */}
            <div className="left-1/2 relative flex flex-col justify-center bg-white -mt-[171px] mb-8 pl-[max(1rem,calc((100vw-1280px)/2+1rem))] sm:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] w-screen h-[171px] -translate-x-1/2">
              {/* Breadcrumb */}
              <nav className="mb-4" aria-label="Breadcrumb">
                <div className="flex items-center text-gray-600 text-sm">
                  <Link
                    href="/"
                    className="inline-flex items-center hover:text-gray-900 transition-colors"
                    style={{ paddingBottom: "2px" }}
                  >
                    <HomeOutlined
                      className="text-sm"
                      style={{ lineHeight: 1 }}
                    />
                  </Link>
                  <span className="mx-2">/</span>
                  <Link
                    href="/faq"
                    className="hover:text-gray-900 transition-colors"
                  >
                    FAQ
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="max-w-[200px] sm:max-w-[300px] lg:max-w-[400px] font-medium text-gray-900 truncate">
                    {faq.question}
                  </span>
                </div>
              </nav>
              {/* Title */}
              <h1 className="font-bold text-gray-900 text-3xl">
                {faq.question}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content Area - Two Column Layout */}
        <div className="flex lg:flex-row flex-col gap-8">
          {/* Left Column - Article Content */}
          <div className="flex-1 lg:max-w-[calc(100%-450px)]">
            <div className="max-w-none prose prose-lg">
              <div
                className="[&>h1]:hidden [&>img]:block [&>code]:bg-gray-100 [&>pre]:bg-gray-100 [&>img]:shadow-md [&>img]:mx-auto [&>img]:my-6 [&>h2]:mt-8 [&>h3]:mt-5 [&>h2]:mb-4 [&>h3]:mb-2 [&>li]:mb-2 [&>ol]:mb-6 [&>p]:mb-6 [&>ul]:mb-6 [&>pre]:p-4 [&>code]:px-1 [&>code]:py-0.5 [&>blockquote]:pl-4 [&>blockquote]:border-gray-300 [&>blockquote]:border-l-4 [&>code]:rounded [&>pre]:rounded [&>img]:rounded-lg [&>img]:w-[70%] [&>img]:h-auto [&>pre]:overflow-x-auto [&>h3]:font-semibold [&_strong]:font-bold [&>h2]:font-bold text-gray-800 [&_strong]:text-gray-900 [&>a]:hover:text-blue-700 [&>a]:text-blue-600 [&>blockquote]:text-gray-600 [&>code]:text-red-600 [&>h2]:text-gray-900 [&>h3]:text-gray-900 [&>p]:text-base [&>h3]:text-lg [&>h2]:text-2xl [&>blockquote]:italic leading-relaxed [&>p]:leading-7"
                dangerouslySetInnerHTML={{ __html: faq.content }}
              />
            </div>

            {/* Navigation - Article Content Area */}
            <div className="mt-12 pt-8">
              <div className="flex justify-center items-center gap-8">
                {prevFaq ? (
                  <Link
                    href={`/faq/${prevFaq.slug}`}
                    className="flex justify-center items-center gap-2 border border-gray-300 rounded-md w-[187px] h-[31px] text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <span>&lt;</span>
                    <span>Previous</span>
                  </Link>
                ) : (
                  <span className="flex justify-center items-center gap-2 border border-gray-300 rounded-md w-[187px] h-[31px] text-gray-400 cursor-not-allowed">
                    <span>&lt;</span>
                    <span>Previous</span>
                  </span>
                )}

                {nextFaq ? (
                  <Link
                    href={`/faq/${nextFaq.slug}`}
                    className="flex justify-center items-center gap-2 border border-gray-300 rounded-md w-[187px] h-[31px] text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <span>Next</span>
                    <span>&gt;</span>
                  </Link>
                ) : (
                  <span className="flex justify-center items-center gap-2 border border-gray-300 rounded-md w-[187px] h-[31px] text-gray-400 cursor-not-allowed">
                    <span>Next</span>
                    <span>&gt;</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Series Recommendations */}
          <div className="flex flex-shrink-0 justify-center lg:justify-start w-full lg:w-[402px]">
            <div className="lg:top-8 lg:sticky space-y-6 w-full">
              {/* 推荐系列文章 - 侧边栏样式 */}
              <ArticleRecommendations
                series={recommendations.series}
                continueReading={[]}
                variant="sidebar"
              />

              {/* 原有的推荐Banner */}
              <RecommendBanner />
            </div>
          </div>
        </div>
      </div>

      {/* Continue Reading Section - Bottom */}
      <div className="bg-[#FEFCF7] py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <ArticleRecommendations
            series={[]}
            continueReading={recommendations.continueReading}
            variant="bottom"
          />
        </div>
      </div>
    </article>
  );
}

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

  // 获取推荐文章
  const recommendations = getArticleRecommendations(faq.id);

  return (
    <article className="min-h-screen overflow-x-hidden bg-[#FEFCF7]">
      {/* Header Image */}
      {faq.headerImageUrl && (
        <div className="w-full h-[257px] relative overflow-hidden mt-[125px]">
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
          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-800 leading-relaxed
                [&>h1]:w-screen [&>h1]:relative [&>h1]:left-1/2 [&>h1]:-translate-x-1/2 [&>h1]:bg-white [&>h1]:h-[171px] [&>h1]:flex [&>h1]:flex-col [&>h1]:justify-center [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-8
                [&>h1]:pl-[max(1rem,calc((100vw-1280px)/2+1rem))] [&>h1]:sm:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] [&>h1]:lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))]
                [&>*:not(h1)]:hidden"
              dangerouslySetInnerHTML={{ __html: faq.content }}
            />
            {/* Breadcrumb Navigation - positioned over the h1 */}
            <div className="w-screen relative left-1/2 -translate-x-1/2 bg-white h-[171px] flex flex-col justify-center -mt-[171px] mb-8 pl-[max(1rem,calc((100vw-1280px)/2+1rem))] sm:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))]">
              {/* Breadcrumb */}
              <nav className="mb-4" aria-label="Breadcrumb">
                <div className="flex items-center text-sm text-gray-600">
                  <Link
                    href="/"
                    className="hover:text-gray-900 transition-colors inline-flex items-center"
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
                  <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-[300px] lg:max-w-[400px]">
                    {faq.question}
                  </span>
                </div>
              </nav>
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900">
                {faq.question}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content Area - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Article Content */}
          <div className="flex-1 lg:max-w-[calc(100%-450px)]">
            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-800 leading-relaxed
                  [&>h1]:hidden
                  [&>p]:mb-6 [&>p]:text-base [&>p]:leading-7
                  [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4
                  [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-5 [&>h3]:mb-2
                  [&>ul]:mb-6 [&>ol]:mb-6 [&>li]:mb-2
                  [&>a]:text-blue-600 [&>a]:hover:text-blue-700
                  [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600
                  [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-red-600
                  [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded [&>pre]:overflow-x-auto
                  [&>img]:w-[70%] [&>img]:h-auto [&>img]:my-6 [&>img]:mx-auto [&>img]:rounded-lg [&>img]:shadow-md [&>img]:block
                  [&_strong]:font-bold [&_strong]:text-gray-900"
                dangerouslySetInnerHTML={{ __html: faq.content }}
              />
            </div>

            {/* Navigation - Article Content Area */}
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

          {/* Right Column - Series Recommendations */}
          <div className="w-full lg:w-[402px] flex-shrink-0 flex justify-center lg:justify-start">
            <div className="lg:sticky lg:top-8 w-full space-y-6">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

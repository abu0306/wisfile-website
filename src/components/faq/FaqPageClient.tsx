"use client";

import { useState, useMemo } from "react";
import { FaqMeta } from "@/types/faq";
import FaqSearchClient from "./FaqSearchClient";

interface FaqPageClientProps {
  initialFaqs: FaqMeta[];
}

export default function FaqPageClient({ initialFaqs }: FaqPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // 过滤后的 FAQs
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialFaqs;
    }

    const searchTerm = searchQuery.toLowerCase();
    return initialFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.title.toLowerCase().includes(searchTerm) ||
        faq.description.toLowerCase().includes(searchTerm) ||
        faq.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm)
        )
    );
  }, [initialFaqs, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    // 模拟搜索延迟
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="bg-[#FEFCF7] min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[125px] max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 font-bold text-gray-900 text-3xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 text-sm">
            Explore smart renaming, real use cases, and the full potential of
            local AI file management with WisFile.
          </p>
        </div>

        {/* Search Bar - Outside content area */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search content"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="block bg-white py-3 pr-12 pl-4 border border-gray-300 focus:border-[#FFA015] rounded-lg focus:outline-none focus:ring-[#FFA015] focus:ring-2 w-full text-sm leading-5 placeholder-gray-500 focus:placeholder-gray-400"
            />
            <div className="right-0 absolute inset-y-0 flex items-center pr-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {isSearching && (
              <div className="right-0 absolute inset-y-0 flex items-center pr-12">
                <div className="border-[#FFA015] border-b-2 rounded-full w-4 h-4 animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ List Container */}
        <div className="bg-white shadow-sm p-6 rounded-lg">
          <FaqSearchClient initialFaqs={filteredFaqs} />
        </div>
      </div>
    </div>
  );
}

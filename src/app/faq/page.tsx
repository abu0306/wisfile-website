"use client";

import { useState, useMemo } from "react";
import { getAllFaqs } from "@/types/faq";
import { FaqSearchClient } from "@/components/faq";

export default function FaqPage() {
  const faqs = getAllFaqs();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // 过滤后的 FAQs
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqs;
    }

    const searchTerm = searchQuery.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.title.toLowerCase().includes(searchTerm) ||
        faq.description.toLowerCase().includes(searchTerm) ||
        faq.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm)
        )
    );
  }, [faqs, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    // 模拟搜索延迟
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEFCF7" }}>
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        style={{ paddingTop: "125px" }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
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
              className="block w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg text-sm leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#FFA015] focus:border-[#FFA015]"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
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
              <div className="absolute inset-y-0 right-0 pr-12 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FFA015]"></div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ List Container */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <FaqSearchClient initialFaqs={filteredFaqs} />
        </div>
      </div>
    </div>
  );
}

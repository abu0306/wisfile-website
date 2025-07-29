"use client";

import Link from "next/link";
import LazyImage from "@/components/LazyImage";
import { useState, useEffect, useRef } from "react";

export function Nav() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        featuresRef.current &&
        !featuresRef.current.contains(event.target as Node)
      ) {
        setIsFeaturesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const mobileMenu = document.getElementById("mobile-menu");
      const hamburgerButton = document.getElementById("hamburger-button");

      if (
        mobileMenu &&
        hamburgerButton &&
        !mobileMenu.contains(event.target as Node) &&
        !hamburgerButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setIsMobileFeaturesOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile features when mobile menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileFeaturesOpen(false);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Background overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden z-40 fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav
        className={`top-0 right-0 left-0 z-50 fixed transition-colors duration-300 ${
          isMobileMenuOpen ? "bg-white" : "bg-[#FEFCF7]"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between md:justify-start items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <LazyImage
                src="/images/logo.png"
                alt="WisFile Logo"
                width={32}
                height={32}
                className="w-8 h-8"
                priority
              />
              <span className="font-bold text-xl">WisFile</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:ml-8">
              <div className="relative" ref={featuresRef}>
                <button
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className="flex items-center px-3 py-2 rounded-md font-medium text-gray-900 hover:text-gray-500 text-sm"
                >
                  Features
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${
                      isFeaturesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isFeaturesOpen && (
                  <div className="left-0 absolute bg-white ring-opacity-5 shadow-lg mt-2 rounded-md ring-1 ring-black w-48">
                    <div className="py-1">
                      <Link
                        href="/features/ai-renamer"
                        className="block hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm"
                        onClick={() => setIsFeaturesOpen(false)}
                      >
                        AI Renaming
                      </Link>
                      <Link
                        href="/features/auto-foldering"
                        className="block hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm"
                        onClick={() => setIsFeaturesOpen(false)}
                      >
                        AI Foldering
                      </Link>
                      <Link
                        href="/features/metadata-remover"
                        className="block hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm"
                        onClick={() => setIsFeaturesOpen(false)}
                      >
                        Metadata Remover
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/blog"
                className="px-3 py-2 rounded-md font-medium text-gray-900 hover:text-gray-500 text-sm"
              >
                Blog
              </Link>
              <Link
                href="/downloads"
                className="px-3 py-2 rounded-md font-medium text-gray-900 hover:text-gray-500 text-sm"
              >
                Download
              </Link>
              <Link
                href="/faq"
                className="px-3 py-2 rounded-md font-medium text-gray-900 hover:text-gray-500 text-sm"
              >
                FAQ
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded-md font-medium text-gray-900 hover:text-gray-500 text-sm"
              >
                About Us
              </Link>
            </div>

            {/* Mobile hamburger button */}
            <div className="md:hidden">
              <button
                id="hamburger-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-900 hover:text-gray-500"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-1 pt-2 pr-3 pb-3">
              {/* Features dropdown for mobile */}
              <div className="relative">
                <button
                  onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
                  className="flex justify-between items-center px-0 py-2 rounded-md w-full font-medium text-gray-900 hover:text-gray-500 text-base text-left"
                >
                  Features
                  <svg
                    className={`h-4 w-4 transition-transform ${
                      isMobileFeaturesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isMobileFeaturesOpen && (
                  <div className="space-y-1 pl-4">
                    <Link
                      href="/features/ai-renamer"
                      className="block hover:bg-gray-100 px-0 py-2 rounded-md text-gray-700 text-sm"
                      onClick={() => {
                        setIsMobileFeaturesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      AI Renaming
                    </Link>
                    <Link
                      href="/features/auto-foldering"
                      className="block hover:bg-gray-100 px-0 py-2 rounded-md text-gray-700 text-sm"
                      onClick={() => {
                        setIsMobileFeaturesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      AI Foldering
                    </Link>
                    <Link
                      href="/features/metadata-remover"
                      className="block hover:bg-gray-100 px-0 py-2 rounded-md text-gray-700 text-sm"
                      onClick={() => {
                        setIsMobileFeaturesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Metadata Remover
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                className="block px-0 py-2 rounded-md font-medium text-gray-900 hover:text-gray-500 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/downloads"
                className="block px-0 py-2 rounded-md font-medium text-gray-900 hover:text-gray-500 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download
              </Link>
              <Link
                href="/faq"
                className="block px-0 py-2 rounded-md font-medium text-gray-900 hover:text-gray-500 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/about"
                className="block px-0 py-2 rounded-md font-medium text-gray-900 hover:text-gray-500 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

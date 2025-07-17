"use client";

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { initTracking, logEvent } from '@/utils/eventLogger';

function QueryParamsHandlerContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only save the 'from' parameter to localStorage
    const from = searchParams.get('from');
    if (from) {
      localStorage.setItem('channel', from);
    }
    
    // Initialize tracking parameters
    initTracking();

    // Log the event
    logEvent('page_view', {
      page_url: window.location.href,
    });
    
  }, [searchParams]);

  return null; // This component doesn't render anything
}

export function QueryParamsHandler() {
  return (
    <Suspense fallback={null}>
      <QueryParamsHandlerContent />
    </Suspense>
  );
} 
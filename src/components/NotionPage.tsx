'use client';

import { type ExtendedRecordMap } from 'notion-types'
import { notFound } from 'next/navigation'
import { NotionRenderer} from 'react-notion-x'
import * as React from 'react'
import dynamic from 'next/dynamic'
import { mapPageUrl } from '@/lib/map-page-url'

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

interface NotionPageProps {
  recordMap: ExtendedRecordMap
  rootPageId?: string
}  

export default function NotionPage({
  recordMap,
  rootPageId
}: NotionPageProps) {

  const components = {
    Collection,
    Header: null
  }

  const siteMapPageUrl = React.useMemo(() => {
    const searchParams = new URLSearchParams()
    return mapPageUrl(recordMap!, searchParams) 
  }, [recordMap])

  if (!recordMap) {
    return notFound()
  }

  return (
    <NotionRenderer
      recordMap={recordMap}
      components={components}
      fullPage={true}
      darkMode={false}
      rootPageId={rootPageId}
      previewImages={true}
      mapPageUrl={siteMapPageUrl}
    />
  )
}
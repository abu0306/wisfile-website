import { type ExtendedRecordMap } from 'notion-types'
import { parsePageId, uuidToId } from 'notion-utils'

import { includeNotionIdInUrls, rootNotionPageId, domain } from './config'
import { getCanonicalPageId } from './get-canonical-page-id'


// include UUIDs in page URLs during local development but not in production
// (they're nice for debugging and speed up local dev)
const uuid = !!includeNotionIdInUrls

export const mapPageUrl =
  (recordMap: ExtendedRecordMap, searchParams: URLSearchParams) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })!

    if (uuidToId(pageUuid) === rootNotionPageId) {
      return createUrl('/blog', searchParams)
    } else {
      return createUrl(
        `/blog/${getCanonicalPageId(pageUuid, recordMap, { uuid })}`,
        searchParams
      )
    }
  }

export const getCanonicalPageUrl =
  (recordMap: ExtendedRecordMap) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })!

    if (uuidToId(pageId) === rootNotionPageId) {
      return `https://${domain}/blog`
    } else {
      return `https://${domain}/blog/${getCanonicalPageId(pageUuid, recordMap, {
        uuid
      })}`
    }
  }

function createUrl(path: string, searchParams: URLSearchParams) {
  return [path, searchParams.toString()].filter(Boolean).join('?')
}

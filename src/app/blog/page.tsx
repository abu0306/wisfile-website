import { rootNotionPageId } from '@/lib/config'
import notion from '@/lib/notion-api'
import  NotionPage from '@/components/NotionPage'
import 'react-notion-x/src/styles.css'



// This is a Server Component by default
export default async function BlogPage() {


  const pageId = rootNotionPageId
  console.log(pageId)
  const recordMap = await notion.getPage(pageId)


  return (
    <div className="container-custom py-12">
      {/* Add your blog content rendering logic here */}
      <div className="prose max-w-none">
        <NotionPage 
          recordMap={recordMap} 
          rootPageId={rootNotionPageId} 
        />
      </div>
    </div>
  )
}

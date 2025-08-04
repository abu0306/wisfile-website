const fs = require('fs');
const path = require('path');

/**
 * Generate FAQ sitemap
 */
function generateFaqSitemap() {
  try {
    const siteUrl = 'https://www.wisfile.ai';
    const currentDate = new Date().toISOString();
    
    // Read FAQ chunks index
    const indexPath = path.join(__dirname, '../src/content/faq-chunks/index.json');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const index = JSON.parse(indexContent);
    
    // Collect all FAQ slugs
    const faqSlugs = [];
    
    // Read each chunk to get all slugs
    for (let i = 1; i <= index.totalChunks; i++) {
      const chunkPath = path.join(__dirname, `../src/content/faq-chunks/faq-chunk-${i}.json`);
      const chunkContent = fs.readFileSync(chunkPath, 'utf8');
      const chunk = JSON.parse(chunkContent);
      
      // Extract slugs from each FAQ item
      chunk.forEach(faq => {
        if (faq.slug) {
          faqSlugs.push(faq.slug);
        }
      });
    }
    
    // Start sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- FAQ main page -->
  <url>
    <loc>${siteUrl}/faq</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;

    // Add individual FAQ pages
    faqSlugs.forEach(slug => {
      sitemap += `
  <url>
    <loc>${siteUrl}/faq/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    // Write to public directory
    const outputPath = path.join(__dirname, '../public/sitemap-1.xml');
    fs.writeFileSync(outputPath, sitemap);
    
    console.log(`✅ FAQ sitemap generated successfully with ${faqSlugs.length + 1} URLs`);
    console.log(`📁 Output: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error generating FAQ sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateFaqSitemap();
}

module.exports = { generateFaqSitemap }; 
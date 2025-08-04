const fs = require('fs');
const path = require('path');

/**
 * Generate sitemap index file
 */
function generateSitemapIndex() {
  try {
    const siteUrl = 'https://www.wisfile.ai';
    
    // Create sitemap index XML
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap><loc>${siteUrl}/sitemap-0.xml</loc></sitemap>
<sitemap><loc>${siteUrl}/sitemap-1.xml</loc></sitemap>
</sitemapindex>`;

    // Write to public directory
    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemapIndex);
    
    console.log(`✅ Sitemap index generated successfully`);
    console.log(`📁 Output: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap index:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemapIndex();
}

module.exports = { generateSitemapIndex }; 
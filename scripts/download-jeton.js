const scrape = require('website-scraper').default || require('website-scraper');
const path = require('path');

const options = {
  urls: ['https://www.jeton.com/'],
  directory: path.resolve(__dirname, '../jeton-clone-full'),
  recursive: true,
  maxDepth: 2,
  prettifyUrls: true,
  filenameGenerator: 'bySiteStructure',
  requestConcurrency: 2,
  request: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  },
  sources: [
    { selector: 'img', attr: 'src' },
    { selector: 'link[rel="stylesheet"]', attr: 'href' },
    { selector: 'script', attr: 'src' },
    { selector: 'link[rel="icon"]', attr: 'href' },
    { selector: 'link[rel="apple-touch-icon"]', attr: 'href' },
    { selector: 'video source', attr: 'src' },
    { selector: 'link[rel="preload"]', attr: 'href' }
  ],
  subdirectories: [
    { directory: 'images', extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'] },
    { directory: 'js', extensions: ['.js'] },
    { directory: 'css', extensions: ['.css'] },
    { directory: 'fonts', extensions: ['.woff', '.woff2', '.ttf', '.eot'] }
  ]
};

console.log('Starting to download jeton.com...');
console.log('This may take a few minutes...\n');

(async () => {
  try {
    const result = await scrape(options);
    console.log('\n✓ Download complete!');
    console.log(`Downloaded ${result.length} resources`);
    console.log(`Files saved to: ${options.directory}`);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();


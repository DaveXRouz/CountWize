const scrape = require('website-scraper').default;
const PuppeteerPlugin = require('website-scraper-puppeteer').default;
const path = require('path');

const options = {
  urls: [
    'https://www.jeton.com/',
    'https://www.jeton.com/about',
    'https://www.jeton.com/fees',
    'https://www.jeton.com/jeton-card',
    'https://www.jeton.com/partnerships',
    'https://www.jeton.com/newsroom',
    'https://www.jeton.com/privacy-policy',
    'https://www.jeton.com/terms-and-conditions',
    'https://www.jeton.com/cookie-policy',
    'https://www.jeton.com/aml-policy'
  ],
  directory: path.resolve(__dirname, '../jeton-full'),
  recursive: false,
  maxDepth: 1,
  filenameGenerator: 'bySiteStructure',
  requestConcurrency: 1,
  request: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  },
  plugins: [
    new PuppeteerPlugin({
      launchOptions: {
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      },
      scrollToBottom: {
        timeout: 10000,
        viewportN: 10
      },
      blockNavigation: false,
    })
  ],
  sources: [
    { selector: 'img', attr: 'src' },
    { selector: 'img', attr: 'srcset' },
    { selector: 'link[rel="stylesheet"]', attr: 'href' },
    { selector: 'script', attr: 'src' },
    { selector: 'link[rel="icon"]', attr: 'href' },
    { selector: 'link[rel="apple-touch-icon"]', attr: 'href' },
    { selector: 'video source', attr: 'src' },
    { selector: 'video', attr: 'src' },
    { selector: 'video', attr: 'poster' },
    { selector: '[style*="background"]', attr: 'style' },
    { selector: 'link[rel="preload"]', attr: 'href' },
    { selector: 'link[rel="modulepreload"]', attr: 'href' }
  ],
  subdirectories: [
    { directory: 'images', extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico', '.avif'] },
    { directory: 'js', extensions: ['.js', '.mjs'] },
    { directory: 'css', extensions: ['.css'] },
    { directory: 'fonts', extensions: ['.woff', '.woff2', '.ttf', '.eot'] },
    { directory: 'videos', extensions: ['.mp4', '.webm', '.mov'] }
  ],
  urlFilter: function(url) {
    // Only download from jeton.com and their CDN
    return url.includes('jeton.com') || 
           url.includes('cdn.sanity.io') ||
           url.includes('jetonbucket') ||
           url.includes('fonts.googleapis.com') ||
           url.includes('fonts.gstatic.com');
  }
};

console.log('Starting full download of jeton.com with Puppeteer...');
console.log('This will render JavaScript and capture all content.');
console.log('Please wait, this may take several minutes...\n');

(async () => {
  try {
    const result = await scrape(options);
    console.log('\n✓ Download complete!');
    console.log(`Downloaded ${result.length} pages`);
    console.log(`Files saved to: ${options.directory}`);
  } catch (err) {
    console.error('Error:', err.message);
    console.error(err.stack);
  }
})();


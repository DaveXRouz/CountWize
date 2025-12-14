/**
 * Download missing assets from jeton.com
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      reject(err);
    });
  });
}

// Missing images from audit
const missingImages = [
  // Menu thumbnails
  '_ipx/q_90%26s_96x96/cms/4f6a8508b00df69a179304578d93ed614d258563-3000x2000.png',
  '_ipx/q_90%26s_96x96/cms/2bc9ed5b8d4817448a406893182553c525f5b8ef-2478x2478.jpg',
  '_ipx/q_90%26s_96x96/cms/6f85636fb47a919c3b5a09e01174167f1d909443-1360x1670.jpg',
  '_ipx/q_90%26s_96x96/cms/af0e063715aaeb30c3dd198a2875e22ff8356636-2298x2297.jpg',
  '_ipx/q_90%26s_96x96/cms/7d16904e7f8e88ebce4039c6f38bc4370456188b-600x600.jpg',
  '_ipx/q_90%26s_96x96/cms/696e2847e46fb8fbe7e6e9c560d4ae97c76e82e1-600x600.jpg',
  '_ipx/q_90%26s_96x96/cms/e3ecd6e55ee5d2e13b38fd1219a8385244f8ea87-600x600.jpg',
  '_ipx/q_90%26s_96x96/cms/962f1a575f57a00999eaac03fa59cba22d634919-1200x1200.jpg',
  // Hero snippets
  '_ipx/q_90%26w_425/cms/633e0fd8c443a6124a232d42ad11c20cc078d65c-600x500.png',
  '_ipx/q_90%26w_425/cms/b1542520ec11564d8a0e1c995b8d98235dfd97c3-660x684.png',
  '_ipx/q_90%26w_425/cms/58416ce3a15f3a122d9b24cfafefb57b77c3c104-720x720.png',
  '_ipx/q_90%26w_425/cms/0246deb44de262e2d472307e9ccc3de126c5b39b-660x627.png',
  '_ipx/q_90%26w_425/cms/25fbb354a9e33cb07ea84c40eab7f16b9ec0b84a-660x660.png',
  // Testimonials background
  '_ipx/f_webp%26q_80%26w_3400/cms/b7c674ecd0ee69b2eca20443cac6272c550ed396-4000x2667.jpg',
  // Certifications
  '_ipx/f_webp%26q_90%26s_102x128/cms/1151125d455608ae69070fdd56e5a71365f3e17e-192x240.png',
  '_ipx/f_webp%26q_90%26s_117x128/cms/091df0f4e5a50b54d7c480f4c4316e7cbb874404-220x240.png',
  '_ipx/f_webp%26q_90%26s_128x128/cms/1131d43c022f9f24598b699500ad3d2f0880c5ee-321x320.png',
  '_ipx/f_webp%26q_90%26s_491x128/cms/3ce8e871cd751b791d212f21d8313855c7485df7-1071x279.png',
  '_ipx/f_webp%26q_90%26s_591x128/cms/8ce6366b851312add1e09a4a75e4e64281c89831-1280x277.png',
  '_ipx/f_webp%26q_90%26s_105x128/cms/3915572478f3f7ea3275c443d4489c8a4439dcc0-198x240.png',
  // Partnership cards
  '_ipx/q_90%26w_1700/cms/f88ca5c0e739a3c92a194105844528a4aef2a8ef-1532x840.jpg',
  '_ipx/q_90%26w_1360/cms/3807ed1d6ff033d12f87399f2c553de24b4805a3-664x160.png',
  '_ipx/q_90%26w_1700/cms/3fa7b37293f885927ddb88107fc1b88df1a4485d-1022x560.jpg',
  '_ipx/q_90%26w_1360/cms/8d0ba3c7d77020b2ecf42369f5592f7e0e1a5181-538x120.png'
];

async function downloadAllAssets() {
  const baseUrl = 'https://www.jeton.com/';
  let downloaded = 0;
  let failed = 0;

  console.log(`📥 Downloading ${missingImages.length} missing images...\n`);

  for (const imagePath of missingImages) {
    const url = baseUrl + imagePath;
    const destPath = path.join(__dirname, imagePath);
    const destDir = path.dirname(destPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Skip if already exists
    if (fs.existsSync(destPath)) {
      console.log(`  ✓ Already exists: ${imagePath}`);
      continue;
    }

    try {
      await downloadFile(url, destPath);
      downloaded++;
      console.log(`  ✓ Downloaded: ${imagePath}`);
    } catch (error) {
      failed++;
      console.log(`  ❌ Failed: ${imagePath} - ${error.message}`);
    }
  }

  console.log(`\n✅ Complete! Downloaded: ${downloaded}, Failed: ${failed}`);
}

downloadAllAssets().catch(console.error);


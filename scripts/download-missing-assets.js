const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const JETON_SITE = path.resolve(__dirname, '../jeton-site');

// Images that need to be downloaded from the network requests
const missingImages = [
  // Profile/Avatar images
  'https://www.jeton.com/_ipx/q_90&s_200x200/cms/2bc9ed5b8d4817448a406893182553c525f5b8ef-2478x2478.jpg',
  'https://www.jeton.com/_ipx/q_90&s_200x200/cms/af0e063715aaeb30c3dd198a2875e22ff8356636-2298x2297.jpg',
  'https://www.jeton.com/_ipx/q_90&s_200x200/cms/696e2847e46fb8fbe7e6e9c560d4ae97c76e82e1-600x600.jpg',
  'https://www.jeton.com/_ipx/q_90&s_96x96/cms/962f1a575f57a00999eaac03fa59cba22d634919-1200x1200.jpg',
  'https://www.jeton.com/_ipx/q_90&s_200x200/cms/6f85636fb47a919c3b5a09e01174167f1d909443-1360x1670.jpg',
  'https://www.jeton.com/_ipx/q_90&w_1360/cms/3807ed1d6ff033d12f87399f2c553de24b4805a3-664x160.png',
  'https://www.jeton.com/_ipx/q_90&s_200x200/cms/7d16904e7f8e88ebce4039c6f38bc4370456188b-600x600.jpg',
  'https://www.jeton.com/_ipx/q_90&s_96x96/cms/4f6a8508b00df69a179304578d93ed614d258563-3000x2000.png',
  'https://www.jeton.com/_ipx/f_webp&q_90&s_128x128/cms/1131d43c022f9f24598b699500ad3d2f0880c5ee-321x320.png',
  'https://www.jeton.com/_ipx/q_90&s_96x96/cms/6f85636fb47a919c3b5a09e01174167f1d909443-1360x1670.jpg',
  'https://www.jeton.com/_ipx/q_90&s_96x96/cms/7d16904e7f8e88ebce4039c6f38bc4370456188b-600x600.jpg',
  'https://www.jeton.com/_ipx/q_90&s_96x96/cms/e3ecd6e55ee5d2e13b38fd1219a8385244f8ea87-600x600.jpg',
  'https://www.jeton.com/_ipx/q_90&w_425/cms/25fbb354a9e33cb07ea84c40eab7f16b9ec0b84a-660x660.png',
  'https://www.jeton.com/_ipx/q_90&s_96x96/cms/2bc9ed5b8d4817448a406893182553c525f5b8ef-2478x2478.jpg',
  'https://www.jeton.com/_ipx/q_90&s_200x200/cms/962f1a575f57a00999eaac03fa59cba22d634919-1200x1200.jpg',
  'https://www.jeton.com/_ipx/q_90&s_96x96/cms/696e2847e46fb8fbe7e6e9c560d4ae97c76e82e1-600x600.jpg',
  'https://www.jeton.com/_ipx/q_90&s_96x96/cms/af0e063715aaeb30c3dd198a2875e22ff8356636-2298x2297.jpg',
  'https://www.jeton.com/_ipx/q_90&w_425/cms/58416ce3a15f3a122d9b24cfafefb57b77c3c104-720x720.png',
  'https://www.jeton.com/_ipx/f_webp&q_90&s_102x128/cms/1151125d455608ae69070fdd56e5a71365f3e17e-192x240.png',
  'https://www.jeton.com/_ipx/f_webp&q_90&s_491x128/cms/3ce8e871cd751b791d212f21d8313855c7485df7-1071x279.png',
  'https://www.jeton.com/_ipx/f_webp&q_90&s_591x128/cms/8ce6366b851312add1e09a4a75e4e64281c89831-1280x277.png',
  'https://www.jeton.com/_ipx/q_90&w_425/cms/633e0fd8c443a6124a232d42ad11c20cc078d65c-600x500.png',
  'https://www.jeton.com/_ipx/q_90&w_1700/cms/3fa7b37293f885927ddb88107fc1b88df1a4485d-1022x560.jpg',
  'https://www.jeton.com/_ipx/q_90&w_425/cms/0246deb44de262e2d472307e9ccc3de126c5b39b-660x627.png',
  'https://www.jeton.com/_ipx/q_90&w_1700/cms/f88ca5c0e739a3c92a194105844528a4aef2a8ef-1532x840.jpg',
  'https://www.jeton.com/_ipx/q_90&w_1360/cms/8d0ba3c7d77020b2ecf42369f5592f7e0e1a5181-538x120.png',
  'https://www.jeton.com/_ipx/f_webp&q_80&w_3400/cms/b7c674ecd0ee69b2eca20443cac6272c550ed396-4000x2667.jpg',
  'https://www.jeton.com/_ipx/q_90&w_425/cms/b1542520ec11564d8a0e1c995b8d98235dfd97c3-660x684.png',
  'https://www.jeton.com/_ipx/q_90&s_200x200/cms/e3ecd6e55ee5d2e13b38fd1219a8385244f8ea87-600x600.jpg',
];

// Videos from CDN
const videos = [
  'https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-10-16T16-23-22.921Z-jeton-card-rip.mp4',
  'https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T10-52-41.402Z-jeton-homepage-hd2.mp4',
  'https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-07T15-59-35.070Z-jeton-3dapp-fhd.mp4',
];

// Rive animation files
const riveFiles = [
  'https://cdn.sanity.io/files/q3ih7d1b/production/23a3c11ba226d4bb7e916918723d814288b77265.riv',
  'https://cdn.sanity.io/files/q3ih7d1b/production/95cea0426464659130966516e85464603be1e091.riv',
  'https://cdn.sanity.io/files/q3ih7d1b/production/6442a9110636ba0da2e6c0c731d92457d7e928cc.riv',
  'https://cdn.sanity.io/files/q3ih7d1b/production/8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv',
  'https://cdn.sanity.io/files/q3ih7d1b/production/01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv',
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    // Create directory if needed
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(destPath);
    
    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function downloadAllAssets() {
  console.log('Downloading missing assets for Jeton site...\n');

  // Download images
  console.log('=== Downloading Images ===');
  for (const url of missingImages) {
    try {
      const urlPath = url.replace('https://www.jeton.com/', '');
      const destPath = path.join(JETON_SITE, urlPath);
      
      if (!fs.existsSync(destPath)) {
        process.stdout.write(`Downloading: ${path.basename(urlPath)}... `);
        await downloadFile(url, destPath);
        console.log('✓');
      } else {
        console.log(`Skipping (exists): ${path.basename(urlPath)}`);
      }
    } catch (err) {
      console.log(`✗ Error: ${err.message}`);
    }
  }

  // Download videos
  console.log('\n=== Downloading Videos ===');
  const videosDir = path.join(JETON_SITE, 'videos');
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }

  for (const url of videos) {
    try {
      const filename = url.split('/').pop().split('#')[0];
      const destPath = path.join(videosDir, filename);
      
      if (!fs.existsSync(destPath)) {
        process.stdout.write(`Downloading: ${filename}... `);
        await downloadFile(url, destPath);
        console.log('✓');
      } else {
        console.log(`Skipping (exists): ${filename}`);
      }
    } catch (err) {
      console.log(`✗ Error: ${err.message}`);
    }
  }

  // Download Rive files
  console.log('\n=== Downloading Rive Animations ===');
  const riveDir = path.join(JETON_SITE, 'rive');
  if (!fs.existsSync(riveDir)) {
    fs.mkdirSync(riveDir, { recursive: true });
  }

  for (const url of riveFiles) {
    try {
      const filename = url.split('/').pop();
      const destPath = path.join(riveDir, filename);
      
      if (!fs.existsSync(destPath)) {
        process.stdout.write(`Downloading: ${filename}... `);
        await downloadFile(url, destPath);
        console.log('✓');
      } else {
        console.log(`Skipping (exists): ${filename}`);
      }
    } catch (err) {
      console.log(`✗ Error: ${err.message}`);
    }
  }

  console.log('\n=== Download Complete ===');
}

downloadAllAssets().catch(console.error);


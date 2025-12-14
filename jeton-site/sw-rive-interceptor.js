
// Service Worker - Rive File Interceptor
const RIVE_FILES = {
  '8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv': '/rive/8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv',
  '01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv': '/rive/01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv',
  '6442a9110636ba0da2e6c0c731d92457d7e928cc.riv': '/rive/6442a9110636ba0da2e6c0c731d92457d7e928cc.riv',
  '23a3c11ba226d4bb7e916918723d814288b77265.riv': '/rive/23a3c11ba226d4bb7e916918723d814288b77265.riv',
  '95cea0426464659130966516e85464603be1e091.riv': '/rive/95cea0426464659130966516e85464603be1e091.riv'
};

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  if (url.includes('cdn.sanity.io') && url.includes('.riv')) {
    const fileName = url.split('/').pop();
    if (RIVE_FILES[fileName]) {
      event.respondWith(
        fetch(RIVE_FILES[fileName]).catch(() => {
          // Fallback to original request if local file fails
          return fetch(event.request);
        })
      );
    }
  }
});

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const latestVersion = await effiditCheckver()
  return new Response(latestVersion, {
    headers: { 'content-type': 'text/plain' },
  })
}

async function effiditCheckver() {
  const baseUrl = 'https://effidit.qq.com/'
  var jsUrlReg = /src=(js\/app.*\.js)/g;
  var homeBody = await (await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
    }
  })).text();
  var jsUrlArray = jsUrlReg.exec(homeBody);
  var jsUrl = baseUrl + jsUrlArray[1];

  const versionReg = /effidit-v([\d.]+)-zh-setup.msi/g;
  var jsBody = await (await fetch(jsUrl, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
    }
  })).text()
  latestVersion = versionReg.exec(jsBody)
  // console.log(latestVersion)
  return latestVersion[1]
}
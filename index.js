addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  // console.log('fetch event:', request.url.split('/'))
  softwareName = request.url.split('/')[3]
  var latestVersion = '404'
  switch (softwareName) {
    case 'effidit':
      latestVersion = await effiditCheckver()
      break;
    case 'axglyph':
      latestVersion = await axglyphCheckver()
      break;
    case 'axmath':
      latestVersion = await axmathCheckver()
      break;
    case 'jy-srt-tools':
      latestVersion = await jySrtToolsCheckver()
      break;
    default:
      latestVersion = '404'
  }
  return new Response(latestVersion, {
    headers: { 'content-type': 'text/plain' },
  })
}

async function effiditCheckver() {
  const baseUrl = 'https://effidit.qq.com/'
  var jsUrlReg = /src=(assets\/js\/app.*\.js)/g;
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
  return JSON.stringify({
    name: 'effidit',
    version: latestVersion[1]
  })
}

async function axglyphCheckver() {
  const baseUrl = 'https://www.amyxun.com'
  var versionReg = /AxGlyph +V([\d.]+)/g;
  var sha256Reg = /SHA256: ([A-Fa-f0-9]{64})/g;
  var downloadUrlReg = /href='(.*?AxGlyph_Setup_Win.*?zip.*?)'/g;
  var homeBody = await (await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
    }
  })).text();

  var version = versionReg.exec(homeBody)[1];
  // 绕过第一个
  console.log(sha256Reg.exec(homeBody))
  var sha256 = sha256Reg.exec(homeBody)[1];
  var downloadUrl = downloadUrlReg.exec(homeBody)[1];
  return JSON.stringify({
    name: 'axglyph',
    version: version,
    sha256: sha256,
    downloadUrl: downloadUrl
  })
}

async function axmathCheckver() {
  const baseUrl = 'https://www.amyxun.com'
  var versionReg = /AxMath +V([\d.]+)/g;
  var sha256Reg = /SHA256: ([A-Fa-f0-9]{64})/g;
  var downloadUrlReg = /href='(.*?AxMath_Setup_Win.*?zip.*?)'/g;
  var homeBody = await (await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
    }
  })).text();

  var version = versionReg.exec(homeBody)[1];
  var sha256 = sha256Reg.exec(homeBody)[1];
  var downloadUrl = downloadUrlReg.exec(homeBody)[1];
  return JSON.stringify({
    name: 'axmath',
    version: version,
    sha256: sha256,
    downloadUrl: downloadUrl
  })
}

async function jySrtToolsCheckver() {
  const baseUrl = 'https://github.com/jackychu0830/jy-srt-tools/releases'
  var versionReg = /([\d.]+)-Win/g;

  var homeBody = await (await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
    }
  })).text();

  var version = versionReg.exec(homeBody)[1];
  return JSON.stringify({
    name: 'jy-srt-tools',
    version: version
  })
}

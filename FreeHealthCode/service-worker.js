importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
);
workbox.setConfig({
  debug: true
});

const { precacheAndRoute } = workbox.precaching;
const VERSION = 3;
const URL_PREFIX = "";

const FILES = [
  "/",
  "/bootstrap.min.css",
  "/index.css",
  "/index.js",
  "/jquery.min.js",
  "/jquery.qrcode.min.js",
  "/index.html",
  "/main.html",
  "/main.css",
  "/manifest.json",
  "/mod.css",
  "/mod.js",
  "/service-worker.js",
  "/src/addhea.png",
  "/src/gj.png",
  "/src/hesuan.png",
  "/src/icon4.png",
  "/src/img3.png",
  "/src/kangti.png",
  "/src/love.png",
  "/src/member.png",
  "/src/pic.png",
  "/src/star.png",
  "/src/updata.png",
  "/src/xingcheng.png",
  "/src/yimiao.png",
  "/src/ymjz2.png"
];

precacheAndRoute(
  FILES.map((url) => ({
    revision: VERSION,
    url: URL_PREFIX + url
  }))
);

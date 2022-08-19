importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
);
workbox.setConfig({
  debug: true,
});

const { precacheAndRoute } = workbox.precaching;
const VERSION = 13;
const URL_PREFIX = location.pathname.slice(0, -"service-worker.js".length - 1);

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
  "/hs.html",
  "/hs.css",
  "/qr.html",
  "/qr.css",
  "/unit.html",
  "/unit.css",
  "/context-menu.js",
  "/xck.css",
  "/xck.html",
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
  "/src/ymjz2.png",
  "/src/222.e8d1724d.png",
  "/src/gif_green.aa2c099c.gif",
  "/src/img_bg@3x.0055ee09.2ae09503.png",
  "/src/home.svg",
  "/src/qr_scan.svg",
  "/src/banner-bg1.1b63d234.png",
  "/src/fxbb.png",
  "/src/turn-left2.png",
  "/src/turn-right2.png",
  "/src/xxgx.png",
  "/src/hours.png",
  "/src/hs-detail.png",
  "/src/hsym-back.png",
];

precacheAndRoute(
  FILES.map((url) => ({
    revision: VERSION,
    url: URL_PREFIX + url,
  }))
);

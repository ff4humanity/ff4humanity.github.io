(function () {
  let rootpath = location.pathname.slice(1);
  if (rootpath.indexOf("/") != -1) {
    rootpath = "/" + rootpath.split("/")[0] + "/";
  } else {
    rootpath = "/";
  }
  document
    .querySelector(".header")
    .addEventListener("dblclick", toggleFullScreen);
  document.querySelector(".title").addEventListener("dblclick", async (e) => {
    e.stopPropagation();
    if (!confirm("清除缓存？")) {
      return;
    }
    let registration = await navigator.serviceWorker.getRegistration(rootpath);
    registration && (await registration.unregister());
    let cacheNames = await caches.keys();
    for (let i = 0; i < cacheNames.length; i++) {
      await caches.delete(cacheNames[i]);
    }
    alert("已清除缓存。请重新刷新页面");
  });
  document.querySelector(".qr").addEventListener("click", async (e) => {
    document.querySelector("iframe").contentWindow.location.href = "qr.html";
  });
  document.querySelector(".home").addEventListener("click", async (e) => {
    document.querySelector("iframe").contentWindow.location.href = "main.html";
  });
  document.querySelector(".title").addEventListener("contextmenu", (e) => {
    location.href =
      document.querySelector("iframe").contentWindow.location.href +
      location.hash;
  });
  navigator.serviceWorker.register(`${rootpath}service-worker.js`, {
    scope: rootpath,
  });
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
})();

function setTitle(title) {
  title = title || "苏康码";
  document.title = title;
  document.querySelector(".title").innerHTML = title;
}

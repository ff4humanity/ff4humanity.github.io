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

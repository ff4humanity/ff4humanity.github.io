document.querySelector(".header").addEventListener("dblclick", toggleFullScreen);
navigator.serviceWorker.register("/service-worker.js", { scope: "/" });

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

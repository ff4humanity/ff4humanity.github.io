document.querySelector(".header").addEventListener("dblclick", toggleFullScreen);
navigator.serviceWorker.register("/FreeHealthCode/service-worker.js", { scope: "/FreeHealthCode/" });

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

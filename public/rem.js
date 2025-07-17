(function () {
  const doc = document.documentElement;
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

  if (!isMobile) return;

  function setRem() {
    const baseWidth = 375;
    const width = doc.clientWidth;
    const rem = (width / baseWidth) * 16;
    doc.style.fontSize = rem + "px";
  }

  setRem();
  window.addEventListener("resize", setRem);
})();

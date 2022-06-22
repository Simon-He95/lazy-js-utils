export function scrollToTop() {
  const t = document.documentElement.scrollTop || document.body.scrollTop;
  if (t > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, t - t / 8);
  }
}

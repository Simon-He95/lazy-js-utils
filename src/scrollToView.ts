export function scrollToView(e: Element | string | null) {
  if (typeof e === 'string')
    e = document.querySelector(e);
  if (!e)
    return
  e.scrollIntoView({
    behavior: 'smooth'
  });
}

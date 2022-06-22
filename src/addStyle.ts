export function addStyle(s: string) {
  const style = document.createElement('style');
  style.innerHTML = s;
  document.head.appendChild(style);
}

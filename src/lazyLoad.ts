import { isArray } from "./isArray";
import { isStr } from "./isStr";
export function lazyLoad(imgList: any, root: Element, rootMargin: string = '0px 0px 200px 0px', threshold: any): void {
  if (isStr(imgList))
    imgList = document.querySelectorAll(imgList);
  if (imgList.length !== undefined)
    imgList = [...imgList]
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        /* 替换属性 */
        console.log(entry.isIntersecting)
        if (entry.isIntersecting) {
          (entry.target as HTMLImageElement).src = (entry.target as any).dataset.src;
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin, root, threshold });
  if (isArray(imgList))
    (imgList as Element[]).forEach(img => observer.observe(img));
  else observer.observe(imgList as Element);
}




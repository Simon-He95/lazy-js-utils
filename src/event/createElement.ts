/**
 * 创建dom元素
 * @param { string } tag 创建的标签元素
 * @param { Record<string, string> } [attributes] 属性 {}
 * @param { string } [innerHTML] 插入的内容innerHTML
 * @param { ElementCreationOptions } [options] 通过 customElements.define() 定义的自定义元素的标签名称
 * @returns
 */
export function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  attributes?: Record<string, string>,
  innerHTML?: string,
  options?: ElementCreationOptions,
): HTMLElementTagNameMap[T] {
  const el = document.createElement(tag, options) as HTMLElementTagNameMap[T]
  if (!attributes)
    return el
  for (const key in attributes) el.setAttribute(key, attributes[key])
  if (innerHTML)
    el.innerHTML = innerHTML
  return el
}

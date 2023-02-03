import { parse } from 'vue/compiler-sfc'
import { isVue } from '../is/isVue'

export function vitePluginCssVar(prefix = '$') {
  const reg = new RegExp(`\\${prefix}(\\w+)`, 'g')
  console.log(reg)

  return {
    name: 'vite-plugin-css-var',
    transform(src: string, id: string) {
      if (!isVue(id))
        return
      const { descriptor } = parse(src)
      const script
        = (descriptor.script || descriptor.scriptSetup)?.content || ''

      const template = `<template>${
        descriptor.template?.content || ''
      }</template>`
      const styles = descriptor.styles[0]
      let style = styles
        ? `\n<style${styles.scoped ? ' scoped' : ''}>${styles.content}</style>`
        : ''
      if (style) {
        style = style.replace(reg, (_, v) => {
          return `var(--${v})`
        })
      }
      const result = script + template + style
      console.log({ result })

      return result
    },
    enforce: 'pre',
  }
}

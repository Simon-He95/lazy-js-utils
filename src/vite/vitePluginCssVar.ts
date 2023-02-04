import type { Plugin } from 'vite'
import { parse } from 'vue/compiler-sfc'
import { isVue } from '../is/isVue'

export function vitePluginCssVar(prefix = '$') {
  const reg = new RegExp(`\\${prefix}(\\w+)`, 'g')
  const cache = new Set()
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
          cache.add(id)
          return `var(--${v})`
        })
      }

      return script + template + style
    },
    handleHotUpdate({ file, server }) {
      if (cache.has(file)) {
        console.log('reloading vue file...')
        server.ws.send({
          type: 'full-reload',
          path: '*',
        })
      }

      return []
    },
    enforce: 'pre',
  } as Plugin
}

import * as THREE from 'three'
import { isStr } from './isStr'
import { addEventListener } from './addEventListener'
import { animationFrameWrapper } from './animationFrameWrapper'

interface SThreeOptions extends Record<string, any> {
  createTargets: (THREE: any) => { targets: any[]; contents: any[] }
  createCamera: (THREE: any) => THREE.PerspectiveCamera
  animate: (THREE: any, targets: any[], time: number) => void | THREE.PerspectiveCamera
  middleware: (THREE: any, targets: any[]) => void
}
export function sThree(container: HTMLElement | string, options: SThreeOptions) {
  const renderer = new THREE.WebGLRenderer()
  const scene = new THREE.Scene()
  const camera = options.createCamera(THREE)
  const { targets, contents } = options.createTargets(THREE)
  contents.forEach(content => scene.add(content))
  options.middleware?.(THREE, targets)
  if (options.animate)
    animationFrameWrapper((time: number) => renderer.render(scene, options.animate(THREE, targets, time) || camera), 0)
  else
    renderer.render(scene, camera)

  addEventListener(document, 'DOMContentLoaded', () => {
    if (isStr(container))
      container = document.querySelector(container as string) as HTMLElement || container
    if (isStr(container))
      throw new Error(`${container} container is not found`)
      ; (container as HTMLElement).appendChild(renderer.domElement)
    resize()
  })
  addEventListener(window, 'resize', resize)

  function resize() {
    const width = (container as HTMLElement).offsetWidth
    const height = (container as HTMLElement).offsetHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }
}


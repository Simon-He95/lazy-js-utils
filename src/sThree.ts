import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import type { Mesh, Object3D, PerspectiveCamera, WebGLRenderer } from 'three'
import * as dat from 'dat.gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import type { TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { addEventListener } from './addEventListener'
import { animationFrameWrapper } from './animationFrameWrapper'
import { dragEvent } from './dragEvent'
import { isStr } from './isStr'
import { isFn } from './isFn'
import { useMutationObserver } from './useMutationObserver'
type T = typeof THREE
type K = keyof WebGLRenderer
interface AnimateOptions {
  camera: PerspectiveCamera
  elapsedTime: number
  timestamp: number
}
interface MiddlewareOptions {
  OrbitControls: OrbitControls
  camera: PerspectiveCamera
}
interface FnNameMap {
  cc: 'CubeCamera'
  v3: 'Vector3'
  v2: 'Vector2'
  v4: 'Vector4'
  oc: 'OrthographicCamera'
  pc: 'PerspectiveCamera'
  sc: 'StereoCamera'
  bg: 'BoxGeometry'
  ba: 'BufferAttribute'
  bufferg: 'BufferGeometry'
  capsuleg: 'CapsuleGeometry'
  coneg: 'ConeGeometry'
  cylinderg: 'CylinderGeometry'
  dg: 'DodecahedronGeometry'
  edgeg: 'EdgesGeometry'
  extrudeg: 'ExtrudeGeometry'
  ig: 'IcosahedronGeometry'
  lg: 'LatheGeometry'
  og: 'OctahedronGeometry'
  pg: 'PlaneGeometry'
  polyg: 'PolyhedronGeometry'
  rg: 'RingGeometry'
  sg: 'SphereGeometry'
  tetrag: 'TetrahedronGeometry'
  tg: 'TorusGeometry'
  tkg: 'TorusKnotGeometry'
  tubeg: 'TubeGeometry'
  wfg: 'WireframeGeometry'
  cg: 'CircleGeometry'
  ac: 'ArcCurve'
  crc3: 'CatmullRomCurve3'
  cbc: 'CubicBezierCurve'
  cbc3: 'CubicBezierCurve3'
  ec: 'EllipseCurve'
  lc: 'LineCurve'
  lc3: 'LineCurve3'
  qbc: 'QuadraticBezierCurve'
  qbc3: 'QuadraticBezierCurve3'
  splinec: 'SplineCurve'
  arrowh: 'ArrowHelper'
  ah: 'AxesHelper'
  bh: 'BoxHelper'
  b3h: 'Box3Helper'
  ch: 'CameraHelper'
  dlh: 'DirectionalLightHelper'
  gh: 'GridHelper'
  pgh: 'PolarGridHelper'
  hlh: 'HemisphereLightHelper'
  ph: 'PlaneHelper'
  plh: 'PointLightHelper'
  sh: 'SkeletonHelper'
  slh: 'SpotLightHelper'
  animationl: 'AnimationLoader'
  audiol: 'AudioLoader'
  bgl: 'BufferGeometryLoader'
  cache: 'Cache'
  c: 'Color'
  compressedtl: 'CompressedTextureLoader'
  ctl: 'CubeTextureLoader'
  dtl: 'DataTextureLoader'
  filel: 'FileLoader'
  fl: 'FontLoader'
  svgl: 'SVGLoader'
  il: 'ImageLoader'
  ibl: 'ImageBitmapLoader'
  l: 'Loader'
  lu: 'LoaderUtils'
  ml: 'MaterialLoader'
  ol: 'ObjectLoader'
  tl: 'TextureLoader'
  g: 'Group'
  lbm: 'LineBasicMaterial'
  ldm: 'LineDashedMaterial'
  m: 'Mesh'
  mbm: 'MeshBasicMaterial'
  mdepthm: 'MeshDepthMaterial'
  mdistancem: 'MeshDistanceMaterial'
  mlm: 'MeshLambertMaterial'
  mmm: 'MeshMatcapMaterial'
  mnm: 'MeshNormalMaterial'
  mpm: 'MeshPhongMaterial'
  mphysicalm: 'MeshPhysicalMaterial'
  msm: 'MeshStandardMaterial'
  mtm: 'MeshToonMaterial'
  p: 'Points'
  pm: 'PointsMaterial'
  rsm: 'RawShaderMaterial'
  sm: 'ShaderMaterial'
  shadowm: 'ShadowMaterial'
  spritem: 'SpriteMaterial'
  line: 'Line'
  lp: 'LineLoop'
  ls: 'LineSegments'
  al: 'AmbientLight'
  alp: 'AmbientLightProbe'
  dl: 'DirectionalLight'
  hl: 'HemisphereLight'
  hlp: 'HemisphereLightProbe'
  pl: 'PointLight'
  ral: 'RectAreaLight'
  sl: 'SpotLight'
  pls: 'PointLightShadow'
  dls: 'DirectionalLightShadow'
  sls: 'SpotLightShadow'
  lph: 'LightProbeHelper'
  ralh: 'RectAreaLightHelper'
  f: 'Fog'
  aa: 'AnimationAction'
  anc: 'AnimationClip'
  am: 'AnimationMixer'
  aog: 'AnimationObjectGroup'
  au: 'AnimationUtils'
  a: 'Animation'
  anl: 'AnimationLoader'
}
type ShadowType = 'BasicShadowMap' | 'PCFShadowMap' | 'PCFSoftShadowMap' | 'VSMShadowMap'
interface SThreeOptions extends Record<string, any> {
  createMesh: () => void
  createCamera: () => PerspectiveCamera
  animate?: (animationOptions: AnimateOptions) => void | PerspectiveCamera
  middleware?: (middlewareOptions: MiddlewareOptions) => any
  mousemove?: (e: Event) => void
  mousedown?: (e: Event) => void
  mouseup?: (e: Event) => void
  debug?: boolean
  alias?: Record<string, string>
  shadowType?: ShadowType
}

interface Scene extends Object3D {
  _add?: (...args: any[]) => void
}

interface ReturnType {
  c: (fnName: keyof FnNameMap | keyof T, ...args: any[]) => any
  cf: (url: string, text: string, options: TextGeometryParameters) => Promise<TextGeometry>
  track: (...args: [target: Object, propName: string, min?: number, max?: number, step?: number]) => dat.GUIController
  setUV: (target: Mesh, size?: number) => void
  glTFLoader: (url: string, dracoLoader?: DRACOLoader, callback?: (gltf: GLTFLoader) => void) => Promise<GLTFLoader>
  draCOLoader: (decoderPath: string) => DRACOLoader
  animationArray: Mesh[]
  THREE: T
  scene: Scene
  renderer: WebGLRenderer
  dom: HTMLCanvasElement
  setRendererAttributes: (options: Record<K, any>) => void
}
export function sThree(container: HTMLElement | string, options: SThreeOptions): ReturnType {
  let isMounted = false
  let hasMounted = false
  let gui: dat.GUI
  let scene: Scene | null = new THREE.Scene()
  const renderer = new THREE.WebGLRenderer()
  let dom: HTMLCanvasElement | null = renderer.domElement
  let stop: () => void
  let fnNameMap: FnNameMap | null = {
    v3: 'Vector3',
    v2: 'Vector2',
    v4: 'Vector4',
    cc: 'CubeCamera',
    oc: 'OrthographicCamera',
    pc: 'PerspectiveCamera',
    sc: 'StereoCamera',
    bg: 'BoxGeometry',
    ba: 'BufferAttribute',
    bufferg: 'BufferGeometry',
    capsuleg: 'CapsuleGeometry',
    coneg: 'ConeGeometry',
    cylinderg: 'CylinderGeometry',
    dg: 'DodecahedronGeometry',
    edgeg: 'EdgesGeometry',
    extrudeg: 'ExtrudeGeometry',
    ig: 'IcosahedronGeometry',
    lg: 'LatheGeometry',
    og: 'OctahedronGeometry',
    pg: 'PlaneGeometry',
    polyg: 'PolyhedronGeometry',
    rg: 'RingGeometry',
    sg: 'SphereGeometry',
    tetrag: 'TetrahedronGeometry',
    tg: 'TorusGeometry',
    tkg: 'TorusKnotGeometry',
    tubeg: 'TubeGeometry',
    wfg: 'WireframeGeometry',
    cg: 'CircleGeometry',
    ac: 'ArcCurve',
    crc3: 'CatmullRomCurve3',
    cbc: 'CubicBezierCurve',
    cbc3: 'CubicBezierCurve3',
    ec: 'EllipseCurve',
    lc: 'LineCurve',
    lc3: 'LineCurve3',
    qbc: 'QuadraticBezierCurve',
    qbc3: 'QuadraticBezierCurve3',
    splinec: 'SplineCurve',
    arrowh: 'ArrowHelper',
    ah: 'AxesHelper',
    bh: 'BoxHelper',
    b3h: 'Box3Helper',
    ch: 'CameraHelper',
    dlh: 'DirectionalLightHelper',
    gh: 'GridHelper',
    pgh: 'PolarGridHelper',
    hlh: 'HemisphereLightHelper',
    ph: 'PlaneHelper',
    plh: 'PointLightHelper',
    sh: 'SkeletonHelper',
    slh: 'SpotLightHelper',
    animationl: 'AnimationLoader',
    audiol: 'AudioLoader',
    bgl: 'BufferGeometryLoader',
    cache: 'Cache',
    c: 'Color',
    compressedtl: 'CompressedTextureLoader',
    ctl: 'CubeTextureLoader',
    dtl: 'DataTextureLoader',
    filel: 'FileLoader',
    fl: 'FontLoader',
    svgl: 'SVGLoader',
    il: 'ImageLoader',
    ibl: 'ImageBitmapLoader',
    l: 'Loader',
    lu: 'LoaderUtils',
    ml: 'MaterialLoader',
    ol: 'ObjectLoader',
    tl: 'TextureLoader',
    g: 'Group',
    lbm: 'LineBasicMaterial',
    ldm: 'LineDashedMaterial',
    m: 'Mesh',
    mbm: 'MeshBasicMaterial',
    mdepthm: 'MeshDepthMaterial',
    mdistancem: 'MeshDistanceMaterial',
    mlm: 'MeshLambertMaterial',
    mmm: 'MeshMatcapMaterial',
    mnm: 'MeshNormalMaterial',
    mpm: 'MeshPhongMaterial',
    mphysicalm: 'MeshPhysicalMaterial',
    msm: 'MeshStandardMaterial',
    mtm: 'MeshToonMaterial',
    p: 'Points',
    pm: 'PointsMaterial',
    rsm: 'RawShaderMaterial',
    sm: 'ShaderMaterial',
    shadowm: 'ShadowMaterial',
    spritem: 'SpriteMaterial',
    line: 'Line',
    lp: 'LineLoop',
    ls: 'LineSegments',
    al: 'AmbientLight',
    alp: 'AmbientLightProbe',
    dl: 'DirectionalLight',
    hl: 'HemisphereLight',
    hlp: 'HemisphereLightProbe',
    pl: 'PointLight',
    ral: 'RectAreaLight',
    sl: 'SpotLight',
    pls: 'PointLightShadow',
    dls: 'DirectionalLightShadow',
    sls: 'SpotLightShadow',
    lph: 'LightProbeHelper',
    ralh: 'RectAreaLightHelper',
    f: 'Fog',
    aa: 'AnimationAction',
    anc: 'AnimationClip',
    am: 'AnimationMixer',
    aog: 'AnimationObjectGroup',
    au: 'AnimationUtils',
    a: 'Animation',
    anl: 'AnimationLoader',
  }
  const loaderArray: string[] = [
    'animationl',
    'AnimationLoader',
    'audiol',
    'AudioLoader',
    'bgl',
    'BufferGeometryLoader',
    'compressedtl',
    'CompressedTextureLoader',
    'ctl',
    'CubeTextureLoader',
    'dtl',
    'DataTextureLoader',
    'fl',
    'FileLoader',
    'il',
    'ImageLoader',
    'ibl',
    'ImageBitmapLoader',
    'ml',
    'MaterialLoader',
    'ol',
    'ObjectLoader',
    'tl',
    'TextureLoader',
  ]
  const cacheLoader = new Map()
  const gltfLoaderMap = new Map()
  const dracoLoaderMap = new Map()
  const animationArray: Mesh[] = []
  update()
  addEventListener(document, 'DOMContentLoaded', update)

  function destoryStop() {
    gui?.hide()
    stop?.()
    scene = null
    renderer.dispose()
    dom = null
    loaderArray.length = 0
    fnNameMap = null
    cacheLoader.clear()
    gltfLoaderMap.clear()
    dracoLoaderMap.clear()
    animationArray.length = 0
  }

  return {
    c,
    cf,
    track,
    setUV,
    animationArray,
    glTFLoader,
    draCOLoader,
    THREE,
    scene,
    renderer,
    dom,
    setRendererAttributes,
  }

  function update() {
    if (hasMounted)
      return
    if (isStr(container))
      container = document.querySelector(container as string) as HTMLElement || container
    if (!isMounted && isStr(container))
      return isMounted = true
    else if (!container)
      throw new Error(`${container} container is not found`)

    const { createCamera, createMesh, animate, mousemove, mousedown, mouseup, debug, alias, shadowType } = options
    if (debug && !gui)
      gui = new dat.GUI()
    else
      gui?.hide()
    if (alias) {
      Object.assign(fnNameMap!, alias)
      Object.keys(alias).forEach((key) => {
        if (!alias[key].includes('Loader') || loaderArray.includes(key))
          return
        loaderArray.push(key)
      })
    }
    scene!._add = function (...args: any[]) {
      scene!.add(...args)
      const result = args.map(arg => () => unmount(arg))
      return result.length === 1 ? result[0] : result
      function unmount(arg: Mesh) {
        const { material, geometry } = arg;
        (material as any).dispose()
        geometry.dispose()
        scene!.remove(arg)
      }
    }
    createMesh?.()
    const camera = createCamera?.()
    if (!camera)
      throw new Error('camera is not created')
    if (shadowType) {
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE[shadowType]
    }
    const animationOptions = {
      params: options.middleware?.({ OrbitControls: OrbitControls as unknown as OrbitControls, camera }),
      camera,
    }
    if (animate) {
      const clock = new THREE.Clock()
      stop = animationFrameWrapper((time: number) => renderer.render(scene!, animate(Object.assign(animationOptions, { elapsedTime: clock.getElapsedTime(), timestamp: time })) || camera), 0)
    }
    else { animationFrameWrapper(() => renderer.render(scene!, camera), 0, true) }

    (container as HTMLElement).appendChild(dom!)
    hasMounted = true
    dragEvent(dom!, {
      dragStart: mousedown,
      dragMove: mousemove,
      dragEnd: mouseup,
    })
    resize()
    addEventListener(window, 'resize', resize)
    useMutationObserver((container as HTMLElement)?.parentNode, (mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node === container)
            destoryStop()
        })
      })
    }, { childList: true })
    function resize() {
      const width = (container as HTMLElement).offsetWidth
      const height = (container as HTMLElement).offsetHeight
      camera.aspect = Math.min(width / height, 2)
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
  }
  function c(fnName: keyof FnNameMap | keyof T, ...args: any[]): any {
    const lowName = fnName.toLowerCase() as keyof FnNameMap
    const fnNameMapKey = fnNameMap![lowName] as keyof T
    const _class = THREE[fnNameMapKey || fnName]
    if (!_class)
      throw new Error(`${fnName} is not found, maybe you want to use ${Object.keys(fnNameMap!).filter(key => new RegExp(fnName.split('').reduce((result, key) => result += `${key}(\\w+)?`, '')).test(key)).reduce((result, key) => result += `\n ${key} : ${(fnNameMap as any)[key]}`, '')} `)

    if (loaderArray.includes(lowName)) {
      if (cacheLoader.has(lowName))
        return cacheLoader.get(lowName).load(...args)
      // @ts-expect-error three not export specific name
      const loader = new _class()
      cacheLoader.set(lowName, loader)
      return loader.load(...args)
    }
    // @ts-expect-error three not export specific name
    return new _class(...args)
  }
  function cf(url: string, text: string, options: TextGeometryParameters): Promise<TextGeometry> {
    if (!url.endsWith('.json'))
      throw new Error('You need to use typeface.json')
    return new Promise(resolve => new FontLoader().load(url, font => resolve(new TextGeometry(text, Object.assign(options, { font })))))
  }
  function track(...args: [target: Object, propName: string, min?: number, max?: number, step?: number]): dat.GUIController {
    if (!gui)
      throw new Error('gui is not created, please use debug option')
    const p = gui.domElement.parentNode!
    if (p?.childNodes.length > 1)
      p?.removeChild(p.childNodes[0])
    if (args[0] === 'color') {
      const target = args[1][args[2]!] as any
      return gui.addColor(args[1] as unknown as Record<string, any>, args[2] as unknown as string).onChange(() => target?.set?.(args[1][args[2]!]))
    }
    return gui.add(...args)
  }
  function setUV(target: Mesh, size = 2) {
    target.geometry.setAttribute('uv2', c('ba', target.geometry.attributes.uv.array, size))
  }
  function glTFLoader(url: string, dracoLoader?: DRACOLoader, callback?: (gltf: GLTFLoader) => void): Promise<GLTFLoader> {
    return new Promise((resolve) => {
      if (isFn(dracoLoader)) {
        callback = dracoLoader as unknown as (gltf: GLTFLoader) => void
        dracoLoader = undefined
      }
      let gltfLoader
      if (!gltfLoaderMap.get('gltf')) {
        gltfLoader = new GLTFLoader()
        gltfLoaderMap.set('gltf', gltfLoader)
      }
      else { gltfLoader = gltfLoaderMap.get('gltf') }
      if (dracoLoader)
        gltfLoader.setDRACOLoader(dracoLoader)
      gltfLoader.load(url, (gltf: GLTFLoader) => {
        resolve(gltf)
        callback?.(gltf)
      })
    })
  }
  function draCOLoader(decoderPath: string): DRACOLoader {
    let dracoLoader
    if (!dracoLoaderMap.get('draco')) {
      dracoLoader = new DRACOLoader()
      dracoLoaderMap.set('draco', dracoLoader)
    }
    else { dracoLoader = dracoLoaderMap.get('draco') }
    dracoLoader.setDecoderPath(decoderPath)
    return dracoLoader
  }
  function setRendererAttributes(options: Record<K, any>) {
    (Object.keys(options) as K[]).forEach((key: K) => {
      (renderer as any)[key] = options[key]
    })
  }
}

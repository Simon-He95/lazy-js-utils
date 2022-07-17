import * as THREE from 'three'
import { OrbitControls as Orbit } from 'three/examples/jsm/controls/OrbitControls'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { Mesh, Object3D, PerspectiveCamera } from 'three'
import * as dat from 'dat.gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import type { TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { addEventListener } from './addEventListener'
import { animationFrameWrapper } from './animationFrameWrapper'
import { dragEvent } from './dragEvent'
import { isStr } from './isStr'
type T = typeof THREE

interface AnimateOptions {
  c: (fnName: keyof T, ...args: any[]) => any
  animationArray: Mesh[]
  camera: PerspectiveCamera
  elapsedTime: number
  scene: Object3D
  dom: HTMLCanvasElement
  timestamp: number
}
interface MiddlewareOptions {
  c: (fnName: keyof T, ...args: any[]) => any
  animationArray: Mesh[]
  scene: Object3D
  OrbitControls: OrbitControls
  dom: HTMLCanvasElement
  camera: PerspectiveCamera
  renderer: THREE.WebGLRenderer
}
interface FnNameMap {
  cc: 'CubeCamera'
  v3: 'Vector3'
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
  planeg: 'PlaneGeometry'
  polyg: 'PolyhedronGeometry'
  rg: 'RingGeometry'
  sg: 'SphereGeometry'
  tetrag: 'TetrahedronGeometry'
  torusg: 'TorusGeometry'
  tkg: 'TorusKnotGeometry'
  tubeg: 'TubeGeometry'
  wfg: 'WireframeGeometry'
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
  axesh: 'AxesHelper'
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
  c: 'Cache'
  compressedtl: 'CompressedTextureLoader'
  cubetl: 'CubeTextureLoader'
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
  mpongm: 'MeshPhongMaterial'
  mphysicalm: 'MeshPhysicalMaterial'
  msm: 'MeshStandardMaterial'
  mtm: 'MeshToonMaterial'
  p: 'Points'
  pm: 'PointsMaterial'
  rm: 'RawShaderMaterial'
  shaderm: 'ShaderMaterial'
  shadowm: 'ShadowMaterial'
  spritem: 'SpriteMaterial'
  line: 'Line'
  lp: 'LineLoop'
  ls: 'LineSegments'
  f: 'Fog'
}
type ShadowType = 'BasicShadowMap' | 'PCFShadowMap' | 'PCFSoftShadowMap' | 'VSMShadowMap'
interface SThreeOptions extends Record<string, any> {
  createMesh: (options: {
    cf?: (url: string, text: string, options: TextGeometryParameters) => Promise<TextGeometry>
    animationArray?: Mesh[]
    track?: (...args: [target: Object, propName: string, min?: number, max?: number, step?: number]) => dat.GUIController
    c: (fnName: keyof FnNameMap | keyof T, ...args: any[]) => any
    scene?: Object3D
    THREE?: T
    setUV?: (target: Mesh, size?: number) => void
  }) => void
  createCamera: (c: (fnName: keyof FnNameMap | keyof T, ...args: any[]) => any, meshes: Mesh[], scene: Object3D) => PerspectiveCamera
  animate?: (animationOptions: AnimateOptions) => void | THREE.PerspectiveCamera
  middleware?: (middlewareOptions: MiddlewareOptions) => any
  mousemove?: (e: Event) => void
  mousedown?: (e: Event) => void
  mouseup?: (e: Event) => void
  debug?: boolean
  alias?: Record<string, string>
  shadowType?: ShadowType
}

interface Scene extends Object3D {
  _add: (...args: any[]) => void
}

export function sThree(container: HTMLElement | string, options: SThreeOptions) {
  if (isStr(container))
    container = document.querySelector(container as string) as HTMLElement || container
  if (isStr(container))
    throw new Error(`${container} container is not found`)
  const renderer = new THREE.WebGLRenderer()
  const scene = new THREE.Scene() as unknown as Scene
  const animationArray: Mesh[] = []
  const cacheLoader = new Map()
  const { createCamera, createMesh, animate, mousemove, mousedown, mouseup, debug, alias, shadowType } = options
  let gui: dat.GUI
  if (debug)
    gui = new dat.GUI()
  const fnNameMap = Object.assign({
    v3: 'Vector3',
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
    planeg: 'PlaneGeometry',
    polyg: 'PolyhedronGeometry',
    rg: 'RingGeometry',
    sg: 'SphereGeometry',
    tetrag: 'TetrahedronGeometry',
    torusg: 'TorusGeometry',
    tkg: 'TorusKnotGeometry',
    tubeg: 'TubeGeometry',
    wfg: 'WireframeGeometry',
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
    axesh: 'AxesHelper',
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
    c: 'Cache',
    compressedtl: 'CompressedTextureLoader',
    cubetl: 'CubeTextureLoader',
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
    mphongm: 'MeshPhongMaterial',
    mphysicalm: 'MeshPhysicalMaterial',
    msm: 'MeshStandardMaterial',
    mtm: 'MeshToonMaterial',
    p: 'Points',
    pm: 'PointsMaterial',
    rm: 'RawShaderMaterial',
    shaderm: 'ShaderMaterial',
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
  }, alias) as unknown as FnNameMap
  const loaderArray: string[] = [
    'animationl',
    'AnimationLoader',
    'audiol',
    'AudioLoader',
    'bgl',
    'BufferGeometryLoader',
    'compressedtl',
    'CompressedTextureLoader',
    'cubetl',
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
  const sceneAdd = scene.add
  scene._add = function (...args: any[]) {
    sceneAdd.apply(scene, args)
    const result = args.map(arg => () => unmount(arg))
    return result.length === 1 ? result[0] : result
    function unmount(arg: Mesh) {
      const { material, geometry } = arg;
      (material as any).dispose()
      geometry.dispose()
      scene.remove(arg)
    }
  }
  createMesh?.({
    c: c as unknown as any,
    animationArray,
    THREE,
    track,
    cf,
    scene,
    setUV,
  })
  const camera = createCamera?.(c, animationArray, scene)
  if (!camera)
    throw new Error('camera is not created')
  if (shadowType) {
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE[shadowType]
  }
  const dom = renderer.domElement
  const animationOptions = {
    params: options.middleware?.({ c, scene, OrbitControls: Orbit as unknown as OrbitControls, camera, dom, animationArray, renderer }),
    c,
    dom,
    scene,
    camera,
    animationArray,
  }
  if (animate) {
    const clock = new THREE.Clock()
    animationFrameWrapper((time: number) => renderer.render(scene, animate(Object.assign(animationOptions, { elapsedTime: clock.getElapsedTime(), timestamp: time })) || camera), 0)
  }
  else { animationFrameWrapper(() => renderer.render(scene, camera), 0, true) }

  (container as HTMLElement).appendChild(dom)

  dragEvent(dom, {
    dragStart: mousedown,
    dragMove: mousemove,
    dragEnd: mouseup,
  })

  resize()
  addEventListener(window, 'resize', resize)

  function resize() {
    const width = (container as HTMLElement).offsetWidth
    const height = (container as HTMLElement).offsetHeight
    camera.aspect = Math.min(width / height, 2)
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }
  function c(fnName: keyof FnNameMap | keyof T, ...args: any[]): any {
    const lowName = fnName.toLowerCase() as keyof FnNameMap
    const fnNameMapKey = fnNameMap[lowName] as keyof T
    const _class = THREE[fnNameMapKey || fnName]
    if (lowName)
      console.log(`${lowName}: ${fnNameMapKey}`)
    if (!_class)
      throw new Error(`${fnName} is not found`)
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
    if (args[0] === 'color') {
      return gui.addColor(args[1] as unknown as Record<string, any>, args[2] as unknown as string).onChange(() => {
        (args[1] as unknown as Record<string, any>)?.color?.set(args[1][args[2] as any])
      })
    }
    return gui.add(...args)
  }
  function setUV(target: Mesh, size = 2) {
    target.geometry.setAttribute('uv2', c('ba', target.geometry.attributes.uv.array, size))
  }
}

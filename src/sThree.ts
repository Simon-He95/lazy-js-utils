import * as THREE from 'three'
import { OrbitControls as Orbit } from 'three/examples/jsm/controls/OrbitControls'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { Mesh, Object3D, PerspectiveCamera } from 'three'
import * as dat from 'dat.gui'
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
  meshes: Mesh[]
  scene: Object3D
  dom: HTMLCanvasElement
  timestamp: number
}
interface MiddlewareOptions {
  c: (fnName: keyof T, ...args: any[]) => any
  meshes: Mesh[]
  animationArray: Mesh[]
  scene: Object3D
  OrbitControls: OrbitControls
  dom: HTMLCanvasElement
  camera: PerspectiveCamera
}
interface FnNameMap {
  cc: 'CubeCamera'
  v3: 'Vector3'
  oc: 'OrthographicCamera'
  pc: 'PerspectiveCamera'
  sc: 'StereoCamera'
  bg: 'BoxGeometry'
  buffera: 'BufferAttribute'
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
  fl: 'FileLoader'
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
  mphongm: 'MeshPhongMaterial'
  mphysicalm: 'MeshPhysicalMaterial'
  msm: 'MeshStandardMaterial'
  mtm: 'MeshToonMaterial'
  pm: 'PointsMaterial'
  rm: 'RawShaderMaterial'
  shaderm: 'ShaderMaterial'
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
}
interface SThreeOptions extends Record<string, any> {
  createMesh: (
    c?: (fnName: keyof FnNameMap | keyof T, ...args: any[]) => any,
    animationArray?: any,
    THREE?: T,
    track?: (...args: [target: Object, propName: string, min?: number, max?: number, step?: number]) => dat.GUIController
  ) => Mesh[]
  createCamera: (c: (fnName: keyof FnNameMap | keyof T, ...args: any[]) => any, meshes: Mesh[], scene: Object3D) => PerspectiveCamera
  animate?: (animationOptions: AnimateOptions) => void | THREE.PerspectiveCamera
  middleware?: (middlewareOptions: MiddlewareOptions) => any
  mousemove?: (e: Event) => void
  mousedown?: (e: Event) => void
  mouseup?: (e: Event) => void
  debug?: boolean
  alias?: Record<string, string>
}
export function sThree(container: HTMLElement | string, options: SThreeOptions) {
  if (isStr(container))
    container = document.querySelector(container as string) as HTMLElement || container
  if (isStr(container))
    throw new Error(`${container} container is not found`)
  const renderer = new THREE.WebGLRenderer()
  const scene = new THREE.Scene() as Object3D
  const animationArray: Mesh[] = []
  const cacheLoader = new Map()
  const { createCamera, createMesh, animate, mousemove, mousedown, mouseup, debug, alias } = options
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
    buffera: 'BufferAttribute',
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
    fl: 'FileLoader',
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
  }, alias) as FnNameMap
  const meshes: Mesh[] = createMesh?.(c, animationArray, THREE, track)
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
  scene.add(...meshes)
  const camera = createCamera?.(c, meshes, scene)
  if (!camera)
    throw new Error('camera is not created')
  const dom = renderer.domElement
  const animationOptions = {
    params: options.middleware?.({ c, meshes, scene, OrbitControls: Orbit as unknown as OrbitControls, camera, dom, animationArray }),
    c,
    dom,
    scene,
    meshes,
    camera,
    animationArray,
    elapsedTime: new THREE.Clock().getElapsedTime(),
  }
  if (animate)
    animationFrameWrapper((time: number) => renderer.render(scene, animate(Object.assign(animationOptions, { timestamp: time })) || camera), 0)
  else
    renderer.render(scene, camera);
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
  function track(...args: [target: Object, propName: string, min?: number, max?: number, step?: number]): dat.GUIController {
    if (!gui)
      throw new Error('gui is not created, please use debug option')
    if (args[0] === 'color') {
      return gui.addColor(args[2] as unknown as { color: string }, 'color').onChange(() => {
        (args[1] as unknown as { color: any }).color.set((args[2] as unknown as { color: string }).color)
      })
    }
    return gui.add(...args)
  }
}

<script setup lang="ts">
import { compressImage, dragEvent, fileSplice, sThree } from '../../src'

// import { lazyLoad } from "../../src";
// import { vFetch } from "../../src";
// const upload = ref(null)
// onMounted(() => {
//   upload.value.addEventListener('change', (e) => {
//     const _file = upload.value.files[0]
//     fileSplice(_file)
//   })
// })
// setTimeout(() => {
//   vFetch({
//     url: "test1",
//   }).then((res: any) => {
//     // console.log(res)
//     return res;
//   });
// }, 2000);
// onMounted(() => {
//   lazyLoad(document.querySelectorAll("img"));
//   lazyLoad("img[data-src]");
//   lazyLoad(".img-wrapper>img");
//   // document.querySelectorAll("img").forEach((img) => {
//   //   lazyLoad(img);
//   // });
// });
// sThree('#main', {
//   createCamera(THREE) {
//     const fov = 40
//     const aspect = 2 // the canvas default
//     const near = 0.1
//     const far = 1000
//     const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
//     camera.position.set(0, 50, 0)
//     camera.up.set(0, 0, 1)
//     camera.lookAt(0, 0, 0)
//     return camera
//   },
//   createTargets(THREE) {
//     const sphereGeometry = new THREE.SphereGeometry(1, 6, 6)
//     const solarSystem = new THREE.Object3D()
//     const sunMesh = makeSun(THREE, sphereGeometry)
//     const earthOrbit = new THREE.Object3D()
//     const earthMesh = makeEarth(THREE, sphereGeometry)
//     const moonMesh = makeMoon(THREE, sphereGeometry)
//     earthOrbit.position.x = 10
//     earthOrbit.add(earthMesh)
//     earthOrbit.add(moonMesh)
//     solarSystem.add(earthOrbit)
//     solarSystem.add(sunMesh)
//     return {
//       contents: [makeLight(THREE), solarSystem],
//       targets: [makeLight(THREE), solarSystem, earthOrbit, sunMesh, earthMesh, moonMesh],
//     }
//   },
//   middleware(THREE, targets) {
//     // targets.forEach((node) => {
//     //   const axes = new THREE.AxesHelper();
//     //   axes.material.depthTest = false;
//     //   axes.renderOrder = 1;
//     //   node.add(axes);
//     // });
//   },
//   animate(THREE, objects, time) {
//     time *= 0.001
//     objects.forEach((node) => {
//       node.rotation.y = time
//     })
//   },
// })

// function makeLight(THREE) {
//   const color = 0xFFFFFF
//   const intensity = 3
//   return new THREE.PointLight(color, intensity)
// }
// function makeEarth(THREE, sphereGeometry) {
//   const earthMaterial = new THREE.MeshPhongMaterial({
//     color: 0x2233FF,
//     emissive: 0x112244,
//   })
//   const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
//   return earthMesh
// }
// function makeSun(THREE, sphereGeometry) {
//   const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 })
//   const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
//   sunMesh.scale.set(5, 5, 5)
//   return sunMesh
// }
// function makeMoon(THREE, sphereGeometry) {
//   const moonMaterial = new THREE.MeshPhongMaterial({
//     color: 0x888888,
//     emissive: 0x222222,
//   })
//   const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
//   moonMesh.position.x = 2
//   moonMesh.scale.set(0.5, 0.5, 0.5)
//   return moonMesh
// }
</script>

<template>
  <main font-sans p=" y-10" text="center gray-700 dark:gray-200">
    <input ref="fileEl" type="file" @change="change">
    <div id="main" w-full h-200 ma inline-block bg-dark />
    <Footer />
  </main>
  <!-- <img src="temp" data-src="../public/favicon.svg" alt="" h-10 bg-red /> -->
  <!-- <img src="temp" alt="" h-10 bg-red /> -->
</template>

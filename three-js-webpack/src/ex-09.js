// // navigator.mediaDevices.getUserMedia 
// //  이게 지금 카메라를 받아오는 코드. 

// import * as THREE from 'three';
// // 사진 적용이 안되고 화면전환 안됨 주말간 수정할것!
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// let video;
// let videoStream;

// navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//     video = document.createElement('video');
//     video.srcObject = stream;
//     video.play();

//     const videoTexture = new THREE.VideoTexture(video);
//     const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
//     const videoGeometry = new THREE.PlaneGeometry(16, 9);
//     const toryTexture = new THREE.TextureLoader().load('./icons/1.jpg');
//     const toryMaterial = new THREE.MeshBasicMaterial({ map: toryTexture });
//     const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
//     scene.add(videoMesh);
//     toryMaterial.color.set(0xffffff);
//     const toryGeometry = new THREE.BoxGeometry(1, 1, 1);
//     const tory = new THREE.Mesh(toryGeometry, toryMaterial);
//     scene.add(tory);

//     camera.position.z = 5;

//     videoStream = stream;

//     const animate = () => {
//         if (video.readyState === video.HAVE_ENOUGH_DATA) {
//             videoTexture.needsUpdate = true;
//         }

//         renderer.render(scene, camera);
//         requestAnimationFrame(animate);
//     };

//     animate();
// }).catch((error) => {
//     console.error('Error accessing webcam:', error);
// });

// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

// let isCameraOn = false;

// document.getElementById('toggleCameraBtn').addEventListener('click', () => {
//     if (isCameraOn) {
//         stopVideo();
//     } else {
//         startVideo();
//     }

//     isCameraOn = !isCameraOn;
// });

// const startVideo = () => {
//     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//         video.srcObject = stream;
//         video.play();

//         const videoTexture = new THREE.VideoTexture(video);
//         scene.getObjectByName('videoMesh').material.map = videoTexture;

//         videoStream = stream;
//     }).catch((error) => {
//         console.error('Error accessing webcam:', error);
//     });
// };

// const stopVideo = () => {
//     // Add logic to stop the video stream if needed.
// };

// const animate = () => {
//     renderer.render(scene, camera);
// }

// (() => {
//     const videoElm = document.querySelector('#video');
//     const btnFront = document.querySelector('#btn-front');
//     const btnBack = document.querySelector('#btn-back');
  
//     const supports = navigator.mediaDevices.getSupportedConstraints();
//     if (!supports['facingMode']) {
//       alert('Browser Not supported!');
//       return;
//     }
  
//     let stream;
  
//     const capture = async facingMode => {
//       const options = {
//         audio: false,
//         video: {
//           facingMode,
//         },
//       };
  
//       try {
//         if (stream) {
//           const tracks = stream.getTracks();
//           tracks.forEach(track => track.stop());
//         }
//         stream = await navigator.mediaDevices.getUserMedia(options);
//       } catch (e) {
//         alert(e);
//         return;
//       }
//       videoElm.srcObject = null;
//       videoElm.srcObject = stream;
//       videoElm.play();
//     }
  
//     btnBack.addEventListener('click', () => {
//       capture('environment');
//     });
  
//     btnFront.addEventListener('click', () => {
//       capture('user');
//     });
//   })();



//   <!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//     <link rel="icon" href="static/favicon.ico" type="image/x-icon">
//     <link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css">
//     <title>Three.JS-Webpack Boilerplate</title>

//     <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>

//     <!-- three.js -->
//     <script src="https://unpkg.com/three@0.123.0/build/three.js"></script>
//     <script src="https://unpkg.com/three@0.123.0/examples/js/loaders/GLTFLoader.js"></script>


//   </head>
//   <body>
//     <di`v>
//     <canvas id="ex-03"></canvas>
//     <!-- 카메라 끄는 버튼 추가 -->
//     <!-- <button id="toggleCameraBtn" onclick="">Toggle Camera</button> -->

//     <a onclick="activateXR()" class="mdc-button mdc-button--raised mdc-button--accent">
//       Start augmented reality
//     </a>
//     <button id="btn-front">Front</button>
//     <button id="btn-back">Back</button>
//     <script src="public/bundle.js"></script>
//   </body>

// </div>
// </html>

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
    const videoTexture = new THREE.VideoTexture(video);
    const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
    const videoGeometry = new THREE.PlaneGeometry(16, 9);
// 아래처럼만 적으면 텍스처가 로딩된 후에 갱신이 되지 않음 , 갱신 할 수 있도록 추가코드 작성
    // const toryTexture = new THREE.TextureLoader().load('./icons/1.jpg',);
    const toryTexture = new THREE.TextureLoader().load('./icons/1.jpg',(params)=>{
        params.needsUpdate = true;
      });
      const toryMaterial = new THREE.MeshBasicMaterial({ map: toryTexture });
      const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
      scene.add(videoMesh);
      toryMaterial.color.set(0xffffff);
      const toryGeometry = new THREE.Geometry(1, 1, 1);
      const tory = new THREE.Mesh(toryGeometry, toryMaterial);
      scene.add(tory);
  
      camera.position.z = 5;
  
  
      videoStream = stream;
  
      const animate = () => {
  
  let isCameraOn = false;
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
};

const stopVideo = () => {
    if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach(track => track.stop());
    }
};
document.getElementById('btn-front').addEventListener('click', () => {
    stopVideo();
    startVideo();
});

document.getElementById('btn-back').addEventListener('click', () => {
    stopVideo();
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
        video.srcObject = stream;
        video.play();

        const videoTexture = new THREE.VideoTexture(video);
        scene.getObjectByName('videoMesh').material.map = videoTexture;

        videoStream = stream;
    }).catch((error) => {
        console.error('Error accessing webcam:', error);
    });
});

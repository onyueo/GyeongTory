import * as THREE from 'three';
// 사진 적용이 안되고 화면전환 안됨
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let video;
let videoStream;

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
    const videoGeometry = new THREE.PlaneGeometry(16, 9);
    const toryTexture = new THREE.TextureLoader().load('./icons/1.jpg');
    const toryMaterial = new THREE.MeshBasicMaterial({ map: toryTexture });
    const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
    scene.add(videoMesh);
    toryMaterial.color.set(0xffffff);
    const toryGeometry = new THREE.BoxGeometry(1, 1, 1);
    const tory = new THREE.Mesh(toryGeometry, toryMaterial);
    scene.add(tory);

    camera.position.z = 5;

    videoStream = stream;

    const animate = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            videoTexture.needsUpdate = true;
        }

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();
}).catch((error) => {
    console.error('Error accessing webcam:', error);
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let isCameraOn = false;

document.getElementById('toggleCameraBtn').addEventListener('click', () => {
    if (isCameraOn) {
        stopVideo();
    } else {
        startVideo();
    }

    isCameraOn = !isCameraOn;
});

const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();

        const videoTexture = new THREE.VideoTexture(video);
        scene.getObjectByName('videoMesh').material.map = videoTexture;

        videoStream = stream;
    }).catch((error) => {
        console.error('Error accessing webcam:', error);
    });
};

const stopVideo = () => {
    // Add logic to stop the video stream if needed.
};

const animate = () => {
    renderer.render(scene, camera);
    re
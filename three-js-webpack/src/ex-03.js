import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
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
    // 아래처럼만 적으면 텍스처가 로딩된 후에 갱신이 되지 않음 , 갱신 할 수 있도록 추가코드 작성
    // const toryTexture = new THREE.TextureLoader().load('./icons/1.jpg',);

    const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
    scene.add(videoMesh);

    let loader = new GLTFLoader();
    loader.load("../static/img/hmm/file.gltf", function (gltf) {

    scene.add(gltf.scene);


    animate();
}, undefined, function (error) {
    console.error('Error loading GLTF model:', error);
})

    camera.position.z = 3;


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

import * as THREE from 'three';

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

    const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
    scene.add(videoMesh);

    camera.position.z = 5;

    // 비디오 스트림을 저장합니다.
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

// 카메라 상태를 나타내는 변수
let isCameraOn = true;

// 버튼 클릭 이벤트 리스너
document.getElementById('toggleCameraBtn').addEventListener('click', () => {
    // 카메라 상태에 따라 토글
    if (isCameraOn) {
        stopVideo();
    } else {
        startVideo();
    }

    // 카메라 상태 업데이트
    isCameraOn = !isCameraOn;
});

// 비디오 중지 함수
const stopVideo = () => {
    if (video) {
        video.pause();
        video.src = '';
        video.srcObject = null;
    }

    if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach((track) => track.stop());
    }
};

// 비디오 시작 함수
const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();

        // 비디오 텍스처 업데이트
        const videoTexture = new THREE.VideoTexture(video);
        scene.getObjectByName('videoMesh').material.map = videoTexture;

        // 비디오 스트림 업데이트
        videoStream = stream;
    }).catch((error) => {
        console.error('Error accessing webcam:', error);
    });
};

const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();

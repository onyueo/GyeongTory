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
    const toryTexture = new THREE.TextureLoader().load('./icons/1.jpg',(params)=>{
      params.needsUpdate = true;
    });
    const toryMaterial = new THREE.MeshBasicMaterial({ map: toryTexture });
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

    animate() {
        // 비디오 텍스처 갱신
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.videoMesh.material.map.needsUpdate = true;
        }

        // 렌더링 및 애니메이션 재귀 호출
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }

    handleResize() {
        // 창 크기 조절 시 카메라 및 렌더러 업데이트
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    startVideo() {
        // 비디오 시작
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            this.video.srcObject = stream;
            this.video.play();

            const videoTexture = new THREE.VideoTexture(this.video);
            this.videoMesh.material.map = videoTexture;

            this.videoStream = stream;
        }).catch((error) => {
            console.error('웹캠 접근 중 오류:', error);
        });
    }

    switchCamera() {
        // 카메라 전환 (후면 카메라로 전환)
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
            this.video.srcObject = stream;
            this.video.play();

            const videoTexture = new THREE.VideoTexture(this.video);
            this.videoMesh.material.map = videoTexture;

            this.videoStream = stream;
        }).catch((error) => {
            console.error('웹캠 접근 중 오류:', error);
        });
    }
}
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Cs03 {

    constructor() {
        // Scene, Camera, Renderer 생성
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // 비디오 및 비디오 스트림 초기화
        this.video = document.createElement('video');
        this.videoStream = null;

        // 광원 및 비디오 텍스처 생성
        this.addLights();
        this.addVideoMesh();

        // GLTF 모델 로드
        this.loadGltfModel();

        // 카메라 초기 위치 설정
        this.camera.position.z = 7;

        // 창 크기 조절 이벤트 등록
        window.addEventListener('resize', this.handleResize.bind(this));

        // 비디오 제어 버튼 이벤트 등록
        document.getElementById('btn-front').addEventListener('click', this.startVideo.bind(this));
        document.getElementById('btn-back').addEventListener('click', this.switchCamera.bind(this));
    }

    addLights() {
        // 광원 추가
        this.light = new THREE.DirectionalLight(0xffffff, 1);
        this.light.position.set(1, 1, 1).normalize();
        this.scene.add(this.light);
    }

    addVideoMesh() {
        // 비디오 메쉬 생성
        const videoTexture = new THREE.VideoTexture(this.video);
        const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
        const videoGeometry = new THREE.PlaneGeometry(16, 9);

        this.videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
        this.scene.add(this.videoMesh);
    }

    loadGltfModel() {
        // GLTF 모델 로드
        let loader = new GLTFLoader();

        loader.load("../static/img/tory.gltf", (gltf) => {
            console.log('GLTF 모델이 성공적으로 로드되었습니다.', gltf);

            // 씬에 로드된 객체들 추가
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    this.scene.add(child);
                }
            });

            // 애니메이션 시작
            this.animate();
        }, undefined, (error) => {
            console.error('GLTF 모델 로딩 중 오류:', error);
        });
    }

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

// 클래스 인스턴스 생성
const cs03Instance = new Cs03();


import * as THREE from 'three';
import { Light } from 'three.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class cs-03 {
    
    construtor(){

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
            const light = new THREE.DirectionalLight(0xffffff,1);
            light.position.set(1,1,1).normalize();
            scene.add(light)
            const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
            scene.add(videoMesh);
        
            let loader = new GLTFLoader();
        
            loader.load("../static/img/tory.gltf", function (gltf) {
                console.log('GLTF 모델이 성공적으로 로드되었습니다.', gltf);
            
                // 직접 씬에 로드된 객체들을 추가
                gltf.scene.traverse(function (child) {
                    if (child.isMesh) {
                
                        scene.add(child);
                        
                    }
                });
            
                animate();
        }, undefined, function (error) {
            console.error('GLTF 모델 로딩 중 오류:', error);
        });
            
            camera.position.z = 7;
        
        
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
    }
}


import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function VideoPageWithToryGltf() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    container.style.background = 'transparent';

    // Scene 생성
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera 생성
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Renderer 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 빛 생성
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // GLTF 모델 로드
    const loader = new GLTFLoader();
    loader.load(
      'metarial/1234.gltf',
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    // 카메라 스트림 가져오기
    const constraints = {
      video: {
        facingMode: 'environment',
        frameRate: { max: 60 },
      },
      audio: false,
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        const texture = new THREE.VideoTexture(video);
        const geometry = new THREE.PlaneGeometry(9, 20);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
      })
      .catch(function (err) {
        console.error('카메라를 사용할 수 없습니다:', err);
      });

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 리사이즈 핸들러
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Clean-up 함수
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
}

export default VideoPageWithToryGltf;

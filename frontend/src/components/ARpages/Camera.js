import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';




export default function Camera() {
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const videoTextureRef = useRef(null);
    const videoMeshRef = useRef(null);
    const videoStreamRef = useRef(null);
    const [facingMode, setFacingMode] = useState('user');

    function toggleFacingMode(){
      setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
    }
    // 여기부터
    useEffect(() => {
        // 새로운 THREE.js 씬, 카메라 및 렌더러 생성
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const canvas = document.querySelector('#canvas');
        const renderer = new THREE.WebGLRenderer({canvas});
        renderer.setSize(window.innerWidth, window.innerHeight);
        // useRef를 사용하여 렌더러, 씬 및 카메라에 대한 참조 설정
        rendererRef.current = renderer;
        document.body.appendChild(renderer.domElement);
        sceneRef.current = scene;
        cameraRef.current = camera;

        let video;

        // 비디오 시작 함수
        const startVideo = () => {
          try {
            const constraints = {
                video: { facingMode },
                audio: false,
            };
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                video = document.createElement('video');
                video.srcObject = stream;
                video.play();

                const videoTexture = new THREE.VideoTexture(video);
                videoTextureRef.current = videoTexture;
                const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
                const videoGeometry = new THREE.PlaneGeometry(16, 9);
                const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
                scene.add(videoMesh);
                videoMeshRef.current = videoMesh;

                camera.position.z = 7;
                videoStreamRef.current = stream;

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
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
        };

        // 비디오 시작 함수 호출
        startVideo();

        // 창 크기 조절 이벤트 핸들러
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(10000,window.innerWidth * devicePixelRatio, window.innerHeight * devicePixelRatio);
        };

        // 창 크기 조절 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);

        // useEffect의 cleanup 함수
        return () => {
            // 이벤트 리스너 제거
            window.removeEventListener('resize', handleResize);
            // 비디오 스트림 정리
            const { current: videoStream } = videoStreamRef;
            if (videoStream) {
                const tracks = videoStream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [facingMode]); // facingMode 변수가 변경될 때마다 useEffect가 다시 실행됨
    // 요기까지 유즈 이펙트

    
    return (
      <>
      <canvas id='canvas' style={{ width: '100%', maxWidth: '100vw', height: '70%', transform: 'scaleX(-1)' }}>
     
      </canvas>
      <button color='primary' onClick={toggleFacingMode}>카메라 전환하기</button>
      <button>캡쳐하기</button>
      </>
    );
}

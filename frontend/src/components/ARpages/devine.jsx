import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import styled from "styled-components";
import html2canvas from "html2canvas";
import Capture from "./capturePage";
import "./camera.css";

export default function ArCamera(props) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const [capturedImageDataURL, setCapturedImageDataURL] = useState(null);
  const [captureState, setCaptureState] = useState(false);

  useEffect(() => {
    const container = canvasRef.current;

    // Scene 생성
    const scene = new THREE.Scene();

    // Camera 생성
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // OrbitControls 추가
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

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

    // 비디오 텍스처 생성
    navigator.mediaDevices.getUserMedia({ video: true })
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

  const handelCapture = () => {
    const canvas = canvasRef.current;
    html2canvas(canvas)
      .then((canvas) => {
        const imageDataURL = canvas.toDataURL();
        setCapturedImageDataURL(imageDataURL);
        setCaptureState(true);
      })
      .catch((error) => {
        console.error("Error capturing canvas:", error);
      });
  };

  const backMap = () => {
    navigate("/maps");
  };

  return (
    <div>
      {captureState === true ? (
        captureState && (
          <Capture
            url={capturedImageDataURL}
            state={state}
            address={state.address}
            cultural_heritage_id={state.no}
            captureState={captureState}
            setCaptureState={setCaptureState}
          />
        )
      ) : (
        <div>
          <div ref={canvasRef} id="canvas" style={{ position: "relative" }}>
            <button onClick={handelCapture}>캡쳐하기</button>
            <button style={{ marginBottom: "10px" }} onClick={backMap}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

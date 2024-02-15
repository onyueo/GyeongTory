import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import styled from "styled-components";
import html2canvas from "html2canvas";
import Capture from "./capturePage";

export default function Camera(props) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const rendererRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(
    new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
  );

  const videoTextureRef = useRef(null);
  const videoStreamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImageDataURL, setCapturedImageDataURL] = useState(null);
  const [captureState, setCaptureState] = useState(false);
  const gltfModelRef = useRef(null);
  const characterRef = useRef(null);

  const backMap = () => {
    navigate("/maps");
  };

  const stopVideo = () => {
    const { current: videoStream } = videoStreamRef;
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handelCapture = (e) => {
    const canvas = canvasRef.current;
    html2canvas(canvas)
      .then((canvas) => {
        const imageDataURL = canvas.toDataURL();
        setCapturedImageDataURL(imageDataURL);
        stopVideo();
        setCaptureState(true);
      })
      .catch((error) => {
        console.error("Error capturing canvas:", error);
      });
  };

  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;

    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    const canvas = document.querySelector("#canvas");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      preserveDrawingBuffer: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    const directionalLight = new THREE.DirectionalLight(0xff0000, 3);
    directionalLight.position.copy(camera.position);
    directionalLight.position.set(0, 10, 10);
    directionalLight.target.position.set(0, 1, 1);

    scene.add(ambientLight);
    scene.add(directionalLight);

    const loadGltfModel = () => {
      let loader = new GLTFLoader();
      loader.load(
        "character_model.gltf",
        (gltf) => {
          const character = gltf.scene;
          character.position.set(0, 0, 0);
          characterRef.current = character;
          scene.add(character);
        },
        undefined,
        (error) => {
          console.error("An error happened:", error);
        }
      );
    };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    let video;

    const startVideo = () => {
      try {
        const constraints = {
          video: {
            facingMode: "environment",
            frameRate: { max: 60 },
          },
          audio: false,
        };

        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            const videoTexture = new THREE.VideoTexture(video);
            videoTextureRef.current = videoTexture;
            const videoMaterial = new THREE.MeshBasicMaterial({
              map: videoTexture,
              depthTest: true,
              transparent: true,
            });

            const videoGeometry = new THREE.PlaneGeometry(9, 20);
            const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
            videoMesh.renderOrder = 0;
            videoMesh.position.z = -5;
            camera.add(videoMesh);
            scene.add(camera);

            videoStreamRef.current = stream;

            loadGltfModel();
            animate();
          })
          .catch((error) => {
            console.error("Error accessing webcam:", error);
          });
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const resizeCanvas = () => {
      const canvas = rendererRef.current.domElement;
      canvas.width = window.innerWidth;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      stopVideo();
      startVideo();
    };
  }, []);

  const handleTouch = (event) => {
    event.preventDefault();

    const touchX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    const touchY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(touchX, touchY);
    raycaster.setFromCamera(mouse, cameraRef.current);
    const intersects = raycaster.intersectObjects([sceneRef.current], true);

    if (intersects.length > 0) {
      const position = intersects[0].point;
      mountCharacter(position);
    }
  };

  const mountCharacter = (position) => {
    if (characterRef.current) {
      characterRef.current.position.copy(position);
    }
  };

  return (
    <div onTouchStart={handleTouch}>
      {captureState === true ? (
        <Capture
          url={capturedImageDataURL}
          state={state}
          address={state.address}
          cultural_heritage_id={state.no}
          captureState={captureState}
          setCaptureState={setCaptureState}
        />
      ) : (
        <div>
          <BodyMake>
            <canvas
              ref={canvasRef}
              id="canvas"
              style={{ width: "100%", height: "100%" }}
            ></canvas>
          </BodyMake>
          <div>
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

const BodyMake = styled.div`
  width: 100%;
  height: 90vh;
  overflow: auto;
`;

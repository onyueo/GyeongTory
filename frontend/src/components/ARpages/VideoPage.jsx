import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const VideoPage = () => {
    const videoRef = useRef(null);
    const rendererRef = useRef(null);
    const containerRef = useRef(null); // 비디오를 감싸는 div 요소에 대한 ref
    const initializedRef = useRef(false); // 컴포넌트가 초기화되었는지 여부를 나타내는 ref

    useEffect(() => {
        if (!initializedRef.current) {
            initializedRef.current = true; // 초기화 상태로 표시

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
                    videoRef.current = video;

                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    const renderer = new THREE.WebGLRenderer({
                        preserveDrawingBuffer: true,
                        antialias: true,
                    });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    rendererRef.current = renderer;
                    containerRef.current.appendChild(renderer.domElement);

                    const texture = new THREE.VideoTexture(video);
                    const geometry = new THREE.PlaneGeometry(9, 20);
                    const material = new THREE.MeshBasicMaterial({ map: texture });

                    const plane = new THREE.Mesh(geometry, material);
                    scene.add(plane);

                    camera.position.z = 5;

                    const animate = function () {
                        requestAnimationFrame(animate);
                        renderer.render(scene, camera);
                    };

                    animate();

                    // 애니메이션 루프를 중지합니다.
                    return () => {
                        cancelAnimationFrame(animate);
                    };
                })
                .catch(function (err) {
                    console.error('카메라를 사용할 수 없습니다:', err);
                });
        }
    }, []);

    return (
        <div ref={containerRef} style={{  width: "100%", height: "100%" }}>
            {/* 비디오를 감싸는 div 요소 */}
            <video ref={videoRef} autoPlay muted />
        </div>
    );
};

export default VideoPage;

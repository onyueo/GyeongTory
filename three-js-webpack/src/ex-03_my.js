import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
   // 장면 받아오기
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x776777)

   // 카메라 
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth, window.innerHeight, 0.1, 1000)
  camera.position.z = 5;    
  // html에서 id설정해서 생기는 요소를 적용하고 싶을때
  // 캔버스를 가지고 와서 적용한다
  const canvas = document.querySelector('#ex-03');
  const renderer = new THREE.WebGLRenderer({canvas});

  //renderer               
//   const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  
  //매쉬설정하기 => 너비 높이 깊이
  const geometry = new THREE.BoxGeometry(1,1,1);
  // 매쉬 설정하기 ==> 재질의 색
  const material = new THREE.MeshStandardMaterial({
    color:0x999999
  })
  // 큐브의 geo,mat을 적용
  const cube = new THREE.Mesh(geometry, material)
  // scene에 cube적용   
  scene.add(cube);
  // 현재 장면은 어떤 태그에 노출시킬 것인지 작성
  // 직접적으로 바디에다가 캔버스를 바로 적용
  // html에서 바로 적용하는것으로 적을 수도 있다.
//   document.body.appendChild(renderer.domElement);



  // 장면과 카메라를 가져온다. 애니메이션을 넣을 것이면 변환
//   renderer.render(scene,camera)
// requestAnimationFrame(render) 
// 이렇게 해서 render될 것에 어떤 것들이 들어가는지 확인
function render(time) {
    // 시간을 초로 바꾸어주는것
    time *= 0.001;

    // cube.rotation.x = time;
    // cube.rotation.y = time;
    renderer.render(scene, camera);
    // 애니메이션 프레임을 렌더에서 응답받은것으로 작성한다.
    requestAnimationFrame(render)
}
requestAnimationFrame(render)
  
  
  } else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}

import * as THREE from 'three'
import { WEBGL } from './webgl'
import {OrbitControls} form

if (WEBGL.isWebGLAvailable()) {
    // 장면 받아오기
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x776777)

    // 카메라 width와 height가 /로 표현안되고 , 또는 .으로 표기되면 전체 화면에 변화를 줌
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    camera.position.z = 5;    
    // html에서 id설정해서 생기는 요소를 적용하고 싶을때
    // 캔버스를 가지고 와서 적용한다
    const canvas = document.querySelector('#ex-03');
    const renderer = new THREE.WebGLRenderer({ 
    // canvas === document.body.appendChild(renderer.domElement)
    // 도형 주변에 블러처럼 흐물흐물하게 나타나면 해당 항목을 잡아줌
    antialias:true,
    // 투명도 조절
    alpha: true,
    });

    //renderer               
    //   const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 이걸 추가해주면 renderer에 canvas를 추가해주지 않아도 됨
    document.body.appendChild(renderer.domElement);

    //빛 설정
    //색상와 세기 설정
    const pointLight = new THREE.PointLight(0xffffff,1)
    
    //xyz의 값을 적어 넣음
    pointLight.position.set(0,2,12)
    //빛으로 만들어 둔 것을 적용
    scene.add(pointLight)
    console.log("왜 안나와 이거")
    //텍스쳐 추가
    const textureLoader = new THREE.TextureLoader()
    const textureBaseColor = textureLoader.load('../static/img/Material_2072.jpg')
    const textureNormalMap = textureLoader.load('../static/img/Material_2088.jpg')
    const textureHeightMap = textureLoader.load('../static/img/Material_2087.jpg')
    const textureRoughnessMap = textureLoader.load('../static/img/Material_2074.jpg')

    //매쉬설정하기 => 너비 높이 깊이 도형
    const geometry = new THREE.SphereGeometry(1,1,1);
    // 매쉬 설정하기 ==> 재질의 색 , 질감
    // basic = 빛의 변화에 영향을 받지 않는다. 색상만 적용받음
    // standard = 물리적 기반을 가지고 개발 pbr 많은 3d엔진에서 이용
    // Physical ==> 스탠다드보다 조금 더 고품질을 보여줌 clearcoat,clearcoatroughness에서 차이보여줌 
    // depth ==> 재질의 깊이감을 알 수 있도록 알려주는것
    // lambert / phong ==> 빛을 기준으로 표현
    // lambert 빛을 반사하는 재질에서 3d표현 입체감이 좀떨어짐
    // phong 반짝이는 금속재질을 나타내는데 더 유리 입체감이 좋음
    
    const material = new THREE.MeshStandardMaterial({
        map: textureBaseColor
    
        // color:0x999999, 
    // 메탈재질 표현 0~1까지 재질 표현 적용하면 시커매짐
    // metalness : 0.3,
    // 흰색을 기준으로 투명도 설정 (흰색에도 안보일거냐 보일거냐)
    // transparent : true,
    // 그냥 전체 투명도 transparent 를 적용해주지 않으면 하얗게 남음 0~1까지 보면 될듯?
    // opacity: 0.5,
    // 거친 정도 이것도 0~1사이로 보면될듯?
    // roughness :1
    //윤곽선 확인 boolean
    // wireframe : true,
    // 광택 조절
    // shininess:60
    

    })
    const material1 = new THREE.MeshStandardMaterial({
    color:0x999999, 
    // 메탈재질 표현 0~1까지 재질 표현 적용하면 시커매짐
    // metalness : 0.3,
    // 흰색을 기준으로 투명도 설정 (흰색에도 안보일거냐 보일거냐)
    // transparent : true,
    // 그냥 전체 투명도 transparent 를 적용해주지 않으면 하얗게 남음 0~1까지 보면 될듯?
    // opacity: 0.5,
    // 거친 정도 이것도 0~1사이로 보면될듯?
    // roughness :1
    //윤곽선 확인 boolean
    // wireframe : true,
    // 광택 조절
    // shininess:60
    

    })
    const material2 = new THREE.MeshStandardMaterial({
    color:0x999999, 
    // 메탈재질 표현 0~1까지 재질 표현 적용하면 시커매짐
    // metalness : 0.3,
    // 흰색을 기준으로 투명도 설정 (흰색에도 안보일거냐 보일거냐)
    // transparent : true,
    // 그냥 전체 투명도 transparent 를 적용해주지 않으면 하얗게 남음 0~1까지 보면 될듯?
    // opacity: 0.5,
    // 거친 정도 이것도 0~1사이로 보면될듯?
    // roughness :1
    //윤곽선 확인 boolean
    // wireframe : true,
    // 광택 조절
    // shininess:60
    })
    // 큐브의 geo,mat을 적용 
    const cube = new THREE.Mesh(geometry, material)
    const cube1 = new THREE.Mesh(geometry, material1)
    const cube2 = new THREE.Mesh(geometry, material2)
    // 위치를 변경할 수 있도록 지정
    cube.position.x = -1.8;
    cube1.position.x = 0;
    cube2.position.x = 2;
    // scene에 cube적용   
    scene.add(cube);
    scene.add(cube1);
    scene.add(cube2);

    // 현재 장면은 어떤 태그에 노출시킬 것인지 작성
    // 직접적으로 바디에다가 캔버스를 바로 적용
    // html에서 바로 적용하는것으로 적을 수도 있다.
      // document.body.appendChild(renderer.domElement);



    // 장면과 카메라를 가져온다. 애니메이션을 넣을 것이면 변환
    //   renderer.render(scene,camera)
    // requestAnimationFrame(render) 
    // 이렇게 해서 render될 것에 어떤 것들이 들어가는지 확인
    function render(time) {
    // 시간을 초로 바꾸어주는것
    time *= 0.001;

    cube.rotation.x = time;
    cube.rotation.y = time;
    cube1.rotation.x = time;
    cube1.rotation.y = time;
    cube2.rotation.x = time;
    cube2.rotation.y = time;
    renderer.render(scene, camera);
    // 애니메이션 프레임을 렌더에서 응답받은것으로 작성한다.
    requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
    // 반응형 처리
    function onWindowResize(){
        // 전체 화면의 비율의 변화가 달라지면 => 종횡비를 잡아주는것이라 줄어들었을때 납작해지지 않도록
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        // 이거는 왜 ,로 나누는지 알아보자?!?
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    // 화면의 변화가 감지되면 사이즈를 다시 잡아라 윈도우 리사이즈 실행
    window.addEventListener('resize',onWindowResize)

} else {
    var warning = WEBGL.getWebGLErrorMessage()
    document.body.appendChild(warning)
}

import React, { useState, useEffect } from 'react'
import styled from "styled-components";


const InfoTop = () => {
  // 초기 온도 상태 설정
  const [temp, setTemp] = useState(null)
  const [icon, setIcon] = useState(null)



  const getCurrentLocation=()=>{
    navigator.geolocation.watchPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      console.log(lat, lon, '현재위치')
      getWeatherByCurrentLocation(lat, lon)

    })
  }

  useEffect(()=>{
    getCurrentLocation()

  }, [temp])


  const getWeatherByCurrentLocation= async (lat, lon)=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=101694a50d5922c2274bdd9982d0eacd&units=metric`
    let response = await fetch(url)
    let data = await response.json();
    console.log(data);

    // 온도 정보 업데이트
    setTemp(data.main.temp)
    setIcon(data.weather[0].icon)

  }


  // 주소 바꾸기 XX
  // const alterAddress = (lat, lon) => {
  // const API_KEY = '84ce352790538c53c7ae183bc7b7d56f'
  // if (lat && lon) {
  //     axios.get(
  //         `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lat}&y=${lon}`,
  //         { headers: { Authorization: `KakaoAK ${API_KEY}`} }
  //     ).then((result) => {
  //       console.log(result, '주소!')
        
  //       //법정동 기준으로 동단위의 값을 가져온다
  //       // let location = result.documents[0].region_3depth_name;
  //     })
  //   }
  // }
  

  return (
    <div>
      <Info>

          <img src={`https://openweathermap.com/img/w/${icon}.png`} alt="" />
          <div>{ temp }</div>
          <div>00동</div>
         
      
      </Info>

    </div>
  )
}

export default InfoTop

/* <ToggleSwitch
  checked={isActive} // isToggleOn 상태를 확인하여 토글 상태를 설정
  onChange={() => setIsActive(!isActive)} // 토글 버튼 클릭 시 상태 변경
  onColor="#ED6A2C" // 토글 활성화 배경색
  offColor="#A1A1A1"   // 토글 비활성화 배경색
  handleDiameter={22} // 핸들 지름 설정
  activeBoxShadow="0 0 2px 3px #ED6A2C" // 토글 활성화 박스 쉐도우
  boxShadow="0 0 2px 3px #A1A1A1" // 토글 비활성화 박스 쉐도우
  className="custom-switch" // 커스텀 클래스 추가
/> */


const Info = styled.div`

  background-color: wheat;

`
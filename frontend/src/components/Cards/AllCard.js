import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Detail from "./Detail";
import { db } from "../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px 0vh;
  transform-style: preserve-3d;
  height: 100%;
  position: relative;
  transition: all 0.1s;
`;
const Container = styled.div`
  width: 170px;
  height: 250px;
  border-radius: 20px;
  margin: 0 auto;
  transition: all 0.1s;
  position: relative;
  transform: ${(props) => props.$rotation};
`;
const Overlay = styled.div`
  position: absolute;
  width: 175px;
  height: 250px;
  border-radius: 20px;
  margin: 0 auto;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 219, 112, 0.8) 45%,
    rgba(132, 50, 255, 0.6) 50%,
    transparent 54%
  );
  filter: ${(props) => props.$filter};
  mix-blend-mode: color-dodge;
  background-size: 150% 150%;
  background-position: ${(props) => props.$position};
  transition: all 0.1s;
`;

const CardImg = styled.div`
  width: 170px;
  height: 250px;
  border-radius: 20px;
  margin: 0 auto;

  -webkit-box-shadow: inset 0px 0px 0px 3px #9daf89;
  -moz-box-shadow: inset 0px 0px 0px 3px #9daf89;
  box-shadow: inset 0px 0px 0px 3px #9daf89;
  background-image: ${(props) => `url("${props.$url}")`};
  background-color: ${(props) => props.$black};
  background-blend-mode: multiply;
  background-size: cover;
  margin: 0 auto;
`;

const AllCard = () => {
  const [states, setStates] = useState([]); // 카드 CSS 적용 모두 담기
  const [card, setCard] = useState([]); // 카드 CSS 빼고 나머지(주소, 설명, 이미지주소, 등급 등등)
  // const [getdetail, setDetail] = useState(false); // 카드 상세 설명 팝업 컴포넌트 열고 닫기
  // const [cardId, setCardId] = useState(); // 카드 상세를 열기 위한 카드 id 값 넘기기
  let navigate = useNavigate();

  useEffect(() => {
    console.log(db); // firebase 연결 테스트
    getCards();
  }, []);

  const getCards = async () => {
    try {
      const res = await axios.post("/v1/card/list", {
        user_email: "test@test.com",
      });
      console.log(res);
      const data = await res.data.data_body;
      const currnet = data.length;
      let setting = Array(currnet).fill({
        rotation: "perspective(350px) rotateY(0deg) rotateX(0deg)",
        position: "50%",
        filter: "opacity(0)",
      }); // CSS 적용
      setCard(data);
      console.log(card);

      // Firebase Img 불러오기
      // const promises = res.data.data_body.card_list.map(async (card, index) => {
      //   const storage = getStorage();
      //   const imageUrl = await getDownloadURL(ref(storage, card.img));
      //   // console.log(imageUrl);
      //   cardImgs[index] = imageUrl;
      //   des[index] = card.description;
      //   // console.log(cardImgs[index], cardImgs);
      // });
      // await Promise.all(promises);

      setStates((pre) => {
        return setting;
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const handleMouseMove = (index, e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const rotateY = (-1 / 5) * x + 20;
    const rotateX = (4 / 30) * y - 20;

    const newState = {
      rotation: `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      position: `${x / 5 + y / 5}%`,
      filter: `opacity(${x / 200}) brightness(1.2)`,
    };

    setStates((pre) => {
      const newStates = [...pre];
      newStates[index] = newState;
      return newStates;
    });
  };
  const handleTouchMove = (index, e) => {
    const x = e.changedTouches[0].pageX;
    const y = e.changedTouches[0].pageY;

    const rotateY = (-1 / 5) * x + 20;
    const rotateX = (4 / 30) * y - 20;

    const newState = {
      rotation: `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      position: `${x / 5 + y / 5}%`,
      filter: `opacity(${x / 200}) brightness(1.2)`,
    };

    setStates((pre) => {
      const newStates = [...pre];
      newStates[index] = newState;
      return newStates;
    });
  };
  const handleMouseOut = (index) => {
    setStates((pre) => {
      const newStates = [...pre];
      newStates[index] = {
        rotation: "perspective(350px) rotateY(0deg) rotateX(0deg)",
        position: "50%",
        filter: "opacity(0)",
      };
      return newStates;
    });
  };
  const handleTouchOut = (index) => {
    setStates((pre) => {
      const newStates = [...pre];
      newStates[index] = {
        rotation: "perspective(350px) rotateY(0deg) rotateX(0deg)",
        position: "50%",
        filter: "opacity(0)",
      };
      return newStates;
    });
  };
  const handleDetail = (e) => {
    const id = e.target.id;
    console.log(id);
    // setCardId(id);
    // setDetail(true);
    navigate("/detail", { state: card[id] });
  };
  return (
    <>
      <div>
        {/* {getdetail && <Detail setDetail={setDetail} card={card[cardId]} />} */}
        <CardGrid>
          {states &&
            states.map((state, index) =>
              card[index].have ? (
                <Container
                  key={index}
                  $rotation={state.rotation}
                  onMouseMove={(e) => handleMouseMove(index, e)}
                  onTouchMove={(e) => handleTouchMove(index, e)}
                  onMouseOut={() => handleMouseOut(index)}
                  onTouchEnd={() => handleTouchOut(index)}
                >
                  <Overlay
                    id={index}
                    onClick={handleDetail}
                    $position={state.position}
                    $filter={state.filter}
                  />
                  <CardImg $url={card[index].image} />
                </Container>
              ) : (
                <Container key={index} $rotation={state.rotation}>
                  <Overlay
                    id={index}
                    $position={state.position}
                    $filter={state.filter}
                  />
                  <CardImg
                    $url={card[index].image}
                    $black={"rgba(0, 0, 0, 0.7)"}
                  />
                </Container>
              )
            )}
        </CardGrid>
      </div>
    </>
  );
};

export default AllCard;

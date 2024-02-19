import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: #dfe7da;
`;
const CardSelect = (props) => {
  const user = JSON.parse(localStorage.getItem("user")); // user 정보

  const [holdingList, setHoldingList] = useState([]); // 사용자 보유 카드 리스트
  const [getselectCard, setSelectCard] = useState(null); // 선택 카드 번호
  const [nextState, setNextState] = useState(false);

  useEffect(() => {
    console.log(props.ws);
    props.ws.emit("send_location", {
      lng: 123,
      lat: 35,
      nickname: user.nickname,
      user_id: user.id,
    });
    getHoldingList();
  }, []);

  const sendQuestion = async () => {
    const res = await axios.post("/v1/question/list", {
      card_list: [11, 12, 13, 14],
    });
    console.log(res);
  };
  // 사용자 보유 카드 리스트
  const getHoldingList = async () => {
    try {
      const res = await axios.get("/v1/card/holding_list");
      console.log(res);
      if (res.data.data_body.holding_cards.length < 3) {
        alert("문화재 카드를 3장 이상 수집해주세요.");
        // navigate("/maps");
      } else {
        setHoldingList(res.data.data_body.holding_cards);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 500) {
        // await useStore.getState().updateToken();
        getHoldingList();
      }
    }
  };
  const handleNext = () => {
    if (
      getselectCard === "" ||
      getselectCard === null ||
      getselectCard === undefined
    ) {
      alert("제출 카드를 선택해주세요.");
    } else {
      console.log(getselectCard);
      setNextState(true);
    }
  };
  return (
    <Frame>
      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>문화재명</th>
            <th>속성</th>
            <th>등급</th>
            <th>보유개수</th>
          </tr>
        </thead>
        <tbody>
          {holdingList.map((data) => (
            <tr key={data.card_number}>
              <td>
                <input
                  onClick={() => setSelectCard(data.card_number)}
                  type="radio"
                  checked={getselectCard === data.card_number}
                />
              </td>
              <td>{data.cultural_heritage_name}</td>
              <td>{data.field}</td>
              <td>{data.grade}</td>
              <td>{data.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleNext}>완료</button>
    </Frame>
  );
};

export default CardSelect;

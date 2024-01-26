import styled from "styled-components";
import Header from "../components/Cards/Header";
import Search from "../components/Cards/Search";
import Card from "../components/Cards/Card";
import { useNavigate } from "react-router-dom";
// import MobileDiv from "../components/common/MobileDiv";

// let Mobile = styled.div`
//   max-width: 400px;
//   margin-left: auto;
//   margin-right: auto;
//   background-color: #f2f2f2;
// `;

const Frame = styled.div`
display: inline-flex;
flex-direction: column;
align-items: center;
/* gap: 1.25rem; */
/* margin: 2.75rem 0.78rem -23rem 0.78rem; */
`;

const Cards = () => {
  let navigate = useNavigate();
  return (
    <>
      {/* <MobileDiv> */}
      <Frame>
        <Header />
        {/* search 활성화 시 검색 페이지로 이동해야함 */}
        <div onClick={()=>{ navigate('/search') }}>
          <Search />
        </div>
        <Card />
      </Frame>
      {/* </MobileDiv> */}
    </>
  );
};

export default Cards;

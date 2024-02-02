import React, { useState } from "react";
import styled, { css } from "styled-components";

import ButtonFull from "../components/ButtonFull";
import ButtonBlank from "../components/ButtonBlank";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const goSignUp = () => {
    navigate("/signup");
  };
  const goMain = () => {
    navigate("/maps");
  };
  const goLogin = async () => {
    if (
      userInput.email === "" ||
      userInput.email === undefined ||
      userInput.password === "" ||
      userInput.password === undefined
    ) {
      alert("다시 입력해주세요.");
    } else {
      // console.log(userInput);
      try {
        const res = await axios.post("/v1/auth/login", userInput);
        const status = res.data.data_header.result_code;
        if (status === "204 NO_CONTENT") {
          navigate("/maps");
        }
      } catch (e) {
        const status = e.response.status;
        if (status === 401) {
          alert(e.response.data.data_header.result_message);
        }
        console.log(e);
      }
    }
  };
  return (
    <Main>
      {/* <h1>TEST</h1> */}

      <Body>
        <h2>로그인</h2>
        <ButtonBlank
          color="#E4E7EC"
          activecolor="#BCBCBD"
          placeholder="이메일"
          onChange={(e) => {
            let email = e.target.value;
            setUserInput({
              email: email,
              password: userInput.password,
            });
          }}
        ></ButtonBlank>

        <ButtonBlank
          color="#E4E7EC"
          activecolor="#BCBCBD"
          placeholder="비밀번호"
          type="password"
          onChange={(e) => {
            let password = e.target.value;
            setUserInput({
              email: userInput.email,
              password: password,
            });
          }}
        ></ButtonBlank>

        <ButtonFull color="#888870" activecolor="#999966" onClick={goLogin}>
          로그인하기
        </ButtonFull>

        <ButtonFull color="#712E1E" activecolor="#A94C36" onClick={goMain}>
          게스트로 입장하기
        </ButtonFull>

        <div></div>
        <p>
          아직 회원이 아니신가요? <a onClick={goSignUp}>회원가입</a>
        </p>
      </Body>
    </Main>
  );
};

export default Login;

const Main = styled.div`
  background-color: beige;
  height: 100vh;
`;

const Body = styled.div`
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;

  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%);

  border-radius: 50px 50px 0px 0px;
  background-color: white;

  /* 경계 테스트 */
  /* border: 1px solid black; */
`;

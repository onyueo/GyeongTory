import React, { useState } from "react";
import styled, { css } from "styled-components";

import ButtonFull from "../components/ButtonFull";
import ButtonBlank from "../components/ButtonBlank";
import Header from "./../components/Profiles/Header";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  const [checkPw, setCheckPw] = useState("");
  const navigate = useNavigate();

  const goSignIn = () => {
    navigate("/");
  };

  const goSignUp = async () => {
    if (
      userInput.email === "" ||
      userInput.email === undefined ||
      userInput.password === "" ||
      userInput.password === undefined ||
      userInput.nickname === "" ||
      userInput.nickname === undefined ||
      checkPw === "" ||
      checkPw === undefined ||
      checkPw !== userInput.password
    ) {
      alert("다시 입력해주세요.");
    } else {
      //   console.log(userInput);
      try {
        const res = await axios.post("/v1/user/regist", userInput);
        console.log(res);
        const status = res.data.data_header.result_code;
        if (status === "204 NO_CONTENT") {
          alert("회원가입이 정상 등록 됐습니다. 로그인 해주세요.");
          navigate("/login");
        }
      } catch (e) {
        const status = e.response.data.data_header;
        if (status.result_code === "ALREADY_IN_EMAIL") {
          alert(status.result_message);
        } else if (status === "") {
          alert("");
        }
      }
    }
  };

  return (
    <div>
      <Header> </Header>

      <h1>회원가입</h1>

      <InputText>이메일</InputText>
      <ButtonBlank
        color="#722D1E"
        activecolor="#A94C36"
        borderwidth="2"
        // placeholder='ssafy@gmail.com'
        onChange={(e) => {
          let email = e.target.value;
          setUserInput({
            email: email,
            password: userInput.password,
            nickname: userInput.nickname,
          });
        }}
      ></ButtonBlank>

      <InputText>닉네임</InputText>
      <ButtonBlank
        color="#722D1E"
        activecolor="#A94C36"
        borderwidth="2"
        // placeholder="오뉴오뉴"
        onChange={(e) => {
          let nickname = e.target.value;
          setUserInput({
            email: userInput.email,
            password: userInput.password,
            nickname: nickname,
          });
        }}
      ></ButtonBlank>

      <InputText>비밀번호</InputText>
      <ButtonBlank
        color="#722D1E"
        activecolor="#A94C36"
        borderwidth="2"
        // placeholder="*********"
        type="password"
        onChange={(e) => {
          let password = e.target.value;
          setUserInput({
            email: userInput.email,
            password: password,
            nickname: userInput.nickname,
          });
        }}
      ></ButtonBlank>

      <InputText>비밀번호 확인</InputText>
      <ButtonBlank
        color="#722D1E"
        activecolor="#A94C36"
        borderwidth="2"
        // placeholder="*********"
        type="password"
        onChange={(e) => {
          let pw = e.target.value;
          setCheckPw(pw);
        }}
      ></ButtonBlank>
      {userInput.password !== checkPw ? (
        <div>비밀번호를 다시 확인해주세요.</div>
      ) : userInput.password !== "" ? (
        <div>Check!</div>
      ) : null}

      <SignupBtn>
        <ButtonFull color="#722D1E" activecolor="#A94C36" onClick={goSignUp}>
          회원가입
        </ButtonFull>
        <p>
          이미 계정이 있으신가요? <a onClick={goSignIn}>로그인</a>
        </p>
      </SignupBtn>
    </div>
  );
};

export default Signup;

const InputText = styled.div`
  max-width: 400px;
  margin: 1.5rem 0rem 0rem 3rem;
  font-weight: bold;

  text-align: left;
`;

const SignupBtn = styled.div`
  margin-top: 5rem;
`;

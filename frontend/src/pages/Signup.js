import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import ButtonFull from '../components/Styles/ButtonFull';
import ButtonBlank from '../components/Styles/ButtonBlank';
import Header from './../components/Profiles/Header';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return email
          .toLowerCase()
          .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
      };
    
    const validateNickname = (nickname) => {
      return nickname
          .toLowerCase()
          .match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/)
      }

    const validatePwd = (password) => {
        return password
            .toLowerCase()
            .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
        }


    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const [emailMsg, setEmailMsg] = useState("");
    const [nicknameMsg, setNicknameMsg] = useState("")
    const [pwdMsg, setPwdMsg] = useState('');
    const [confirmPwdMsg, setConfirmPwdMsg]= useState("")

    const isEmailValid = validateEmail(email);
    const isNicknameValid = validateNickname(nickname);
    const isPwdValid = validatePwd(password);
    const isConfirmPwd = password === confirmPwd;



    const goSignUp = () => {
        navigate('/')
    }

    

    //이메일 
  const onChangeEmail = (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

    if (!validateEmail(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.")
    } else {
        setEmailMsg("올바른 이메일 형식입니다.")
      }
    }

    //닉네임
    const onChangeNickname = useCallback((e) => {
        const currNickname = e.target.value;
        setNickname(currNickname);
  
        if (!validateNickname(currNickname)) {
          setNicknameMsg("1글자 이상 9글자 미만으로 입력해주세요.")
        } else {
          setNicknameMsg("올바른 닉네임 형식입니다.")
        }
      }, []);

    //비밀번호
    const onChangePwd = useCallback((e) =>{
      const currPwd = e.target.value;
      setPassword(currPwd);

      if (!validatePwd(currPwd)) {
        setPwdMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.")
      } else {
        setPwdMsg("안전한 비밀번호입니다.")
      }
    }, [])

    //비밀번호 확인
    const onChangeConfirmPwd = useCallback((e) => {
      const currConfirmPwd = e.target.value;
      setConfirmPwd(currConfirmPwd);

      if (currConfirmPwd !== password) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.")
      } else {
        setConfirmPwdMsg("비밀번호가 일치합니다.")
      }
    }, [password])

    
    
    const [api, setApi] = useState();	

    useEffect(() => {
      getAPI();
    }, []);
      
    const getAPI = async () => {
      try {
        // res에는 결과 값이 담겨옴
        const res = await axios.post("v1/user/regist", {
            "email": "",
            "password": "",
            "nickname": "",
        });
        console.log('eeeee', res.data)
  
        setApi(res)
  
      } catch (e) {
        console.log(e.response);
      }
    };

    
    return (
        <div>
            <Header >  </Header>

            <h1>회원가입</h1>
            
            <InputText>이메일</InputText>
            <ButtonBlank 
            onChange={onChangeEmail}
            color='#722D1E'
            activecolor='#A94C36'
            borderwidth='2'
            placeholder='ssafy@gmail.com'
            type='email'
            ></ButtonBlank>
            <div>{emailMsg && <small>{emailMsg}</small>}</div>
            
            <InputText>닉네임</InputText>
            <ButtonBlank 
            onChange={onChangeNickname}
            color='#722D1E'
            activecolor='#A94C36'
            borderwidth='2'
            placeholder='nickname'
            ></ButtonBlank>
            <div>{nicknameMsg && <small>{nicknameMsg}</small>}</div>

            <InputText>비밀번호</InputText>
            <ButtonBlank 
            onChange={onChangePwd}
            color='#722D1E'
            activecolor='#A94C36'
            borderwidth='2'
            placeholder='비밀번호'
            type='password'
            ></ButtonBlank>
            <div>{pwdMsg && <small>{pwdMsg}</small>}</div>

            <InputText>비밀번호 확인</InputText>
            <ButtonBlank 
            onChange={onChangeConfirmPwd}
            color='#722D1E'
            activecolor='#A94C36'
            borderwidth='2'
            placeholder='비밀번호 확인'
            type='password'
            ></ButtonBlank>
            <div>{confirmPwdMsg && <small>{confirmPwdMsg}</small>}</div>

            <SignupBtn>
                <ButtonFull
                color="#722D1E"
                activecolor="#A94C36"
                >회원가입</ButtonFull>
                <p>이미 계정이 있으신가요? <a onClick={goSignUp}>로그인</a></p>
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
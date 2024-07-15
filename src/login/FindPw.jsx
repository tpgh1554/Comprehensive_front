import {
  Container,
  Box,
  Contents,
  InputContainer,
  EmailBox,
  ShortInput,
  CheckBtn,
  SubmitBtn,
} from "./style/SignFormStyle";
import logo from "../image/apueda-logo-black.png";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import React, { useState } from "react";
const Logo = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
`;
const FindPw = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false); // 이메일 형식 검사
  const [codeValid, setCodeValid] = useState(false); // 인증번호 검사

  const [emailError, setEmailError] = useState("");
  // 이메일 코드 작성
  const [inputCode, setInputCode] = useState(null);
  const [sentCode, setSentCode] = useState(null);

  // 입력 인증 번호 확인
  const onChangeEmailCode = (e) => {
    const currCode = Number(e.target.value);
    setInputCode(currCode);
  };

  // 이메일 인증
  const authorizeMail = async () => {
    try {
      const rsp = await AxiosApi.mail(email);
      console.log("전송 인증번호:", rsp.data);
      setEmailValid("");
      setEmailError("");
      if (rsp.data !== null) {
        setSentCode(rsp.data);
        console.log("인증 코드 설정 후:", sentCode); // sentCode 값이 올바르게 설정되었는지 확인
      }
    } catch (error) {
      console.error("이메일 요청 오류:", error);
      // 오류 처리 로직 추가
    }
  };

  // 이메일 인증번호 입력
  const checkCode = () => {
    if (inputCode === null) {
      console.log("코드를 입력해 주세요");
      return; // inputCode가 null일 경우 함수 실행 중지
    }
    if (inputCode === sentCode) {
      setCodeValid(true);
      console.log("인증되었습니다");
    } else {
      setCodeValid(false);
      console.log("다시 입력해 주세요");
    }
  };
  // 이메일 인풋
  const onChangeEmail = (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // 이메일 입력 정규식
    if (!emailRegex.test(e.target.value)) {
      // 입력값이 정규식에 만족하지 않으면~
      setEmailError("이메일 형식이 올바르지 않습니다.");
      setEmailValid(false);
    } else {
      setEmailError("올바른 이메일 형식입니다.");
      setEmailValid(true);
    }
  };

  return (
    <Container>
      <Box>
        <Contents>
          <Logo />
          <h2>비밀번호 찾기</h2>
          <InputContainer>
            <EmailBox>
              <ShortInput
                placeholder="이메일"
                value={email}
                onChange={onChangeEmail}
              />
              <CheckBtn onClick={authorizeMail} disabled={!emailValid}>
                인증
              </CheckBtn>
              <span id="hint">
                {email.length > 0 && (
                  <p className={emailValid ? "success" : "error"}>
                    {emailError}
                  </p>
                )}
              </span>
            </EmailBox>
            <EmailBox>
              <ShortInput
                placeholder="인증번호"
                value={inputCode}
                onChange={onChangeEmailCode}
              />
              <CheckBtn onClick={checkCode} disabled={codeValid}>
                확인
              </CheckBtn>
            </EmailBox>
          </InputContainer>
          <SubmitBtn>찾기</SubmitBtn>
        </Contents>
      </Box>
    </Container>
  );
};
export default FindPw;

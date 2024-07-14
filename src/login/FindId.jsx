import {
    Container,
    Box,
    Contents,
    InputContainer,
    LongInput,
    SubmitBtn,
  } from "./style/SignFormStyle";
import logo from "../image/apueda-logo-black.png";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Logo = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
`;
const FindId = () => {
    const [formattedIdentityNumber, setFormattedIdentityNumber] = useState("");
    const [name, setName] = useState("");
    const [identityNumber, setIdentityNumber] = useState("");
    const [identifyNumberValid, setIdentifyNumberValid] = useState(false); // 주민번호 숫자 다 입력했는지 확인
  
    const onChangeName = (e) => {
        setName(e.target.value);
      };
    const onChangeIdentityNumber = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 입력받기
        if (value.length > 7) {
          value = value.slice(0, 7); // 최대 7자리까지만 입력받기
        }
    
        // 하이픈 포맷팅 적용
        let formattedValue = value;
        if (value.length > 6) {
          formattedValue = value.slice(0, 6) + "-" + value.slice(6);
        }
    
        setIdentityNumber(value); // 숫자만 입력된 값을 설정
        setFormattedIdentityNumber(formattedValue); // 하이픈 포맷이 적용된 값을 설정
    
        // 유효성 검사
        setIdentifyNumberValid(value.length >= 7);
        console.log(identifyNumberValid);
      };

 return (
    <Container>
        <Box>
            <Contents>
                <Logo/>
                <h2>아이디 찾기</h2>
                <InputContainer>
                <LongInput placeholder="이름" value={name}
              onChange={onChangeName}/>
                <LongInput placeholder="주민번호(앞 6자리, 뒤 1자리)"value={formattedIdentityNumber}
              onChange={onChangeIdentityNumber}/>
                </InputContainer>
                <SubmitBtn>찾기
                </SubmitBtn>
            </Contents>
        </Box>
    </Container>
 );
}
export default FindId;
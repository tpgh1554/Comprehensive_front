import styled from "styled-components";
import logo from "../image/apueda-logo-black.png";
import AxiosApi from "../api/AxiosApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & input {
    border-radius: 8px;
    color: #ffffff;
  }
  & button {
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: #c72519; /* hover 시 배경색 변경 */
    }
    &:active {
      background-color: #87160e; /* 클릭 시 배경색 변경 */
    }
  }
`;
const Box = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #ff5353;
  background: rgba(249, 47, 35, 0.7);
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
`;
const Contents = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;
const Logo = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 10px;
`;
const LoginTxt = styled.div`
  width: 40%;
  height: auto;
  text-align: left;
  margin-bottom: -20px;
`;

const InputBox = styled.input`
  display: flex;
  flex-direction: column;
  border: none;
  background-color: rgba(0, 0, 0, 0.8);
  width: 40%;
  height: 40px;
  padding-left: 10px;
  box-sizing: border-box;
`;
const ButtonBox = styled.div`
  display: flex;
  width: 40%;
  justify-content: right;
`;
const FindBtn = styled.button`
  border: 0;
  background: none;
  display: flex;
`;
const SummitBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 10px;
`;
const LoginBtn = styled.button`
  border: 0;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
`;
const SignUpBtn = styled.button`
  border: 0;
  height: 40px;
  background-color: #ff5353;
  color: #ffffff;
  border: 2px solid black;
`;
const ThirdLoginBtn = styled.button`
  border: 0;
  height: 40px;
  background-color: #ffffde;
`;
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accToken, setAccToken] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const rsp = await AxiosApi.login(email, password);
      localStorage.setItem("email", email); // 삭제 예정
      setAccToken(rsp.data.accessToken);
      localStorage.setItem("accessToken", rsp.data.accessToken);
      console.log(accToken);
      navigate("/apueda");
    } catch (e) {
      console.log(e);
    }
  };
  const handleSignup = () => {
    navigate("/apueda/signup");
  };

  return (
    <Container>
      <Box>
        <Contents>
          <Logo />
          <InputContainer>
            <LoginTxt>
              <h2>로그인</h2>
            </LoginTxt>
            <InputBox
              placeholder="이메일(example@naver.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBox
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonBox>
              <FindBtn>아이디찾기</FindBtn>
              <span> / </span>
              <FindBtn>비밀번호찾기</FindBtn>
            </ButtonBox>
          </InputContainer>
          <SummitBtnBox>
            <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
            <SignUpBtn onClick={handleSignup}>회원가입</SignUpBtn>
            <ThirdLoginBtn>간편로그인</ThirdLoginBtn>
          </SummitBtnBox>
        </Contents>
      </Box>
    </Container>
  );
};
export default LoginPage;

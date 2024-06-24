import React from "react";
import styled from "styled-components";
import GlobalStyle from "../font/GlobalStyle";
import { Link } from "react-router-dom";
import { useState } from "react";
import Myprofile from "./Myprofile";

const Container = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  background-color: white;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 700;
  color: black;
  margin-bottom: 50px;
  @media (max-width: 700px) {
    font-size: 30px;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  justify-content: center;
  transition: all 0.2s ease-in;

  @media (max-width: 500px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;
  }
`;

const Button = styled.button`
  background-color: #ff5353;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 20px 80px;
  font-size: 20px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  text-decoration: none; //하이퍼링크 밑줄 때문에
  &:hover {
    background-color: #ff5353;
    transition: all 0.2s ease-in;
    color: white;
    background-color: black;
  }
  @media (max-width: 500px) {
    border-radius: 20px;
    padding: 15px 60px;
    font-size: 15px;
  }
`;

const MypageMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Container>
        <Title>마이페이지</Title>
        <ButtonContainer>
          <Button as={Link} to="/apueda/mypage/editinfo">
            회원 정보 수정
          </Button>

          <Button
            onClick={() => {
              openModal();
            }}
          >
            나의 프로필
          </Button>
          <Button as={Link} to="/apueda/mypage/mypj">
            나의 프로젝트
          </Button>
          <Button>나의 오픈 채팅방</Button>
          <Button as={Link} to="/apueda/mypage/mywrite">
            내가 쓴 글
          </Button>
          <Button>친구</Button>
        </ButtonContainer>
      </Container>

      {isModalOpen && <Myprofile closeModal={closeModal} />}
    </>
  );
};

export default MypageMain;

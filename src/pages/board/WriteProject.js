import React, { useState } from "react";
import BoardLayout from "../../components/BoardLayout";
import { HeadContainer } from "../../style/SelectBoardStyle";
import styled from "styled-components";
import {
  Title,
  InputButtonSection,
  Button,
  Bottom,
  ConfirmButton,
  Content,
} from "../../style/WriteStyle";
import WriteProjectModal from "./Modal";
const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Top = styled.div`
  color: #ffffff;
  align-content: center;
  font-size: 1.5rem;
  bottom: 1rem;
    position: relative;
}
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const WriteProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("open!");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BoardLayout>
      <Container>
        <HeadContainer style={{ justifyContent: "center" }}>
          <Top>글쓰기</Top>
        </HeadContainer>
        <ContentContainer>
          <Title
            placeholder="글 제목을 입력해주세요(100자 이내)"
            maxLength={100}
          />
          <InputButtonSection>
            <Button
              onClick={() => {
                openModal();
              }}
            >
              스킬
            </Button>
            <Button>인원</Button>
            <Button>기간</Button>
            <Button>이미지</Button>
            <Button>모임 장소</Button>
          </InputButtonSection>
          <Content
            placeholder="내용을 입력해주세요(10,000자 이내)"
            cols={100}
            rows={80}
            maxLength={10000}
          />
          <Bottom>
            <ConfirmButton>등록</ConfirmButton>
            <ConfirmButton>취소</ConfirmButton>
          </Bottom>
        </ContentContainer>
      </Container>
      {isModalOpen && <WriteProjectModal closeModal={closeModal} />}
    </BoardLayout>
  );
};

export default WriteProject;

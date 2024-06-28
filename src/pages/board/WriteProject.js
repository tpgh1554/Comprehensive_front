import React from "react";
import BoardLayout from "../../components/BoardLayout";
import { HeadContainer } from "../../style/SelectBoardStyle";
import styled from "styled-components";
import {
  Title,
  InputButtonSection,
  Button,
  Bottom,
  Confirm,
  Cancel,
  Content,
} from "../../style/WriteStyle";
const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 30px;
`;

const Top = styled.div`
  color: #ffffff;
  align-content: center;
  font-size: 1.5rem;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const WriteProject = () => {
  return (
    <BoardLayout>
      <Container>
        <HeadContainer style={{ justifyContent: "center" }}>
          <Top>글쓰기</Top>
        </HeadContainer>
        <ContentContainer>
          <Title placeholder="글 제목을 입력해주세요" />
          <InputButtonSection>
            <Button>스킬</Button>
            <Button>인원</Button>
            <Button>기간</Button>
          </InputButtonSection>
          <Bottom>
            <Confirm value="등록" />
            <Cancel value="취소" />
          </Bottom>
          <Content value="내용" />
        </ContentContainer>
      </Container>
    </BoardLayout>
  );
};

export default WriteProject;

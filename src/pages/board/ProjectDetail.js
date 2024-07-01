import { useEffect } from "react";
import BoardLayout from "../../components/BoardLayout";
import AxiosApi from "../../api/AxiosApi";
import {
  Container,
  Top,
  ContentContainer,
  Button,
} from "../../style/WriteStyle";
import { HeadContainer } from "../../style/SelectBoardStyle";
import {
  Head,
  UpHead,
  UnderHead,
  Body,
  Footer,
  ReplyContainer,
  InputContainer,
  UpInert,
  UnderInert,
  ReplyListContainer,
  PageNum,
} from "../../style/ProjectDetailStyle";
import styled from "styled-components";
const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  height: 60px;
  padding: 12px;
  background-color: red;
`;
const ProjectTime = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 20%;
  height: 60px;
  padding: 12px;
  background-color: blue;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  background-color: green;
  height: 60px;
  padding: 12px;
`;
const Recruit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 50%;
  background-color: #fac1f5;
  height: 60px;
  padding: 12px;
`;
const ProfileImg = styled.div`
  width: auto;
  height: auto;
`;

const RegDate = styled.div``;

const RecruitMemNum = styled.div``;

const Content = styled.div`
  padding: 16px;
`;

const Skills = styled.div`
  border: solid #b9b9b9;
  border-width: 0 0 1px;
`;

const ListBtt = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const Input = styled.div`
  width: 80%;
  height: auto;
  margin-left: 10px;
`;

const ConfirmReply = styled.div``;

const NickName = styled.div`
  /* Add your styles here */
`;
const ReplyList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 16px;
`;
const ReplyContent = styled.div`
  width: 60%;
`;
const ProjectDetail = () => {
  useEffect(() => {
    const projectDetail = async (id) => {
      try {
        const rsp = await AxiosApi.getProjectDetal(id);
        console.log(rsp.data);
        // setBoardList(rsp.data); // 필터링된 데이터를 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };
    projectDetail();
  }, []);
  return (
    <BoardLayout>
      <Container>
        <HeadContainer style={{ justifyContent: "center" }}>
          <Top>프로젝트</Top>
        </HeadContainer>
        <ContentContainer style={{ padding: "32px", height: "auto" }}>
          <Head>
            <UpHead>
              <Title>title ex</Title>
              <ProjectTime>모집 마감 ~6/30</ProjectTime>
            </UpHead>
            <UnderHead>
              <Profile>
                <ProfileImg>이미지</ProfileImg>
                <NickName>닉네임</NickName>
              </Profile>
              <Recruit>
                <RegDate>2024-06-18</RegDate>
                <RecruitMemNum>1명/10명</RecruitMemNum>
              </Recruit>
            </UnderHead>
          </Head>
          <Body>
            <Content>
              코딩 테스트를 함께 공부합시다 (코딩 테스트 책 저자와 함께)
              <br />
              안녕하세요, 코딩에 관심 있는 여러분!
              <br />
              코딩 테스트 준비는 막막하고 혼자 하기는 어렵죠? 그렇다면 저자와
              함께하는 특별한 스터디 그룹에 참여하세요!
              <br />
              📚 코딩 테스트 책 저자와 함께 공부하세요!
              <br />
              코딩 테스트 책 저자와 함께 실력을 쌓고 자유롭게 질문할 수 있는
              오픈 채팅방이 열렸습니다. 이 기회를 통해 코딩 실력을 한 단계
              끌어올리세요.
              <br />
              💡 오픈 채팅방에서 얻을 수 있는 것들:
              <br />
              직접 피드백: 코딩 테스트 책 저자가 직접 질문에 답변해드립니다.
              <br />
              실전 문제 풀이: 다양한 코딩 테스트 문제를 함께 풀며 실력을
              향상시킵니다.
              <br />
              스터디 자료 제공: 다양한 자료와 유용한 팁을 제공합니다.
              <br />
              동기부여: 동료 학생들과 서로 격려하며 동기부여를 얻습니다.
              <br />
              🚀 이런 분들께 추천합니다:
              <br />
              처음으로 코딩 테스트를 준비하는 분<br />
              문제 해결에 어려움을 겪고 있는 분<br />
              실력을 더 향상시키고 싶은 분<br />
              🎉 지금 바로 참여하세요!
              <br />
              링크: [오픈 채팅방 참여 링크]
              <br />
              함께 공부하며 코딩 실력을 키워봅시다! 여러분의 참여를 기다리고
              있습니다.
              <br />
            </Content>
          </Body>
          <Footer>
            <Skills>스킬,스킬,스킬,스킬,스킬</Skills>
            <ListBtt>
              <Button>목록</Button>
            </ListBtt>
          </Footer>
          <ReplyContainer>
            <InputContainer>
              <UpInert>
                <ProfileImg>이미지</ProfileImg>
                <NickName>닉네임</NickName>
                <Input>input 창</Input>
              </UpInert>
              <UnderInert>
                <ConfirmReply>
                  <Button>등록</Button>
                </ConfirmReply>
              </UnderInert>
            </InputContainer>
            <ReplyListContainer>
              <ReplyList>
                {/* 프로필 묶고 ,댓글내용 또 포함해서 묶고 -> 피그마처럼(유튭, okky 참고) */}
                <ProfileImg>이미지</ProfileImg>
                <NickName>닉네임</NickName>
                <ReplyContent>댓글 내용</ReplyContent>
                <RegDate>8일전</RegDate>
              </ReplyList>
            </ReplyListContainer>
            <PageNum></PageNum>
          </ReplyContainer>
        </ContentContainer>
      </Container>
    </BoardLayout>
  );
};
export default ProjectDetail;

import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 80%;
  height: 60px;
  padding: 16px;
  font-size: 2rem;
  font-weight: bold;
`;
const ProjectTime = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  width: 20%;
  height: 60px;
  padding: 12px;
  font-size: 12px;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 60px;
  padding: 12px;
  & img {
    width: 35px;
    height: 35px;
    border-radius: 40px;
    object-fit: cover;
  }
`;
const Recruit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  width: 50%;
  height: 60px;
  padding: 12px;
`;
const ProfileImg = styled.div`
  width: auto;
  padding: 8px;
  height: auto;
`;

const RegDate = styled.div`
  padding: 4px;
`;

const RecruitMemNum = styled.div`
  padding: 4px;
`;

const Content = styled.div`
  padding: 16px;
`;

const Skills = styled.div`
  display: flex;
  border: solid #b9b9b9;
  border-width: 0 0 1px;
  padding: 12px;
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
  padding: 8px;
`;
const ReplyList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 16px;
`;
const ReplyContent = styled.div`
  width: 78%;
  padding: 8px;
`;
const ProjectDetail = () => {
  const { projectId } = useParams();
  const [projectContent, setProjectContent] = useState("");
  // 년월일 표기로 바꾸기
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear().toString().slice(2);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month.toString()}월 ${day.toString()}일`;
  };
  // 플젝 상세 정보 가져오기
  useEffect(() => {
    const projectDetail = async (id) => {
      console.log(projectId, " 플젝 아이디 값 넘기기 ");
      try {
        const response = await AxiosApi.getProjectDetal(id);
        console.log(response.data);
        const formattedData = {
          ...response.data,
          regDate: formatDate(response.data.regDate),
          projectTime: formatDate(response.data.projectTime),
        };
        setProjectContent(formattedData);
        // setBoardList(rsp.data); // 필터링된 데이터를 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };
    projectDetail(projectId);
  }, [projectId]);

  return (
    <BoardLayout>
      <Container>
        <HeadContainer style={{ justifyContent: "center" }}>
          <Top>프로젝트</Top>
        </HeadContainer>
        <ContentContainer style={{ padding: "32px", height: "auto" }}>
          {projectContent && (
            <Head>
              <UpHead>
                <Title>{projectContent.projectTitle}</Title>
                <ProjectTime>~ {projectContent.projectTime}까지</ProjectTime>
              </UpHead>
              <UnderHead>
                <Profile>
                  <img src={projectContent.profileImg}></img>
                  <NickName>{projectContent.nickName}</NickName>
                </Profile>
                <Recruit>
                  {/* <RegDate>{projectContent.regDate}</RegDate> */}
                  <RecruitMemNum>
                    모집 인원 : {projectContent.recruitNum}명
                  </RecruitMemNum>
                </Recruit>
              </UnderHead>
            </Head>
          )}
          {projectContent && (
            <Body>
              <Content>{projectContent.projectContent}</Content>
            </Body>
          )}
          {projectContent && (
            <Footer>
              <Skills>
                {projectContent.skillName &&
                  projectContent.skillName.map((skills, index) => (
                    <Button key={index}>{skills.skillName}</Button>
                  ))}
              </Skills>
              <ListBtt>
                <Button>목록</Button>
              </ListBtt>
            </Footer>
          )}
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
            <PageNum>1 2 3 ... 11</PageNum>
          </ReplyContainer>
        </ContentContainer>
      </Container>
    </BoardLayout>
  );
};
export default ProjectDetail;

import { useEffect } from "react";
import BoardLayout from "../../components/BoardLayout";
import AxiosApi from "../../api/AxiosApi";
import { Container, Top, ContentContainer } from "../../style/WriteStyle";
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
const Title = styled.div``;
const ProjectTime = styled.div``;
const ProfileImg = styled.div`
  /* Add your styles here */
`;

const RegDate = styled.div`
  /* Add your styles here */
`;

const RecruitMemNum = styled.div`
  /* Add your styles here */
`;

const Content = styled.div`
  /* Add your styles here */
`;

const Skills = styled.div`
  /* Add your styles here */
`;

const ListBtt = styled.div`
  /* Add your styles here */
`;

const Input = styled.div`
  /* Add your styles here */
`;

const ConfirmReply = styled.div`
  /* Add your styles here */
`;

const NickName = styled.div`
  /* Add your styles here */
`;
const ReplyContent = styled.div`
  /* Add your styles here */
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
        <ContentContainer>
          <Head>
            <UpHead>
              <Title></Title>
              <ProjectTime></ProjectTime>
            </UpHead>
            <UnderHead>
              <ProfileImg></ProfileImg>
              <RegDate></RegDate>
              <RecruitMemNum></RecruitMemNum>
            </UnderHead>
          </Head>
          <Body>
            <Content></Content>
            <Skills></Skills>
            <ListBtt></ListBtt>
          </Body>
          <Footer></Footer>
        </ContentContainer>
        <ReplyContainer>
          <InputContainer>
            <UpInert>
              <ProfileImg></ProfileImg>
              <Input></Input>
            </UpInert>
            <UnderInert>
              <ConfirmReply></ConfirmReply>
            </UnderInert>
          </InputContainer>
          <ReplyListContainer>
            <ProfileImg></ProfileImg>
            <NickName></NickName>
            <ReplyContent></ReplyContent>
            <RegDate></RegDate>
          </ReplyListContainer>
          <PageNum></PageNum>
        </ReplyContainer>
      </Container>
    </BoardLayout>
  );
};
export default ProjectDetail;

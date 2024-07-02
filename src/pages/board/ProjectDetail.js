import { useEffect, useRef, useState } from "react";
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
import defaultImage from "../../image/person-icon2.png";
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
  padding: 8px;

  & img {
    width: 35px;
    height: 35px;
    border-radius: 40px;
    object-fit: cover;
  }
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

const Input = styled.textarea`
  width: 70%;
  height: auto;
  margin-left: 10px;
  resize: none;
  background-color: #fbfcfc;
  border: 0.5px solid #d0d3d7;
  border-radius: 6px;
  overflow: hidden;
  font-size: 1rem;
  z-index: 2;
  &:focus {
    border: 0.8px solid #000;
    outline: none; /* 추가: 기본 포커스 아웃라인 제거 */
  }
`;

const ConfirmReply = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
`;

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
  const [imageUrl, setImageUrl] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [replyContent, setReplyContent] = useState(null);
  const id = localStorage.getItem("email");
  useEffect(() => {
    const fetchUserInfo = async (email) => {
      try {
        const rsp = await AxiosApi.getUserInfo(email);
        setUserInfo(rsp.data);
        console.log("rsp.data", rsp.data.nickname);

        if (rsp.data && rsp.data.profileImgPath) {
          setImageUrl(rsp.data.profileImgPath);
        } else {
          setImageUrl(defaultImage);
        }
      } catch (e) {
        console.log(e);
        setImageUrl(defaultImage);
      }
    };
    console.log("userInfo", userInfo);
    fetchUserInfo(id);
  }, []);
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
  const textareaRef = useRef(null);
  // 댓글창 자동으로 늘어나게하기...
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이를 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 따라 높이 조절
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이를 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 따라 높이 조절
    }
  };

  const sendReply = () => {
    const postReply = async () => {
      try {
        // Construct the postData with the room ID obtained from createRoomResponse

        console.log("reply ", replyContent);

        const response = await AxiosApi.postReply(replyContent, projectId);
        console.log("response ", replyContent);
        if (response.data) {
          alert("댓글 등록 성공!!!!!!!!!!!!");
        } else {
          throw new Error("댓글 등록이 실패했습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("댓글 등록 실패ㅠㅠㅠㅠㅠㅠㅠㅠㅠ");
      }
    };
    postReply();
  };
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
                  <ProfileImg>
                    <img src={projectContent.profileImg}></img>
                  </ProfileImg>

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
                    <Button
                      key={index}
                      style={{ width: "auto", padding: "0 10px" }}
                    >
                      {skills.skillName}
                    </Button>
                  ))}
              </Skills>
              <ListBtt>
                <Button>목록</Button>
              </ListBtt>
            </Footer>
          )}
          <ReplyContainer>
            <InputContainer>
              {userInfo && (
                <UpInert>
                  <Profile style={{ width: "20%" }}>
                    <ProfileImg>
                      <img src={imageUrl}></img>
                    </ProfileImg>
                    <NickName>{userInfo.nickname}</NickName>
                  </Profile>
                  <Input
                    ref={textareaRef}
                    placeholder="클린한 댓글을 입력해주세요(500자)"
                    onInput={handleInput}
                    rows={1}
                    maxLength={500}
                    onChange={(e) => setReplyContent(e.target.value)}
                  ></Input>
                  <ConfirmReply>
                    <Button onClick={() => sendReply()}>등록</Button>
                  </ConfirmReply>
                </UpInert>
              )}
              {/* <UnderInert>
                <ConfirmReply>
                  
                </ConfirmReply>
              </UnderInert> */}
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

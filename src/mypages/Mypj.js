import { Link } from "react-router-dom";
import styled from "styled-components";
import exit from "../image/exit.png";
import { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  margin-bottom: 200px;
`;

const Exit = styled.img`
  width: 70px;
  height: 70px;
  margin-top: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const ExitWrap = styled.div``;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: black;
  @media (max-width: 700px) {
    font-size: 30px;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.primary === "true" ? "#ff5353" : "gray"};
  color: white;
  border: 1px solid black;
  padding: 6px;
  font-size: 20px;
  cursor: pointer;
  width: 25vw;
  &:hover {
    background-color: black;
  }
  @media (max-width: 700px) {
    width: 40vw;
  }
`;

const ProfileImage = styled.div`
  img {
    vertical-align: -20px;
    width: 65px;
    height: 60px;
    border-radius: 100px;
    margin-right: 10px;
  }
  @media (max-width: 500px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const ProjectContainer = styled.div`
  display: flex;
  width: 70vw;
  border: 3px solid #ff5353;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ProjectTitle = styled.div`
  display: flex;
  justify-content: left;
  padding-left: 20px;
`;

const ProjectItem = styled.div`
  display: flex;
  padding-left: 20px;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Skill = styled.div`
  margin-left: 20px;
`;

const GoEndBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Gobutton = styled.button`
  width: 150px;
  height: 50px;
  margin-right: 30px;
  background-color: white;
  font-size: 20px;
  cursor: pointer;
  border: 3px solid #ff5353;
  border-radius: 30px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #ff5353;
    color: white;
  }
`;

const Endbutton = styled.button`
  width: 150px;
  height: 50px;
  background-color: white;
  font-size: 20px;
  cursor: pointer;
  border: 3px solid #ff5353;
  border-radius: 30px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #ff5353;
    color: white;
  }
`;

const ReqContainer = styled.div`
  display: flex;
  text-align: left;
  width: 60vw;
  border: 3px solid #ff5353;
  border-radius: 20px;
  min-height: 10vw;
`;

const ImgNickNameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
`;

const ReqBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ButtonStyle = styled.button`
  min-width: 5vw;
  height: 30px;
  margin-left: auto;
  margin-right: 30px;
  color: white;
  background-color: #ff5353;
  border: none;
  border-radius: 30px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    width: 50px;
    height: 25px;
  }
`;

const Mypj = () => {
  const [showProject, setShowProject] = useState(true);
  const [showApp, setShowApp] = useState(false);
  const [projectReq, setProjectReq] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [hostStatus, setHostStatus] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const rsp = await AxiosApi.getUserInfo2();
        if (rsp.data && rsp.data.email) {
          setUserInfo(rsp.data.email);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserInfo();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProject = async () => {
      try {
        const rsp = await AxiosApi.myProjectList();
        console.log(rsp.data);
        setProjectList(rsp.data);
        // 초기 호스트 상태 설정
        const initialHostStatus = rsp.data.map((project) =>
          project.chatManages.some(
            (manage) => manage.host && manage.member.email === userInfo
          )
        );
        setHostStatus(initialHostStatus);
      } catch (error) {
        console.error("에러", error);
      }
    };
    fetchMyProject();
  }, [userInfo]);

  useEffect(() => {
    const fetchProjectApply = async () => {
      try {
        const rsp = await AxiosApi.myProjectApplyList();
        console.log(rsp.data);
        setProjectReq(rsp.data);
      } catch (error) {
        console.error("에러", error);
      }
    };
    fetchProjectApply();
  }, []);

  const handleJoinRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const handleKickOut = async (roomid, email, projectId, nickname) => {
    const isConfirmed = window.confirm(`${nickname}님을 강퇴하시겠습니까?`);
    if (isConfirmed) {
      try {
        await AxiosApi.ProjectKickOut(roomid, email, projectId);
        window.alert("강퇴하였습니다.");
      } catch (error) {
        console.error("오류 : ", error);
      }
    }
  };

  const requestAccept = async (applyid) => {
    const isConfirmed = window.confirm("수락하시겠습니까?");
    if (isConfirmed) {
      try {
        await AxiosApi.ProjectRequestAccept(applyid);
        window.alert("추가 완료");
        window.location.reload();
      } catch (error) {
        console.error("오류 : ", error);
        console.log(applyid);
      }
    }
  };

  const requestReject = async (applyid) => {
    const isConfirmed = window.confirm("거절하시겠습니까?");
    if (isConfirmed) {
      try {
        await AxiosApi.ProjectRequestReject(applyid);
        window.alert("거절 완료");
        window.location.reload();
      } catch (error) {
        console.error("오류 : ", error);
        console.log(applyid);
      }
    }
  };

  return (
    <Container>
      <Title>나의 프로젝트</Title>
      <ButtonContainer>
        <Button
          primary={showProject ? "true" : "false"}
          onClick={() => {
            setShowProject(true);
            setShowApp(false);
          }}
        >
          프로젝트
        </Button>
        <Button
          primary={showApp ? "true" : "false"}
          onClick={() => {
            setShowProject(false);
            setShowApp(true);
          }}
        >
          요청
        </Button>
      </ButtonContainer>

      {showProject && (
        <div>
          {projectList.map((project, projectIndex) => (
            <ProjectContainer key={projectIndex}>
              <ProjectTitle>
                <h1>{project.chatManages[0]?.chatRoom?.roomName}</h1>
              </ProjectTitle>
              <ProjectItem>
                {project.chatManages.map((manage, manageIndex) => (
                  <Item key={manageIndex}>
                    <ProfileImage>
                      <img src={manage.member.profileImgPath} alt="이미지x" />
                    </ProfileImage>
                    <h2>
                      {manage.member.nickname}
                      {manage.host && (
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          (리더)
                        </span>
                      )}
                    </h2>
                    <Skill>Skill : {manage.member.skill}</Skill>
                    {hostStatus[projectIndex] && !manage.host && (
                      <ButtonStyle
                        onClick={() =>
                          handleKickOut(
                            manage.chatRoom.roomId,
                            manage.member.email,
                            manage.projectId,
                            manage.member.nickname
                          )
                        }
                      >
                        강퇴
                      </ButtonStyle>
                    )}
                  </Item>
                ))}
                <GoEndBtn>
                  <Gobutton
                    onClick={() =>
                      handleJoinRoom(project.chatManages[0]?.chatRoom?.roomId)
                    }
                  >
                    입장
                  </Gobutton>
                  <Endbutton>프로젝트 종료</Endbutton>
                </GoEndBtn>
              </ProjectItem>
            </ProjectContainer>
          ))}
        </div>
      )}

      {showApp && (
        <ReqContainer>
          {projectReq.map((apply, index) => (
            <div key={index}>
              <h1>{apply.projectName}</h1>
              <ImgNickNameBox>
                <ProfileImage>
                  <img src={apply.applicant.profileImgPath} alt="이미지x" />
                </ProfileImage>
                <h4>
                  닉네임: {apply.applicant.nickname} / Skill :{" "}
                  {apply.applicant.skill}
                </h4>
                <ReqBtn>
                  <ButtonStyle onClick={() => requestAccept(apply.applyId)}>
                    수락
                  </ButtonStyle>
                  <ButtonStyle onClick={() => requestReject(apply.applyId)}>
                    거절
                  </ButtonStyle>
                </ReqBtn>
              </ImgNickNameBox>
            </div>
          ))}
        </ReqContainer>
      )}

      <ExitWrap>
        <Link to="/apueda/mypage">
          <Exit src={exit} />
        </Link>
      </ExitWrap>
    </Container>
  );
};

export default Mypj;

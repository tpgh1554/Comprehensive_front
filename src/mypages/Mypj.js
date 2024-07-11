import { Link } from "react-router-dom";
import styled from "styled-components";
import exit from "../image/exit.png";
import { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: white;

  flex-direction: column;
  align-items: center;
  margin-bottom: 200px; //푸터랑 멀게
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
    margin-right: 10px; /* 프로필 사진과 닉네임 사이 간격 조정 */
  }

  @media (max-width: 500px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;
//프로젝트
const ProjectContainer = styled.div`
  display: flex;
  width: 60vw;

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

  flex-direction: column; /* 세로에서 가로로 변경 */
`;

const Item = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
`;

const Skill = styled.div`
  margin-left: 20px; /* Skill을 항상 오른쪽에 위치시킵니다. */
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
//프로젝트

//요청

const ReqContainer = styled.div`
  display: flex;
  text-align: left;
  width: 60vw;
  border: 3px solid #ff5353;
  border-radius: 20px;
  height: 10vw;
`;
//

const ImgNickNameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Mypj = () => {
  const [showProject, setShowProject] = useState(true);
  const [showApp, setShowApp] = useState(false);
  const [projectReq, setProjectReq] = useState([]);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const fechMyProject = async () => {
      try {
        const rsp = await AxiosApi.myProjectList();
        console.log(rsp.data);
        setProjectList(rsp.data);
      } catch (error) {
        console.error("에러", error);
      }
    };
    fechMyProject();
  }, []);

  useEffect(() => {
    const fechProjectApply = async () => {
      try {
        const rsp = await AxiosApi.myProjectApplyList();
        console.log(rsp.data);
        setProjectReq(rsp.data);
      } catch (error) {
        console.error("에러", error);
      }
    };
    fechProjectApply();
  }, []);

  return (
    <>
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
                  <h1> {project.chatManages[0]?.chatRoom?.roomName}</h1>
                </ProjectTitle>
                <ProjectItem>
                  {project.chatManages.map((manage, manageIndex) => (
                    <Item>
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

                      <Skill> Skill : {manage.member.skill}</Skill>
                      <button>강퇴</button>
                    </Item>
                  ))}
                </ProjectItem>
                <GoEndBtn>
                  <Gobutton>이동하기</Gobutton>
                  <Endbutton>프로젝트 종료</Endbutton>
                </GoEndBtn>
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
                  <div>{apply.applicant.nickname}</div>
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
    </>
  );
};

export default Mypj;

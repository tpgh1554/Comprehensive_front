import { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";

const Container = styled.div`
  width: 100%;
  height: 100%;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 30px;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
`;
const ContentNameList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  color: #ff5353;
  font-size: 0.9rem;
  list-style-type: none;
  border-bottom: 0.5px solid #c1c1c1;
`;
const Column = styled.div`
  margin: 0 16px;
  list-style-type: none;
  padding: 9px;
`;

const List = styled.div`
  width: 100%;
  list-style-type: none;
  padding: 18px;
`;
const ListResult = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px solid #c1c1c1;
  height: auto;
  padding: 8px 0;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  & img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    object-fit: cover;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;
const Etc = styled.div`
  display: flex;
  flex-direction: column;
  right: 0;
  width: 20%;
  position: relative;
`;

const BoardList = () => {
  const [projectList, setProjectList] = useState(null);
  const [boardList, setBoardList] = useState(null);
  const [showProject, setShowProject] = useState(true);
  const [showFree, setShowFree] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    // 플젝 정보 가져오기
    const fetchProjectList = async () => {
      try {
        const rsp = await AxiosApi.getProjectList();
        console.log(rsp.data);
        setProjectList(rsp.data); // 필터링된 데이터를 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };
    fetchProjectList();
  }, []);
  // 자유 게시판 정보 가져오기
  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const rsp = await AxiosApi.getBoardList();
        console.log(rsp.data);
        setBoardList(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBoardList();
  }, []);

  return (
    <Container>
      <ListContainer>
        <ContentNameList>
          <Column>작성자</Column>
          <Column>제목</Column>
          <Column>등록일자</Column>
        </ContentNameList>
        <List
          primary={showProject ? true : false}
          onClick={() => {
            setShowProject(true);
            setShowFree(false);
          }}
        >
          {showProject && (
            <>
              {projectList &&
                projectList.map((project, index) => (
                  <ListResult key={index}>
                    {/* <span>{project.email} </span> */}
                    <Profile>
                      <img src={project.profileImg}></img>
                      <span>닉네임 : {project.nickName}</span>
                    </Profile>
                    <Content>
                      {/* <span>{project.projectName}</span> */}
                      <span>{project.projectTitle}</span>
                      <span>{project.skills} 스킬(미출력됨 수정필요)</span>
                      {/* <span>{project.projectContent}</span> */}
                    </Content>
                    <Etc>
                      <span>{project.projectTime}</span>
                      <span>{project.recruitNum}</span>
                    </Etc>
                  </ListResult>
                ))}
            </>
          )}
        </List>
      </ListContainer>
    </Container>
  );
};
export default BoardList;

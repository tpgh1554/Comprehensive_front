import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";

// import { UserContext } from "../../context/UserStore";
// import useTokenAxios from "../../hooks/useTokenAxios";
import { formatTimestamp } from "../../utils/formatDate";

const Container = styled.div`
  width: 100%;
  height: 100%;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 30px;
  overflow: scroll;
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
  width: 70%;
  justify-content: center;
`;

const Etc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  width: 10%;
  position: relative;
`;

export const Button = styled.button`
  border: 0;
  color: #ffffff;
  background-color: #ff5353;
  border-radius: 26px;
  margin-right: 12px;
  font-size: 12px;
  padding: 6px;
  height: auto;
  width: auto;
  overflow: hidden;
`;

const ProjectList = () => {
  const [projectList, setProjectList] = useState(null);
  const [sortBy, setSortBy] = useState(true); // Default sort by newest
  const navigate = useNavigate();
  useEffect(() => {
    fetchProjectList();
  }, []);

  const fetchProjectList = async () => {
    try {
      const rsp = await AxiosApi.getProjectList();
      // Sort project list by regDate in descending order (newest first)
      const sortedProjects = rsp.data.sort(
        (a, b) => new Date(b.regDate) - new Date(a.regDate)
      );
      setProjectList(sortedProjects); // Set sorted project list
    } catch (e) {
      console.error("Error fetching project list:", e);
    }
  };

  const sortByCreatedAt = () => {
    const sortedProjects = [...projectList].sort((a, b) => {
      if (sortBy) {
        return new Date(b.regDate) - new Date(a.regDate);
      } else {
        return new Date(a.regDate) - new Date(b.regDate);
      }
    });
    setProjectList(sortedProjects);
    setSortBy(!sortBy); // Toggle sort order
  };

  const projectClick = (projectId) => {
    console.log(projectId, "플젝id값");
    navigate(`/apueda/board/projectDetail/${projectId}`);
  };

  return (
    <Container>
      <ListContainer>
        <ContentNameList>
          <Column>작성자</Column>
          <Column>제목</Column>
          <Column>
            <Button onClick={sortByCreatedAt}>등록일자</Button>
          </Column>
        </ContentNameList>
        <List>
          {projectList &&
            projectList.map((project, index) => (
              <ListResult key={index}>
                <Profile>
                  <img src={project.profileImg} alt="profile" />
                  <span>닉네임: {project.nickName}</span>
                </Profile>
                <Content>
                  <span onClick={() => projectClick(project.projectId)}>
                    {project.projectTitle}
                  </span>
                  <span>
                    {project.skillName &&
                      project.skillName.map((skills, index) => (
                        <Button key={index}>{skills.skillName}</Button>
                      ))}
                  </span>
                </Content>
                <Etc>{formatTimestamp(project.regDate)}</Etc>
              </ListResult>
            ))}
        </List>
      </ListContainer>
    </Container>
  );
};

export default ProjectList;

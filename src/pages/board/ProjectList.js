import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../utils/formatDate";
import InfiniteScroll from "react-infinite-scroll-component";

const Container = styled.div`
  width: 100%;
  height: 100%;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 0 0 30px 30px;
  // overflow-y: scroll;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
`;

const ContentNameList = styled.div`
  display: flex;
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
  width: 46%;
  border-bottom: 4.5px solid #c1c1c1;
  border-right: 3px solid #c1c1c1;
  color: #fff;
  height: 230px;
  padding: 36px;
  background-color: #ff5353;
  justify-content: space-between;
  border-radius: 36px;
  margin: 18px;
  flex-direction: column;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const ProfileInList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -10px;
  z-index: ${(props) => props.zIndex};
  & img {
    background-color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 30px;
    object-fit: cover;
    border: 4px solid;
  }
`;
// const Profile = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 20%;

//   & img {
//     width: 60px;
//     height: 60px;
//     border-radius: 30px;
//     object-fit: cover;
//     border: 4px solid;
//   }
// `;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  & span {
    font-size: 2rem;
  }
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
  const [projectList, setProjectList] = useState([]);
  const [sortBy, setSortBy] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(0); // 총 페이지 수
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const rsp = await AxiosApi.getProjectList(currentPage);
        // Sort project list by regDate in descending order (newest first)

        //const chatMemRsp = await AxiosApi.findRoomByRoomName(rsp.data.);
        const sortedProjects = rsp.data.projects.sort(
          (a, b) => new Date(b.regDate) - new Date(a.regDate)
        );
        setTotalPageSize(rsp.data.totalPages);
        setProjectList((prevProjects) => [...prevProjects, ...sortedProjects]);
        console.log(sortedProjects, "sortedProjects");
      } catch (e) {
        console.error("Error fetching project list:", e);
      }
    };
    fetchProjectList();
  }, [currentPage]);

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

  const fetchMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
          <InfiniteScroll
            dataLength={projectList.length}
            next={fetchMoreData}
            hasMore={currentPage < totalPageSize}
            loader={<h4>Loading...</h4>}
            endMessage={<p>프로젝트 구인글이 더 이상 없습니다.</p>}
            className="container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {projectList &&
              projectList.map((project, index) => (
                <ListResult key={index}>
                  <Content>
                    <span onClick={() => projectClick(project.projectId)}>
                      {project.projectTitle}
                    </span>
                    {formatTimestamp(project.regDate)}
                  </Content>
                  <span>
                    {project.skillName &&
                      project.skillName.map((skills, index) => (
                        <Button
                          key={index}
                          style={{
                            color: "#ff5353",
                            backgroundColor: "#ffffff",
                            borderRight: "1px solid #c1c1c1",
                            borderBottom: "2px solid #c1c1c1",
                          }}
                        >
                          {skills.skillName}
                        </Button>
                      ))}
                  </span>
                  <ProfileContainer>
                    <ProfileInList zIndex={1}>
                      <img src={project.profileImg} alt="profile" />
                      {/* <Profile> <img src={} alt="profile" /></Profile> */}
                      {/* {project.chatMemProfile.map((img, index) => (
                            <div key={index}>{img}</div>
                          ))} */}
                    </ProfileInList>
                    <ProfileInList zIndex={2}>
                      <img src={project.profileImg} alt="profile" />
                      {/* <Profile> <img src={} alt="profile" /></Profile> */}
                      {/* {project.chatMemProfile.map((img, index) => (
                            <div key={index}>{img}</div>
                          ))} */}
                    </ProfileInList>
                    <ProfileInList zIndex={3}>
                      <img src={project.profileImg} alt="profile" />
                      {/* <Profile> <img src={} alt="profile" /></Profile> */}
                      {/* {project.chatMemProfile.map((img, index) => (
                            <div key={index}>{img}</div>
                          ))} */}
                    </ProfileInList>
                  </ProfileContainer>
                  <Etc></Etc>
                </ListResult>
              ))}
          </InfiniteScroll>
        </List>
      </ListContainer>
    </Container>
  );
};

export default ProjectList;

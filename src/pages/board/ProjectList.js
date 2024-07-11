import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../utils/formatDate";
import InfiniteScroll from "react-infinite-scroll-component";
import noImg from "../../image/noImage.jpg";
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
  padding: 16px;
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
  background-color: #ff5353;
`;

const ListResult = styled.div`
  display: flex;
  width: 46%;
  border-bottom: 4.5px solid #c1c1c1;
  border-right: 3px solid #c1c1c1;
  height: auto;
  background-color: #fffbfc;
  justify-content: space-between;
  border-radius: 36px;
  padding: 23px;
  margin: 18px;
  flex-direction: column;
  img {
    width: auto;
    height: 370px;
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
`;
const ProfileInList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -14px;
  z-index: ${(props) => props.zIndex};
  & img {
    background-color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 30px;
    object-fit: cover;
    border: 4px solid #fff;
  }
  & .moreProfile {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    background-color: #fa7373;
    width: 50px;
    height: 50px;
    border-radius: 30px;
    border: 4px solid #fff;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 16px 0;
  padding: 0 10px;
  & span {
    font-size: 1rem;
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
  const [imgUrl, setImgUrl] = useState("");
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
        setImgUrl(sortedProjects.imgPath);
        console.log(projectList, "imgPath");
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
  const handleHover = (e) => {
    e.stopPropagation();
    e.currentTarget.style.transform = "translate(-5px, -5px)";
    e.currentTarget.style.transition = "transform 0.5s ease";
    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  };
  const handleMouseDown = (e) => {
    console.log("!");
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.transition = "transform 0.5s ease";
    e.currentTarget.style.boxShadow = "none";
  };
  return (
    <Container>
      <ListContainer>
        <ContentNameList>
          <Column>검색필터</Column>
          {/* <Column>제목</Column> */}
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
                <ListResult
                  key={index}
                  onMouseOver={(e) => handleHover(e)}
                  onMouseLeave={(e) => handleMouseDown(e)}
                >
                  {project.imgPath ? (
                    <img
                      src={project.imgPath}
                      alt="No Image"
                      onClick={() => projectClick(project.projectId)}
                    ></img>
                  ) : (
                    <img
                      src={noImg}
                      alt="profile"
                      onClick={() => projectClick(project.projectId)}
                    />
                  )}
                  <Content>
                    <span>{project.projectTitle}</span>
                    {formatTimestamp(project.regDate)}
                  </Content>

                  <ProfileContainer>
                    <span>
                      {project.skillName &&
                        project.skillName.map((skills, index) => (
                          <Button
                            key={index}
                            style={{
                              borderRight: "1px solid #c1c1c1",
                              borderBottom: "2px solid #c1c1c1",
                            }}
                          >
                            {skills.skillName}
                          </Button>
                        ))}
                    </span>
                    <ProfileInList zIndex={1}>
                      <img src={project.profileImg} alt="profile" />
                      {/* <Profile> <img src={} alt="profile" /></Profile> */}
                      {/* {project.chatMemProfile.map((img, index) => (
                            <div key={index}>{img}</div>
                          ))} */}
                    </ProfileInList>
                    {/* <ProfileInList zIndex={2}>
                      <img src={project.profileImg} alt="profile" />
                    </ProfileInList>
                    <ProfileInList zIndex={3}>
                      <img src={project.profileImg} alt="profile" />
                    </ProfileInList>
                    <ProfileInList zIndex={4}>
                      <div
                        className="moreProfile"
                        onClick={() => projectClick(project.projectId)}
                      >
                        +{project.recruitNum - 3}
                      </div>
                    </ProfileInList> */}
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

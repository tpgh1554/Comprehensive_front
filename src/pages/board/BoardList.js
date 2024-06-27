import { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";

const ContentNameList = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;
  background-color: #ff5353;
  color: #ffffff;
  font-size: 0.9rem;
  list-style-type: none;
`;
const Column = styled.li`
  margin: 0 16px;
  list-style-type: none;
`;
const List = styled.li`
  width: 100%;
  list-style-type: none;
`;

const BoardList = () => {
  const [projectList, setProjectList] = useState(null);
  const [boardList, setBoardList] = useState(null);
  const [showProject, setShowProject] = useState(true);
  const [showFree, setShowFree] = useState(false);
  useEffect(() => {
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

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const rsp = await AxiosApi.getBoardList();
        console.log(rsp.data);
        setBoardList(rsp.data); // 필터링된 데이터를 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };

    fetchBoardList();
  }, []);
  return (
    <>
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
            {projectList && (
              <div>
                {projectList.map((project, index) => (
                  <div key={index}>
                    <div>
                      <span>{project.projectName} ,</span>
                      <span>{project.job},</span>
                      <span>{project.projectTitle},</span>
                      <span>{project.skills},</span>
                      <span>{project.projectContent},</span>
                    </div>
                    <br></br>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </List>
    </>
  );
};
export default BoardList;

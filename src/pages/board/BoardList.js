import { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
const List = styled.div``;
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
  );
};
export default BoardList;

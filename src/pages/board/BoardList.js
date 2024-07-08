import { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
// 컴포넌트로 관리시 사용
const Container = styled.div`
  width: 100%;
  height: 100%;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 30px;
`;
const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
`;
const ContentNameList = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;
  color: #ff5353;
  font-size: 0.9rem;
  list-style-type: none;
  border-bottom: 0.5px solid #c1c1c1;
`;
const Column = styled.li`
  margin: 0 16px;
  list-style-type: none;
  padding: 9px;
`;

const List = styled.li`
  width: 100%;
  list-style-type: none;
  padding: 18px;
  & div.list-result {
    border-bottom: 0.5px solid #c1c1c1;
  }
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
              {projectList && (
                <div>
                  {projectList.map((project, index) => (
                    <div key={index}>
                      <div className="list-result">
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
      </ListContainer>
    </Container>
  );
};
export default BoardList;

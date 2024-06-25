import { Link } from "react-router-dom";
import styled from "styled-components";
import exit from "../image/exit.png";
import { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
const Container = styled.div`
  height: auto;
  width: 100vw;
  position: relative; /* 상대적 위치 설정 */
  display: flex;
  background-color: white;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Exit = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: black;
  margin-top: 3vw;
  @media (max-width: 700px) {
    font-size: 30px;
    margin-top: 10vw;
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
  background-color: ${(props) => (props.primary ? "#ff5353" : "gray")};
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
const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 내부 요소들을 양쪽에 배치 */
  align-items: center; /* 수직으로 가운데 정렬 */
  width: 500px;
  padding: 20px;
  background-color: aliceblue;
  border: 3px solid #ff5353;
  border-radius: 30px;

  margin-top: 30px;
  margin-bottom: 20px;
  h1 {
    font-size: 20px;
    margin-right: 50px;
    @media (max-width: 700px) {
      font-size: 20px;
    }
    @media (max-width: 500px) {
      font-size: 15px;
    }
  }

  @media (max-width: 900px) {
    width: 80vw;
  }
  @media (max-width: 500px) {
    width: 85vw;
  }
`;

const DelButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: #ff5353;
  color: white;
  border: none;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const Mywrite = () => {
  const [showProject, setShowProject] = useState(true);
  const [showFree, setShowFree] = useState(false);
  const [boardList, setBoardList] = useState(null);
  const [projectList, setProjectList] = useState(null);

  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const rsp = await AxiosApi.getProjectList();
        console.log(rsp.data);
        console.log(localStorage.getItem("email"));
        // setBoardList(rsp.data);
        const filteredData = rsp.data.filter(
          (project) => project.email === localStorage.getItem("email")
        );
        setProjectList(filteredData); // 필터링된 데이터를 상태에 저장
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
        console.log(localStorage.getItem("email"));
        // setBoardList(rsp.data);
        const filteredData = rsp.data.filter(
          (board) => board.email === localStorage.getItem("email")
        );
        setBoardList(filteredData); // 필터링된 데이터를 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };

    fetchBoardList();
  }, []);

  const boardDelete = async (boardId) => {
    const confirm = window.confirm("글을 삭제하시겠습니까?");
    if (confirm) {
      try {
        // API를 호출하여 게시글 삭제
        await AxiosApi.boardDelete(boardId);
        // 삭제 성공 시, 상태 업데이트 등 추가 로직 처리
        console.log(boardId);
        console.log("삭제 성공");
        window.alert("삭제완료");
        window.location.reload();
      } catch (error) {
        console.error("삭제 오류", error);
        console.log(boardId);
      }
    }
  };
  const projectDelete = async (projectId) => {
    const confirm = window.confirm("글을 삭제하시겠습니까?");
    if (confirm) {
      try {
        // API를 호출하여 게시글 삭제
        await AxiosApi.projectDelete(projectId);
        // 삭제 성공 시, 상태 업데이트 등 추가 로직 처리
        console.log(projectId);
        console.log("삭제 성공");
        window.alert("삭제완료");
        window.location.reload();
      } catch (error) {
        console.error("삭제 오류", error);
        console.log(projectId);
      }
    }
  };

  return (
    <>
      <Container>
        <Title>내가 쓴 글</Title>
        <ButtonContainer>
          <Button
            primary={showProject ? true : false}
            onClick={() => {
              setShowProject(true);
              setShowFree(false);
            }}
          >
            프로젝트
          </Button>

          <Button
            primary={showFree ? true : false}
            onClick={() => {
              setShowProject(false);
              setShowFree(true);
            }}
          >
            자유게시판
          </Button>
        </ButtonContainer>

        {showProject && (
          <>
            {projectList && (
              <div>
                {projectList.map((project, index) => (
                  <div key={index}>
                    <ListWrapper>
                      <h1>{project.projectName}</h1>
                      <h1>{project.projectContent}</h1>
                      {/* user가 존재하는지 확인 */}{" "}
                      <DelButton
                        onClick={() => projectDelete(project.projectId)}
                      >
                        삭제
                      </DelButton>
                    </ListWrapper>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {showFree && (
          <>
            {boardList && (
              <div>
                {boardList.map((board, index) => (
                  <div key={index}>
                    <ListWrapper>
                      <h1>{board.title}</h1>
                      <h1>{board.content}</h1>

                      <DelButton onClick={() => boardDelete(board.boardId)}>
                        삭제
                      </DelButton>
                    </ListWrapper>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <Link to="/apueda/mypage">
          <Exit src={exit} />
        </Link>
      </Container>
    </>
  );
};

export default Mywrite;

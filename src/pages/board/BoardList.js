import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserStore";
import useTokenAxios from "../../hooks/useTokenAxios";
import { formatDate, formatTimestamp } from "../../utils/formatDate";
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
  & span {
    display: flex;
    align-items: center;
    padding: 12px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
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
  const [boardList, setBoardList] = useState(null);
  const [sortBy, setSortBy] = useState(true); // Default sort by newest
  const navigate = useNavigate();
  useEffect(() => {
    fetchProjectList();
  }, []);

  const fetchProjectList = async () => {
    try {
      const rsp = await AxiosApi.getBoardList();
      // Sort project list by regDate in descending order (newest first)
      const sortedBoards = rsp.data.sort(
        (a, b) => new Date(b.regDate) - new Date(a.regDate)
      );
      setBoardList(sortedBoards); // Set sorted project list
    } catch (e) {
      console.error("Error fetching project list:", e);
    }
  };

  const sortByCreatedAt = () => {
    const sortedBoards = [...boardList].sort((a, b) => {
      if (sortBy) {
        return new Date(b.regDate) - new Date(a.regDate);
      } else {
        return new Date(a.regDate) - new Date(b.regDate);
      }
    });
    setBoardList(sortedBoards);
    setSortBy(!sortBy); // Toggle sort order
  };

  const boardClick = (boardId) => {
    console.log(boardId, "플젝id값");
    navigate(`/apueda/board/boardDetail/${boardId}`);
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
          {boardList &&
            boardList.map((board, index) => (
              <ListResult key={index}>
                <Profile style={{ flexDirection: "row" }}>
                  <img src={board.profileImg} alt="board" />
                  <span> {board.nickName}</span>
                </Profile>
                <Content>
                  <span onClick={() => boardClick(board.boardId)}>
                    {board.title}
                  </span>
                </Content>
                <Etc>{formatTimestamp(board.regDate)}</Etc>
              </ListResult>
            ))}
        </List>
      </ListContainer>
    </Container>
  );
};

export default ProjectList;

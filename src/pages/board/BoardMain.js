import styled from "styled-components";
import SelectBoard from "./SelectBoard";
import BoardList from "./BoardList";
import { Link } from "react-router-dom";

const BoardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  margin: 0 15vw;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 800px;
  width: 100%;
  margin-top: 5vh;
  border: 5px solid #ff5353;
  border-radius: 37px;
`;
const BoardMain = () => {
  return (
    <BoardLayout>
      <Container>
        <SelectBoard />
        <BoardList />
      </Container>
    </BoardLayout>
  );
};
export default BoardMain;
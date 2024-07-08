import styled from "styled-components";
import SelectBoard from "./SelectBoard";
import BoardList from "./BoardList";
import HeadBar from "./HeadBar";
import ProjectList from "./ProjectList";
import { useEffect, useState } from "react";

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
  background-color: #ff5353;
`;
const BoardMain = () => {
  const [isClick, setIsClick] = useState({ a: true, b: false });

  return (
    <BoardLayout>
      <Container>
        {/* Use the combined HeadBar component */}
        <HeadBar setIsClick={setIsClick} />
        {/* Render ProjectList or BoardList based on isClick state */}
        {isClick.a ? <ProjectList /> : <BoardList />}
      </Container>
    </BoardLayout>
  );
};

export default BoardMain;

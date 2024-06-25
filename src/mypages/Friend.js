import { Link } from "react-router-dom";
import styled from "styled-components";
import exit from "../image/exit.png";
import { useEffect, useState } from "react";

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

const ExitWrapper = styled.div`
  position: absolute;
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

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* 수직으로 가운데 정렬 */
  width: 800px;
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

const StyledTable = styled.table`
  border-collapse: collapse;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  thead {
    font-size: 30px;
    th {
      text-align: left;
    }
  }

  tbody {
    text-align: left;
    font-size: 25px;
    tr {
      border-bottom: 3px solid gray;
    }
  }
`;

const Friend = () => {
  const [showFriend, setshowFriend] = useState(true);
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      <Container>
        <Title>친구</Title>

        <ButtonContainer>
          <Button
            primary={setshowFriend ? true : false}
            onClick={() => {
              setshowFriend(true);
              setShowApp(false);
            }}
          >
            친구 목록
          </Button>

          <Button
            primary={showApp ? true : false}
            onClick={() => {
              setshowFriend(false);
              setShowApp(true);
            }}
          >
            요청
          </Button>
        </ButtonContainer>

        {showFriend && (
          <TableWrapper>
            <ExitWrapper>
              <Link to="/apueda/mypage">
                <Exit src={exit} />
              </Link>
            </ExitWrapper>

            <StyledTable></StyledTable>
          </TableWrapper>
        )}
      </Container>
    </>
  );
};

export default Friend;

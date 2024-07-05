import { Link } from "react-router-dom";
import styled from "styled-components";
import exit from "../image/exit.png";
import { useEffect, useState } from "react";

const Container = styled.div`
  height: 100vh;
  width: 100%;
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
  margin-top: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const ExitWrap = styled.div``;

const Title = styled.div`
  font-size: 50px;
  color: black;
  position: absolute; /* 절대 위치 설정 */
  top: 20px; /* 원하는 위치로 조정 */
  left: 50%; /* 가운데 정렬을 위한 설정 */
  transform: translateX(-50%); /* 가운데 정렬 */
`;

const ButtonContainer = styled.div`
  position: absolute; /* 절대 위치 설정 */
  top: 100px; /* 원하는 위치로 조정 */
  left: 50%; /* 가운데 정렬을 위한 설정 */
  transform: translateX(-50%); /* 가운데 정렬 */
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  margin-top: 20px;
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
`;

const TableWrapper = styled.div`
  overflow: hidden;
  width: 60vw;
  border: 3px solid #ff5353;
  border-radius: 20px;
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

const Gobutton = styled.button`
  width: 150px;
  height: 50px;
  margin-right: 100px;
  margin-bottom: 20px;
  background-color: white;
  font-size: 20px;
  cursor: pointer;
  border: 3px solid #ff5353;
  border-radius: 30px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #ff5353;
    color: white;
  }
`;

const Endbutton = styled.button`
  margin-top: 20px;
  width: 150px;
  height: 50px;
  background-color: white;
  font-size: 20px;
  cursor: pointer;
  border: 3px solid #ff5353;
  border-radius: 30px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #ff5353;
    color: white;
  }
`;

const Mypj = () => {
  const [showProject, setShowProject] = useState(true);
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      <Container>
        <Title>나의 프로젝트</Title>
        <ExitWrap>
          <Link to="/apueda/mypage">
            <Exit src={exit} />
          </Link>
        </ExitWrap>
        <ButtonContainer>
          <Button
            primary={showProject ? true : false}
            onClick={() => {
              setShowProject(true);
              setShowApp(false);
            }}
          >
            프로젝트
          </Button>

          <Button
            primary={showApp ? true : false}
            onClick={() => {
              setShowProject(false);
              setShowApp(true);
            }}
          >
            요청
          </Button>
        </ButtonContainer>

        {showProject && (
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>프로젝트 이름(프로젝트 기한)</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>비밀번호</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    이미지 + 닉네임(리더)/Skill : 자바 리액트 자바스크립트
                  </td>
                </tr>
                <tr>
                  <td>
                    이미지 + 닉네임(리더)/Skill : 자바 리액트 자바스크립트
                  </td>
                </tr>
                <tr>
                  <td>
                    이미지 + 닉네임(리더)/Skill : 자바 리액트 자바스크립트
                  </td>
                </tr>
                <tr>
                  <td>
                    이미지 + 닉네임(리더)/Skill : 자바 리액트 자바스크립트 나는
                    뭘 잘할까
                  </td>
                </tr>
              </tbody>
            </StyledTable>
            <Gobutton>이동하기</Gobutton>
            <Endbutton>프로젝트 종료</Endbutton>
          </TableWrapper>
        )}
      </Container>
    </>
  );
};

export default Mypj;

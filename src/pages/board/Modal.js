import styled, { keyframes } from "styled-components";
import exit from "../../image/exit.png";
import { Container, ContainerBack, Exit } from "../../style/ModalStyle.js";
import AxiosApi from "../../api/AxiosApi";
import { useEffect, useState } from "react";
import { Button } from "../../style/WriteStyle";
const Input = styled.input``;
const SearchResult = styled.div``;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90%;
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 90%;
  border: 1px solid black;
  padding: 16px;
  margin: 32px;
  & input {
    height: 50px;
  }
`;
const ResultContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 90%;
  padding: 16px;
  margin: 32px;
  border: 1px solid black;
  flex-direction: row;
`;

const Ul = styled.ul`
  display: ${(props) => (props.showList ? "inline-block" : "none")};
  list-style: none;
`;
const SkillList = styled.div`
  point: cursor;
  cursor: pointer;
`;
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;
const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: ${spin} 1s linear infinite;
  display: inline-block;
`;

const Modal = ({ closeModal, handleEvent }) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [skillsArray, setSkillsArray] = useState([]);
  const [clickList, setClickList] = useState([]);

  /**
   * @param {event} event input창에 입력한값을 상태관리하는 handler
   */
  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue, "input");
  };

  useEffect(() => {
    const getSkills = async () => {
      try {
        // const response = await AxiosApi.getSkilList();
        // email -> skill
        const response = await AxiosApi.getUserList();
        console.log(response.data, "skill");
        setSkillsArray(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getSkills();
  }, [inputValue]);
  // 입력한 스킬 값과 db스킬 비교
  const filterSkillResult = skillsArray.filter((skill) => {
    const trimmedInputValue = inputValue.replace(/\s+/g, "").toLowerCase();
    const trimmedSkillName = skill.email.replace(/\s+/g, "").toLowerCase();
    return trimmedSkillName.includes(trimmedInputValue);
  });

  return (
    <ContainerBack>
      <Container>
        <Layout>
          <SearchContainer>
            <Input
              type="text"
              placeholder="스킬 이름"
              value={inputValue}
              onChange={handleSearchChange}
            />
            <Ul showList={inputValue !== ""}>
              {filterSkillResult.length > 0 ? (
                filterSkillResult.map((skill, index) => (
                  <li key={index}>
                    <SearchResult>
                      <SkillList>{skill.email}</SkillList>
                      {/* <img
                        src={skill.strTeamBadge}
                        alt={`${skill.strTeam} badge`}
                        style={{ width: "24px", height: "24px" }}
                      /> */}
                    </SearchResult>
                  </li>
                ))
              ) : (
                // <SearchResult>
                //   <li>no skill result</li>
                // </SearchResult>
                <></>
              )}
            </Ul>
          </SearchContainer>
          <ResultContainer>
            <Button style={{ width: "40px", height: "24px", fontSize: "12px" }}>
              java
            </Button>
          </ResultContainer>
        </Layout>
        <Exit onClick={() => closeModal()} src={exit} />
      </Container>
    </ContainerBack>
  );
};

export default Modal;

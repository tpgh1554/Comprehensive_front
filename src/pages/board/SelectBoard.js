import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 54px;
  background-color: #ff5353;
  border-radius: 30px 30px 0 0;
`;

const SelectBoardButton = styled.button`
  width: 50%;
  height: auto;
  border-radius: ${(props) =>
    props.buttonType === "a"
      ? "30px 0 25px 0"
      : props.isSelected
      ? "0 30px 0 0"
      : "0 30px 0 25px"};
  border: none;
  background-color: ${(props) => (props.isSelected ? "#ff5353" : "#ffffff")};
  color: ${(props) => (props.isSelected ? "#ffffff" : "#000000")};
  &:hover {
    cursor: pointer;
  }
`;

const SelectBoard = () => {
  const [selectedButton, setSelectedButton] = useState({
    a: true,
    b: false,
  });

  const handleClick = (buttonType) => {
    setSelectedButton((prevState) => ({
      ...prevState,
      [buttonType]: true,
      [buttonType === "a" ? "b" : "a"]: false,
    }));
  };

  return (
    <Container>
      <SelectBoardButton
        isSelected={selectedButton.a}
        buttonType="a"
        onClick={() => handleClick("a")}
      >
        <span>자유 게시판</span>
      </SelectBoardButton>
      <SelectBoardButton
        isSelected={selectedButton.b}
        buttonType="b"
        onClick={() => handleClick("b")}
      >
        <span>프로젝트 구인</span>
      </SelectBoardButton>
    </Container>
  );
};

export default SelectBoard;

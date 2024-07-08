import React, { useState } from "react";
import { HeadContainer, SelectBoardButton } from "../../style/SelectBoardStyle";

const SelectBoard = ({ setIsClick }) => {
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
    setIsClick(selectedButton);
  };

  return (
    <HeadContainer>
      <SelectBoardButton
        isSelected={selectedButton.a}
        buttonType="a"
        onClick={() => handleClick("a")}
      >
        <span>프로젝트 구인</span>
      </SelectBoardButton>
      <SelectBoardButton
        isSelected={selectedButton.b}
        buttonType="b"
        onClick={() => handleClick("b")}
      >
        <span>자유 게시판</span>
      </SelectBoardButton>
    </HeadContainer>
  );
};

export default SelectBoard;

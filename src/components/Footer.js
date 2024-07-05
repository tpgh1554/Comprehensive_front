import styled from "styled-components";
import Useterms from "./Useterms";
import { useState } from "react";
import Privacy from "./Privacy";

const Footer = () => {
  const [terOpen, setTerOpen] = useState(false);
  const [termodalOpen, setTermodalOpen] = useState(false);
  const [termodalContent, setTermodalContent] = useState("");
  const [priOpen, setPriOpen] = useState(false);
  const [primodalOpen, setPrimodalOpen] = useState(false);
  const [primodalContent, setPrimodalContent] = useState("");

  const onClickSub = (e) => {
    setTerOpen(true);
  };
  const closeTer = () => {
    setTerOpen(false);
  };
  const onClickSub1 = (e) => {
    setPriOpen(true);
  };
  const closeTer1 = () => {
    setPriOpen(false);
  };
  return (
    <Container>
      <Box style={{ marginBottom: "50px" }}>
        <Terms onClick={onClickSub}>이용약관</Terms>
        <Terms style={{ marginLeft: "20px" }} onClick={onClickSub1}>
          개인정보처리방침
        </Terms>
      </Box>
      <Item>(주) 아프다</Item>

      <Box style={{ flexDirection: "column" }}>
        <Item>김기주|임정후|김동환|강인구|김세호</Item>
        <Item>서울특별시 강남구 역삼로</Item>
        <Item>전화번호 02-123-4567</Item>
        <Item>이메일 : sick@example.com</Item>
      </Box>
      <Box style={{ flexDirection: "column" }}>
        <Item>
          https://github.com/tpgh1554/Comprehensive_front/commits/master/
        </Item>
        <Item>https://github.com/kimfjd/Comprehensive_back</Item>
        <Item>CopyRight © 2024 sick All Rights Reserved.</Item>
      </Box>
      <Box></Box>

      <Useterms
        open={terOpen}
        close={closeTer}
        category="약관창"
        setModalOpen={setTermodalOpen}
        setModalContent={setTermodalContent}
        header="이용약관"
      />
      <Privacy
        open={priOpen}
        close={closeTer1}
        category="약관창"
        setModalOpen={setPrimodalOpen}
        setModalContent={setPrimodalContent}
        header="개인정보취급방침"
      />
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ff5353;
  width: 100%;
  height: 350px;
  /* color: white; */
`;
const Box = styled.div`
  display: flex;
`;
const Item = styled.span`
  margin-bottom: 7px;
  font-size: 18px;
`;
const Terms = styled.div`
  font-size: 20px;
  color: gray;

  margin-top: 15px;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

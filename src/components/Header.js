import styled from "styled-components";
import Logo from "../components/logoimg";
import GlobalStyle from "../font/GlobalStyle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Body>
        <Container>
          <Box onClick={() => navigate("/apueda")}>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <Span>아프다</Span>
          </Box>
        </Container>
      </Body>
    </>
  );
};

export default Header;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  height: auto;
  margin: 0 15vw;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  height: auto;
`;

const Box = styled.div`
  display: flex;
  width: auto;
  height: auto;
  cursor: pointer;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 2px 0 2vw;
`;

// 폰트
const Span = styled.span`
  text-align: left;
  font-size: 50px;
  font-family: "PyeongChangPeace-Bold", sans-serif;
`;

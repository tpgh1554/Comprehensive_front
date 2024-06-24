

import styled from "styled-components";

const Footer = ()=>{
  return(
  
  <>
  <Container>
    <Box>
      <Item>회사소개</Item>
      <Item>이용약관</Item>
      <Item>개인정보처리방침</Item>
    </Box>
    <Box>
      <Item>조이름</Item>
      <Item>조원명 이메일</Item>
    </Box>
    <Box>
    <Item>Copyright@회사명 co.,Ltd. All Rights reserved.</Item>
    </Box>
    <Box>

    </Box>
  </Container>
  
  </>

  )
};

export default Footer;

const Container = styled.div`
display: flex;
flex-direction: column;
padding:20px;
`
const Box = styled.div`
display: flex;
flex-direction: row;
`
const Item =  styled.span`

`
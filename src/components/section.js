import styled from "styled-components";

const Section = () => {
  return (
    <>
      <Container>
        <Box>
          <Item>
            <div>프로젝트 인원을 어디서 구해야 될지 모르겠다면?</div>
          </Item>
          <Item2>
            <div>언제 어디서나 원하는 스킬을 가진 사람 PICK!</div>
          </Item2>
        </Box>
        <ImageBox>이미지영역</ImageBox>
      </Container>
      <Container>
        <ImageBox>이미지영역</ImageBox>
        <Box>
          
          <Item>
          <div>우리의 연애 알고리즘은 뭘까</div>
          </Item>
          <Item2>
          <div>함께 할 수록 더 좋으니까! <br/> 개발자 매칭으로 인연을 만드세요.</div>
          </Item2>
        </Box>
      </Container>
      <Container>
        <Box>
          <Item>
            <div>제한없는 무제한 플젝찾기, 인연찾기 </div>
          </Item>
          <Item2>
            <div>구독서비스로 아프다를 무한으로 즐기세요!</div>
          </Item2>
        </Box>
        <ImageBox>이미지영역</ImageBox>
      </Container>
    </>
  );
};

export default Section;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 600px;
  align-items: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
  margin: 0 2vw;
`;
const ImageBox = styled.div`
  width: 50%;
  height: auto;
  background-color: white;
  margin: 0 2vw;
`;
const Item = styled.div`
  font-size: 50px;
  color: black;
  margin-bottom: 20px;
`;
const Item2 = styled.div`
  margin-bottom: 10px;
  font-size: 30px;
  color: black;
  & > div {
    margin: 10px 0; // Box의 직계 자식 div에 스타일 적용
  }
`;

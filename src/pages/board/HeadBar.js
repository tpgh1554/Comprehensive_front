import styled from "styled-components";
const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;
const WriteBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 70px;
  border-radius: 36px;
  margin-left: 16px;
  color: #ffffff;
  background-color: #ff5353;
`;
const SearchFilter = styled.div`
  margin-right: 16px;
`;
const HeadBar = () => {
  return (
    <>
      <HeadContainer>
        <WriteBoard>글쓰기</WriteBoard>
        <SearchFilter>검색필터</SearchFilter>
      </HeadContainer>
    </>
  );
};
export default HeadBar;

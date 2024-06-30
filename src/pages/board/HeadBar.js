import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #ff5353;
  font-size: 0.7rem;
  /* padding-top: 18px;
  padding-left: 18px; */
`;
const WriteBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 50px;
  border-radius: 36px;
  margin-right: 16px;
  color: #ff5353;
  background-color: #ffffff;
`;
const SearchFilter = styled.div`
  margin-left: 16px;
  color: #ffffff;
`;
const HeadBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeadContainer>
        <SearchFilter>검색필터</SearchFilter>
        <WriteBoard onClick={() => navigate("/apueda/writeproject")}>
          글쓰기
        </WriteBoard>
      </HeadContainer>
    </>
  );
};
export default HeadBar;

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ff5353;
  border-radius: 21px 21px 0 0;
`;
const SelectButton = styled.button``;

const SelectBoard = () => {
  return (
    <Container>
      <SelectButton></SelectButton>
    </Container>
  );
};
export default SelectBoard;

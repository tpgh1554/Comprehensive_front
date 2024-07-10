import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & input {
    border-radius: 8px;
    color: #ffffff;
  }
  & button {
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: #c72519; /* hover 시 배경색 변경 */
    }
    &:active {
      background-color: #87160e; /* 클릭 시 배경색 변경 */
    }
  }
`;

export const Box = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #ff5353;
  background: rgba(255, 83, 53, 0.7);
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
`;

export const Contents = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

export const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
`;

export const EmailBox = styled.div`
  gap: 10px;
`;

export const ShortInput = styled.input`
  height: 40px;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const CheckBtn = styled.button``;

export const LongInput = styled.input`
  height: 40px;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const SkillCheck = styled.div`
  /* display: flex; */
`;

export const SkillContext = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 설정 */
  flex-direction: row;
  margin-right: 10px; /* 각 체크박스 사이의 간격 설정 */
`;

export const CheckBox = styled.input``;

export const TextBox = styled.div``;

export const Text = styled.textarea`
  width: 100%;
`;

export const SubmitBtn = styled.button`
  height: 40px;
  width: 40%;
  background-color: rgba(255, 83, 83, 0.8);
`;
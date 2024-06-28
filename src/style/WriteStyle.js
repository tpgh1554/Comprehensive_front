import styled from "styled-components";

export const Title = styled.input`
  border-width: 0 0 1px;
  width: 85%;
  height: 50px;
  &:focus {
    outline: none;
  }
`;

export const InputButtonSection = styled.div`
  display: flex;
  width: 85%;
`;

export const Button = styled.button`
  border: 0;
  color: #ffffff;
  background-color: #ff5353;
  border-radius: 26px;
  margin-right: 16px; /* 간격 설정 */

  &:last-child {
    margin-right: 0; /* 마지막 요소의 간격 제거 */
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
`;

export const ConfirmButton = styled.button`
  border: 0;
  border-radius: 26px;
  background-color: #ffffff;
  border: 5px solid #ff5353;
  width: 100px;
  height: 42px;
`;

export const Content = styled.textarea`
  border-width: 0.7px 0 0.7px;
  margin: 10px 0;
  width: 85%;
  height: 70%;
  &:focus {
    outline: none;
  }
`;

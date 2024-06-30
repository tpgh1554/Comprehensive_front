import styled from "styled-components";

export const Title = styled.input`
  border-width: 0 0 1px;
  width: 85%;
  height: 50px;
  padding-left: 32px;
  margin-top: 16px;
  font-size: 1.5rem;
  &:focus {
    outline: none;
  }
`;

export const InputButtonSection = styled.div`
  display: flex;
  width: 85%;
  padding-left: 32px;
`;

export const Button = styled.button`
  border: 0;
  color: #ffffff;
  background-color: #ff5353;
  border-radius: 26px;
  margin-right: 16px;
  height: 32px;
  width: 72px;
  overflow: hidden;
  &:last-child {
    margin-right: 0;
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
  padding: 32px;
  font-size: 1.2rem;
  overflow: auto;
  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer; /* 스크롤바 hover 시 커서 변경 */
  }

  &::-webkit-scrollbar-thumb {
    background: #ff5353; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: rgba(220, 20, 60, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;

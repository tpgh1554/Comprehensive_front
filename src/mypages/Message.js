import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import exit from "../image/exit.png";

const ContainerBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 35vw;
  height: 45vw;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ff5353;
  border: 2px solid black;
  border-radius: 100px;
  z-index: 1000;

  @media (max-width: 500px) {
    width: 80vw;
    height: 500px;
  }
`;

const Exit = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const WriteButton = styled.button`
  margin-top: 20px;
  height: 50px;
  width: 200px;
  border: 2px solid black;
  border-radius: 30px;
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 기존 justify-content: center; 에서 수정 */
  flex-direction: column;
`;

const TitelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 4vw;
  color: white;
  border-radius: 30px;
  background-color: #ff5353;
  font-size: 20px;

  @media (max-width: 500px) {
    font-size: 10px;
    width: 50vw;
    height: 6vh;
    top: 20px;
  }
`;

const PageBtn = styled.div`
  button {
    background-color: white;
    border: 1px solid black;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const MessageContainer = styled.div`
  width: 35vw;
  height: 30vw;
`;

const MsgItem = styled.div`
  background-color: white;
  margin-bottom: 20px; /* Adjust as needed */
  text-align: center;

  h1 {
    font-size: 20px;
  }
  h5 {
    text-align: right;
  }
`;

const Message = ({ closeModal, friendEmail }) => {
  const [messageList, setMessageList] = useState([]);
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지에 표시할 아이템 수

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const rsp = await AxiosApi.messageList(
          localStorage.getItem("email"),
          friendEmail
        );
        setMessageList(rsp.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [friendEmail]); // friendEmail이 변경될 때마다 호출

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage; // 현재 페이지의 마지막 항목 위치 계산
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 현재 페이지의 첫 번째 항목 위치 계산
  const currentItems = messageList.slice(indexOfFirstItem, indexOfLastItem); // 현재 페이지의 항목들을 잘라냄

  return (
    <>
      <ContainerBack>
        <Container>
          <TitelBox>
            <h1>메세지</h1>
          </TitelBox>
          <MessageContainer>
            {currentItems.map((postMsg, index) => (
              <MsgItem key={index}>
                <h1>{postMsg.content}</h1>
                <h5>{postMsg.receiveTime}</h5>
              </MsgItem>
            ))}
          </MessageContainer>

          <PageBtn>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              이전 페이지
            </button>

            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(messageList.length / itemsPerPage)
              }
            >
              다음 페이지
            </button>
          </PageBtn>
          <ButtonWrapper>
            <WriteButton>메세지 보내기</WriteButton>
            <Exit onClick={() => closeModal()} src={exit} />
          </ButtonWrapper>
        </Container>
      </ContainerBack>
    </>
  );
};

export default Message;

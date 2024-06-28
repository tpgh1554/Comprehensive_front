import styled from "styled-components";
import exit from "../image/exit.png";
import { useState, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";
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

  width: 30vw;
  height: 40vw;
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

const Message = ({ closeModal, friendEmail }) => {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const fechMessage = async () => {
      try {
        const rsp = await AxiosApi.messageList(
          localStorage.getItem("email"),
          friendEmail
        );
        console.log(rsp.data);
        console.log(localStorage.getItem("email"));
        setMessageList(rsp.data); // 백엔드에서 받아온 친구 목록을 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };

    fechMessage();
  }, []);

  return (
    <>
      <ContainerBack>
        <Container>
          <TitelBox>
            <h1>메세지</h1>
          </TitelBox>
          <div>
            {messageList &&
              messageList.map((postMsg) => (
                <>
                  <h1>{postMsg.content}</h1>

                  {postMsg.receiveTime}
                  {postMsg.sendMember.nickname}
                </>
              ))}
          </div>
          <Exit onClick={() => closeModal()} src={exit} />
        </Container>
      </ContainerBack>
    </>
  );
};

export default Message;

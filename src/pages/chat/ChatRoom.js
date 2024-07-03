//ChatRoom.js
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { FaPaperPlane, FaAngleLeft } from "react-icons/fa";

const ChatRoom = ({ roomId }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false); // 연결상태를 확인하는 state
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AxiosApi.getChatMessages(roomId);
        const fetchedMessages = response.data.map((msg) => ({
          ...msg,
          localDateTime: new Date(msg.localDateTime), // 서버에서 받은 시간으로 설정
        }));
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();

    const socket = new SockJS("http://localhost:8118/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log("Received data", str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = (frame) => {
      console.log("Connected:", frame);
      console.log("Connected to server version", frame.headers['version']);
      stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
        const messageBody = new TextDecoder().decode(message._binaryBody);
        const newMessage = JSON.parse(messageBody);
        newMessage.localDateTime = new Date(newMessage.localDateTime);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      stompClient.publish({
        destination: `/app/chat.sendMessage`,
        body: JSON.stringify({
          sender: localStorage.getItem("email"),
          content: `${localStorage.getItem("email")}님이 입장하셨습니다.`,
          roomId: roomId,
          type: "ENTER",
        }),
      });

      stompClientRef.current = stompClient; // 연결된 후에만 참조 설정
      setIsConnected(true); // 연결 상태 업데이트
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    stompClient.activate();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (isConnected && message.trim()) {
      stompClientRef.current.publish({
        destination: `/app/chat.sendMessage`,
        body: JSON.stringify({
          sender: localStorage.getItem("email"),
          content: message,
          roomId: roomId,
          type: "TALK",
          localDateTime: new Date().toISOString(),
        }),
      });
      setMessage("");
    } else {
      console.log("Cannot send message, STOMP client is not connected or message is empty");
    }
  };

  return (
    <Body>
      <Container>
        <Head>
          <div>프로젝트 채팅방</div>
        </Head>
        <Title>
          <BackButton onClick={() => navigate(-1)}>
            <p>
              <FaAngleLeft />
              나가기
            </p>
          </BackButton>
          <div>채팅방이름</div>
        </Title>
        <ChatBox>
          {messages.map((msg, index) => (
            <MessageItem key={index} isSender={msg.sender === localStorage.getItem("email")}>
              <Message isSender={msg.sender === localStorage.getItem("email")}>
                <MessageContent isSender={msg.sender === localStorage.getItem("email")}>
                  <p>{msg.content}</p>
                </MessageContent>
                <ProfileImage src="https://via.placeholder.com/40" alt="Profile" />
              </Message>
              <TimeInfo>{new Date(msg.localDateTime).toLocaleString()}</TimeInfo>
            </MessageItem>
          ))}
          <div ref={messagesEndRef} />
        </ChatBox>
        <Form onSubmit={handleSendMessage}>
          <TypingBox>
            <Input
              type="text"
              placeholder="메시지를 입력하세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </TypingBox>
          <SendButton>
            <FaPaperPlane type="submit" />
          </SendButton>
        </Form>
      </Container>
    </Body>
  );
};

export default ChatRoom;

const Body = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
`;
const Container = styled.div`
  overflow: auto;
  width: 60vw;
  height: auto;
  min-height: 700px;
  border: 0.5vi solid rgb(255, 83, 83);
  border-radius: 3vi;
  margin-top: 2vh;
`;

const Head = styled.div`
  width: 100%;
  height: 5vh;
  background-color: rgb(255, 83, 83);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Title = styled.div`
  width: 100%;
  height: 5vh;
  border-bottom: 0.5vi solid rgb(255, 83, 83);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box; // 외곽선 밖으로 안넘어가게
`;
const BackButton = styled.button`
  border: none;
  background: none;
  > p {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
  }
  transform: scale(1);
    transition: transform 5s ease;
    > :hover {
      transform: scale(1.2);
      transition: 0.5s;
    }
`;
const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 600px;
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const MessageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  margin-bottom: 1rem;
  padding: 0.5rem;
`;
const Message = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 70%;
  flex-direction: ${(props) => (props.isSender ? "row" : "row-reverse")};
`;
const TimeInfo = styled.div`
  white-space: nowrap;
`;
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 1vw;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.isSender ? "white" : "black")};
  background: ${(props) =>
    props.isSender
      ? "linear-gradient(to right, rgba(128, 0, 255, 0.9) 0%, rgba(64, 36, 255, 0.9) 60%, rgba(0, 80, 255, 0.8) 100%)"
      : "#E2E2E2"};
  border-radius: ${(props) => (props.isSender ? "2vw 2vw 0 2vw" : "2vw 2vw 2vw 0 ")};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  padding: 0.5vw 1vh;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #fff;
`;

const TypingBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 0.3vi solid rgb(255, 83, 83);
  border-radius: 4vi;
  margin-right: 1rem;
`;

const SendButton = styled.button`
  background-image: linear-gradient(
    to right,
    #9643ff 0%,
    #545bff 50%,
    #0094ff 100%
  );
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: auto;
  padding: 0.5rem 1rem;
`;
const Input = styled.input`
  border: none;
  width: 100%;
`;

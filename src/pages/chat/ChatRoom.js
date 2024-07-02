import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styled from "styled-components";
import { FaPaperPlane } from "react-icons/fa";

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8118/chat/room/${roomId}/messages`
        );
        const fetchedMessages = response.data.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp), // 서버에서 받은 시간으로 설정
        }));
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();

    // WebSocket 연결 설정
    const socket = new SockJS("http://localhost:8118/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = (frame) => {
      console.log("Connected: " + frame);
      stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
        console.log("Received message: ", message);

        // 이진 데이터를 문자열로 변환
        const messageBody = new TextDecoder().decode(message._binaryBody);
        const newMessage = JSON.parse(messageBody);
        newMessage.timestamp = new Date(newMessage.timestamp); // 현재 시간으로 설정
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // 사용자 입장 메시지 전송
      stompClient.publish({
        destination: `/app/chat.sendMessage`,
        body: JSON.stringify({
          sender: localStorage.getItem("email"),
          content: `${localStorage.getItem("email")}님이 입장하셨습니다.`,
          roomId: roomId,
          type: "ENTER",
        }),
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

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
    if (stompClientRef.current && message.trim()) {
      console.log("Sending message: ", message); // 추가 로그
      stompClientRef.current.publish({
        destination: `/app/chat.sendMessage`,
        body: JSON.stringify({
          sender: localStorage.getItem("email"), // 로그인된 사용자 이메일 사용
          content: message,
          roomId: roomId,
          type: "TALK",
          timestamp: new Date().toISOString(), // ISO 8601 형식의 현재 시간 설정
        }),
      });
      setMessage("");
    } else {
      console.log(
        "Cannot send message, stompClientRef.current is not active or message is empty"
      ); // 추가 로그
    }
  };

  return (
    <Body>
      <Container>
        <Head>
          <div>프로젝트 채팅방</div>
        </Head>
        <Title>
          <div>나가기</div>
          <div>채팅방이름</div>
        </Title>
        <ChatBox>
          {messages.map((msg, index) => (
            <MessageItem
              key={index}
              isSender={msg.sender === localStorage.getItem("email")}
            >
              <Message isSender={msg.sender === localStorage.getItem("email")}>
                <MessageContent
                  isSender={msg.sender === localStorage.getItem("email")}
                >
                  <b>{msg.sender}</b>
                  <p>{msg.content}</p>
                </MessageContent>
                <ProfileImage
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                />
              </Message>

              <TimeInfo>{new Date(msg.timestamp).toLocaleString()}</TimeInfo>
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
          <SendButton >
            <FaPaperPlane type="submit"/>
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
  overflow: hidden;
  width: 60vw;
  height: auto;
  min-height: 700px;
  border: 0.5vi solid rgb(255, 83, 83);
  border-radius: 4vi;
  margin-top: 2vh;
`;

const Head = styled.div`
  width: 100%;
  height: 5vh;
  background-color: rgb(255, 83, 83);
  border-radius: 3vi 3vi 0 0;
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
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box; // 외곽선 밖으로 안넘어가게
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
  /* margin: ${(props) =>
    props.isSender ? "0 0 0 0.5rem" : "0 0.5rem 0 0"}; */
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.isSender ? "white" : "black")};
  background: ${(props) =>
    props.isSender
      ? "linear-gradient(to right, rgba(128, 0, 255, 0.9) 0%, rgba(64, 36, 255, 0.9) 50%, rgba(0, 80, 255, 0.8) 100%)"
      : "#F2F2F2F2"};
  border-radius: 2vw 2vw 0 2vw;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  padding: 3vw;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #f9f9f9;
`;

const TypingBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid rgb(255, 83, 83);
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
  width: 100%;
`;

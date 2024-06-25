// ChatRoom.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8118/chat/room/${roomId}/messages`);
        const fetchedMessages = response.data.map(msg => ({
          ...msg,
          timestamp: new Date() // 현재 시간으로 설정
        }));
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    fetchMessages();

    // WebSocket 연결 설정
    const socket = new SockJS('http://localhost:8118/ws');
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
      console.log('Connected: ' + frame);
      stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
        console.log('Received message: ', message);
        const newMessage = JSON.parse(message.body);
        newMessage.timestamp = new Date(); // 현재 시간으로 설정
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // 사용자 입장 메시지 전송
      stompClient.publish({
        destination: `/app/chat.sendMessage`,
        body: JSON.stringify({
          sender: localStorage.getItem('email'),
          content: `${localStorage.getItem('email')}님이 입장하셨습니다.`,
          roomId: roomId,
          type: 'ENTER'
        })
      });
    };

    stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (stompClientRef.current && message.trim()) {
      stompClientRef.current.publish({
        destination: `/app/chat.sendMessage`,
        body: JSON.stringify({
          sender: localStorage.getItem('email'), // 로그인된 사용자 이메일 사용
          content: message,
          roomId: roomId,
          type: 'TALK',
          timestamp: new Date() // 현재 시간으로 설정
        })
      });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.sender}:</b> {msg.content} <br />
            <small>{msg.timestamp.toLocaleString()}</small> {/* 현재 시간으로 출력 */}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;







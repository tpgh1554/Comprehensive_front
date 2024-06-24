// ChatRoom.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/chat/room/${roomId}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    fetchMessages();

    // 사용자 입장 메시지 전송
    const sendEnterMessage = async () => {
      try {
        await axios.post(`http://localhost:8118/chat/room/${roomId}/messages`, {
          sender: localStorage.getItem('email'),
          content: `${localStorage.getItem('email')}님이 입장하셨습니다.`,
          roomId: roomId,
          type: 'ENTER',
        });

        // 메시지 목록을 다시 불러오기
        const response = await axios.get(`http://localhost:8118/chat/room/${roomId}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error sending enter message', error);
      }
    };

    sendEnterMessage();
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8118/chat/room/${roomId}/messages`, {
        sender: localStorage.getItem('email'), // 로그인된 사용자 이메일 사용
        content: message,
        roomId: roomId,
        type: 'TALK',
      });
      setMessage('');
      // 메시지 목록을 다시 불러오기
      const response = await axios.get(`http://localhost:8118/chat/room/${roomId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.sender}:</b> {msg.content} <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
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

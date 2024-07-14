import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import { UserContext } from "../../context/UserStore";
import CreateRoom from "./CreateRoom";
import styled from "styled-components";

const ChatManage = () => {
  const [rooms, setRooms] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();
  // 로그인 안 할시에 로그인 창으로 이동
  const context = useContext(UserContext);
  const { loginStatus } = context;
  useEffect(() => {
    if (!loginStatus) {
      navigate("/apueda/login");
    }
  }, []);

  useEffect(() => {
    const fetchProjectRooms = async () => {
      try {
        const memberId = localStorage.getItem("email");
        const response = await AxiosApi.getJoinedRooms(memberId);
        console.log(response.data);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchProjectRooms();
  }, []);
  useEffect(() => {
    const fetchOpenChatRooms = async () => {
      try {
        const response = await AxiosApi.getOpenChatList(false);
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchOpenChatRooms();
  }, []);

  const handleJoinRoom = async (roomId, roomName) => {
    try {
      const response = await AxiosApi.joinRoom(roomId);
      console.log(`Joining room with ID: ${roomId}`);
      navigate(`/chat/${roomId}`, { state: { roomName } });
    } catch (error) {
      console.error("Error joining room", error);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await AxiosApi.exitRoom(roomId);
      setRooms((prevRooms) =>
        prevRooms.filter((room) => room.roomId !== roomId)
      );
    } catch (error) {
      console.error("Error deleting room", error);
    }
  };

  return (
    <Container>
      <ModalBox>
        <CreateRoom />
      </ModalBox>
      <ProjectChatBox>
        <h2>참여중인 프로젝트 채팅방 목록</h2>
        <ul>
          {rooms.map((room) => (
            <List>
              <li key={room.roomId}>
                <a href="#" onClick={() => handleJoinRoom(room.roomId, room.roomName)}>
                  {room.roomName}
                </a>
                <button onClick={() => handleDeleteRoom(room.roomId)}>
                  삭제
                </button>
              </li>
            </List>
          ))}
        </ul>
      </ProjectChatBox>
      <OpenChatBox>
        <h2>오픈 채팅방</h2>
        {chatRooms.map((room) => (
          <List>
            <li key={room.roomId}>
              <a href="#" onClick={() => handleJoinRoom(room.roomId, room.roomName)}>
                {room.roomName}
              </a>
            </li>
          </List>
        ))}
      </OpenChatBox>
    </Container>
  );
};

export default ChatManage;
const ModalBox = styled.div`
  position: absolute;
  z-index: 100;
  display: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  justify-content: center;
  align-items: center;
`;
const ProjectChatBox = styled.div`
  margin: 20vh 5vw;
`;
const OpenChatBox = styled.div`
  margin: 20vh 5vw;
`;
const List = styled.div`
display: flex;
justify-content: flex-start;
  font-size: 40px;

  ul {
    margin-top: 80px; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
  }
  li {
    list-style-type: none;
    margin: 0; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
  }
`;

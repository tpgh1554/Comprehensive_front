import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import { UserContext } from "../../context/UserStore";
import CreateRoom from "./CreateRoom";
import styled from "styled-components";

const ChatManage = () => {
  const [myRooms, setMyRooms] = useState([]);
  const [myOpenChatRooms, setMyOpenChatRooms] = useState([]);
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
        setMyRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchProjectRooms();
  }, []);
  useEffect(() => {
    const fetchMyOpenChatRooms = async () => {
      try {
        const memberId = localStorage.getItem("email");
        const response = await AxiosApi.getJoinedOpenChatRooms(memberId);
        console.log(response.data);
        setMyOpenChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchMyOpenChatRooms();
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
      await AxiosApi.joinRoom(roomId);
      console.log(`Joining room with ID: ${roomId}`);
      navigate(`/chat/${roomId}`, { state: { roomName, roomType: "프로젝트" } });
    } catch (error) {
      console.error("Error joining room", error);
    }
  };
  const handleJoinOpenChatRoom = async (roomId, roomName) => {
    try {
      await AxiosApi.getJoinedOpenChatRooms(roomId);
      console.log(`Joining room with ID: ${roomId}`);
      navigate(`/chat/${roomId}`, { state: { roomName, roomType: "오픈" } });
    } catch (error) {
      console.error("Error joining room", error);
    }
  };
  // 프로젝트 채팅방 삭제
  const handleDeleteRoom = async (roomId) => {
    try {
      await AxiosApi.exitRoom(roomId);
      setMyRooms((prevRooms) =>
        prevRooms.filter((room) => room.roomId !== roomId)
      );
    } catch (error) {
      console.error("Error deleting room", error);
    }
  };
  // 오픈채팅방 삭제
  const handleDeleteOpenChatRoom = async (roomId) => {
    try {
      await AxiosApi.exitRoom(roomId);
      setMyOpenChatRooms((prevRooms) =>
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
      <Box>
      <MyProjectChatBox>
        <h2>참여중인 프로젝트 채팅방 목록</h2>
        <ul>
          {myRooms.map((room) => (
            <List key={room.roomId}>
              <li>
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
      </MyProjectChatBox>
      <MyOpenChatBox>
      <h2>참여중인 오픈 채팅방 목록</h2>
        <ul>
          {myOpenChatRooms.map((room) => (
            <List key={room.roomId}>
              <li>
                <a href="#" onClick={() => handleJoinOpenChatRoom(room.roomId, room.roomName)}>
                  {room.roomName}
                </a>
                <button onClick={() => handleDeleteOpenChatRoom(room.roomId)}>
                  삭제
                </button>
              </li>
            </List>
          ))}
        </ul>
      </MyOpenChatBox>
      </Box>
      <Box>
      <OpenChatList>
        <h2>오픈 채팅방</h2>
        <ul>
        {chatRooms.map((room) => (
          <List key={room.roomId}>
            <li>
              <a href="#" onClick={() => handleJoinRoom(room.roomId, room.roomName)}>
                {room.roomName}
              </a>
            </li>
          </List>
        ))}
        </ul>
      </OpenChatList>
      </Box>
      
      
    </Container>
  );
};

export default ChatManage;
const ModalBox = styled.div`
  //position: absolute;
  z-index: 100;
  //display: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  justify-content: center;
  align-items: flex-start;
`;
const Box = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
`
const MyProjectChatBox = styled.div`
  margin: 5vh 5vw;
`;
const MyOpenChatBox = styled.div`
margin: 5vh 5vw;
`;
const OpenChatList = styled.div`
  margin: 5vh 5vw;
`;
const List = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
  font-size: 1vw;

  ul {
    margin-top: 0; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
  }
  li {
    list-style-type: none;
    margin: 0; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
  }
`;

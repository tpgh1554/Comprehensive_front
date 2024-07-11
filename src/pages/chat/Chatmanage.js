import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import { UserContext } from "../../context/UserStore";

const ChatManage = () => {
  const [rooms, setRooms] = useState([]);
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
    const fetchRooms = async () => {
      try {
        const memberId = localStorage.getItem("email");
        const response = await AxiosApi.getJoinedRooms(memberId);
        console.log(response.data);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchRooms();
  }, []);

  const handleJoinRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
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
    <div>
      <h2>참여 중인 채팅방 목록</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.roomId}>
            {room.roomName}
            <button onClick={() => handleJoinRoom(room.roomId)}>입장</button>
            <button onClick={() => handleDeleteRoom(room.roomId)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatManage;

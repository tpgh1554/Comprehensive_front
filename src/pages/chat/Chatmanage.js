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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { loginStatus } = context;
  useEffect(() => {
    if (!loginStatus) {
      navigate("/apueda/login");
    }
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
      navigate(`/chat/${roomId}`, {
        state: { roomName, roomType: "프로젝트" },
      });
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Body>
      <Container>
        <ButtonBox>
          <ModalBox isVisible={isModalVisible}>
            <CreateRoom />
            <CloseButton onClick={toggleModal}>닫기</CloseButton>
          </ModalBox>
          <OpenChatButton onClick={toggleModal}>채팅방 만들기</OpenChatButton>
        </ButtonBox>
        <Box>
          <Item>
            <MyOpenChatBox>
              <p>참여중인 채팅방 목록</p>
              {myOpenChatRooms.map((room) => (
                <List key={room.roomId}>
                  <li>
                    <a
                      href="#"
                      onClick={() =>
                        handleJoinOpenChatRoom(room.roomId, room.roomName)
                      }
                    >
                      {room.roomName}
                    </a>
                    <DeleteButton onClick={() => handleDeleteOpenChatRoom(room.roomId)}>
                      삭제
                    </DeleteButton>
                  </li>
                </List>
              ))}
            </MyOpenChatBox>
          </Item>
          <Item>
            <OpenChatList>
              <p>오픈 채팅방</p>
              {chatRooms.map((room) => (
                <List key={room.roomId}>
                  <li>
                    <a
                      href="#"
                      onClick={() =>
                        handleJoinRoom(room.roomId, room.roomName)
                      }
                    >
                      {room.roomName}
                    </a>
                  </li>
                </List>
              ))}
            </OpenChatList>
          </Item>
        </Box>
      </Container>
    </Body>
  );
};

export default ChatManage;

const ModalBox = styled.div`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  margin: 0 15vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1920px;
  background-color: #ffffff;
  border: 1vw solid #ff5353;
  border-radius: 5vw;
  margin-top: 15vh;
  @media (max-width: 500px) {
    width: 100dvw;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 2vh 3vw 0 0;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

const Item = styled.div`
  flex-direction: row;
  & p{
    font-size: 2vw;
  }
`;

const MyOpenChatBox = styled.div`
  white-space: nowrap;
  margin: 1vh 1vw;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 30vw;
  height: auto;
  background-color: darkgoldenrod;
`;

const OpenChatList = styled.div`
  white-space: nowrap;
  margin: 1vh 1vw;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 30vw;
  height: auto;
  background-color: blueviolet;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 1.3vw;

  ul {
    margin-top: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  li {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    margin: 0.5vh 0;
    padding: 0;
    width: 100%; /* 너비를 추가 */
    overflow: hidden; /* 내용이 넘칠 경우 숨기기 */
    white-space: nowrap; /* 한 줄로 표시 */
    text-overflow: ellipsis; /* 넘친 내용은 생략 부호로 표시 */
    & > a {
      margin-right: 4vw;
      flex-grow: 1; /* 링크 요소가 남은 공간을 차지하도록 설정 */
      overflow: hidden; /* 내용이 넘칠 경우 숨기기 */
      white-space: nowrap; /* 한 줄로 표시 */
      text-overflow: ellipsis; /* 넘친 내용은 생략 부호로 표시 */
    }
  }
`;

const OpenChatButton = styled.button`
  width: 12vw;
  height: 6vh;
  background-color: #ff5353;
  color: white;
  border: none;
  border-radius: 1vw;
  font-size: 1.5vw;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ff7878;
  }
`;

const CloseButton = styled.button`
  background-color: #ff5353;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff7878;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff5353;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff7878;
  }
`;

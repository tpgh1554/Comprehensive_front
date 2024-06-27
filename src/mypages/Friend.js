import { Link } from "react-router-dom";
import styled from "styled-components";
import exit from "../image/exit.png";
import letter from "../image/letter.png";
import { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
import Message from "./Message";
const Container = styled.div`
  height: auto;
  width: 100vw;
  position: relative; /* 상대적 위치 설정 */
  display: flex;
  background-color: white;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ExitWrapper = styled.div``;

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

const Letter = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: black;

  @media (max-width: 700px) {
    font-size: 30px;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#ff5353" : "gray")};
  color: white;
  border: 1px solid black;
  padding: 6px;
  font-size: 20px;
  cursor: pointer;
  width: 25vw;
  &:hover {
    background-color: black;
  }
  @media (max-width: 700px) {
    width: 40vw;
  }
`;

const Friendcontainer = styled.div`
  width: 1000px;
  padding: 40px;
  padding-bottom: 20px;
  border: 3px solid #ff5353;
  border-radius: 30px;

  @media (max-width: 1200px) {
    width: 700px;
    padding-top: 10px;
    white-space: nowrap;
  }
  @media (max-width: 900px) {
    width: 500px;
    padding-top: 10px;
    white-space: nowrap;
  }
  @media (max-width: 500px) {
    width: 300px;
    white-space: nowrap;
  }
`;

const Requsetcontainer = styled.div`
  width: 700px;

  padding: 40px;
  padding-bottom: 10px;
  border: 3px solid #ff5353;
  border-radius: 30px;
  flex-direction: column;
  @media (max-width: 900px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    width: 300px;
  }
`;

const ItemGrid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, minmax(2vw, 1fr));
  margin-bottom: 50px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, minmax(2vw, 1fr));
    margin-bottom: 10px;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, minmax(2vw, 1fr));
    margin-bottom: 10px;
  }
`;

const FriendItem = styled.div`
  width: 25vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 3px solid #ff5353;
  border-radius: 30px;
  margin-top: 50px;

  @media (max-width: 1000px) {
    width: 40vw;
    margin-top: 20px;
  }

  @media (max-width: 800px) {
    width: 60vw;
    margin-top: 20px;
  }
  @media (max-width: 500px) {
    width: 60vw;
    margin-top: 20px;
  }
`;

const RequestItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid gray;
  margin-top: 30px;

  @media (max-width: 500px) {
    margin-top: 0px;
  }
`;

//감싸지 않으면  justify-content: space-between 코드 때문에 버튼의 간격도 벌어짐
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const ButtonStyle = styled.button`
  width: 70px;
  height: 30px;
  margin-left: 10px;
  color: white;
  background-color: #ff5353;
  border: none;
  border-radius: 30px;

  &:hover {
    cursor: pointer;
  }
`;

const Friend = () => {
  const [showFriend, setshowFriend] = useState(true);
  const [showApp, setShowApp] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendReq, setFriendReq] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriendEmail, setSelectedFriendEmail] = useState("");
  //메세지 보내기 모달창

  const openModal = (email) => {
    setSelectedFriendEmail(email); // 클릭한 친구의 이메일을 상태에 설정
    setIsModalOpen(true); // 모달 창 열기
    console.log(email);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //친구리스트
  useEffect(() => {
    const fechFriend = async () => {
      try {
        const rsp = await AxiosApi.friendlist(localStorage.getItem("email"));
        console.log(rsp.data);
        console.log(localStorage.getItem("email"));
        setFriends(rsp.data); // 백엔드에서 받아온 친구 목록을 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };

    fechFriend();
  }, []);

  //친구요청관리
  useEffect(() => {
    const fechFriendRequest = async () => {
      try {
        const rsp = await AxiosApi.friendRequestList(
          localStorage.getItem("email")
        );
        console.log(rsp.data);
        console.log(localStorage.getItem("email"));
        setFriendReq(rsp.data); // 백엔드에서 받아온 친구 목록을 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };

    fechFriendRequest();
  }, []);

  const friendDelete = async (memberEmail, friendEmail) => {
    const confirm = window.confirm("친구를 삭제하시겠습니까?");
    if (confirm) {
      try {
        // API를 호출하여 게시글 삭제
        await AxiosApi.friendDelete(memberEmail, friendEmail);
        // 삭제 성공 시, 상태 업데이트 등 추가 로직 처리
        console.log(friendEmail);
        console.log("삭제 성공");
        window.alert("삭제 완료");
        window.location.reload();
      } catch (error) {
        console.error("삭제 오류", error);
        console.log(friendEmail);
        console.log(memberEmail);
      }
    }
  };

  //요청 수락
  const requsetAccept = async (memberEmail, toMemberEmail) => {
    try {
      await AxiosApi.friendRequestAccept(memberEmail, toMemberEmail);
      console.log("친추 성공");
      window.alert("추가 완료");
      window.location.reload();
    } catch (error) {
      console.error("오류 : ", error);
      console.log(memberEmail);
      console.log(toMemberEmail);
    }
  };

  //요청 거절
  const requestReject = async (memberEmail, toMemberEmail) => {
    try {
      await AxiosApi.friendRequestReject(memberEmail, toMemberEmail);
      console.log("거절 완료");
      window.alert("거절 완료");
      window.location.reload();
    } catch (error) {
      console.error("오류 : ", error);
      console.log(memberEmail);
      console.log(toMemberEmail);
    }
  };

  return (
    <>
      <Container>
        <Title>친구</Title>

        <ButtonContainer>
          <Button
            primary={showFriend ? true : false}
            onClick={() => {
              setshowFriend(true);
              setShowApp(false);
            }}
          >
            친구 목록
          </Button>

          <Button
            primary={showApp ? true : false}
            onClick={() => {
              setshowFriend(false);
              setShowApp(true);
            }}
          >
            요청
          </Button>
        </ButtonContainer>

        {showFriend && (
          <Friendcontainer>
            <ItemGrid>
              {friends.map((friend) => (
                <div key={friend.friendId}>
                  <FriendItem>
                    {/* 친구 이름이 user/touser에 있기 때문에 두 가지로 부름*/}
                    {friend.member ? friend.member.name : null}
                    {friend.member ? friend.member.nickname : null}
                    {friend.toMember ? friend.toMember.name : null}
                    {friend.toMember ? friend.toMember.nickname : null}

                    <ButtonWrapper>
                      {/* Letter Del로 감싸지 않으면 삭제와 메세지가 space-between으로 멀어짐*/}
                      <Letter
                        src={letter}
                        onClick={() => {
                          openModal(
                            friend.member
                              ? friend.member.email
                              : friend.toMember.email
                          );
                        }}
                      />
                      <ButtonStyle
                        onClick={() =>
                          friendDelete(
                            localStorage.getItem("email"),
                            friend.member
                              ? friend.member.email
                              : friend.toMember.email
                          )
                        }
                      >
                        삭제
                      </ButtonStyle>
                    </ButtonWrapper>
                  </FriendItem>
                </div>
              ))}
            </ItemGrid>
            <ExitWrapper>
              <Link to="/apueda/mypage">
                <Exit src={exit} />
              </Link>
            </ExitWrapper>
          </Friendcontainer>
        )}

        {showApp && (
          <Requsetcontainer>
            {friendReq.map((requset) => (
              <RequestItem>
                <div key={requset.friendId}>{requset.member.nickname} </div>
                <ButtonWrapper>
                  <ButtonStyle
                    onClick={() =>
                      requsetAccept(
                        requset.member.email,
                        localStorage.getItem("email")
                      )
                    }
                  >
                    수락
                  </ButtonStyle>
                  <ButtonStyle
                    onClick={() =>
                      requestReject(
                        requset.member.email,
                        localStorage.getItem("email")
                      )
                    }
                  >
                    거절
                  </ButtonStyle>
                </ButtonWrapper>
              </RequestItem>
            ))}

            <ExitWrapper>
              <Link to="/apueda/mypage">
                <Exit src={exit} />
              </Link>
            </ExitWrapper>
          </Requsetcontainer>
        )}
      </Container>

      {isModalOpen && (
        <Message closeModal={closeModal} friendEmail={selectedFriendEmail} />
      )}
    </>
  );
};

export default Friend;

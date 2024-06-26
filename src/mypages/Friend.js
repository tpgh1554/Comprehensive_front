import { Link } from "react-router-dom";
import styled from "styled-components";
import exit from "../image/exit.png";
import letter from "../image/letter.png";
import { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
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
  margin-top: 3vw;
  @media (max-width: 700px) {
    font-size: 30px;
    margin-top: 10vw;
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

const Contentcontainer = styled.div`
  width: 1000px;
  padding: 40px;
  padding-bottom: 20px;
  border: 3px solid #ff5353;
  border-radius: 30px;
  @media (max-width: 900px) {
    width: 80vw;
  }
  @media (max-width: 500px) {
    width: 85vw;
  }
`;

const ItemGrid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, minmax(2vw, 1fr));
  margin-bottom: 50px;
`;

const FriendItem = styled.div`
  width: 20vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 3px solid #ff5353;
  border-radius: 30px;
`;

const Letter_Del = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const DeleteButton = styled.button`
  width: 70px;
  height: 30px;
  margin-left: 10px;
  color: white;
  background-color: #ff5353;
  border: none;
  border-radius: 30px;
`;

const Friend = () => {
  const [showFriend, setshowFriend] = useState(true);
  const [showApp, setShowApp] = useState(false);
  const [friends, setFriends] = useState([]);

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

  const friendDelete = async (userEmail, friendEmail) => {
    const confirm = window.confirm("친구를 삭제하시겠습니까?");
    if (confirm) {
      try {
        // API를 호출하여 게시글 삭제
        await AxiosApi.friendDelete(userEmail, friendEmail);
        // 삭제 성공 시, 상태 업데이트 등 추가 로직 처리
        console.log(friendEmail);
        console.log("삭제 성공");
        window.alert("삭제 완료");
        window.location.reload();
      } catch (error) {
        console.error("삭제 오류", error);
        console.log(friendEmail);
        console.log(userEmail);
      }
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
          <Contentcontainer>
            <ItemGrid>
              {friends.map((friend) => (
                <div key={friend.friendId}>
                  <FriendItem>
                    {/* 친구 이름이 user/touser에 있기 때문에 두 가지로 부름*/}
                    {friend.user ? friend.user.name : null}
                    {friend.user ? friend.user.nickname : null}
                    {friend.toUser ? friend.toUser.name : null}
                    {friend.toUser ? friend.toUser.nickname : null}

                    <Letter_Del>
                      {/* Letter Del로 감싸지 않으면 삭제와 메세지가 space-between으로 멀어짐*/}
                      <Letter src={letter} />
                      <DeleteButton
                        onClick={() =>
                          friendDelete(
                            localStorage.getItem("email"),
                            friend.user
                              ? friend.user.email
                              : friend.toUser.email
                          )
                        }
                      >
                        삭제
                      </DeleteButton>
                    </Letter_Del>
                  </FriendItem>
                </div>
              ))}
            </ItemGrid>
            <ExitWrapper>
              <Link to="/apueda/mypage">
                <Exit src={exit} />
              </Link>
            </ExitWrapper>
          </Contentcontainer>
        )}

        {showApp && (
          <Contentcontainer>
            <ExitWrapper>
              <Link to="/apueda/mypage">
                <Exit src={exit} />
              </Link>
            </ExitWrapper>
          </Contentcontainer>
        )}
      </Container>
    </>
  );
};

export default Friend;

// card.js 
import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import TinderCard from "react-tinder-card";
import { FaRegCircleCheck } from "react-icons/fa6"; // 좋아요 오른쪽드래그 아이콘
import { FaRegCircleXmark } from "react-icons/fa6"; // 싫어요 왼쪽 드래그 아이콘
import { FaArrowRotateLeft } from "react-icons/fa6"; // REDO 아이콘

function DatingApp() {
  const [cardList, setCardList] = useState([]);
  const [likedList, setLikedList] = useState([]); // 좋아요 누른 사람들은 현재페이지에서 나갈때 일괄 신청 되도록 리스트에 입력
  const myEmail = localStorage.getItem('email')

  useEffect(() => {
    const showUserInfo = async () => {
      try {
        const response = await AxiosApi.getCardList(myEmail); // AxiosApi에서 사용자 정보를 가져옴
        const userList = response.data.map((user) => ({
          email : user.email,
          nickname: user.nickname,
          url: user.profileImgPath,
          skill: user.skill,
          info: user.myInfo,
        }));
        setCardList(userList); // 변환된 데이터를 카드에 넣어줌
        setCurrentIndex(userList.length - 1);
        console.log(userList);
      } catch (error) {
        console.log(error);
      }
    };
    showUserInfo();
  }, [myEmail]);

  const userInfo = [
    {
      nickname: "오링",
      skill: "Java",
      my_info: "카페에서 모각코 할 사람?",
      url: "https://image.fmkorea.com/files/attach/new3/20231220/4366334379/1972135478/6526193738/e44c60321973d21a2beede402b64f152.jpeg",
    },
    {
      nickname: "준빈쿤",
      skill: "React",
      my_info: "리액트 개발자 입니다.",
      url: "https://entertainimg.kbsmedia.co.kr/cms/uploads/BBSIMAGE_20230613095006_03c551d7255312cf0f13ad58165ce3ba.png",
    },
    {
      nickname: "김랩틸리언",
      skill: "Python",
      my_info: "하버드대학교 출신 개발자입니다. 질문은 언제나 환영 ㅎㅎ",
      url: "https://img.appstory.co.kr/@files/monthly.appstory.co.kr/content/201208/1346044725.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(userInfo.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(userInfo.length)
        .fill(0)
        .map((i) => React.createRef()),
    [cardList.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < userInfo.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    
    if (direction === "right") {
      setLikedList((prev) => [...prev, cardList[index]]);
    } else if (direction === 'left') { // 왼쪽으로 넘겼을 때 실행 함수 (싫어요

    }
    if (index === 0) {

    }
    if (index === 0) { // 카드가 더이상 없으면 마지막카드가 사라지고 알림 출력위해 지연시간 설정
      setTimeout( () => {
        if (window.confirm("더이상 카드가 없습니다. 모든 친구 신청을 보내고 메인페이지로 이동하시겠습니까? (취소 시 페이지이동 X)")) {
          likedList.forEach(async (user) => {
            try {
              const response = await AxiosApi.friendRequest(myEmail, user.email);
              console.log("Response:", response.data);
            } catch (error) {
              console.error("Error sending friend request:", error);
            }
          });
          window.location.href = "/"; // 메인 페이지로 이동
        } else {
          
        };
      }, 1500); 
    }
  };
  // 카드가 화면 밖으로 나간 이후 로직
  const outOfFrame = (nickname, idx) => {
    console.log(
      `${nickname} (${idx}) 카드 제거!`,
      currentIndexRef.current
    );
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < userInfo.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <Body>
      <PhoneFrame>
        <Title>
          <div>카드를 모두 확인 해주세요!</div>
        </Title>
        <Window>
          {cardList.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.nickname}
              onSwipe={(dir) => swiped(dir, character.nickname, index)}
              onCardLeftScreen={() => outOfFrame(character.nickname, index)}
            >
              <CardImage
                style={{
                  backgroundImage: "url(" + character.url + ")",
                }}
                className="card"
              >
                <SpanBox>
                  <Span>
                    {character.nickname}
                    <br />
                  </Span>
                  <Span>
                    #{character.skill}
                    <br />
                  </Span>
                  <Span>
                    {character.info}
                    <br />
                  </Span>
                </SpanBox>
              </CardImage>
            </TinderCard>
          ))}
        </Window>
        <ButtonArea>
          <Buttons>
            <button
              style={{ backgroundColor: !canSwipe && "#a1a1a1" }}
              onClick={() => swipe("left")}
            >
              PASS
            </button>
            <button
              style={{
                backgroundColor: !canGoBack && "#a1a1a1",
              }}
              onClick={() => goBack()}
            >
              <FaArrowRotateLeft color="#000000" />
            </button>
            <button
              style={{
                backgroundColor: !canSwipe && "#a1a1a1",
              }}
              onClick={() => swipe("right")}
            >
              LIKE
            </button>
          </Buttons>
          {lastDirection ? (
            <ResultBox key={lastDirection}>
              You swiped {lastDirection}
            </ResultBox>
          ) : (
            <ResultBox>
              Swipe a card or press a button to get Restore Card button visible!
            </ResultBox>
          )}
        </ButtonArea>
      </PhoneFrame>
    </Body>
  );
}
export default DatingApp;

const Body = styled.div`
  width: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const PhoneFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 30vw;
  height: 80vh;
  background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
  border-radius: 4dvi;

  & * {
    user-select: none;
  }
  @media (max-width: 625px) {
    .buttons {
      flex-direction: column;
    }
  }
  @keyframes popup {
    0% {
      transform: scale(1, 1);
    }
    10% {
      transform: scale(1.1, 1.1);
    }
    30% {
      transform: scale(0.9, 0.9);
    }
    50% {
      transform: scale(1, 1);
    }
    57% {
      transform: scale(1, 1);
    }
    64% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;
// 앱모양 창 내부 와이드값 Window, Title, BottonArea
const widthvalue = "28vw";
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${widthvalue};
  height: 10vh;
  background-color: white;
  border-radius: 3.3vi 3.3vi 0 0;
  margin-top: 2vh;
  padding-top: 1vh;
  & div {
    font-size: 2vw;
  }
`;

const Window = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: ${widthvalue};
  min-height: 55vh;
  background-color: white;
  & > *:nth-child(2) {
    // 두번째 요소인 tinder card 설정 부분 현재 일부 카드만 선택되어 수정 필요
  }
`;
// 카드 이미지 설정
const CardImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // 절대위치의 카드를 가운데 정렬하기 위해 사용
  width: 20vw;
  height: 50vh;
  border-radius: 2vh;
  box-sizing: border-box;
  box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-position: center;
  background-repeat: space;
`;
const ButtonArea = styled.div`
  width: ${widthvalue};
  background-color: white;
  border-radius: 0 0 3.3vi 3.3vi;
  white-space: nowrap;
  margin-bottom: 5vh;
  padding-bottom: 2vh;
`;
const ResultBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5vmin;
  color: #000;
  animation-name: popup;
  animation-duration: 800ms;
  flex-shrink: 1; /* 버튼이 부모 크기에 맞춰 작아지도록 설정 */
  flex-grow: 1;
`;
//카드 내부 정보 정렬
const SpanBox = styled.div`
  position: absolute;
  font-size: 1.5vh;
  bottom: 0;
  margin: 30px 5px;
  color: #fff;
`;
const Span = styled.span`
  display: flex;
  align-self: flex-start;
  justify-content: left;
  text-align: left;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: center; // 좌우 가운데 정렬
  align-content: center;
  margin-top: auto; // 부모가 column방향이고 자식이 margin-top : auto면 맨 아래 위치
  margin-bottom: 1vh;
  width: 100%;
  white-space: nowrap;
  box-sizing: border-box;
  & button {
    display: flex;
    justify-content: center; // 좌우 가운데 정렬
    align-content: center;
    width: 10vw;
    height: 5vh;
    text-align: center;
    border: 0.5vw solid #ff5253;
    border-radius: 3vw;
    font-size: 3vmin;
    font-weight: bolder;
    color: #ffffff;
    -webkit-text-stroke: 0.3vh #000000;
    background-color: #ffffff;
    transition: 200ms;
    margin: 0 10px;
    white-space: nowrap;
    flex-shrink: 1; /* 버튼이 부모 크기에 맞춰 작아지도록 설정 */
    flex-grow: 1;
    cursor: pointer;
  }
  :hover {
    transform: scale(1.05);
  }
`;

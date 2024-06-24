import { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import styled from "styled-components";
import file from "../image/file.png";
import chat from "../image/chat.png";
import friend from "../image/friend.png";
import mobile from "../image/mobile-in-hand.png";
import card from "../image/credit-card.png";
import profile from "../image/profile.png";
import logout from "../image/logout.png";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}

export default function NaviBar() {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);

  return (
    <Body>
      <Container className="menu" ref={scope}>
        <Box>
          <ProfileButton />
          <motion.button
            style={{
              border: 0,
              backgroundColor: "transparent",
              width: "60px",
              height: "60px",
              fontSize: "40px",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            😎
            <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
              <svg width="15" height="15" viewBox="0 0 20 20">
                <path d="M0 7 L 20 7 L 10 16" />
              </svg>
            </div>
          </motion.button>
          <List>
            <ul
              style={{
                pointerEvents: isOpen ? "auto" : "none",
                clipPath: "inset(10% 50% 90% 50% round 10px)",
                listStyle: "none",
              }}
            >
              <MenuItem>
                <Img src={file} />
                <Overlay>게시판</Overlay>
              </MenuItem>
              <MenuItem>
                <Img src={chat} />
                <Overlay>채팅</Overlay>
              </MenuItem>
              <MenuItem>
                <Img src={friend} />
                <Overlay>친구관리</Overlay>
              </MenuItem>
              <MenuItem>
                <Img src={mobile} />
                <Overlay>개발자<br/> 매칭</Overlay>
              </MenuItem>
              <MenuItem>
                <Img src={card} />
                <Overlay>구독관리</Overlay>
              </MenuItem>
              <MenuItem>
                <Img src={profile} />
                <Overlay>내정보</Overlay>
              </MenuItem>
              <MenuItem>
                <Img src={logout} />
                <Overlay>로그아웃</Overlay>
              </MenuItem>
            </ul>{" "}
          </List>
        </Box>
      </Container>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  margin: 0 15vw;
`;
const Container = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  margin: 7vh -100px 0 0; // 네비바 위치
  flex-direction: column;
  align-self: flex-end; /* 자신을 교차축 방향으로 오른쪽 정렬 */
  align-items: center; // 하위 아이템 정렬
  
`;

const Box = styled.div`
  width: auto;
  height: auto;
  box-sizing: border-box;
`;

const ProfileButton = styled.div`
  position: "fixed";
  bottom: -210;
  left: 200;
  width: 100;
  height: 100;
  background-color: "white";
`;
const List = styled.div`
  font-size: 40px;

  ul {
    margin: 20px; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
  }
  li {
    margin: 0; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
  }
`;
const Arrow = styled.div``;
const Img = styled.img`
  width: 60px;
  height: 60px;
  background-size: contain;
`;
const Overlay = styled.div`
  position: absolute;
  color: rgb(255,255,255);
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const MenuItem = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(150, 150, 255, 0.9);
    border-radius: 50px;
  }

  &:hover ${Img} {
    opacity: 0.5;
  }

  &:hover ${Overlay} {
    opacity: 1;
  }
`;



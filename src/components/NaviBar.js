//NaviBar.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimate, stagger, motion } from "framer-motion";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
import defaultImage from "../image/person-icon2.png";
import file from "../image/file.png";
import chat from "../image/chat.png";
import friend from "../image/friend.png";
import phone from "../image/mobile-in-hand.png";
import card from "../image/credit-card.png";
import profile from "../image/profile.png";
import loginIcon from "../image/login-icon.png";
import logout from "../image/logout.png";

export default function NaviBar() {
  const email = localStorage.getItem("email");
  const isLoginUser = localStorage.getItem("accessToken") !== null;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const rsp = await AxiosApi.getUserInfo2();
        setUserInfo(rsp.data); // API로부터 받은 데이터를 상태에 저장
        console.log(rsp.data);
        if (rsp.data && rsp.data.profileImgPath) {
          setImageUrl(rsp.data.profileImgPath);
          localStorage.setItem("imgUrl", imageUrl);
        } else {
          setImageUrl(defaultImage);
        }
      } catch (e) {
        console.log(e);
        setImageUrl(defaultImage);
      }
    };
    fetchUserInfo();
  }, [email]);
  const scope = useMenuAnimation(isOpen);

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

  return (
    <Body>
      <Container className="menu" ref={scope}>
        <Box>
          <ProfileButton>
            <motion.button
              style={{
                width: "60px",
                height: "60px",
                border: 0,
                backgroundColor: "transparent",
                fontSize: "40px",
              }}
              whileHover={{ scale: 1.1 }} // 마우스 호버 시 이미지 커짐
              whileTap={{ scale: 0.95 }} // 클릭 시 이미지 작아짐
              onClick={() => setIsOpen(!isOpen)}
            >
              <ProfileImage>
                <img src={imageUrl} alt="User Profile" />
              </ProfileImage>
              <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                {/* <svg display="block" width="20" height="20" viewBox="0 0 20 20">
                  <path d="M0 7 L 20 7 L 10 16" />
                </svg> */}
              </div>
            </motion.button>
          </ProfileButton>
          <List>
            <ul
              style={{
                pointerEvents: isOpen ? "auto" : "none",
                clipPath: "inset(10% 50% 90% 50% round 10px)",
                listStyle: "none",
              }}
            >
              <MenuItem onClick={() => navigate("/apueda/board")}>
                <Img src={file} />
                <Overlay>게시판</Overlay>
              </MenuItem>
              <MenuItem onClick={() => navigate("/apueda/chatmanage")}>
                <Img src={chat} />
                <Overlay>채팅</Overlay>
              </MenuItem>
              <MenuItem>
                <Img src={friend} />
                <Overlay>친구관리</Overlay>
              </MenuItem>
              <MenuItem onClick={() => navigate("/apueda/datingapp")}>
                <Img src={phone} />
                <Overlay>
                  개발자
                  <br /> 매칭
                </Overlay>
              </MenuItem>
              <MenuItem onClick={() => navigate("/apueda/mysub")}>
                <Img src={card} />
                <Overlay>구독관리</Overlay>
              </MenuItem>
              <MenuItem onClick={() => navigate("/apueda/mypage")}>
                <Img src={profile} />
                <Overlay>내정보</Overlay>
              </MenuItem>
              <MenuItem
                isLoginUser={isLoginUser}
                onClick={() => navigate("/apueda/login")}
              >
                <Img src={loginIcon} />
                <Overlay>로그인</Overlay>
              </MenuItem>
              <MenuItem
                isLoginUser={!isLoginUser}
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                  alert("로그아웃 되었습니다. (localStorage 모두 삭제)");
                }}
              >
                <Img src={logout} />
                <Overlay>로그아웃</Overlay>
              </MenuItem>
            </ul>
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
  margin: 10vh -80px 0 0; // 네비바 위치
  flex-direction: column;
  align-self: flex-end; /* 자신을 교차축 방향으로 오른쪽 정렬 */
  align-items: center; // 하위 아이템 정렬
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  height: auto;
  box-sizing: border-box;
`;

const ProfileButton = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
`;
const List = styled.div`
  font-size: 40px;

  ul {
    margin-top: 80px; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
  }
  li {
    margin: 0; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
  }
`;
const Arrow = styled.div`
  display: none;
  margin: 0;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;

  background-size: contain;
`;
const ProfileImage = styled.div`
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 100%;
    border: 7px solid rgba(150, 150, 150, 0.5);
  }
`;
const Overlay = styled.div`
  position: absolute;
  color: rgb(255, 255, 255);
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const MenuItem = styled(motion.li).withConfig({
  shouldForwardProp: (prop) => !["isLoginUser", "isLogOutUser"].includes(prop),
})`
  // props를 다른 컴포넌트에 전달하지 않도록 막는 코드
  position: relative;
  display: ${(props) =>
    props.isLoginUser
      ? "none"
      : "flex"}; // 로그인 상태이면 안보이고, 로그인 상태이면 보이도록 설정
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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

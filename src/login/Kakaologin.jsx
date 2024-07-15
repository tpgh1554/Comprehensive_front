import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import Addinfomodal from "../login/Addinfomodal";

const Kalogbox = styled.div`
  color: black;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #ffeb00;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
`;

const Kakaologin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [accToken, setAccToken] = useState("");
  const context = useContext(UserContext);
  const { setLoginStatus } = context;
  const [addinfomodal, setAddinfomodal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileimgPath, setProfileImgPath] = useState("");
  const [nickname, setNickname] = useState("");

  const onAddClickSub = () => {
    setAddinfomodal(true);
  };
  const closeAddSub = () => {
    setAddinfomodal(false);
  };

  const handleAddInfoConfirm = async (identityNumber, name, myInfo, skill) => {
    const user = {
      email,
      password,
      name,
      nickname,
      identityNumber,
      myInfo,
      profileimgPath,
      skill,
    };
    try {
      const response = await AxiosApi.signup(user);
      console.log("Signup 성공:", response);

      const rsp = await AxiosApi.login(email, password);
      localStorage.setItem("email", userInfo.kakao_account.email); // 삭제 예정
      setAccToken(rsp.data.accessToken);
      localStorage.setItem("accessToken", rsp.data.accessToken);
      localStorage.setItem("refreshToken", rsp.data.refreshToken);
      console.log(accToken);
      navigate("/apueda");
      setLoginStatus(true);
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  useEffect(() => {
    const initializeKakaoSDK = async () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("9c189b423acf9491542d699c75845c04"); // 여기에 자신의 앱의 JavaScript 키를 넣으세요
      }
    };

    initializeKakaoSDK();

    const handleAuthCode = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        try {
          const tokenResponse = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            null,
            {
              params: {
                grant_type: "authorization_code",
                client_id: "3ba0bffc2b4266d667888058f56bdfbe", // 여기에 앱 REST API 키를 넣으세요
                redirect_uri: "http://localhost:3000/apueda/kakaologin",
                code: code,
              },
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          );

          const { access_token } = tokenResponse.data;
          console.log("토큰", access_token);

          window.Kakao.Auth.setAccessToken(access_token);

          window.Kakao.API.request({
            url: "/v2/user/me",
          })
            .then(async function (response) {
              console.log("사용자정보:", response);
              setUserInfo(response);
              setEmail(response.kakao_account.email);
              setPassword(response.id);
              setNickname(response.properties.nickname);
              setProfileImgPath(response.properties.profile_image);

              const userLookup = await AxiosApi.userCheck(
                response.kakao_account.email
              );
              console.log(userLookup);

              if (userLookup.data === true) {
                const rsp = await AxiosApi.login(
                  response.kakao_account.email,
                  response.id
                );
                localStorage.setItem("email", response.kakao_account.email); // 삭제 예정
                setAccToken(rsp.data.accessToken);
                localStorage.setItem("accessToken", rsp.data.accessToken);
                localStorage.setItem("refreshToken", rsp.data.refreshToken);
                console.log(accToken);
                navigate("/apueda");
                setLoginStatus(true);
              } else {
                onAddClickSub();
              }
            })
            .catch(function (error) {
              console.error("사용자 정보 요청 실패:", error);
            });
        } catch (error) {
          console.error("토큰 요청 실패:", error);
        }
      }
    };

    handleAuthCode();
  }, []);

  const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/apueda/kakaologin",
    });
  };

  return (
    <Kalogbox>
      {userInfo ? (
        <div>
          <h2>{userInfo.kakao_account.profile.nickname}님 환영합니다!</h2>
          <img
            src={userInfo.kakao_account.profile.profile_image_url}
            alt="Profile"
          />
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      ) : (
        <Button onClick={kakaoLogin}>카카오 로그인</Button>
      )}
      <Addinfomodal
        open={addinfomodal}
        close={closeAddSub}
        header="추가정보 입력"
        handleAddInfoConfirm={handleAddInfoConfirm} // onConfirm prop 추가
      />
    </Kalogbox>
  );
};

export default Kakaologin;

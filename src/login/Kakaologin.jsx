import React, { useEffect } from "react";
import styled from "styled-components";

const Kalogbox = styled.div`
  color: black;
  font-size: 10px;
`;

const Kakaologin = () => {
  useEffect(() => {
    // Kakao SDK 초기화
    const initializeKakaoSDK = async () => {
      if (!window.Kakao.isInitialized()) {
        await window.Kakao.init("3ba0bffc2b4266d667888058f56bdfbe"); // 여기에 앱 REST API 키를 넣으세요
      }
    };

    initializeKakaoSDK();
  }, []);

  const kaklog = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/apueda/kakaologin", // 여기에 리디렉션 URI를 넣으세요
    });
  };

  return (
    <Kalogbox>
      <button onClick={kaklog}>카카오 로그인</button>
    </Kalogbox>
  );
};

export default Kakaologin;

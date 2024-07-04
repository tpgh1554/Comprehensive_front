import { Container, ContainerBack } from "../../style/ModalStyle.js";
import AxiosApi from "../../api/AxiosApi.js";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../style/WriteStyle.js";
import styled from "styled-components";

const Notice = styled.div``;
const Input = styled.input``;
const PasswordModal = ({ onRoomNameSave, closePwModal, onClick }) => {
  const modalRef = useRef(null);
  const [inputRoomName, setInputRoomName] = useState(""); // 채팅방(플젝)이름 입력 상태 관리
  // 모달 외 다른 곳 클릭 시 모달 닫기
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closePwModal();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleSave = async () => {
    try {
      await onRoomNameSave(inputRoomName);
      onClick(inputRoomName);
      setInputRoomName("");
      closePwModal();
    } catch (error) {
      console.error("Error saving:", error);
      // Handle error saving room name or password if needed
    }
  };
  return (
    <ContainerBack>
      <Container ref={modalRef} style={{ width: "500px", height: "500px" }}>
        <Notice>
          <span>프로젝트 채팅방의 이름을 입력해주세요</span>
        </Notice>
        방이름
        <Input
          onChange={(e) => setInputRoomName(e.target.value)}
          value={inputRoomName}
        ></Input>
        <Button onClick={handleSave}>저장</Button>
      </Container>
    </ContainerBack>
  );
};

export default PasswordModal;

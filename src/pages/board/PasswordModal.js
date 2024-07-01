import { Container, ContainerBack } from "../../style/ModalStyle.js";
import AxiosApi from "../../api/AxiosApi.js";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../style/WriteStyle.js";
import styled from "styled-components";

const Notice = styled.div``;
const Input = styled.input``;
const PasswordModal = ({ closePwModal, onPasswordSave, onClick }) => {
  const modalRef = useRef(null);
  const [inputPassword, setInputPassword] = useState(""); // 입력된 비밀번호 상태 추가

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
  const handleSave = () => {
    onPasswordSave(inputPassword);
    onClick();
    closePwModal();
  };
  return (
    <ContainerBack>
      <Container ref={modalRef} style={{ width: "500px", height: "500px" }}>
        <Notice>
          <span>프로젝트 채팅방 입장시 사용할 비밀번호를 입력해주세요</span>
        </Notice>
        <Input onChange={(e) => setInputPassword(e.target.value)}></Input>
        <Button onClick={handleSave}>저장</Button>
      </Container>
    </ContainerBack>
  );
};

export default PasswordModal;

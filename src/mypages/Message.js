import styled from "styled-components";
import exit from "../image/exit.png";

const ContainerBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30vw;
  height: 40vw;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ff5353;
  border: 2px solid black;
  border-radius: 100px;
  z-index: 1000;

  @media (max-width: 500px) {
    width: 80vw;
    height: 500px;
  }
`;

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

const TitelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 4vw;
  color: white;
  border-radius: 30px;
  background-color: #ff5353;
  font-size: 20px;

  @media (max-width: 500px) {
    font-size: 10px;
    width: 50vw;
    height: 6vh;
    top: 20px;
  }
`;

const Message = ({ closeModal, friendEmail }) => {
  return (
    <>
      <ContainerBack>
        <Container>
          <TitelBox>
            <h1>메세지</h1>
          </TitelBox>
          <Exit onClick={() => closeModal()} src={exit} />
        </Container>
      </ContainerBack>
    </>
  );
};

export default Message;

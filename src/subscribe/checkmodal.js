import React from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 30%;
    height: 200px;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      position: relative;
      text-align: center;
      padding: 16px 64px;
      background-color: #ff5353;
      font-weight: 700;
    }
    main {
      padding: 16px;
      border-top: 1px solid #dee2e6;
      height: 130px;
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Butbox = styled.div`
  width: 100%;
  align-items: center;
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  color: white;
  background-color: #ff5353;
  border: 0;
  width: 50px;
  height: 30px;
`;

const CheckModal = (props) => {
  const { open, confirm, close, type, header, children } = props;

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>{header}</header>
            <main>{children}</main>
            <Butbox>
              <Button onClick={confirm}>확인</Button>
            </Butbox>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default CheckModal;

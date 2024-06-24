import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logosidefont from "../components/logosidefont";
import Termsmodal from "./terms";

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
    width: 80%;
    height: 90%;
    margin: 0 auto;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    display: flex;
    label {
      font-size: 18px;
      position: absolute;
      right: 15px;
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

const Button = styled.button`
  outline: none;
  color: #000000;
  background-color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
  width: 100px;
  height: 50px;
  border: 2px solid #f92f23;
  background-color: white;
  position: absolute;
  bottom: 10px;
`;
const Reddeco = styled.div`
  width: 15%;
  height: 100%;
  background-color: #f92f23;
`;
const Submain = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  align-items: center;
`;
const Redam = styled.div`
  width: 20%;
  height: 100%;
  background-color: #f92f23;
`;
const Grayline = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dee2e6;
`;
const Modalhead = styled.div`
  width: 90%;
  height: auto;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 30px;
`;
const Modbox = styled.div`
  width: 90%;
  height: auto;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 10px;
  position: relative;
`;
const Chbox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Chbox1 = styled.div`
  display: flex;
  margin-top: 30px;
`;
const Textbox = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const Terms = styled.div`
  font-size: 13px;
  color: gray;
  position: absolute;
  right: 15px;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;
const Nicebu = styled.button`
  width: 90%;
  height: 45px;
  background-color: white;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
  }
`;
const Agencybox = styled.div`
  width: 90%;
  margin-top: 100px;
  margin-left: 5%;
  margin-right: 5%;
  text-align: center;
`;
const Paym = styled.button`
  width: 30%;
  height: 40px;
  margin-top: 50px;
  background-color: #f92f23;
  color: white;
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;
const Modal = (props) => {
  const { open, confirm, close, type, children } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [terOpen, setTerOpen] = useState(false);
  const [termodalOpen, setTermodalOpen] = useState(false);
  const [termodalContent, setTermodalContent] = useState("");
  const [modalContent, setModalContent] = useState(false);

  const onClickSub = (e) => {
    setTerOpen(true);
  };
  const closeTer = () => {
    setTerOpen(false);
  };
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);
    setIsChecked1(checked);
    setIsChecked2(checked);
  };

  const handleCheckboxChange1 = (event) => {
    setIsChecked1(event.target.checked);
  };

  const handleCheckboxChange2 = (event) => {
    setIsChecked2(event.target.checked);
  };

  // useEffect를 사용하여 isChecked1과 isChecked2 상태가 변경될 때 isChecked 상태를 업데이트
  useEffect(() => {
    if (isChecked1 && isChecked2) {
      setIsChecked(true);
    } else if (!isChecked1 || !isChecked2) {
      setIsChecked(false);
    }
  }, [isChecked1, isChecked2]);

  const handleButtonClick = () => {
    if (isChecked1 && isChecked2) {
      setModalContent(true);
    } else {
      alert("약관동의를 전부 체크해 주세요");
    }
  };
  const resetbu = () => {
    setModalContent(false);
  };
  return (
    <>
      <ModalStyle>
        <div className={open ? "openModal modal" : "modal"}>
          {open && (
            <section>
              <main>{children}</main>
              <Reddeco />
              <Submain>
                {modalContent ? (
                  <>
                    <Paym>계좌 결제</Paym>
                    <Paym>카드 결제</Paym>
                    <Button
                      onClick={() => {
                        close();
                        resetbu();
                      }}
                    >
                      닫기
                    </Button>
                  </>
                ) : (
                  <>
                    <Modalhead>
                      <Logosidefont />
                      <Grayline />
                    </Modalhead>
                    <Modbox>
                      <Chbox>
                        <Textbox>이용 약관</Textbox>
                        <label>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          전체 동의
                        </label>
                      </Chbox>
                      <Grayline />
                    </Modbox>
                    <Modbox>
                      <Textbox>전자금융 거래 이용 약관</Textbox>
                      <Chbox1>
                        <Textbox>개인 정보 수집 이용 약관</Textbox>
                        <label>
                          <input
                            type="checkbox"
                            checked={isChecked1}
                            onChange={handleCheckboxChange1}
                          />
                          동의
                        </label>
                      </Chbox1>
                      <Chbox>
                        <Textbox>개인 정보 제공 및 위탁 안내</Textbox>
                        <label>
                          <input
                            type="checkbox"
                            checked={isChecked2}
                            onChange={handleCheckboxChange2}
                          />
                          동의
                        </label>
                      </Chbox>
                      <Terms onClick={onClickSub}>이용약관</Terms>
                      <Grayline />
                    </Modbox>

                    <Agencybox>
                      <Nicebu
                        enabled={isChecked1 && isChecked2}
                        onClick={handleButtonClick}
                      >
                        Nice
                      </Nicebu>
                    </Agencybox>
                    <Button onClick={close}>취소</Button>
                  </>
                )}
              </Submain>
              <Redam></Redam>
            </section>
          )}
        </div>
      </ModalStyle>
      <Termsmodal
        open={terOpen}
        close={closeTer}
        category="약관창"
        setModalOpen={setTermodalOpen}
        setModalContent={setTermodalContent}
      ></Termsmodal>
    </>
  );
};

export default Modal;

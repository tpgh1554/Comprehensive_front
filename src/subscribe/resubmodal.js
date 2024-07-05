import React from "react";
import styled from "styled-components";
import PaymentApi from "../api/PaymentAxios";
import axios from "axios";

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
    height: 80%;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;

    header {
      position: relative;
      height: 10%;
      background-color: #f92f23;
      font-weight: 700;
      align-content: center;
      color: white;
      font-size: 18px;
      button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
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
  margin-top: 10px;
  width: 100px;
  height: 50px;
  border: 1px solid #f92f23;
  background-color: white;
  margin-right: 30px;
  &:hover {
    background-color: #f92f23;
    color: white;
  }
`;

const TerCon = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  align-items: center;
  width: 100%;
  height: 90%;
`;

const Grayline = styled.div`
  width: 100%;
  height: 2px;
  background-color: #dee2e6;
`;
const Bubox = styled.div`
  text-align: right;

  width: 100%;
`;

const Privacy = (props) => {
  const { open, close, category, setModalOpen, merchantuid, deadLine } = props;

  const status = "구독";
  const date = new Date(deadLine);
  const rebook = Math.floor(date.getTime() / 1000);
  const reSavesub = async () => {
    try {
      // IAMPORT 토큰 요청
      const tokenResponse = await axios.post(
        "http://localhost:5000/api/iamport/getToken",
        {}, // 데이터는 비어 있어도 됩니다.
        { withCredentials: true } // credentials 포함
      );
      const iamportToken = tokenResponse.data.response.access_token;
      console.log(rebook);
      console.log(merchantuid);
      // 재구독
      const resub = await axios.post(
        "http://localhost:5000/api/iamport/reschedulePayment",
        { merchant_uid: merchantuid, schedule_at: rebook },
        {
          headers: {
            Authorization: iamportToken,
            "Content-Type": "application/json",
          },
          withCredentials: true, // credentials 포함
        }
      );
      console.log("재예약:", resub.data);
      const rsp = await PaymentApi.unsavesub(status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              <button onClick={close}>&times;</button>
            </header>
            <TerCon>
              <Grayline />
              <Bubox>
                <Button onClick={reSavesub}>재구독</Button>
              </Bubox>
            </TerCon>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default Privacy;

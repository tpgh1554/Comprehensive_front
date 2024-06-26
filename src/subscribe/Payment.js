import React from "react";
import PaymentApi from "../api/PaymentAxios";
import axios from "axios";
import styled from "styled-components";
import Kapay from "../image/kakaopaymark-removebg-preview.png";

const Paybu = styled.button`
  width: 40%;
  height: 45px;
  background-color: white;
  border: 1px solid #dee2e6;
  display: flex;
  position: absolute;
  font-size: 25px;
  left: 2px;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
const Payment = ({ isChecked1, isChecked2 }) => {
  const getBuyerIdFromLocalStorage = () => {
    // 로컬 스토리지에서 사용자 ID 값 가져오기
    const email = localStorage.getItem("email"); // 사용자 ID를 저장한 키에 맞게 수정
    return email;
  };
  const handleButtonClick = () => {
    if (isChecked1 && isChecked2) {
      Kakaopayment();
    } else {
      alert("약관동의를 전부 체크해 주세요");
    }
  };

  const handlePayment = () => {
    const { IMP } = window;
    IMP.init("imp63702282"); // 포트원 테스트 가맹점 식별코드

    const paymentData = {
      pg: "html5_inicis.INIBillTst", // KG이니시스 테스트 상점아이디
      pay_method: "card", // 결제 수단 (카드)
      merchant_uid: `order_monthly_${new Date().getTime()}`, // 가맹점 주문번호 (고유한 값)
      name: "최초인증결제", // 상품명
      amount: 10, // 결제 금액 (실제 승인은 되지 않음)
      customer_uid: "your-customer-unique-id", // 고객 고유 ID (필수)
      buyer_email: "iamport@siot.do", // 구매자 이메일
      // buyer_name: "아임포트", // 구매자 이름
      // buyer_tel: "02-1234-1234", // 구매자 전화번호
      m_redirect_url: "https://www.my-service.com/payments/complete/mobile", // 모바일에서 결제 완료 후 리디렉션 될 URL
    };

    IMP.request_pay(paymentData, handleResponse);
  };

  const handleResponse = (response) => {
    if (response.success) {
      const paymentData = {
        name: "your-service-name",
        customer_uid: "your-customer-unique-id",
        merchant_uid: `order_${new Date().getTime()}`,
        amount: 10, // 실제 결제 금액
      };

      PaymentApi.subscribePaymentsAgain(paymentData)
        .then((res) => {
          alert("결제 성공");
          const paymentHistory = {
            email: response.buyer_email,
            paymentDate: new Date(),
            paymentStatus: "success",
            transactionId: response.imp_uid,
            amount: paymentData.amount,
            cancellationDate: null,
          };

          return PaymentApi.savePaymentHistory(paymentHistory);
        })
        .then(() => {
          alert("결제 내역 저장 완료");
        })
        .catch((error) => {
          console.error("결제 실패", error);
          alert("결제 실패");
        });
    } else {
      alert(`빌링키 발급 실패: ${response.error_msg}`);
    }
  };

  const Kakaopayment = () => {
    const { IMP } = window;
    IMP.init("imp63702282"); // 포트원 테스트 가맹점 식별코드

    const buyer_email = getBuyerIdFromLocalStorage();

    const paymentData = {
      pg: "kakaopay", // 카카오페이 사용 시 'kakaopay'로 설정
      pay_method: "card", // 결제 수단 (카드, 계좌이체, 가상계좌 등)
      merchant_uid: `mid_${new Date().getTime()}`, // 가맹점 주문번호 생성
      name: "아프다 1달 구독", // 상품명
      customer_uid: buyer_email,
      amount: 10, // 결제 금액
      buyer_id: buyer_email, // 구매자 ID 설정
      m_redirect_url: "http://localhost:3000/apueda", // 결제 완료 후 이동할 페이지 URL
    };

    IMP.request_pay(paymentData, async (response) => {
      if (response.success) {
        const transactionId = response.imp_uid; // 고유 결제 ID
        const paymentStatus = "결재 성공"; // 결제 성공 시 상태
        const paymentDate = new Date(); // 날짜
        const cancellationDate = null;
        const amount = 10;
        const isPaymentAvailable = true;
        const isDeleted = false;
        const paymentMethodCode = "kakaopay";
        const paymentDetails = response.imp_uid + amount + paymentDate;
        const customerUid = response.customer_uid;
        const status = "구독";
        const createdAt = new Date();
        const validUntil = new Date(paymentDate);
        validUntil.setMonth(validUntil.getMonth() + 1);
        const validUntilTimestamp = Math.floor(validUntil.getTime() / 1000); // 1달뒤

        // const validUntil = new Date(paymentDate);
        // validUntil.setMinutes(validUntil.getMinutes() + 1);
        // const validUntilTimestamp = Math.floor(validUntil.getTime() / 1000); // 테스트용 날짜 1분뒤

        const scheduleData = {
          customer_uid: buyer_email,
          schedules: [
            {
              schedule_at: validUntilTimestamp,
              amount: 10,
              merchant_uid: `order_${new Date().getTime()}`,
              name: "아프다 1달 구독",
            },
          ],
        };

        // 3. IAMPORT 토큰 요청
        const tokenResponse = await axios.post(
          "http://localhost:5000/api/iamport/getToken",
          {}, // 데이터는 비어 있어도 됩니다.
          { withCredentials: true } // credentials 포함
        );
        const iamportToken = tokenResponse.data.response.access_token;

        // 4. 결제 스케줄링 요청
        const scheduleResponse = await axios.post(
          "http://localhost:5000/api/iamport/schedulePayment",
          scheduleData,
          {
            headers: {
              Authorization: iamportToken,
              "Content-Type": "application/json",
            },
            withCredentials: true, // credentials 포함
          }
        );
        console.log("Scheduled payment response:", scheduleResponse.data);
        try {
          const sp = await PaymentApi.savePaymentinfo(
            buyer_email,
            paymentMethodCode,
            paymentDetails,
            isPaymentAvailable,
            isDeleted
          );
          console.log("결제 정보 저장 성공", sp);

          const subscriptionResponse = await PaymentApi.requestBillingKey(
            buyer_email,
            transactionId,
            paymentDate,
            createdAt,
            validUntil,
            customerUid,
            status
          );

          console.log("빌링키 발급 성공", subscriptionResponse);
        } catch (error) {
          console.error("결제 정보 저장 실패", error);
          alert("결제 정보 저장 실패");
        }

        try {
          const rsp = await PaymentApi.savePaymentHistory(
            buyer_email, // 사용자 ID로 수정
            amount,
            paymentStatus,
            transactionId,
            paymentDate,
            cancellationDate
          );
          console.log("결제 이력 저장 성공", rsp);
        } catch (error) {
          console.error("결제 이력 저장 실패", error);
          alert("결제 이력 저장 실패");
        }
      } else {
        alert(`Payment failed: ${response.error_msg}`);
      }
    });
  };

  return (
    <>
      {/* <Paybu onClick={handlePayment}>KG 이니시스 결제하기</Paybu> */}
      <Paybu onClick={handleButtonClick}>
        <img
          src={Kapay}
          alt="카카오 결제하기"
          style={{ height: "70%", marginRight: "50px" }}
        />
        KakaoPay
      </Paybu>
    </>
  );
};

export default Payment;

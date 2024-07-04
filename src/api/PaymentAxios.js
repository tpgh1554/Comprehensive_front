import axios from "axios";
import { SiNamecheap } from "react-icons/si";

const Apueda_Domain = "http://localhost:8118";

const PaymentApi = {
  // 결재내역 저장
  savePaymentHistory: async (
    buyer_email,
    amount,
    paymentStatus,
    transactionId,
    paymentDate,
    name,
    cancellationDate
  ) => {
    const savePaymentHistory = {
      user: buyer_email,
      name: name,
      paymentDate: paymentDate,
      paymentStatus: paymentStatus,
      transactionId: transactionId,
      amount: amount,
      cancellationDate: cancellationDate,
    };
    return await axios.post(
      Apueda_Domain + "/payments/save",
      savePaymentHistory
    );
  },
  // 결재정보저장
  savePaymentinfo: async (
    buyer_email,
    paymentMethodCode,
    paymentDetails,
    isPaymentAvailable,
    isDeleted
  ) => {
    const savePaymentinfo = {
      user: buyer_email,
      paymentMethodCode: paymentMethodCode,
      paymentDetails: paymentDetails,
      isPaymentAvailable: isPaymentAvailable,
      isDeleted: isDeleted,
    };
    return await axios.post(Apueda_Domain + "/payments/info", savePaymentinfo);
  },
  // 구독 상태 및 빌링키 저장
  requestBillingKey: async (
    buyer_email,
    transactionId,
    paymentDate,
    createdAt,
    validUntil,
    merchant_uid,
    customerUid,
    status
  ) => {
    const requestBillingKey = {
      user: buyer_email,
      transactionId: transactionId,
      paymentDate: paymentDate,
      customerUid: customerUid,
      createdAt: createdAt,
      validUntil: validUntil,
      merchantuid: merchant_uid,
      status: status,
      billingKeyCreatedAt: paymentDate,
    };
    return await axios.post(
      Apueda_Domain + "/payments/subscriptions",
      requestBillingKey
    );
  },

  unsavesub: async (status) => {
    const unsavesub = {
      status: status,
    };
    return await axios.post(
      Apueda_Domain + "/payments/unsubscriptions",
      unsavesub
    );
  },

  // 결재내역 출력
  historyList: async (member, page, size) => {
    return await axios.get(`${Apueda_Domain}/payments/detail/${member}`, {
      params: {
        page: page,
        size: size,
      },
    });
  },
  // 구독일 출력
  deadline: async (member) => {
    return await axios.get(`${Apueda_Domain}/payments/deadline/${member}`, {
      params: {
        member,
      },
    });
  },
};

export default PaymentApi;

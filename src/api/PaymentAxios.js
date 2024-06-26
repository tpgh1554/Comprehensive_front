import axios from "axios";

const Apueda_Domain = "http://localhost:8118";

const PaymentApi = {
  savePaymentHistory: async (
    buyer_email,
    amount,
    paymentStatus,
    transactionId,
    paymentDate,
    cancellationDate
  ) => {
    const savePaymentHistory = {
      user: buyer_email,
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
};

export default PaymentApi;

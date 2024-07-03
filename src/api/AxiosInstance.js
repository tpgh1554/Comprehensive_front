// axiosInstance.js

import axios from "axios";
const Apueda_Domain = "http://localhost:8118";
const getAccessToken = localStorage.getItem("accessToken");

const AxiosInstance = axios.create({
  // axios 인스턴스 생성
  baseURL: Apueda_Domain,
});

AxiosInstance.interceptors.request.use(
  // 요청 인터셉터 추가
  async (config) => {
    const accessToken = getAccessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error); // 에러 발생시
  }
);

// AxiosInstance.interceptors.response.use(
//   // 응답 인터셉터 추가
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       // 401 에러 발생시
//       const newToken = await Common.handleUnauthorized();
//       if (newToken) {
//         // 재시도
//         error.config.headers.Authorization = `Bearer ${Common.getAccessToken()}`;
//         return AxiosInstance.request(error.config);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default AxiosInstance;

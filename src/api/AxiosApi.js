import axios from "axios";

const Apueda_Domain = "http://localhost:8118";

const AxiosApi = {
  getUserInfo: async () => {
    return await axios.get(Apueda_Domain + "/users/list");
  },

  // 로그인
  login: async (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    return await axios.post(Apueda_Domain + "/users/login", user);
  },
  // 회원가입
  signup: async (user) => {
    return await axios.post(Apueda_Domain + "/users/signup", user);
  },
  // 사용자 존재 여부 확인
  userCheck: async (email) => {
    return await axios.get(`${Apueda_Domain}/users/check?email=${email}`);
  },

  getBoardList: async () => {
    return await axios.get(Apueda_Domain + "/board/list");
  },

  getProjectList: async () => {
    return await axios.get(Apueda_Domain + "/project/list");
  },

  boardDelete: async (id) => {
    return await axios.get(Apueda_Domain + "/board/delete", {
      params: {
        id: id,
      },
    });
  },

  projectDelete: async (id) => {
    return await axios.get(Apueda_Domain + "/project/delete", {
      params: {
        id: id,
      },
    });
  },

  friendlist: async (email) => {
    return await axios.get(`${Apueda_Domain}/friends/list?userEmail=${email}`);
  },

  friendDelete: async (userEmail, friendEmail) => {
    return await axios.get(Apueda_Domain + "/friends/delete", {
      params: {
        userEmail: userEmail,
        friendEmail: friendEmail,
      },
    });
  },
};

export default AxiosApi;

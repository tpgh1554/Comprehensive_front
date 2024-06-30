import axios from "axios";

const Apueda_Domain = "http://localhost:8118";

const AxiosApi = {
  // 사용자 전체리스트 조회
  getUserList: async () => {
    return await axios.get(Apueda_Domain + "/members/list");
  },

  // 로그인
  login: async (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    return await axios.post(Apueda_Domain + "/auth/login", user);
  },
  // 회원가입
  signup: async (user) => {
    return await axios.post(Apueda_Domain + "/auth/signup", user);
  },
  // 사용자 존재 여부 확인
  userCheck: async (email) => {
    return await axios.get(`${Apueda_Domain}/members/check?email=${email}`);
  },

  // 사용자 정보 가져오기
  getUserInfo: async (email) => {
    return await axios.get(
      `${Apueda_Domain}/members/memberinfo?email=${email}`
    );
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

  //------------------친구 기능---------------------------

  friendlist: async (email) => {
    return await axios.get(
      `${Apueda_Domain}/friends/list?memberEmail=${email}`
    );
  },

  friendRequestList: async (email) => {
    return await axios.get(
      `${Apueda_Domain}/friends/findrequest?memberEmail=${email}`
    );
  },

  // friendRequestAccept: async (userEmail, toUserEmail) => {
  //   return await axios.post(Apueda_Domain + "/friends/accept", {
  //     userEmail: userEmail,
  //     toUserEmail: toUserEmail,
  //   });
  // },

  friendRequestAccept: async (memberEmail, toMemberEmail) => {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("memberEmail", memberEmail);
    formData.append("toMemberEmail", toMemberEmail);

    return await axios.post(Apueda_Domain + "/friends/accept", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // FormData를 사용할 때는 Content-Type을 명시적으로 설정해야 합니다.
      },
    });
  },

  friendRequestReject: async (memberEmail, toMemberEmail) => {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("memberEmail", memberEmail);
    formData.append("toMemberEmail", toMemberEmail);

    return await axios.post(Apueda_Domain + "/friends/reject", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // FormData를 사용할 때는 Content-Type을 명시적으로 설정해야 합니다.
      },
    });
  },

  friendDelete: async (memberEmail, friendEmail) => {
    return await axios.get(Apueda_Domain + "/friends/delete", {
      params: {
        memberEmail: memberEmail,
        friendEmail: friendEmail,
      },
    });
  },

  //------------------친구 기능---------------------------

  // ----------------------- 게시판-----------------------
  // 스킬 리스트 가지고 오기
  getSkilList: async () => {
    return await axios.get(Apueda_Domain + "/project/list");
  },

  // ----------------------- 게시판-----------------------
};

export default AxiosApi;

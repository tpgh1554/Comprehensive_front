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

  //메세지
  messageList: async (receiveEmail, sendEmail) => {
    return await axios.get(Apueda_Domain + "/messages/received", {
      params: {
        receiveEmail: receiveEmail,
        sendEmail: sendEmail,
      },
    });
  },

  writeMessage: async (receiverMemberName, senderMemberName, content) => {
    const writeInfo = {
      receiverMemberName: receiverMemberName,
      senderMemberName: senderMemberName,
      content: content,
    };
    return await axios.post(Apueda_Domain + "/messages/write", writeInfo);
  },

  // ----------------------- 게시판-----------------------
  // 스킬 리스트 가지고 오기(등록용)
  getSkilList: async () => {
    return await axios.get(Apueda_Domain + "/skill/list");
  },
  // 플젝 글쓰기
  postProject: async (postData) => {
    console.log("axi recruitNum", postData.recruitNum, postData.projectName);
    const project = {
      projectTitle: postData.title,
      projectContent: postData.content,
      projectPassword: postData.pw,
      skillName: postData.skills,
      projectTime: postData.endDate,
      recruitNum: postData.recruitNum,
      projectName: postData.projectName,
      regDate: postData.currentDate,
      imgPath: postData.imgPath.name,
    };
    return await axios.post(Apueda_Domain + "/project/insert", project);
  },
  // 플젝 상세 보기
  getProjectDetal: async (id) => {
    return await axios.get(Apueda_Domain + `/project/detail?id=${id}`);
  },
  // ----------------------- 게시판-----------------------
  // -----------------------채   팅-----------------------
  creactRoom: async (roomName, userEmail) => { // 방이름, 작성자이메일 받아서 방생성
    return await axios.post(`${Apueda_Domain}/chat/room`, {
      roomName,
      creatorEmail: userEmail,
    });
  },
  // -----------------------채   팅-----------------------
  // -----------------------데이트 어플-----------------------

  getCardList: async (myEmail) => {
    return await axios.post(`${Apueda_Domain}/datingapp/cardlist`, null, {
      params: {
        myEmail: myEmail,
      }
    });
  }
  // -----------------------데이트 어플-----------------------
};

export default AxiosApi;

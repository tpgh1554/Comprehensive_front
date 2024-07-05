import axios from "axios";
import AxiosInstance from "./AxiosInstance";

const Apueda_Domain = "http://localhost:8118";

const AxiosApi = {
  // 발행된 토큰을 로컬에 저장
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
  },
  // 로컬에 저장된 토큰 정보 가져오기
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
  // 발행된 리프래시 토큰을 로컬에 저장
  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },
  // 로컬에 저장된 리프레시 토큰 정보 가져옴
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },

  // 토큰 권한 부여하기
  tokenHeader: () => {
    const accessToken = AxiosApi.getAccessToken();
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
  },

  // 토큰 만료시 재발행하기
  // 401 에러 처리 함수
  handleUnauthorized: async () => {
    console.log("handleUnauthorized");
    const refreshToken = AxiosApi.getAccessToken();
    const accessToken = AxiosApi.getRefreshToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.post(`/auth/refresh`, refreshToken, config);
      console.log(res.data);
      AxiosApi.setAccessToken(res.data);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  // 사용자 전체리스트 조회
  getUserList: async () => {
    return await AxiosInstance.get("/members/list");
  },

  // 로그인
  login: async (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    return await axios.post(Apueda_Domain + "/auth/login", user);
  },

  // 사용자 존재 여부 확인
  userCheck: async (email) => {
    return await axios.get(`${Apueda_Domain}/auth/check?email=${email}`);
  },
  // 이메일 인증
  mail: async (email) => {
    try {
      return await axios.get(`${Apueda_Domain}/email/mail?email=${email}`);
    } catch (error) {
      throw new Error(`이메일 요청 실패: ${error.message}`);
    }
  },
  // 회원가입
  signup: async (user) => {
    return await axios.post(Apueda_Domain + "/auth/signup", user);
  },

  // 사용자 정보 가져오기
  // getUserInfo: async (email) => {
  //   return await axios.get(
  //     `${Apueda_Domain}/members/memberinfo?email=${email}`
  //   );
  // },
  getUserInfo2: async () => {
    return await AxiosInstance.get("/members/memberinfo2");
  },

  // 회원정보 수정
  memberUpdate: async (user) => {
    return await AxiosInstance.post(
      `/members/membermodify/${user.email}`,
      user
    );
  },

  // 회원 탈퇴
  signout: async () => {
    return await AxiosInstance.get(Apueda_Domain + "/members/delmember");
  },

  getBoardList: async () => {
    return await axios.get(Apueda_Domain + "/board/list");
  },

  getProjectList: async () => {
    return await AxiosInstance.get("/project/list");
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

  friendRequest: async (memberEmail, toMemberEmail) => {
    return await AxiosInstance.post(`/friends/request`, null, {
      params: {
        memberEmail: memberEmail,
        toMemberEmail: toMemberEmail,
      },
    });
  },

  friendlist: async () => {
    return await AxiosInstance.get("/friends/list");
  },

  friendRequestList: async () => {
    return await AxiosInstance.get(`/friends/findrequest`);
  },

  friendRequestAccept: async (memberEmail) => {
    return await AxiosInstance.get("/friends/accept", {
      params: {
        memberEmail: memberEmail,
      },
    });
  },

  friendRequestReject: async (memberEmail) => {
    return await AxiosInstance.get("/friends/reject", {
      params: {
        memberEmail: memberEmail,
      },
    });
  },

  friendDelete: async (friendEmail) => {
    return await AxiosInstance.get("/friends/delete", {
      params: {
        friendEmail: friendEmail,
      },
    });
  },

  //------------------친구 기능---------------------------

  //메세지
  messageList: async (sendEmail) => {
    return await AxiosInstance.get("/messages/received", {
      params: {
        sendEmail: sendEmail,
      },
    });
  },

  writeMessage: async (receiverMemberName, content) => {
    return await AxiosInstance.post("/messages/write", {
      receiverMemberName: receiverMemberName,
      content: content,
    });
  },

  delMsg: async (postMsgId) => {
    return await AxiosInstance.get("/messages/delete", {
      params: {
        id: postMsgId,
      },
    });
  },

  updateReadStatus: async (postMsgId, readStatus) => {
    return await AxiosInstance.post("/messages/updateReadStatus", {
      postMsgId: postMsgId,
      readStatus: readStatus,
    });
  },

  //-------------------------------------------메세지------------------------------------------------

  // ----------------------- 게시판 시작 -----------------------
  // 스킬 리스트 가지고 오기(등록용)
  getSkilList: async () => {
    return await AxiosInstance.get("/skill/list");
  },
  // 플젝 글쓰기
  postProject: async (postData) => {
    console.log("postProject chatRoom", postData.chatRoom);
    const project = {
      projectTitle: postData.title,
      projectContent: postData.content,
      // projectPassword: postData.pw,
      skillName: postData.skills,
      projectTime: postData.endDate,
      recruitNum: postData.recruitNum,
      projectName: postData.roomName,
      regDate: postData.currentDate,
      chatRoom: { roomId: postData.chatRoom },
    };
    console.log("project roomID", project.chatRoom);
    return await AxiosInstance.post("/project/insert", project);
  },
  // 플젝 상세 보기
  getProjectDetal: async (id) => {
    return await AxiosInstance.get(`/project/detail/${id}`);
  },
  // 플젝 수정
  modifyProject: async (projectId, postData) => {
    return await AxiosInstance.put(`/project/modify/${projectId}`, postData);
  },

  // 댓글 등록
  postReply: async (replyContent, projectId) => {
    const reply = {
      content: replyContent,
      projectId: projectId,
    };
    console.log("axios ", replyContent);
    return await AxiosInstance.post("/reply/insert", reply);
  },
  // 플젝 게시글 댓글 페이징 리스트 불러오기
  getReplyList: async (projectId, page) => {
    return await AxiosInstance.get(
      `/reply/project-reply/${projectId}/page?page=${page}`
    );
  },
  // 댓글 총 갯수 가지고 오기
  getReplyCount: async (page) => {
    return await AxiosInstance.get(`/reply/count?page=${page}`);
  },

  // ----------------------- 게시판 끝 -----------------------
  // -----------------------채   팅-----------------------
  createRoom: async (roomName, userEmail) => {
    // 방이름, 작성자이메일 받아서 방생성
    console.log("createRoom 방이름 , ", roomName, "아이디 : ", userEmail);
    return await AxiosInstance.post(`/chat/room`, {
      roomName,
      creatorEmail: userEmail,
    });
  },
  //채팅메세지 갱신하여 가져오기
  getChatMessages: async (roomId) => {
    try {
      const response = await axios.get(
        `${Apueda_Domain}/chat/room/${roomId}/messages`
      );
      return response;
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      throw error;
    }
  },
  // -----------------------채   팅-----------------------
  // -----------------------데이트 어플-----------------------
  // 좋아요 이후 친구 신청

  // 싫어요 이후 DB 저장
  unlikeFriendRequest: async (memberEmail, unlikeMemberEmail) => {
    console.log("Sending unlike request:", memberEmail, unlikeMemberEmail);
    return await AxiosInstance.post(`/datingapp/unlike`, null, {
      params: {
        memberEmail: memberEmail,
        unlikeMemberEmail: unlikeMemberEmail,
      },
    });
  },
  // 카드리스트 가져오기 (백엔드에서 현재 5개만 가져오도록 설정 됨)
  getCardList: async (myEmail) => {
    return await AxiosInstance.post(`/datingapp/cardlist`, null, {
      params: {
        myEmail: myEmail,
      },
    });
  },
  // -----------------------데이트 어플-----------------------
};

export default AxiosApi;

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
  // 회원정보 수정
  memberUpdate: async (user) => {
    return await axios.put(
      Apueda_Domain + "/members/membermodify${email}",
      user
    );
  },
  // 회원 탈퇴
  signout: async (user) => {
    return await axios.delete(
      Apueda_Domain + "/members/delmember/${email}",
      user
    );
  },
  // 이메일 인증
  mail: async (email) => {
    try {
      return await axios.get(`${Apueda_Domain}/email/mail?email=${email}`);
    } catch (error) {
      throw new Error(`이메일 요청 실패: ${error.message}`);
    }
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

  delMsg: async (postMsgId) => {
    return await axios.get(Apueda_Domain + "/messages/delete", {
      params: {
        id: postMsgId,
      },
    });
  },

  updateReadStatus: async (postMsgId, readStatus) => {
    //메세지 읽음
    const requestData = {
      postMsgId: postMsgId,
      readStatus: readStatus,
    };
    try {
      const response = await axios.post(
        Apueda_Domain + "/messages/updateReadStatus",
        requestData
      );
      return response.data; // 서버에서 반환한 데이터를 처리하거나 반환할 수 있음
    } catch (error) {
      console.error("오류 발생:", error);
      throw error; // 오류를 처리하거나 상위 호출자에게 넘김
    }
  },
  //-------------------------------------------메세지------------------------------------------------

  // ----------------------- 게시판-----------------------
  // 스킬 리스트 가지고 오기(등록용)
  getSkilList: async () => {
    return await axios.get(Apueda_Domain + "/skill/list");
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
      imgPath: postData.imgPath.name,
      chatRoom: { roomId: postData.chatRoom },
    };
    console.log("project roomID", project.chatRoom);
    return await axios.post(Apueda_Domain + "/project/insert", project);
  },
  // 플젝 상세 보기
  getProjectDetal: async (id) => {
    return await axios.get(Apueda_Domain + `/project/detail/${id}`);
  },
  // 댓글 등록
  postReply: async (replyContent, projectId) => {
    const reply = {
      content: replyContent,
      projectId: projectId,
    };
    console.log("axios ", replyContent);
    return await axios.post(Apueda_Domain + "/reply/insert", reply);
  },
  // ----------------------- 게시판-----------------------
  // -----------------------채   팅-----------------------
  createRoom: async (roomName, userEmail) => {
    // 방이름, 작성자이메일 받아서 방생성
    console.log("createRoom 방이름 , ", roomName, "아이디 : ", userEmail);
    return await axios.post(`${Apueda_Domain}/chat/room`, {
      roomName,
      creatorEmail: userEmail,
    });
  },
    //채팅메세지 갱신하여 가져오기
  getChatMessages: async (roomId) => {
    try {
      const response = await axios.get(`${Apueda_Domain}/chat/room/${roomId}/messages`);
      return response;
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      throw error;
    }
  },
  // -----------------------채   팅-----------------------
  // -----------------------데이트 어플-----------------------
  // 좋아요 이후 친구 신청

  friendRequest: async (memberEmail, toMemberEmail) => {
    return await axios.post(`${Apueda_Domain}/friends/request`, null, {
      params: {
        memberEmail: memberEmail,
        toMemberEmail: toMemberEmail,
      },
    });
  },

  // 싫어요 이후 DB 저장
  unlikeFriendRequest: async (memberEmail, unlikeMemberEmail) => {
    console.log("Sending unlike request:", memberEmail, unlikeMemberEmail);
    return await axios.post(`${Apueda_Domain}/datingapp/unlike`, null, {
      params: {
        memberEmail: memberEmail,
        unlikeMemberEmail: unlikeMemberEmail,
      },
    });
  },
  // 카드리스트 가져오기 (백엔드에서 현재 5개만 가져오도록 설정 됨)
  getCardList: async (myEmail) => {
    return await axios.post(`${Apueda_Domain}/datingapp/cardlist`, null, {
      params: {
        myEmail: myEmail,
      },
    });
  },
  // -----------------------데이트 어플-----------------------
};

export default AxiosApi;

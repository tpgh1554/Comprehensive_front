import React, { useEffect, useRef, useState } from "react";
import BoardLayout from "../../components/BoardLayout";
import { HeadContainer } from "../../style/SelectBoardStyle";
import {
  Title,
  InputButtonSection,
  Button,
  Bottom,
  ConfirmButton,
  Content,
  ContentContainer,
  Top,
  Container,
  DropdownInput,
  InputImage,
  InsertConfirm,
} from "../../style/WriteStyle";
import Modal from "./Modal";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import PasswordModal from "./PasswordModal";

const WriteProject = () => {
  const inputRef = useRef(null); // 인원 입력용 ref 추가
  const inputRefForPeriod = useRef(null); // 기간 입력용 ref 추가
  const inputRefForName = useRef(null); // 기간 입력용 ref 추가
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsPwModalOpen, setIsPwModalOpen] = useState(false);
  const [isDropdownOpenForPeople, setIsDropdownOpenForPeople] = useState(false); // 인원 드롭다운 상태 추가
  const [isDropdownOpenForPeriod, setIsDropdownOpenForPeriod] = useState(false); // 기간 드롭다운 상태 추가
  //const [isDropdownOpenForName, setIsDropdownOpenForName] = useState(false); // 플젝 이름 드롭다운
  const [currentDate, setCurrentDate] = useState(getFormattedDate()); // 기간선택시 최소 날짜를 오늘 날짜로 고정
  const [selectDate, setSelectDate] = useState(getFormattedDate()); // 기간 선택 값 상태로 관리
  const [title, setTitle] = useState("");
  //const [projectName, setProjectName] = useState("");
  const [content, setContent] = useState("");
  const [roomName, setRoomName] = useState("");
  // const [password, setPassword] = useState("");
  const [recruitNum, setRecruitNum] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [imgPath, setImgPath] = useState("");
  const navigate = useNavigate();

  const handleSkillSelect = (skills) => {
    setSelectedSkills(skills);
    closeModal(); // 스킬 선택 모달 닫기
  };
  // const handlePwValue = (pw) => {
  //   setPassword(pw);
  //   //console.log(password, "!!");
  //   //closePwModal();
  // };
  const handleRoomNameValue = (rm) => {
    console.log(rm, "!");
    setRoomName(rm);
    // closePwModal();
  };

  // 다른 곳을 클릭하면 드롭다운 닫기
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsDropdownOpenForPeople(false);
    }
    if (
      inputRefForPeriod.current &&
      !inputRefForPeriod.current.contains(event.target)
    ) {
      setIsDropdownOpenForPeriod(false);
    }
  };

  // 이벤트 리스너 등록
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // 인원 드롭다운 토글 함수
  const toggleDropdownForPeople = () => {
    setIsDropdownOpenForPeople(!isDropdownOpenForPeople);
    setIsDropdownOpenForPeriod(false); // 기간 드롭다운 닫기
  };

  // 기간 드롭다운 토글 함수
  const toggleDropdownForPeriod = () => {
    setIsDropdownOpenForPeriod(!isDropdownOpenForPeriod);
    setIsDropdownOpenForPeople(false); // 인원 드롭다운 닫기
  };

  // 플젝 이름 드롭다운 토글 함수
  // const toggleDropdownForName = () => {
  //   setIsDropdownOpenForName(!isDropdownOpenForName);
  //   setIsDropdownOpenForPeople(false); // 인원 드롭다운 닫기
  //   setIsDropdownOpenForPeriod(false); // 기간 드롭다운 닫기
  // };

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Open modal
  const openPwModal = () => {
    setIsPwModalOpen(true);
  };

  // Close modal
  const closePwModal = () => {
    setIsPwModalOpen(false);
  };

  // 현재 날짜를 반환하는 함수
  function getFormattedDate() {
    const dateObj = new Date();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  }
  // 현재 시간을 반환하는 함수
  function getCurrentTime() {
    const dateObj = new Date();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");
    return `T${hours}:${minutes}:${seconds}`;
  }
  // 이미지 저장 핸들러
  const handleFileChange = (e) => {
    setImgPath(e.target.files[0]);
    console.log("파일 체인지 button clicked.", e.target.files[0]);
  };

  // 이미지 버튼 클릭시 input실행
  const handleFileClick = () => {
    if (fileInputRef.current) {
      console.log("파일 button clicked.");
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    if (roomName) {
      handleRegister();
    }
  }, [roomName]);
  const handleRegister = async () => {
    if (!title) {
      alert("제목을 입력해주세요");
      return;
    }
    if (!content) {
      alert("내용을 입력해주세요");
      return;
    }
    if (!recruitNum) {
      alert("인원을 입력해주세요");
      return;
    }
    if (selectDate === currentDate) {
      alert("날짜를 오늘 이후로 선택해주세요");
      return;
    }
    if (!currentDate) {
      alert("등록일을 입력해주세요");
      return;
    }

    try {
      const email = localStorage.getItem("email");
      // First, create the chat room
      const rm = roomName;
      const createRoomResponse = await AxiosApi.createRoom(rm, email);

      if (!createRoomResponse.data) {
        throw new Error("채팅방 생성이 실패했습니다.");
      }

      // Construct the postData with the room ID obtained from createRoomResponse
      const postData = {
        title,
        content,
        skills: selectedSkills,
        // pw: password,
        endDate: selectDate + getCurrentTime(),
        recruitNum: recruitNum,
        roomName: roomName,
        regDate: currentDate,
        imgPath: imgPath,
        chatRoom: createRoomResponse.data.roomId,
      };

      console.log("postData ", postData.chatRoom);

      // Post the project data
      const response = await AxiosApi.postProject(postData);
      console.log("response ", postData.chatRoom);
      if (response.data) {
        alert("프로젝트 게시글이 등록되었고 채팅방이 생성되었습니다.");
        navigate("/apueda/board");
      } else {
        throw new Error("프로젝트 게시글 등록이 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };
  const cancel = () => {
    const confirmMessage =
      "뒤로 가면 변경 사항이 저장되지 않습니다. 계속 하시겠습니까?";
    if (window.confirm(confirmMessage)) {
      navigate("/apueda/board");
    } else {
    }
  };
  return (
    <BoardLayout>
      <Container>
        <HeadContainer style={{ justifyContent: "center" }}>
          <Top>글쓰기</Top>
        </HeadContainer>
        <ContentContainer>
          <Title
            placeholder="글 제목을 입력해주세요(100자 이내)"
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputButtonSection>
            <Button onClick={openModal}>스킬</Button>
            <div style={{ position: "relative" }}>
              <Button
                onClick={toggleDropdownForPeople}
                style={{ marginRight: "16px" }}
              >
                인원
              </Button>
              {isDropdownOpenForPeople && (
                <DropdownInput>
                  <input
                    ref={inputRef}
                    type="number"
                    min="0"
                    placeholder="인원을 입력하세요"
                    value={recruitNum}
                    onChange={(e) => setRecruitNum(e.target.value)}
                  />
                  <InsertConfirm>확인</InsertConfirm>
                </DropdownInput>
              )}
            </div>
            {/* <div style={{ position: "relative" }}>
              <Button
                onClick={toggleDropdownForName}
                style={{ marginRight: "16px" }}
              >
                플젝이름
              </Button>
              {isDropdownOpenForName && (
                <DropdownInput>
                  <input
                    ref={inputRefForName}
                    type="text"
                    placeholder="프로젝트 제목을 입력하세요."
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                  />
                  <InsertConfirm>확인</InsertConfirm>
                </DropdownInput>
              )}
            </div> */}
            <div style={{ position: "relative" }}>
              <Button
                onClick={toggleDropdownForPeriod}
                style={{ marginRight: "16px" }}
              >
                기간
              </Button>
              {isDropdownOpenForPeriod && (
                <DropdownInput>
                  <input
                    ref={inputRefForPeriod}
                    type="date"
                    max="2077-06-20"
                    min={currentDate}
                    onChange={(e) => setSelectDate(e.target.value)}
                    value={selectDate}
                  />
                  <InsertConfirm>확인</InsertConfirm>
                </DropdownInput>
              )}
            </div>
            <Button alt="Upload" onClick={handleFileClick}>
              이미지
            </Button>
            <InputImage
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <Button>모임 장소</Button>
            {/* <input
              type="text"
              placeholder="비번 입력"
              onChange={(e) => setPassword(e.target.value)}
            /> */}
          </InputButtonSection>
          <Content
            placeholder="내용을 입력해주세요(10,000자 이내)"
            cols={100}
            style={{ resize: "none" }}
            maxLength={10000}
            onChange={(e) => setContent(e.target.value)}
          />
          <Bottom>
            {/* <ConfirmButton onClick={handleRegister}>등록</ConfirmButton> */}
            <ConfirmButton onClick={openPwModal}>등록</ConfirmButton>
            <ConfirmButton onClick={cancel}>취소</ConfirmButton>
          </Bottom>
        </ContentContainer>
      </Container>
      {isModalOpen && (
        <Modal closeModal={closeModal} onSave={handleSkillSelect} />
      )}
      {IsPwModalOpen && (
        <PasswordModal
          onRoomNameSave={handleRoomNameValue}
          closePwModal={closePwModal}
          // onPasswordSave={handlePwValue}
          onClick={setRoomName}
        />
      )}
    </BoardLayout>
  );
};

export default WriteProject;

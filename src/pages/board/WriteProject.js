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
import Modal from "./SkillModal";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import PasswordModal from "./ProjectNameModal";
import SkillModal from "./SkillModal";
import ProjectNameModal from "./ProjectNameModal";
import { getCurrentTime, getFormattedDate } from "../../utils/formatDate";

const WriteProject = () => {
  const inputRef = useRef(null); // 인원 입력용 ref 추가
  const inputRefForPeriod = useRef(null); // 기간 입력용 ref 추가
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsPwModalOpen, setIsProjectNameModalOpen] = useState(false);
  const [isDropdownOpenForPeople, setIsDropdownOpenForPeople] = useState(false); // 인원 드롭다운 상태 추가
  const [isDropdownOpenForPeriod, setIsDropdownOpenForPeriod] = useState(false); // 기간 드롭다운 상태 추가
  const [currentDate, setCurrentDate] = useState(getFormattedDate()); // 기간선택시 최소 날짜를 오늘 날짜로 고정
  const [modifytDate, setModifyDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // 수정 버튼시 날짜 포맷 다시 되돌리기
  const [selectDate, setSelectDate] = useState(getFormattedDate()); // 프로젝트 마감 기간
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [roomName, setRoomName] = useState("");
  const [recruitNum, setRecruitNum] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { projectId } = useParams();

  const navigate = useNavigate();

  const handleSkillSelect = (skills) => {
    setSelectedSkills(skills);
    closeSkillModal(); // 스킬 선택 모달 닫기
  };

  const handleRoomNameValue = (rm) => {
    //console.log(rm, "!");
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

  // 스킬 모달
  const openSkillModal = () => {
    setIsModalOpen(true);
  };

  // 스킬 모달
  const closeSkillModal = () => {
    setIsModalOpen(false);
  };

  // 프로젝트 이름 작성 모달
  const openProjectNameModal = () => {
    setIsProjectNameModalOpen(true);
  };

  // 프로젝트 이름 작성 모달
  const closeProjectNameModal = () => {
    setIsProjectNameModalOpen(false);
  };

  // 등록 버튼
  const handleSubmit = async () => {
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
      const email = localStorage.getItem("accessToken");
      let chatRoom = roomName;
      if (!projectId) {
        // 등록 로직
        const createRoomResponse = await AxiosApi.createRoom(roomName, email);
        if (!createRoomResponse.data) {
          throw new Error("채팅방 생성이 실패했습니다.");
        }
        chatRoom = createRoomResponse.data.roomId;
      }

      let response;
      if (projectId) {
        // 수정 로직
        console.log("수정 실행");
        const postData = {
          projectTitle: title,
          projectContent: content,
          skillName: selectedSkills,
          projectTime: selectDate + getCurrentTime(),
          recruitNum: recruitNum,
          projectName: roomName,
          regDate: currentDate + getCurrentTime(),
        };
        console.log("postData", postData, "currentDate", currentDate);
        response = await AxiosApi.modifyProject(projectId, postData);
        if (response.status === 200) {
          alert("프로젝트가 성공적으로 수정되었습니다.");
        } else {
          throw new Error("프로젝트 수정에 실패했습니다.");
        }
      } else {
        console.log("등록 실행");
        const postData = {
          title,
          content,
          skills: selectedSkills,
          endDate: selectDate + getCurrentTime(),
          recruitNum: recruitNum,
          roomName: roomName,
          chatRoom: chatRoom,
          regDate: currentDate,
        };
        // 등록 로직
        response = await AxiosApi.postProject(postData);
        if (response.data) {
          alert("프로젝트 게시글이 등록되었고 채팅방이 생성되었습니다.");
        } else {
          throw new Error("프로젝트 게시글 등록이 실패했습니다.");
        }
      }

      navigate("/apueda/board");
    } catch (error) {
      console.log(error);
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (!projectId) {
      console.log("등록실행", projectId);
      //handleRegister();
    } else {
      console.log("수정실행", projectId);
      const handleSubmit = async () => {
        try {
          const rsp = await AxiosApi.getProjectDetail(projectId);
          console.log("수정 데이터 불러오기 ", rsp.data);
          console.log("수정 데이터 projectTime ", rsp.data.projectTime);
          setTitle(rsp.data.projectTitle);
          setSelectedSkills(rsp.data.skillName);
          setRecruitNum(rsp.data.recruitNum);
          setContent(rsp.data.projectContent);
          //setSelectDate(rsp.data.projectTime);
          setProjectName(rsp.data.projectName);
          setModifyDate(rsp.data.projectTime);
          console.log(" modifytDate ", modifytDate);
        } catch (e) {
          console.log(e);
        }
      };
      handleSubmit();
    }
  }, [projectId]);

  useEffect(() => {
    if (roomName) {
      handleSubmit();
    }
  }, [roomName, projectId]);
  // 뒤로가기시
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
            value={title}
          />
          <InputButtonSection>
            <Button onClick={openSkillModal}>스킬</Button>
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
            {/* <Button alt="Upload" onClick={handleFileClick}>
              이미지
            </Button> */}
            <InputImage
              type="file"
              accept="image/*"
              ref={fileInputRef}
              // onChange={handleFileChange}
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
            value={content}
          />
          <Bottom>
            {/* <ConfirmButton onClick={handleRegister}>등록</ConfirmButton> */}
            <ConfirmButton onClick={openProjectNameModal}>등록</ConfirmButton>
            <ConfirmButton onClick={cancel}>취소</ConfirmButton>
          </Bottom>
        </ContentContainer>
      </Container>
      {isModalOpen && (
        <SkillModal
          closeSkillModal={closeSkillModal}
          onSave={handleSkillSelect}
          modifySkills={selectedSkills}
        />
      )}
      {IsPwModalOpen && (
        <ProjectNameModal
          onRoomNameSave={handleRoomNameValue}
          closeProjectNameModal={closeProjectNameModal}
          onClick={setRoomName}
          modifyData={projectName}
        />
      )}
    </BoardLayout>
  );
};

export default WriteProject;

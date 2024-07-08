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
import AxiosApi from "../../api/AxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import SkillModal from "./SkillModal";
import { getCurrentTime, getFormattedDate } from "../../utils/formatDate";

const WriteBoard = () => {
  const fileInputRef = useRef(null);
  // const [currentDate, setCurrentDate] = useState(getFormattedDate()); // 기간선택시 최소 날짜를 오늘 날짜로 고정
  const [modifytDate, setModifyDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // 수정 버튼시 날짜 포맷 다시 되돌리기
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentDate, setCurrentDate] = useState(getFormattedDate()); // 기간선택시 최소 날짜를 오늘 날짜로 고정
  const { boardId } = useParams();

  const navigate = useNavigate();

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

    try {
      const email = localStorage.getItem("accessToken");
      const postData = {
        title: title,
        content: content,
        regDate: currentDate + getCurrentTime(),
      };
      const response = await AxiosApi.postBoard(postData);
      if (response.status === 200) {
        alert("게시글이 등록되었습니다.");
      } else {
        throw new Error("게시글 등록에 실패했습니다.");
      }
      navigate("/apueda/board");
    } catch (error) {
      console.log(error);
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (boardId) {
      console.log("수정실행", boardId);
      const handleSubmit = async () => {
        try {
          const rsp = await AxiosApi.getBoardDetail(boardId);
          console.log("수정 데이터 불러오기 ", rsp.data);
          console.log("수정 데이터 reg ", rsp.data.regDate);
          setTitle(rsp.data.title);
          setContent(rsp.data.content);
        } catch (e) {
          console.log(e);
        }
      };
      handleSubmit();
    }
  }, [boardId]);
  // 뒤로가기
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
          {boardId ? <Top>수정하기</Top> : <Top>글쓰기</Top>}
        </HeadContainer>
        <ContentContainer>
          <Title
            placeholder="글 제목을 입력해주세요(100자 이내)"
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

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
            <ConfirmButton onClick={() => handleSubmit()}>등록</ConfirmButton>
            <ConfirmButton onClick={cancel}>취소</ConfirmButton>
          </Bottom>
        </ContentContainer>
      </Container>
    </BoardLayout>
  );
};

export default WriteBoard;

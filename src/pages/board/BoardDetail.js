import { useEffect, useRef, useState } from "react";
import BoardLayout from "../../components/BoardLayout";
import AxiosApi from "../../api/AxiosApi";
import {
  Container,
  Top,
  ContentContainer,
  Button,
} from "../../style/WriteStyle";
import { HeadContainer } from "../../style/SelectBoardStyle";
import {
  Head,
  UpHead,
  UnderHead,
  Body,
  Footer,
  ReplyContainer,
  InputContainer,
  UpInert,
  ProfileImg,
} from "../../style/ProjectDetailStyle";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../image/person-icon2.png";
import ReplyListComponent from "./ReplyListComponent";
import { formatDate, formatTimestamp } from "../../utils/formatDate";

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 80%;
  height: 60px;
  padding: 16px;
  font-size: 2rem;
  font-weight: bold;
`;
const BoardTime = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  /*width: 20%;
   height: 60px;
  padding: 12px;*/
  font-size: 12px;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 60px;
`;
const Recruit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  width: 50%;
  height: 60px;
  padding: 12px;
`;

const RecruitMemNum = styled.div`
  font-size: 12px;
`;

const Content = styled.div`
  padding: 16px;
`;

const Skills = styled.div`
  display: flex;
  border: solid #b9b9b9;
  border-width: 0 0 1px;
  padding: 12px;
`;

const ListBtt = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const NickName = styled.div`
  padding: 8px;
`;

const Notice = styled.div``;
const Setting = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 14px;
  left: -85px;
  border-radius: 7px;
  padding: 10px;
  background-color: #ff5353;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  padding: 12px;
`;
const ModifyBtt = styled.button`
  background-color: #ffffff;
  border-radius: 10px;
  border: none;
  padding: 5px;
  font-size: 14px;
`;
const BoardDetail = () => {
  const { boardId } = useParams();
  const [boardContent, setBoardContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [replyContent, setReplyContent] = useState(null);
  const [repliesChanged, setRepliesChanged] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModify, setIsModify] = useState(true);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const Id = localStorage.getItem("accessToken");
  const email = localStorage.getItem("email");
  const toggleDropdown = () => {
    setIsDropdownOpen(true);
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const id = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchUserInfo = async (email) => {
      try {
        const rsp = await AxiosApi.getUserInfo2(email);
        setUserInfo(rsp.data);

        if (rsp.data && rsp.data.profileImgPath) {
          setImageUrl(rsp.data.profileImgPath);
        } else {
          setImageUrl(defaultImage);
        }
      } catch (e) {
        console.log(e);
        setImageUrl(defaultImage);
      }
    };
    //console.log("userInfo", userInfo);
    fetchUserInfo(id);
  }, []);

  //  자유게시판 상세 정보 가져오기
  useEffect(() => {
    const boardDetail = async (id) => {
      // console.log(boardId, "  아이디 값 넘기기 ");
      try {
        const response = await AxiosApi.getBoardDetail(id);
        console.log(
          "상세 보기 데이터 ",
          response.data.memberId.email,
          ",",
          email
        );

        setBoardContent(response.data);
      } catch (e) {
        console.log(e.response);
      }
    };
    boardDetail(boardId);
  }, [boardId]);
  const textareaRef = useRef(null);
  // 댓글창 자동으로 늘어나게하기...
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이를 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 따라 높이 조절
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이를 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 따라 높이 조절
    }
  };

  const sendReply = () => {
    const postReply = async () => {
      try {
        // Construct the postData with the room ID obtained from createRoomResponse

        //console.log("reply ", replyContent);

        const response = await AxiosApi.postReply(replyContent, boardId);
        //console.log("response ", replyContent);
        if (response.data) {
          alert("댓글 등록 성공!!!!!!!!!!!!");
          setRepliesChanged((prev) => !prev);
          setReplyContent(""); // 댓글 입력 필드 초기화
        } else {
          throw new Error("댓글 등록이 실패했습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("댓글 등록 실패ㅠㅠㅠㅠㅠㅠㅠㅠㅠ");
      }
    };
    postReply();
  };
  const handleModfiy = () => {
    navigate(`/apueda/modify/board/${boardId}`);
  };
  const handleDelete = () => {
    deleteBoard(boardId);
  };

  // 삭제
  const deleteBoard = async (boardId) => {
    const rspWriter = await AxiosApi.getBoardDetail(boardId);
    console.log("dele 실행", rspWriter.data.memberId.email);
    if (email !== rspWriter.data.memberId.email) {
      alert("너..작성자가 아니구나?...");
    } else {
      const isDel = window.confirm("정말로 삭제 하시겠습니까?");
      if (isDel) {
        try {
          const response = await AxiosApi.boardDelete(boardId);
          if (response.data) {
            alert("프로젝트가 삭제되었습니다.");
            navigate("/apueda/board");
          } else {
            alert("삭제할 프로젝트 데이터가 없습니다.");
          }
        } catch (e) {
          console.log("삭제중 오류가 발생하였습니다.", e);
        }
      }
    }
  };
  return (
    <BoardLayout>
      <Container>
        <HeadContainer style={{ justifyContent: "center" }}>
          <Top>자유 게시판</Top>
        </HeadContainer>
        <ContentContainer style={{ padding: "32px", height: "auto" }}>
          {boardContent && (
            <Head>
              <UpHead>
                <Title>{boardContent.title}</Title>
                <Recruit>
                  <BoardTime>{formatTimestamp(boardContent.regDate)}</BoardTime>
                </Recruit>
              </UpHead>
              <UnderHead>
                <Profile>
                  <ProfileImg>
                    <img src={boardContent.profileImg}></img>
                  </ProfileImg>
                  <NickName>{boardContent.nickName}</NickName>
                </Profile>
                <Setting>
                  {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                  {email === boardContent.memberId.email ? (
                    <div style={{ position: "relative" }}>
                      <div onClick={toggleDropdown}>...</div>

                      {isDropdownOpen && (
                        <Dropdown ref={modalRef}>
                          <ModifyBtt
                            onClick={() => handleModfiy()}
                            value={isModify}
                          >
                            수정하기
                          </ModifyBtt>
                          <ModifyBtt
                            onClick={() => handleDelete()}
                            value={!isModify}
                          >
                            삭제하기
                          </ModifyBtt>
                        </Dropdown>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}

                  {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                </Setting>
              </UnderHead>
            </Head>
          )}
          {boardContent && (
            <Body>
              <Content>{boardContent.content}</Content>
            </Body>
          )}
          {boardContent && (
            <Footer>
              <Skills>
                {boardContent.skillName &&
                  boardContent.skillName.map((skills, index) => (
                    <Button
                      key={index}
                      style={{ width: "auto", padding: "0 10px" }}
                    >
                      {skills.skillName}
                    </Button>
                  ))}
              </Skills>
              <ListBtt>
                <Button onClick={() => navigate("/apueda/board")}>목록</Button>
              </ListBtt>
            </Footer>
          )}
          <ReplyContainer>
            <ReplyListComponent
              boardId={boardId}
              projectId={null}
              repliesChanged={repliesChanged}
              type="board"
              userInfo={userInfo}
            />
          </ReplyContainer>
        </ContentContainer>
      </Container>
    </BoardLayout>
  );
};
export default BoardDetail;

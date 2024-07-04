// ReplyListContainer.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ReplyListContainer,
  PageNum,
  ProfileImg,
} from "../../style/ProjectDetailStyle";
import AxiosApi from "../../api/AxiosApi";
import formatDate from "../../utils/formatDate";
import { Button } from "../../style/WriteStyle";

const NickName = styled.div`
  padding: 8px;
`;

const RegDate = styled.div`
  padding: 4px;
`;

const ReplyList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & div.replies {
    display: flex;
    flex-direction: row;
    border: 0.5px solid #b9b9b9;
    border-width: 0 0 0.5px;
    padding: 12px;
  }
`;
const ReplyContent = styled.div`
  width: 78%;
  padding: 8px;
`;
const PageButton = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 5px;
  background-color: ${(props) => (props.active ? "#FFD6D6" : "")};
  border-radius: 36px;
  width: 32px;
`;
const NoReply = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReplyListComponent = ({ projectId, repliesChanged }) => {
  const [replies, setReplies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(0); // 총 페이지 수
  useEffect(() => {
    const getReplyList = async (id, page) => {
      try {
        const response = await AxiosApi.getReplyList(id, page);
        console.log("댓글 리스트 : ", response.data.replies);
        console.log("프로필 url : ", response.data.ProfileImg);

        // API 응답이 배열인지 확인
        if (Array.isArray(response.data.replies)) {
          // 각 댓글 객체의 regDate를 포맷
          const formattedData = response.data.replies.map((reply) => ({
            ...reply,
            regDate: formatDate(reply.regDate),
          }));
          setReplies(formattedData);
          setTotalPageSize(response.data.totalPages);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getReplyList(projectId, currentPage);
  }, [projectId, repliesChanged, currentPage]);

  // 페이지 이동
  const handlePageChange = (number) => {
    console.log("클릭 버튼 ", number);
    setCurrentPage(number);
  };
  const prev = (pageNum) => {
    if (pageNum === 0) {
      alert("첫번째 페이지다");
    } else {
      setCurrentPage(pageNum - 1);
      console.log(pageNum);
    }
  };
  // useEffect(() => {
  //   next();
  // },[])
  const next = () => {
    if (currentPage < totalPageSize - 1) {
      // currentPage가 totalPageSize보다 작을 때만 다음 페이지로 이동
      setCurrentPage(currentPage + 1); // 현재 페이지를 다음 페이지로 설정
    } else {
      alert("마지막 페이지입니다.");
    }
  };
  return (
    <ReplyListContainer>
      {replies.length !== 0 ? (
        replies.map((reply, index) => (
          <ReplyList>
            <div className="replies" key={index}>
              <ProfileImg>
                <img src={reply.profileImg} alt="profile" />
              </ProfileImg>
              <NickName>{reply.nickName}</NickName>
              <ReplyContent>{reply.content}</ReplyContent>
              <RegDate>{reply.regDate}</RegDate>
            </div>
          </ReplyList>
        ))
      ) : (
        <ReplyList>
          <NoReply>
            댓글이 아직 등록 되지 않았습니다. 먼저 댓글을 등록해보세요!
          </NoReply>
        </ReplyList>
      )}
      <PageNum>
        <Button
          onClick={() => prev(currentPage)}
          style={{ width: "40px", marginRight: "0px" }}
        >
          &lt;
        </Button>
        {replies.length === 0 ? (
          <PageButton> 1 </PageButton>
        ) : (
          Array.from({ length: totalPageSize }, (_, i) => i + 1).map((page) => {
            // 현재 페이지 기준으로 10개씩 그룹화
            const startPage = Math.floor(currentPage / 10) * 10 + 1;
            if (page >= startPage && page < startPage + 10) {
              // startPage부터 startPage + 9까지의 페이지만 표시
              return (
                <PageButton
                  key={page}
                  onClick={() => handlePageChange(page - 1)}
                  active={currentPage === page - 1}
                >
                  {page}
                </PageButton>
              );
            } else {
              return null; // 현재 그룹에 속하지 않는 페이지는 렌더링하지 않음
            }
          })
        )}
        <Button onClick={() => next(currentPage)} style={{ width: "40px" }}>
          &gt;
        </Button>
      </PageNum>
    </ReplyListContainer>
  );
};

export default ReplyListComponent;

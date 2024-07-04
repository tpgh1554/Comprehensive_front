import styled from "styled-components";
import Apuedalogo from "../image/apueda-logo-ff3e34.png";
import AxiosApi from "../api/PaymentAxios";
import Detaillist from "./detailllist";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Unsubmodal from "./unsubmodal";
import Paging from "./paging";

const Subpage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  /* overflow: scroll; */
`;

const Subinfobox = styled.div`
  width: 65%;
  background-color: white;
  border: 1px solid #dee2e6;
  margin-top: 10vh;
  display: flex;
  align-items: center;
`;

const Logoimg = styled.div`
  width: 15%;
  height: 50px;
  background-image: url(${Apuedalogo});
  background-color: none;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 8%;
`;
const Deadline = styled.div`
  width: 35%;
  height: 50px;
  text-align: center;
  align-content: center;
  font-size: 25px;
  margin-left: 12%;
`;

const Subbutt = styled.button`
  width: 100px;
  height: 30px;
  color: white;
  background-color: #ff5353;
  border-radius: 30px;
  font-size: 20px;
  text-align: center;
  align-content: center;
  margin-left: 12%;
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;

const Datails = styled.div`
  width: 150px;
  height: 50px;
  color: white;
  background-color: #ff5353;
  border-radius: 30px;
  font-size: 20px;
  text-align: center;
  align-content: center;
  margin-top: 10%;
`;

const Datailsbox = styled.div`
  margin-top: 50px;
  width: 65%;
  background-color: red;
  height: 700px;
  display: flex;
  flex-direction: column;
`;

const Detailtitle = styled.div`
  width: 100%;
  background-color: #dee2e6;
  height: 60px;
  color: black;
  display: flex;
  align-items: center;
`;
const Textbox = styled.div`
  font-size: 23px;
  color: black;
  text-align: center;
`;
const Detailbox = styled.div`
  height: 640px;
  width: 100%;
  background-color: white;
`;
const Mysub = () => {
  const [historyList, setHistoryList] = useState([]);
  const member = localStorage.getItem("email");
  const [deadLine, setDeadLine] = useState("");
  const [substatus, setSubstatus] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [subOpen, setSubOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [header, setHeader] = useState("");
  const [merchantuid, setMerchantuid] = useState("");
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const onClickSub = (e) => {
    setSubOpen(true);
  };
  const closeSub = () => {
    setSubOpen(false);
  };

  useEffect(() => {
    if (member) {
      fetchData();
      fetchDeadline();
    }
  }, [member, currentPage]);

  const fetchData = async () => {
    try {
      let response = await AxiosApi.historyList(
        member,
        currentPage - 1,
        pageSize
      );
      console.log("res : ", response);
      setTotalItems(response.data.totalItems); // totalItems 설정
      setHistoryList(response.data.paymentHistory);
      console.log("historyList : ", historyList);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  const fetchDeadline = async () => {
    try {
      let response = await AxiosApi.deadline(member);
      if (response && response.data) {
        setDeadLine(response.data[0].validUntil);
        setSubstatus(response.data[0].status);
        setMerchantuid(response.data[0].merchantuid);
        console.log(response.data[0]);
      } else {
        console.error("No deadline data in response");
      }
    } catch (error) {
      console.error("Error fetching deadline:", error);
    }
  };

  const handleSubscriptionAction = () => {
    if (substatus === "구독" && new Date(deadLine) > new Date()) {
      return "해지";
    } else if (substatus === "해지" && new Date(deadLine) > new Date()) {
      return "다시 구독";
    } else {
      return "구독";
    }
  };
  const subnav = () => {
    if (substatus === "구독" && new Date(deadLine) > new Date()) {
      onClickSub();
    } else if (substatus === "해지" && new Date(deadLine) > new Date()) {
    } else {
      navigate("/apueda/subinfo");
    }
  };
  // const paginatedData = historyList.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const buttonText = handleSubscriptionAction();
  const deline = deadLine.substring(0, 10);
  return (
    <Subpage>
      <Subinfobox>
        <Logoimg />
        <Deadline>{deline}</Deadline>
        <Subbutt onClick={subnav}>{buttonText}</Subbutt>
      </Subinfobox>
      <Datails>결제내역</Datails>
      <Datailsbox>
        <Detailtitle>
          <Textbox style={{ marginLeft: "10%" }}>결제일</Textbox>
          <Textbox style={{ margin: "0 35% 0 30%" }}>내역</Textbox>
          <Textbox>금액</Textbox>
        </Detailtitle>
        <Detailbox>
          <Detaillist historyList={historyList} />
        </Detailbox>
      </Datailsbox>
      <Paging
        page={currentPage}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalItems}
        onPageChange={handlePageChange}
      />
      <Unsubmodal
        open={subOpen}
        close={closeSub}
        category="해지 창"
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
        setHeader={setHeader}
        deadLine={deadLine}
        merchantuid={merchantuid}
        member={member}
      ></Unsubmodal>
    </Subpage>
  );
};

export default Mysub;

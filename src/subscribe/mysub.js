import styled from "styled-components";
import Apuedalogo from "../image/apueda-logo-ff3e34.png";
import AxiosApi from "../api/PaymentAxios";
import Detaillist from "./detailllist";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (member) {
      fetchData();
      fetchDeadline();
    }
  }, [member]);

  const fetchData = async () => {
    try {
      let response = await AxiosApi.historyList(member);
      if (response && response.data) {
        const sortedData = response.data.sort(
          (a, b) => b.paymentHistoryId - a.paymentHistoryId
        );
        setHistoryList(sortedData);
      } else {
        console.error("No data in response");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };
  const fetchDeadline = async () => {
    try {
      let response = await AxiosApi.deadline(member);
      if (response && response.data) {
        setDeadLine(response.data[0].validUntil); // deadline 값 설정
        console.log(response.data[0].validUntil);
      } else {
        console.error("No deadline data in response");
      }
    } catch (error) {
      console.error("Error fetching deadline:", error);
    }
  };
  const deline = deadLine.substring(0, 10);
  return (
    <Subpage>
      <Subinfobox>
        <Logoimg />
        <Deadline>{deline}</Deadline>
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
    </Subpage>
  );
};

export default Mysub;

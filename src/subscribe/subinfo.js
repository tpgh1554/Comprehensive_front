import styled from "styled-components";
import Logosidefont from "../components/logosidefont";
import slid from "./slidpic.png";
import profile from "./profile.png";
import adver from "./advert.png";
import { useState } from "react";
import Submodal from "./Submodal";

const Subinfoheader = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(249, 47, 35, 0.25) 0%,
    rgba(249, 47, 35, 0.2) 10%,
    rgba(249, 47, 35, 0.15) 30%,
    rgba(249, 47, 35, 0.1) 50%,
    rgba(249, 47, 35, 0.05) 75%,
    #ffffff 100%
  );
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 50px;
`;

const Headtext = styled.div`
  font-size: 30px;
  font-weight: bold;
  width: 60%;
`;

const Subinfohead = styled.div`
  font-size: 13px;
  width: 88%;
  margin-top: 15px;
`;
const Subinfohead1 = styled.div`
  font-size: 13px;
  width: 63%;
  margin-bottom: 20px;
`;

const Subbutton = styled.button`
  background-color: #f92f23;
  border-radius: 50px;
  color: white;
  border-color: #f92f23;
  height: 50px;
  width: 150px;
  &:hover {
    cursor: pointer;
  }
`;
const Subbody = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 50px;
`;
const Bodybanner = styled.div`
  width: 55%;
  height: auto;
  display: flex;
`;
const Picbox = styled.div`
  width: 700px;
  height: 500px;
  background-size: contain;
  background-repeat: no-repeat;
`;
const Textbox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: auto;
`;

const Subinfo = () => {
  const [subOpen, setSubOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [header, setHeader] = useState("");
  const [address, setAddress] = useState("");

  const onClickSub = (e) => {
    setSubOpen(true);
  };
  const closeSub = () => {
    setSubOpen(false);
  };

  return (
    <>
      <Subinfoheader>
        <Box>
          <Logosidefont />
          <Headtext>아프다의 모든것 광고 없이 즐기세요.</Headtext>
          <Subinfohead>
            아프다에서 광고로 끊김 없는 해택, 무한 스와이프, 그리고 끊김없는
            프로필 감상
          </Subinfohead>
          <Subinfohead1>
            1개월 무료 체험 이후 20,000원 언제든지 취소 가능
          </Subinfohead1>
          <Subbutton onClick={onClickSub}>구독하러 가기</Subbutton>
        </Box>
        <Headtext style={{ marginTop: "60px", fontSize: "40px" }}>
          끊임 없는 계발자 매칭
        </Headtext>
      </Subinfoheader>
      <Subbody>
        <Bodybanner>
          <Picbox style={{ backgroundImage: `url(${profile})` }} />
          <Textbox>
            <Headtext
              style={{
                marginLeft: "100px",
                width: "70%",
                marginTop: "100px",
                textAlign: "center",
              }}
            >
              내가 보고싶은 회원 프로필 열람해 보세요
            </Headtext>
            <Subinfohead style={{ textAlign: "center", marginLeft: "50px" }}>
              이제 막힘 없이 프로필을 확인하세요
            </Subinfohead>
          </Textbox>
        </Bodybanner>
        <Bodybanner style={{ marginTop: "50px" }}>
          <Textbox>
            <Headtext
              style={{
                marginLeft: "5px",
                width: "80%",
                marginTop: "100px",
                textAlign: "center",
              }}
            >
              이제 하루 제한 없이 무제한으로 이용하세요
            </Headtext>
          </Textbox>
          <Picbox
            style={{
              backgroundImage: `url(${slid})`,
              width: "850px",
              height: "700px",
            }}
          />
        </Bodybanner>
        <Bodybanner>
          <Picbox style={{ backgroundImage: `url(${adver})`, width: "88%" }} />
          <Textbox>
            <Headtext
              style={{
                marginLeft: "100px",
                width: "80%",
                marginTop: "100px",
                textAlign: "center",
              }}
            >
              광고 없는 아프다
            </Headtext>
            <Subinfohead style={{ marginLeft: "100px", width: "100%" }}>
              광고 없이 끊임없이 어플 이용 가능 광고로 끊김 없이 유용한 개발
              정보를 찾거나, 새로운 사람들의 정보를 알아보세요
            </Subinfohead>
          </Textbox>
        </Bodybanner>
        <Box>
          <Headtext>체험하기</Headtext>
          <Subinfohead style={{ marginTop: "30px" }}>
            1개월 무료체험 이후 월 20,000원 언제든지 취소가능
          </Subinfohead>
          <Subbutton style={{ marginTop: "20px" }}>1개월 체험하기</Subbutton>
        </Box>
      </Subbody>
      <Submodal
        open={subOpen}
        close={closeSub}
        category="결제 창"
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
        setHeader={setHeader}
        address={address}
        setAddress={setAddress}
      ></Submodal>
    </>
  );
};
export default Subinfo;

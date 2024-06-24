import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import googlelogo from "../image/share_google_play_logo.png";
import lovechaticon from "../image/lovechat.png";
import sampleimg from "../image/pepe.png";

export default function SimpleSlider() {
  const navigate = useNavigate();
  var settings = {
    dots: true, //아래 원형 버튼 여부
    infinite: true, // 슬라이드 반복 여부
    speed: 200, // 슬라이드 속도
    slidesToShow: 1, // 화면에 출력되는 화면 수
    slidesToScroll: 1, // 이동되는 화면 수
    arrows: true, // 양쪽 화살표
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
  };
  return (
    <StyledSliderContainer>
      <Slider {...settings}>
        <FirstCut>
          <Container>
            <Box>
              <Item>
                <div>
                  우리 같이 <br />
                  플젝할래?
                </div>
              </Item>
              <Item2>
                <div>
                  mobile버전 다운로드
                  <PlaystoreButton />
                </div>
                <div>
                  두근두근 데이트 시작하기
                  <DatingAppButton onClick={() => navigate("/login")}>
                    <span>개발자 매칭</span>
                  </DatingAppButton>
                </div>
              </Item2>
            </Box>
            <ImageBox imageUrl={sampleimg} />
          </Container>
        </FirstCut>
        <SecondCut>
          <Container>
            <Box>
              <Item>
                <div>
                  우리 같이 <br />
                  플젝할래?
                </div>
              </Item>
              <Item2>
                <div>
                  mobile버전 다운로드
                  <PlaystoreButton />
                </div>
                <div>
                  두근두근 데이트 시작하기
                  <DatingAppButton onClick={() => navigate("/login")}>
                    <span>개발자 매칭</span>
                  </DatingAppButton>
                </div>
              </Item2>
            </Box>
            <ImageBox imageUrl={sampleimg} />
          </Container>
        </SecondCut>
        <ThirdCut>
          <Container>
            <Box>
              <Item>
                <div>
                  우리 같이 <br />
                  플젝할래?
                </div>
              </Item>
              <Item2>
                <div>
                  mobile버전 다운로드
                  <PlaystoreButton />
                </div>
                <div>
                  두근두근 데이트 시작하기
                  <DatingAppButton onClick={() => navigate("/login")}>
                    <span>개발자 매칭</span>
                  </DatingAppButton>
                </div>
              </Item2>
            </Box>
            <ImageBox imageUrl={sampleimg} />
          </Container>
        </ThirdCut>
      </Slider>
    </StyledSliderContainer>
  );
}

const StyledSliderContainer = styled.div`
  .slick-dots {
    bottom: 50px; // dots 위치를 조정
    li {
      margin: 0 20px;
    }
    button {
      &::before {
        font-size: 20px;
        color: black; // dots 색상 조정
      }
    }
    .slick-active button::before {
      color: white; // 활성화된 dots 색상 조정
    }
  }
`;

const FirstCut = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  min-height: 500px;
  background-color: rgb(255, 70, 130);
`;

const SecondCut = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  min-height: 500px;
  background-image: linear-gradient(to top, #11fbc8 0%, #225599 100%);
`;

const ThirdCut = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  min-height: 500px;
  background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5vw;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
`;
const ImageBox = styled.div`
  width: 50%;
  height: auto;
`;

const Item = styled.div`
  font-size: 60px;
  color: white;
  margin-bottom: 20px;
`;

const Item2 = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  margin-bottom: 10px;
  font-size: 15px;
  color: white;
  & > div {
    display: flex;
    flex-direction: column;
    margin: 10px; // Box의 직계 자식 div에 스타일 적용
  }
  & span {
    font-size: 20px;
    color: black;
    text-align: left;
    padding: 20px;
  }
`;
const PlaystoreButton = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 20px;
  background-color: white;
  background-image: url(${googlelogo});
  background-size: cover;
  background-position: center;
`;
const DatingAppButton = styled.div`
  display: flex;
  align-items: center; // 수직 가운데 정렬
  width: 200px;
  height: 50px;
  border-radius: 20px;
  background-color: white;
  background-image: url(${lovechaticon});
  background-size: contain;
  background-position: right;
  background-repeat: no-repeat;
`;

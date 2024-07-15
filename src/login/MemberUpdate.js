import {
  Container,
  Box,
  Contents,
  ProfileBox,
  InputContainer,
  EmailBox,
  ShortInput,
  CheckBtn,
  LongInput,
  SkillCheck,
  SkillContext,
  CheckBox,
  TextBox,
  Text,
  SubmitBtn,
} from "./style/SignFormStyle";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../api/firebase/Firebase";
import AxiosApi from "../api/AxiosApi";
import basicProfile from "../image/person-icon2.png";

const MemberUpdate = () => {
  // 입력하는 값을 저장하기 위한 것들
  const [userInfo, setUserInfo] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");

  const [skill, setSkill] = useState("");
  const [myInfo, setMyInfo] = useState("");

  // 유효성 검사
  const [pwdValid, setPwdValid] = useState(false); // 비밀번호 유효성 검사
  const [pwdConcord, setPwdConcord] = useState(false); // 비밀번호 일치여부 확인
  const [checkedValid, setCheckedValid] = useState(false); // 스킬 필수 체크

  // Firebase 파일 설정
  const [file, setFile] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  // 네비게이션
  const navigate = useNavigate();
  // 오류메세지
  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");

  useEffect(() => {
    const memberInfo = async () => {
      const profile = localStorage.getItem("imgUrl");
      try {
        const rsp = await AxiosApi.getUserInfo2();
        setUserInfo(rsp.data);
        setImgSrc(profile);
        setNickname(rsp.data.nickname);
        setEmail(rsp.data.email);
        setName(rsp.data.name);
        setIdentityNumber(rsp.data.identityNumber);
        setMyInfo(rsp.data.myInfo);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    memberInfo();
  }, []);

  // 파이어베이스 수정
  const canvasRef = useRef(null);
  // 입력받은 이미지 파일 주소
  const handleFileInputChange = (e) => {
    // const selectedFile = e.target.files?.[0];

    // // 밑에꺼 크기 사이즈 변경하는 부분 오류나면 다시 복구 예정
    // if (selectedFile) {
    //   const objectUrl = URL.createObjectURL(selectedFile);
    //   setImgSrc(objectUrl);
    //   // 파이어베이스에 보내기위해 변수에 저장
    //   setFile(selectedFile);
    // }

    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 800;
        canvas.height = 800;
        ctx.drawImage(img, 0, 0, 800, 800);
        console.log("이미지 그리기 완료");

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], selectedFile.name, {
                type: "image/png",
              });
              setFile(resizedFile);
              setImgSrc(URL.createObjectURL(resizedFile));
            } else {
              console.log("이미지 변환 중 오류 발생");
            }
          },
          "image/png",
          0.9
        );

        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        console.log("이미지 로드 중 오류 발생");
      };
    }
  };
  // 이미지 저장
  const onSubmit = () => {
    if (imgSrc !== basicProfile && imgSrc !== userInfo.profileImgPath) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`${email}`);
      fileRef.put(file).then(() => {
        console.log("저장성공!");
        fileRef.getDownloadURL().then((url) => {
          console.log("저장경로 확인 : " + url);
          localStorage.setItem("imgUrl", url);
          regist(url);
        });
      });
    } else if (imgSrc === basicProfile) {
      regist(basicProfile);
      localStorage.setItem("imgUrl", basicProfile);
    } else if (imgSrc === userInfo.profileImgPath) {
      regist(userInfo.profileImgPath);
      localStorage.setItem("imgUrl", userInfo.profileImgPath);
    }
  };

  // 비밀번호 인풋
  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword); // 비밀번호 상태 업데이트

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;',.?/\\-]).{8,}$/; // 수정된 정규식

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "비밀번호는 숫자, 영어 소문자, 특수문자를 모두 포함하여 8자 이상이어야 합니다."
      );
      setPwdValid(false);
    } else {
      setPasswordError("");
      setPwdValid(true);
    }
  };

  const onChangePassword2 = (e) => {
    const newPassword = e.target.value;
    setPassword2(newPassword);
    if (password === newPassword) {
      setPwdConcord(true);
      setPasswordError2("");
    } else {
      setPwdConcord(false);
      setPasswordError2("비밀번호가 일치하지 않습니다.");
    }
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
    if (e.target.value === null) {
      setNickname(userInfo.nickname);
    }
  };
  // 체크박스
  // 스킬 체크
  const skills = [
    "Java",
    "JavaScript",
    "Python",
    "C++",
    "C#",
    "React",
    "React Native",
    "Django",
    "Elastic Stack",
    "Kotlin",
  ];
  const [isChecked, setIsChecked] = useState(Array(skills.length).fill(false));
  const handleCheckboxChange = (index) => {
    const updatedChecked = [...isChecked];
    updatedChecked[index] = !updatedChecked[index];
    setIsChecked(updatedChecked);

    const updatedSkills = skills.filter((_, idx) => updatedChecked[idx]);
    setSkill(updatedSkills);

    // 체크된 항목이 하나라도 있으면  checkedValid를 true로 설정
    if (updatedChecked.some((checked) => checked)) {
      setCheckedValid(true);
    } else {
      setCheckedValid(false);
    }
  };

  const onChangeMyinfo = (e) => {
    setMyInfo(e.target.value);
  };

  const regist = async (url = "") => {
    const originImage = imgSrc === basicProfile ? "" : imgSrc;
    const image = url !== "" ? url : originImage;

    console.log("프로필 이미지 경로는 : " + image);
    const user = {
      email,
      name,
      password,
      nickname: nickname,
      identityNumber,
      profileImgPath: image,
      skill,
      myInfo,
    };
    try {
      console.log(user);
      localStorage.setItem("imgUrl", image);
      const rsp = await AxiosApi.memberUpdate(user);
      if (rsp.data) {
        alert("회원 정보 수정에 성공했습니다.");
        console.log(user);
        navigate("/apueda/mypage");
      } else {
        alert("회원 정보 수정에 실패했습니다.");
      }
    } catch (e) {
      console.log(e);
      alert("회원 정보 수정 중 오류가 발생했습니다.");
    }
  };

  // 일단 회원탈퇴 제외
  // const memberDel = async () => {
  //   const accToken = localStorage.getItem("accessToken");
  //   try {
  //     const response = await AxiosApi.signout(accToken);
  //     if (response.data) {
  //       alert("회원 삭제에 성공했습니다.");
  //       navigate("/apueda");
  //     } else {
  //       alert("회원 삭제에 실패했습니다.");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     alert("회원 삭제 중 오류가 발생했습니다.");
  //   }
  // };

  const isFormValid = pwdValid && pwdConcord && checkedValid;

  return (
    <Container>
      <Box>
        <Contents>
          <h1>회원 정보 수정</h1>
          <ProfileBox className="profileImgPath">
            <div className="imgBox">
              <img src={imgSrc} alt="프로필이미지" />
            </div>
            <label>
              <input type="file" onChange={(e) => handleFileInputChange(e)} />
              파일 선택
            </label>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </ProfileBox>

          <InputContainer>
            <span>이메일</span>
            <LongInput placeholder={userInfo.email} disabled />
            <LongInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            <span id="hint">
              {password.length > 0 && (
                <p className={pwdValid ? "success" : "error"}>
                  {passwordError}
                </p>
              )}
            </span>
            <LongInput
              type="password"
              placeholder="비밀번호 확인"
              value={password2}
              onChange={onChangePassword2}
            />
            <span id="hint">
              {password2.length > 0 && (
                <p className={pwdConcord ? "success" : "error"}>
                  {passwordError2}
                </p>
              )}
            </span>
            <span>이름</span>
            <LongInput placeholder={userInfo.name} disabled />
            <span>닉네임</span>
            <LongInput
              value={nickname}
              placeholder={userInfo.nickname}
              onChange={onChangeNickname}
            />
            주민번호
            <LongInput placeholder={userInfo.identityNumber} disabled />
            <SkillCheck>
              <p>사용스킬</p>
              {skills.map((skill, index) => (
                <SkillContext key={index}>
                  <CheckBox
                    type="checkbox"
                    checked={isChecked[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label>{skill}</label>
                </SkillContext>
              ))}
            </SkillCheck>
            <TextBox>
              <p>자기소개</p>
              <Text
                value={myInfo}
                onChange={onChangeMyinfo}
                placeholder={userInfo.myInfo}
              />
            </TextBox>
          </InputContainer>
          <SubmitBtn onClick={onSubmit} disabled={isFormValid ? false : true}>
            수정
          </SubmitBtn>
          {/* <SubmitBtn onClick={memberDel}>탈퇴</SubmitBtn> */}
        </Contents>
      </Box>
    </Container>
  );
};
export default MemberUpdate;

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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "../api/firebase/ImageUploader";
import { storage } from "../api/firebase/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AxiosApi from "../api/AxiosApi";

const MemberUpdate = () => {
  // 입력하는 값을 저장하기 위한 것들
  const [userInfo, setUserInfo] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [profileImgPath, setProfileImgPath] = useState("");
  const [skill, setSkill] = useState("");
  const [myInfo, setMyInfo] = useState("");
  const [formattedIdentityNumber, setFormattedIdentityNumber] = useState("");

  // 유효성 검사
  const [pwdValid, setPwdValid] = useState(false); // 비밀번호 유효성 검사
  const [pwdConcord, setPwdConcord] = useState(false); // 비밀번호 일치여부 확인

  // Firebase 파일 설정
  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  // 네비게이션
  const navigate = useNavigate();
  // 오류메세지
  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");

  useEffect(() => {
    const imgUrl = localStorage.getItem("imgUrl");
    if (imgUrl) {
      setPreviewUrl(imgUrl);

      setFile(imgUrl);
    }
  }, []); // 빈 배열을 의존성 배열로 사용

  useEffect(() => {
    const memberInfo = async () => {
      try {
        const rsp = await AxiosApi.getUserInfo2();
        setUserInfo(rsp.data);
        setFile(previewUrl);
        setEmail(userInfo.email);
        setName(userInfo.name);
        setIdentityNumber(userInfo.identityNumber);
        setSkill(userInfo.skill);
        setMyInfo(userInfo.myInfo);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    memberInfo();
  }, []);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const uploadImg = async () => {
    try {
      if (!file) {
        throw new Error("파일이 선택되지 않았습니다.");
      }
      const fileRef = ref(storage, `images/${email}`);
      const snapshot = await uploadBytes(fileRef, file, {
        contentType: file.type,
      });
      console.log("이미지 파이어베이스 업로드 성공");
      const url = await getDownloadURL(snapshot.ref);
      console.log("경로 : " + url);
      localStorage.setItem("imgUrl", url);
      setProfileImgPath(url);
      return url; // 업로드가 성공하면 URL 반환
    } catch (e) {
      console.log("파일 업로드 에러 : " + e);
      throw e; // 에러 발생 시 예외 던짐
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
      setPasswordError("");
    } else {
      setPwdConcord(false);
      setPasswordError("비밀번호가 일치하지 않습니다.");
    }
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
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
  };

  const onChangeMyinfo = (e) => {
    setMyInfo(e.target.value);
  };

  const test = async () => {
    return await uploadImg(); // 업로드 이미지 함수가 완료 될 때 까지 기다리는듯
  };

  const regist = async () => {
    const user = {
      email,
      password,
      nickname,
      profileImgPath,
      skill,
      myInfo,
    };
    try {
      const imgPath = await test();
      setProfileImgPath(imgPath);

      const response = await AxiosApi.memberUpdate(user);
      if (response.data) {
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

  const memberDel = async () => {
    const accToken = localStorage.getItem("accessToken");
    try {
      const response = await AxiosApi.signout(accToken);
      if (response.data) {
        alert("회원 삭제에 성공했습니다.");
        navigate("/apueda");
      } else {
        alert("회원 삭제에 실패했습니다.");
      }
    } catch (e) {
      console.log(e);
      alert("회원 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Box>
        <Contents>
          <h1>회원 정보 수정</h1>
          <ProfileBox>
            <Upload setFile={handleFileChange} previewUrl={previewUrl} />
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
              placeholder={userInfo.nickname}
              value={nickname}
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
          <SubmitBtn onClick={regist}>수정</SubmitBtn>
          <SubmitBtn onClick={memberDel}>탈퇴</SubmitBtn>
        </Contents>
      </Box>
    </Container>
  );
};
export default MemberUpdate;

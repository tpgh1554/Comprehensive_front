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

const SignUp = () => {
  // 입력하는 값을 저장하기 위한 것들
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

  // 이메일 코드 작성
  const [inputCode, setInputCode] = useState(null);
  const [sentCode, setSentCode] = useState(null);
  // 유효성 검사
  const [emailValid, setEmailValid] = useState(false); // 이메일 형식 검사
  const [codeValid, setCodeValid] = useState(false); // 인증번호 검사
  const [pwdValid, setPwdValid] = useState(false); // 비밀번호 유효성 검사
  const [pwdConcord, setPwdConcord] = useState(false); // 비밀번호 일치여부 확인
  const [identifyNumberValid, setIdentifyNumberValid] = useState(false); // 주민번호 숫자 다 입력했는지 확인
  // Firebase 파일 설정
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  // 오류메세지
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");
  const [identityNumberError, setIdentityNumberError] = useState("");

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
      setProfileImgPath(url);
      return url; // 업로드가 성공하면 URL 반환
    } catch (e) {
      console.log("파일 업로드 에러 : " + e);
      throw e; // 에러 발생 시 예외 던짐
    }
  };

  // 입력 인증 번호 확인
  const onChangeEmailCode = (e) => {
    const currCode = Number(e.target.value);
    setInputCode(currCode);
  };

  // 이메일 인증
  const authorizeMail = async () => {
    try {
      const rsp = await AxiosApi.mail(email);
      console.log("전송 인증번호:", rsp.data);
      setEmailValid("");
      setEmailError("");
      if (rsp.data !== null) {
        setSentCode(rsp.data);
        console.log("인증 코드 설정 후:", sentCode); // sentCode 값이 올바르게 설정되었는지 확인
      }
    } catch (error) {
      console.error("이메일 요청 오류:", error);
      // 오류 처리 로직 추가
    }
  };

  // 이메일 인증번호 입력
  const checkCode = () => {
    if (inputCode === sentCode) {
      setCodeValid(true);
      console.log("인증되었습니다");
    } else {
      setCodeValid(false);
      console.log("다시 입력해 주세요");
    }
  };

  // 회원 가입 여부 DB 확인
  const memberRegCheck = async (email) => {
    try {
      const response = await AxiosApi.userCheck(email);
      console.log("회원 존재 여부 : ", response.data);
      if (response.data === false) {
        setEmailError("가입 가능한 아이디입니다.");
        setEmailValid(true);
      } else {
        setEmailError("중복된 이메일 입니다.");
        setEmailValid(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 이메일 인풋
  const onChangeEmail = (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // 이메일 입력 정규식
    if (!emailRegex.test(e.target.value)) {
      // 입력값이 정규식에 만족하지 않으면~
      setEmailError("이메일 형식이 올바르지 않습니다.");
      setEmailValid(false);
    } else {
      setEmailError("올바른 이메일 형식입니다.");
      setEmailValid(true);
      memberRegCheck(currEmail);
      // memberRegCheck(e.target.value); //DB에 중복 이메일 확인
    }
  };

  // 이메일 인증 핸들러
  const onChangeCode = (e) => {
    const currCode = e.target.value;
    setInputCode(currCode);
  };

  // 비밀번호 인풋
  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword); // 비밀번호 상태 업데이트

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;',.?/\\-]).{8,}$/; // 수정된 정규식

    if (!passwordRegex.test(newPassword)) {
      setPasswordError("숫자, 영어 소문자, 특수문자 포함하여 8자 이상 입력");
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

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeIdentityNumber = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 입력받기
    if (value.length > 7) {
      value = value.slice(0, 7); // 최대 7자리까지만 입력받기
    }

    // 하이픈 포맷팅 적용
    const formattedValue = value;
    if (value.length > 6) {
      formattedValue = value.slice(0, 6) + "-" + value.slice(6);
    }

    setIdentityNumber(value); // 숫자만 입력된 값을 설정
    setFormattedIdentityNumber(formattedValue); // 하이픈 포맷이 적용된 값을 설정

    // 유효성 검사
    setIdentifyNumberValid(value.length >= 7);
    console.log(identifyNumberValid);
  };
  useEffect(() => {
    console.log(identifyNumberValid); // 유효성 상태가 변경될 때마다 콘솔에 출력
  }, [identifyNumberValid]);

  const test = async () => {
    return await uploadImg(); // 업로드 이미지 함수가 완료 될 때 까지 기다리는듯
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

  // 자기소개
  const onChangeMyinfo = (e) => {
    setMyInfo(e.target.value);
  };

  const regist = async () => {
    const user = {
      email,
      password,
      name,
      nickname,
      identityNumber,
      profileImgPath,
      skill,
      myInfo,
    };
    try {
      const imgPath = await test();
      user.profileImgPath = imgPath;

      const response = await AxiosApi.signup(user);
      if (response.data) {
        alert("회원가입에 성공했습니다.");
        console.log(user);
        navigate("/apueda");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (e) {
      console.log(e);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Box>
        <Contents>
          <h1>회원가입</h1>
          <ProfileBox>
            <Upload setFile={setFile} />
          </ProfileBox>

          <InputContainer>
            <EmailBox>
              <ShortInput
                placeholder="이메일"
                value={email}
                onChange={onChangeEmail}
              />
              <CheckBtn onClick={authorizeMail} disabled={!emailValid}>
                인증
              </CheckBtn>
              <span id="hint">
                {email.length > 0 && (
                  <p className={emailValid ? "success" : "error"}>
                    {emailError}
                  </p>
                )}
              </span>
            </EmailBox>
            <EmailBox>
              <ShortInput
                placeholder="인증번호"
                value={inputCode}
                onChange={onChangeEmailCode}
              />
              <CheckBtn onClick={checkCode} disabled={codeValid}>
                확인
              </CheckBtn>
            </EmailBox>
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

            <LongInput
              placeholder="이름"
              value={name}
              onChange={onChangeName}
            />
            <LongInput
              placeholder="닉네임"
              value={nickname}
              onChange={onChangeNickname}
            />
            <LongInput
              placeholder="주민번호(앞자리 6자리와 뒷자리 첫번째만)"
              value={formattedIdentityNumber}
              onChange={onChangeIdentityNumber}
            />
            <span id="hint">
              {formattedIdentityNumber.length > 0 && (
                <p className={identifyNumberValid ? "success" : "error"}>
                  {identityNumberError}
                </p>
              )}
            </span>

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
              <Text value={myInfo} onChange={onChangeMyinfo} />
            </TextBox>
          </InputContainer>
          <SubmitBtn onClick={regist}>가입</SubmitBtn>
        </Contents>
      </Box>
    </Container>
  );
};
export default SignUp;

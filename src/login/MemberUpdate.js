import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "../api/firebase/ImageUploader";
import { storage } from "../api/firebase/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AxiosApi from "../api/AxiosApi";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & input {
    border-radius: 8px;
    color: #ffffff;
  }
  & button {
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: #c72519; /* hover 시 배경색 변경 */
    }
    &:active {
      background-color: #87160e; /* 클릭 시 배경색 변경 */
    }
  }
`;

const Box = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #ff5353;
  background: rgba(255, 83, 53, 0.7);
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileSelBtn = styled.button``;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
`;

const EmailBox = styled.div`
  gap: 10px;
`;

const ShortInput = styled.input`
  height: 40px;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const CheckBtn = styled.button``;

const LongInput = styled.input`
  height: 40px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const SkillCheck = styled.div``;

const CheckBox = styled.input``;

const TextBox = styled.div``;

const Text = styled.textarea`
  width: 100%;
`;

const SubmitBtn = styled.button`
  height: 40px;
  width: 40%;
  background-color: rgba(255, 83, 83, 0.8);
`;

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
  const [emailValid, setEmailValid] = useState(false); // 이메일 형식 검사
  const [pwdValid, setPwdValid] = useState(false); // 비밀번호 유효성 검사
  const [pwdConcord, setPwdConcord] = useState(false); // 비밀번호 일치여부 확인
  // 주민번호 앞자리 6자리와 뒷자리 첫번째 자리 일치 확인
  const [idNumValid, setIdNumValid] = useState(false);
  const [error, setError] = useState("");
  // Firebase 파일 설정
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  // 네비게이션
  const navigate = useNavigate();
  // 오류메세지
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");

  const [isChecked, setIsChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  useEffect(() => {
    const memberInfo = async () => {
      try {
        const rsp = await AxiosApi.getUserInfo2();
        setUserInfo(rsp.data);
        setProfileImgPath(userInfo.profileImgPath);
        setEmail(userInfo.email);
        setPassword(userInfo.password);
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
      // setProfileImgPath(setPreviewUrl);
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
      setProfileImgPath(url);
      return url; // 업로드가 성공하면 URL 반환
    } catch (e) {
      console.log("파일 업로드 에러 : " + e);
      throw e; // 에러 발생 시 예외 던짐
    }
  };

  //

  // 체크박스
  const handleCheckboxChange = (index) => {
    const updatedChecked = [...isChecked];
    updatedChecked[index] = !updatedChecked[index];
    setIsChecked(updatedChecked);
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

      const response = await AxiosApi.memberUpdate(user);
      if (response.data) {
        alert("회원 정보 수정에 성공했습니다.");
        console.log(user);
        navigate("/apueda");
      } else {
        alert("회원 정보 수정에 실패했습니다.");
      }
    } catch (e) {
      console.log(e);
      alert("회원 정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Box>
        <Contents>
          <h1>회원 정보 수정</h1>
          <ProfileBox>
            <Upload
              setFile={handleFileChange}
              previewUrl={previewUrl}
              alt={userInfo.profileImgPath}
            />
          </ProfileBox>

          <InputContainer>
            <span>이메일</span>
            <LongInput placeholder={userInfo.email} value={email} disabled />
            <LongInput
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
            <LongInput placeholder={userInfo.name} value={name} disabled />
            <span>닉네임</span>
            <LongInput
              placeholder={userInfo.nickname}
              value={nickname}
              onChange={onChangeNickname}
            />
            {/* 주민번호
            <LongInput
              placeholder="주민번호(앞자리 6자리와 뒷자리 첫번째만)"
              value={identityNumber}
              disabled
            /> */}
            <SkillCheck>
              <p>사용스킬</p>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <CheckBox
                  key={index}
                  type="checkbox"
                  checked={isChecked[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
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
          <SubmitBtn>탈퇴</SubmitBtn>
        </Contents>
      </Box>
    </Container>
  );
};
export default MemberUpdate;

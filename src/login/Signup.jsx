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

const ProfileImg = styled.div`
  /* FireBase로 구현 예정 */
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f92f23;
  width: 100px;
  height: 100px;
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

const SignUp = () => {
  // 입력하는 값을 저장하기 위한 것들
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [profileImgPath, setProfileImgPath] = useState("");
  const [skill, setSkill] = useState("");
  const [myInfo, setMyInfo] = useState("");

  // 유효성 검사
  const [emailValid, setEmailValid] = useState(false); // 이메일 형식 검사
  const [pwdValid, setPwdValid] = useState(false); // 비밀번호 유효성 검사
  const [pwdConcord, setPwdConcord] = useState(false); // 비밀번호 일치여부 확인
  // 주민번호 앞자리 6자리와 뒷자리 첫번째 자리 일치 확인
  const [idNumValid, setIdNumValid] = useState(false);
  const [error, setError] = useState("");
  // Firebase 파일 설정
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  // 오류메세지
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [uploadTrigger, setUploadTrigger] = useState(false);

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

  const uploadImg = () => {
    return new Promise((resolve, reject) => {
      // 변경된 부분
      const fileRef = ref(storage, `images/${email}`);
      uploadBytes(fileRef, file).then((snapshot) => {
        console.log("이미지 파이어베이스 업로드 성공");
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log("경로 : " + url);
            setProfileImgPath(url);
            resolve(url); // 업로드가 성공하면 resolve 호출
          })
          .catch((e) => {
            console.log("파일 업로드 에러 : " + e);
            reject(e); // 에러 발생 시 reject 호출
          });
      });
    });
  };
  // 체크박스
  const handleCheckboxChange = (index) => {
    const updatedChecked = [...isChecked];
    updatedChecked[index] = !updatedChecked[index];
    setIsChecked(updatedChecked);
  };

  // 이메일 인풋
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // 이메일 입력 정규식
    if (!emailRegex.test(e.target.value)) {
      // 입력값이 정규식에 만족하지 않으면~
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("올바른 이메일 형식입니다.");
      setEmailValid(true);
      // memberRegCheck(e.target.value); //DB에 중복 이메일 확인
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
    } else {
      setPasswordError("");
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeIdentityNumber = (e) => {
    setIdentityNumber(e.target.value);
  };

  const test = async () => {
    setUploadTrigger(true);
    return await uploadImg(); // 업로드 이미지 함수가 완료 될 때 까지 기다리는듯
  };

  // 회원 가입 여부 DB 확인
  const memberRegCheck = async () => {
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
            <Upload
              value={profileImgPath}
              email={email}
              uploadTrigger={uploadTrigger}
            />
          </ProfileBox>

          <InputContainer>
            <EmailBox>
              <ShortInput
                placeholder="이메일"
                value={email}
                onChange={onChangeEmail}
              />
              <CheckBtn onClick={memberRegCheck}>인증</CheckBtn>
              <span id="hint">
                {email.length > 0 && (
                  <p className={emailValid ? "success" : "error"}>
                    {emailError}
                  </p>
                )}
              </span>
            </EmailBox>
            <EmailBox>
              <ShortInput placeholder="인증번호" />
              <CheckBtn>확인</CheckBtn>
            </EmailBox>
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
            <LongInput placeholder="비밀번호 확인" />
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
              value={identityNumber}
              onChange={onChangeIdentityNumber}
            />

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
              <Text></Text>
            </TextBox>
          </InputContainer>
          <SubmitBtn onClick={regist}>가입</SubmitBtn>
        </Contents>
      </Box>
    </Container>
  );
};
export default SignUp;

//ImageUpader.js

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "./Firebase";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.div`
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f92f23;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f0f0f0; /* 이미지 없을 때 배경색 */
`;

const FileSelBtn = styled.button`
  margin-top: 10px; /* 버튼과 이미지 사이에 여백 추가 */
`;

const Upload = ({ setFile }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 150;
        canvas.height = 150;
        ctx.drawImage(img, 0, 0, 150, 150);
        console.log("이미지 그리기 완료");
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], selectedFile.name, {
                type: "image/jpeg",
              });
              setFile(resizedFile);
              setPreviewUrl(URL.createObjectURL(resizedFile));
            } else {
              console.log("이미지 변환중 오류발생");
            }
          },
          "image/jpeg",
          0.95
        );
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        console.log("이미지 로드 중 오류 발생");
      };
    }
  };

  return (
    // <ProfileImg>
    //   <FileInput type="file" onChange={handleFileInputChange} />
    //   {previewUrl && <ImagePreview src={previewUrl} />}
    // </ProfileImg>
    // <div>
    //   <input type="file" onChange={handleFileInputChange}></input>
    //   {previewUrl && <img src={previewUrl} />}
    // </div>

    <Container>
      <ProfileImg>
        {previewUrl && <img src={previewUrl} alt="Profile Preview" />}
      </ProfileImg>
      <FileSelBtn as="label">
        파일 선택
        <input
          type="file"
          onChange={handleFileInputChange}
          style={{ display: "none" }}
          accept="image/*"
        />
      </FileSelBtn>
    </Container>
  );
};

export default Upload;

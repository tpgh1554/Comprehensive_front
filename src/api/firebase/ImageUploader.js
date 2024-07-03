import { useState } from "react";
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
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f0f0f0; /* 이미지 없을 때 배경색 */
`;

const FileSelBtn = styled.button`
  margin-top: 10px; /* 버튼과 이미지 사이에 여백 추가 */
`;

const Upload = ({ setFile, previewUrl }) => {
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null);

  const handleFileInputChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file); // 부모 컴포넌트의 handleFileChange를 호출
      setLocalPreviewUrl(null); // 새 파일 선택 시 localPreviewUrl 초기화
    }
  };

  const handleFileInputChange2 = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 400;
        canvas.height = 400;
        ctx.drawImage(img, 0, 0, 400, 400);
        console.log("이미지 그리기 완료");
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], selectedFile.name, {
                type: "image/png",
              });
              setFile(resizedFile);
              setLocalPreviewUrl(URL.createObjectURL(resizedFile)); // 새 파일의 localPreviewUrl 설정
            } else {
              console.log("이미지 변환중 오류발생");
            }
          },
          "image/png",
          0.95
        );
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        console.log("이미지 로드 중 오류 발생");
      };
    }
  };

  const handleFileInputChange = (event) => {
    handleFileInputChange1(event);
    handleFileInputChange2(event);
  };

  return (
    <Container>
      <ProfileImg>
        {(previewUrl || localPreviewUrl) && (
          <img
            src={previewUrl || localPreviewUrl}
            alt="Profile Preview"
            style={{ width: "100%", height: "100%" }}
          />
        )}
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

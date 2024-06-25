import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import { storage } from "./Firebase";

const Upload = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);
        console.log("이미지 그리기 완료");
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFiled = new File([blob], selectedFile.name, {
                type: "image/jpeg",
              });
              setFile(resizedFiled);
              setPreviewUrl(URL.createObjectURL(resizedFiled));
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
    <div>
      <input type="file" onChange={handleFileInputChange}></input>
      {previewUrl && <img src={previewUrl} />}
      {/* <button onClick={uploadImg}>이미지 업로드</button> */}
    </div>
  );
};

export default Upload;

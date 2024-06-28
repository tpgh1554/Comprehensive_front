//Datingapp.js
import AxiosApi from "../../api/AxiosApi"
import { useState, useEffect } from "react"

const DatingApp = () => {
  const [card, setCard] = useState([]);

  const StartApp = async () => {
    try {
      const response = await AxiosApi.getUserInfo(); // AxiosApi에서 사용자 정보를 가져옴
      const transformedData = response.data.map(user => ({
        nickname: user.nickname, 
        url: user.profileImgPath,
        skill: user.skill,
        info: user.myInfo
      }));
      setCard(transformedData); // 변환된 데이터를 카드에 넣어줌
      console.log(response)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    StartApp(); // 처음 페이지에 이동하여 렌더링했을때만 정보를 가져옴
  }, []);

  return (
    <>
      {card.map((user, index) => (
        <div key={index}>
          <span>{user.nickname}</span>
          <span>{user.skill}</span>
          <span>{user.info}</span>
          <img src={user.url} alt='' width="200" />
        </div>
      ))}
    </>
  );
};

export default DatingApp;
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";

const useTokenAxios = (axiosEvt) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus, setLoginStatus } = context;

  // 엑세스 토큰 만료시 재발행 후 Api 재실행
  const handleTokenAxios = async () => {
    const accessToken = AxiosApi.getAccessToken();
    console.log("handleTokenAxios 실행 ");
    try {
      await axiosEvt();
      console.log("axiosEvt 실행 ");
    } catch (e) {
      if (e.response && e.response.status === 401) {
        console.log("엑세스 토큰 만료");
        await AxiosApi.handleUnathorized();
        const newToken = AxiosApi.getAccessToken();
        if (newToken !== accessToken) {
          try {
            await axiosEvt();
          } catch (e) {
            console.log(e);
          }
        } else {
          // 리프레시 토큰 만료시 다시 로그인
          console.log(e);
          if (loginStatus !== "") {
            navigate("/");
            if (loginStatus !== "RELOGIN") {
              setLoginStatus("RELOGIN");
            }
          }
        }
      }
    }
  };

  return handleTokenAxios;
};
export default useTokenAxios;

import { useNavigate } from "react-router-dom";

// 모달 만들어서 로그아웃 할 건지 물어보기 구현 예정
const Logout = () => {
    const navigate = useNavigate();

    const LogoutHandle = () => {
        localStorage.clear();
        navigate("/apueda");
    }
}
export default Logout;
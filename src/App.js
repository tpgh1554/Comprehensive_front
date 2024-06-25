import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GlobalStyle from "./font/GlobalStyle";
import MypageMain from "./mypages/MypageMain";
import Mypj from "./mypages/Mypj";
import Subinfo from "./subscribe/subinfo";
import Mywrite from "./mypages/Mywrite";
import LoginPage from "./login/Login";
import SignUp from "./login/Signup";
import Upload from "./api/firebase/ImageUploader";

import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
import Mainpage from "./pages/mainpage";
import DatingApp from "./datingapp/DatingApp";
import TeamChatPage from "./pages/chat/teamchatpage";
import DatingApp2 from "./datingapp/DatingApp2";
import ChatMain from "./pages/chat/ChatMain";
import EditInfo from "./mypages/EditInfo";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header />
        <NaviBar />
        <Routes>
          {/*첫 메인 페이지 경로*/}
          <Route path="/" element={<Navigate to="/apueda" />} />{" "}
          <Route path="/apueda" element={<Mainpage />} />
          <Route path="/apueda/mypage" element={<MypageMain />} />
          <Route path="/apueda/chatmainpage" element={<ChatMain />} />
          <Route path="/apueda/mypage/mypj" element={<Mypj />} />
          <Route path="/apueda/mypage/mywrite" element={<Mywrite />} />
          <Route path="/apueda/subinfo" element={<Subinfo />} />
          <Route path="/apueda/login" element={<LoginPage />} />
          <Route path="/apueda/signup" element={<SignUp />} />
          <Route path="/apueda/mypage/editinfo" element={<EditInfo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../css/App.css";
import Footer from "./Footer";
import Navbar from "./NavBar";
import MainPage from "./MainPage";
import LoginForm from "./LoginForm";
import BoardList from "./BoardList";
import DetailPage from "./DetailPage";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import JoinMemberForm from "./JoinMemberForm";

function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <>
      {/* 네비게이션 */}
      <Navbar />
      <Routes>
        {/* 메인 페이지*/}
        <Route path="/" exact element={<MainPage />} />

        {/* 프로젝트 리스트 */}
        <Route path="/board/list" exact element={<BoardList exact />} />

        {/* 글 생성 페이지 */}
        <Route path="/create" exact element={<CreateForm />} />

        {/* 글 상세 페이지 */}
        <Route path="/detail/:id" exact element={<DetailPage exact />} />

        {/* 글 수정 페이지 */}
        <Route path="/update/:id" exact element={<UpdateForm />} />

        {/* 로그인 화면*/}
        <Route path="/login" exact element={<LoginForm />} />

        <Route path="/join" exact element={<JoinMemberForm />} />
      </Routes>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;

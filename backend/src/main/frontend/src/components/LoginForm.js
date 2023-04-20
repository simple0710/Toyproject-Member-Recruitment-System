import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";

function LoginForm() {
  return (
    <>
      <div class="login_form">
        <form method="post" action="/login/ok">
          <input name="id" type="text" placeholder="아이디" />
          <input name="password" type="password" placeholder="비밀번호" />
          <div>
            <input class="login_btn" type="submit" value="로그인" />
          </div>
        </form>
        <div class="login_bottom">
          <Link to="" style={{ textDecoration: "none" }}>
            아이디 찾기
          </Link>{" "}
          |{" "}
          <Link to="" style={{ textDecoration: "none" }}>
            비밀번호 찾기
          </Link>{" "}
          |{" "}
          <Link to="/join" style={{ textDecoration: "none" }}>
            {" "}
            회원 가입
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginForm;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/login.css";

function LoginForm() {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const onLoginHandler = (e) => {
    axios
      .get("/api/user/token", {
        params: {
          name: loginId,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.clear();
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("token", res.data.password);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };
  return (
    <>
      <div class="login_form">
        <form onSubmit={onLoginHandler}>
          <input
            name="name"
            type="text"
            onChange={(e) => {
              setLoginId(e.target.value);
            }}
            placeholder="아이디"
          />
          <input
            name="password"
            type="password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
            placeholder="비밀번호"
          />
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

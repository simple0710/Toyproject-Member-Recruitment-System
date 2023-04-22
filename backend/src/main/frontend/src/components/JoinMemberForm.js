import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/login-join.css";

function JoinMemberForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const joinHandler = (e) => {
    if (name & password & email) {
      const frm = new FormData();
      frm.append("name", name);
      frm.append("password", password);
      frm.append("email", email);
      axios
        .post("/api/user/signup", frm)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => alert("오류"));
    }
  };
  return (
    <>
      <form onSubmit={joinHandler}>
        <table class="login_join_table">
          <td>
            <tr>아이디</tr>
            <tr>
              <input
                type="text"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                  console.log(name);
                }}
                required
              />
            </tr>
          </td>
          <td>
            <tr>비밀번호</tr>
            <tr>
              <input
                type="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </tr>
          </td>
          <td>
            <tr>이메일</tr>
            <tr>
              <input
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </tr>
          </td>
        </table>
        <div>
          <input type="submit" value="회원 가입" />
        </div>
      </form>
    </>
  );
}

export default JoinMemberForm;

import React, { useState, useEffect } from "react";
import axios from "axios";

function JoinMemberForm(props) {
  const [state, setState] = useState("");
  const joinHandler = (e) => {
    console.log("hi");
  };
  return (
    <>
      <form onSubmit={joinHandler}>
        <tr>
          <td>아이디</td>
          <input type="text" required />
        </tr>
        <tr>
          <td>닉네임</td>
          <input type="text" required />
        </tr>
        <tr>
          <td>비밀번호</td>
          <input type="password" required />
        </tr>
        <tr>
          <td>이메일</td>
          <input type="email" required />
        </tr>

        <input type="submit" />
      </form>
    </>
  );
}

export default JoinMemberForm;

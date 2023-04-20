import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

function NavBar() {
  return (
    <>
      <div class="navbar_header">
        {/* 로고 */}
        <h1 class="logo">
          <Link to="/" style={{ textDecoration: "none" }}>
            TPMP
          </Link>
        </h1>
        {/* 카테고리 */}
        <nav class="navbar_category">
          <ul id="navbar_main_category">
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                Main
              </Link>
            </li>
            <li>
              <Link to="/board/list" style={{ textDecoration: "none" }}>
                프로젝트
              </Link>
            </li>

            <li>
              <Link to="/create" style={{ textDecoration: "none" }}>
                글쓰기
              </Link>
            </li>
            <li>
              <Link to="/login" style={{ textDecoration: "none" }}>
                로그인
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;

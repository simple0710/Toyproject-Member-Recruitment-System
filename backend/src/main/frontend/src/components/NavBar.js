import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/navbar.css";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem("name"));
  });
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
              {isLoggedIn === null ? (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  로그인
                </Link>
              ) : (
                <>
                  {isLoggedIn}
                  <button
                    class="logout"
                    onClick={(e) => {
                      window.localStorage.removeItem("name");
                      window.localStorage.removeItem("token");
                      navigate("/");
                    }}
                  >
                    로그아웃
                  </button>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;

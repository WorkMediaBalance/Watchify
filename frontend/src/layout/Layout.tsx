import React, { useState, useMemo } from "react";
import AppBar from "./AppBar";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  const [title, setTitle] = useState("");

  const location = useLocation();

  useMemo(() => {
    const path = location.pathname;
    switch (path) {
      case "/":
        setTitle("임시메인페이지"); //TODO: 메인페이지 APPBAR는 따로 분기 처리!
        break;
      case "/search":
        setTitle("검색");
        break;
      case "/schedule":
        setTitle("스케줄");
        break;
      case "/recommend":
        setTitle("추천");
        break;
      case "/share":
        setTitle("공유하기");
        break;
      case "/login":
        setTitle("로그인");
        break;
      case "/my":
        setTitle("마이페이지");
        break;
      default:
        setTitle("404");
    }
  }, [location]);

  return (
    <div>
      <AppBar title={title} />
      <div style={{ marginTop: "5vh" }}>
        <Outlet />
      </div>
      {/* 레드닷 자리 */}
    </div>
  );
};

export default Layout;

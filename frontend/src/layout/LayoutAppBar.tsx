import React, { useState, useMemo } from "react";
import AppBar from "./AppBar";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const Background = styled.div`
  background-color: ${({ theme }) => theme.netflix.backgroundColor};
`;

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
      <div>
        <AppBar title={title} />
      </div>
      <Background>
        <Outlet />
      </Background>
    </div>
  );
};

export default Layout;

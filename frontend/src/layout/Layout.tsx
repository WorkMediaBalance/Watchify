import React, { useState, useMemo, useEffect } from "react";
import AppBar from "./AppBar";
import { Outlet, useLocation } from "react-router-dom";
import BottomDot from "./BottomDot";
import styled from "styled-components";

const Background = styled.div`
  background-color: ${({ theme }) => theme.netflix.backgroundColor};
  min-height: 95vh;
`;

const Layout = () => {
  const [title, setTitle] = useState("");

  // BottomDot용 변수
  const [isSemiCircleRotated, setIsSemiCircleRotated] = useState(true); //TDOD: false와 true 의미 주의
  const [innerDotSize, setInnerDotSize] = useState("35%");
  const toggleInnerDotSize = () => {
    if (innerDotSize === "60%") {
      setInnerDotSize("35%");
      setIsSemiCircleRotated(true);
    } else {
      setInnerDotSize("60%");
      setIsSemiCircleRotated(false);
    }
  };

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
      <div
        onClick={() => {
          setInnerDotSize("35%");
          setIsSemiCircleRotated(true);
        }}
      >
        <AppBar title={title} />
      </div>
      <div
        onClick={() => {
          setInnerDotSize("35%");
          setIsSemiCircleRotated(true);
        }}
        style={{ position: "relative", marginTop: "5vh" }}
      >
        <Background>
          <Outlet />
        </Background>
      </div>
      <BottomDot
        isSemiCircleRotated={isSemiCircleRotated}
        setIsSemiCircleRotated={setIsSemiCircleRotated}
        innerDotSize={innerDotSize}
        setInnerDotSize={setInnerDotSize}
        toggleInnerDotSize={toggleInnerDotSize}
      />
    </div>
  );
};

export default Layout;

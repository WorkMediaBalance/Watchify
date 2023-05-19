import React, { useState, useEffect } from "react";
import AppBar from "./AppBar";
import { Outlet, useLocation } from "react-router-dom";
import BottomDot from "./BottomDot";
import styled from "styled-components";

const Background = styled.div<{
  isRedDotRequired: boolean;
  isAppBarRequired: boolean;
}>`
  background-color: ${({ theme }) => theme.netflix.backgroundColor};
  min-height: ${(props) => {
    if (props.isRedDotRequired) {
      if (props.isAppBarRequired) {
        return "91vh";
      } else {
        return "96vh";
      }
    } else {
      if (props.isAppBarRequired) {
        return "95vh";
      } else {
        return "100vh";
      }
    }
  }};
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

  // AppBar 유무에 따른 변수
  const [isAppBarRequired, setIsAppBarRequired] = useState(true);

  // RedDot 유무에 따른 변수
  const [isRedDotRequired, setIsRedDotRequired] = useState(true);

  useEffect(() => {
    const path = location.pathname;

    // 이 함수에서 AppBAr 사용여부와 RedDot 사용여부 설정해줄 것!
    // 조건문 중첩해서 중첩 url 대응
    if (path.startsWith("/search")) {
      setTitle("검색");
      setIsAppBarRequired(true);
      setIsRedDotRequired(true);
    } else if (path.startsWith("/schedule")) {
      setTitle("스케줄");
      setIsAppBarRequired(true);
      setIsRedDotRequired(true);
    } else if (path.startsWith("/recommend")) {
      setTitle("추천");
      setIsAppBarRequired(true);
      setIsRedDotRequired(true);
    } else if (path.startsWith("/share")) {
      setTitle("공유하기");
      setIsAppBarRequired(true);
      setIsRedDotRequired(true);
    } else if (path.startsWith("/login")) {
      setTitle("로그인");
      setIsAppBarRequired(true);
      setIsRedDotRequired(false);
    } else if (path.startsWith("/my")) {
      setTitle("마이페이지");
      setIsAppBarRequired(true);
      setIsRedDotRequired(true);
    } else if (path.startsWith("/")) {
      setTitle("임시메인페이지");
      setIsAppBarRequired(false);
      setIsRedDotRequired(true);
    } else {
      setTitle("404");
      setIsAppBarRequired(true);
      setIsRedDotRequired(true);
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
        {isAppBarRequired && <AppBar title={title} />}
      </div>
      <div
        onClick={() => {
          setInnerDotSize("35%");
          setIsSemiCircleRotated(true);
        }}
        style={{
          position: "relative", // TODO: 이거 relative로 바꾼 이유?
          marginTop: isAppBarRequired ? "5vh" : "0",
        }}
        id="app-bar-margin"
      >
        <Background isRedDotRequired={isRedDotRequired} isAppBarRequired={isAppBarRequired}>
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

import React, { useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomDot from "./BottomDot";
import styled from "styled-components";

const Background = styled.div`
  background-color: ${({ theme }) => theme.netflix.backgroundColor};
  height: 100%;
`;

const LayoutRedDot = () => {
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

  return (
    <Background>
      <Outlet />
      <BottomDot
        isSemiCircleRotated={isSemiCircleRotated}
        setIsSemiCircleRotated={setIsSemiCircleRotated}
        innerDotSize={innerDotSize}
        setInnerDotSize={setInnerDotSize}
        toggleInnerDotSize={toggleInnerDotSize}
      />
    </Background>
  );
};

export default LayoutRedDot;

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import WatchingPattern from "components/common/WatchingPattern";
import OttSubscription from "components/common/OttSubscription";

const PageSchedule = () => {
  const navigate = useNavigate();
  return (
    <Container className={"container"}>
      <div
        style={{
          height: "45vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <WatchingPattern />
      </div>
      <OttSubscription />
      <SBtnContainer>
        <SNextBtn onClick={() => navigate("/schedule/content")}>다음</SNextBtn>
      </SBtnContainer>
      <PlaceHolder />
    </Container>
  );
};

export default PageSchedule;

const Container = styled.div`
  height: 91vh;
  display: flex;
  flex-direction: column;
  color: white;
  width: 100vw;
`;

const SBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const SNextBtn = styled.div`
  width: 85vw;
  border-radius: 8px;

  padding: 0.2rem 0;
  background-color: ${({ theme }) => theme.netflix.pointColor};
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  text-align: center;
`;

const PlaceHolder = styled.div`
  height: 5vh;
`;

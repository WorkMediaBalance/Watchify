import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "../components/common/Carousel";
import TodayWatch from "components/main/TodayWatch";

import RecommendPerOTT from "./../components/mypage/RecommendPerOTT";

const PageMain = () => {
  const [clickState, setClickState] = useState(0);
  const [prevState, setPrevState] = useState(0);
  const handleState = (index: number) => {
    setPrevState(clickState);
    setClickState(index);
  };
  return (
    <div>
      <Title>오늘의 편성표</Title>
      <TodayWatch
        clickState={clickState}
        setClickState={setClickState}
        prevState={prevState}
        setPrevState={setPrevState}
      ></TodayWatch>
      <PlaceHolders className="placeholder" />
      <div onClick={() => handleState(0)}>
        <Title>주간 편성표</Title>
        <Carousel />
        <PlaceHolders />
        <RecommendPerOTT />
      </div>
    </div>
  );
};

export default PageMain;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  color: ${({ theme }) => theme.netflix.fontColor};
  padding: 1vh;
`;

const PlaceHolders = styled.div`
  height: 3vh;
`;

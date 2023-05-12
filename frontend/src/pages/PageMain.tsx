import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/main/Carousel";
import TodayWatch from "components/main/TodayWatch";

import RecommendPerOTT from "../components/main/RecommendPerOTT";
import RecommendRest from "components/main/RecommendRest";

const PageMain = () => {
  const navigate = useNavigate();
  const [clickState, setClickState] = useState(0);
  const [prevState, setPrevState] = useState(0);

  const handleState = (index: number) => {
    setPrevState(clickState);
    setClickState(index);
  };
  return (
    <div>
      <button onClick={() => navigate("/login")}>로그인 페이지로</button>
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
        <PlaceHolders />
        <Title>추천 컨텐츠!</Title>
        <RecommendRest />
        <PlaceHolders />
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

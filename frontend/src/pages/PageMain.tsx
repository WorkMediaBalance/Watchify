import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "../components/common/Carousel";
import TodayWatch from "components/main/TodayWatch";

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
      <div onClick={() => handleState(0)}>
        <Title>주간 편성표</Title>
        <Carousel />
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

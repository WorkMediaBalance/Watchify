import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/main/Carousel";
import TodayWatch from "components/main/TodayWatch";
import { mainSchedule } from "apis/apiMain";

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

  const [weeklySchedule, setWeeklySchedule] = useState([[], [], [], [], [], [], []]);

  const getWeeklySchedule = async () => {
    const res = await mainSchedule();
    if (res !== undefined) {
      setWeeklySchedule(res);
    }
  };

  useEffect(() => {
    getWeeklySchedule();
  }, []);

  return (
    <div>
      <Header>
        <Logo src="WatchifyLogo1.png"></Logo>
      </Header>
      <Title>
        오늘의<TitleSpan> 스케줄</TitleSpan>
      </Title>
      <TodayWatch
        todayWatch={weeklySchedule[3]}
        clickState={clickState}
        setClickState={setClickState}
        prevState={prevState}
        setPrevState={setPrevState}
      ></TodayWatch>
      <PlaceHolders className="placeholder" />
      <div onClick={() => handleState(0)}>
        <Title>
          주간 <TitleSpan> 편성표</TitleSpan>
        </Title>
        <Carousel weeklySchedule={weeklySchedule} />
        <PlaceHolders />
        <RecommendPerOTT />
        <PlaceHolders />
        <Title>
          <TitleSpan>추천</TitleSpan> 컨텐츠!
        </Title>
        <RecommendRest />
        <PlaceHolders />
      </div>
      <button onClick={() => navigate("/login")}>로그인 페이지로</button>
    </div>
  );
};

export default PageMain;

const Header = styled.div`
  position: sticky
  width: 100vw;
  height: 5vh;
  display : flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  background-color: ${({ theme }) => theme.netflix.tabColor}
`;

const Logo = styled.img`
  height: 70%;
  width: auto;
  margin-left: 1vw;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  color: ${({ theme }) => theme.netflix.fontColor};
  padding: 1vh;
`;

const TitleSpan = styled.span`
  color: ${({ theme }) => theme.netflix.lightColor};
  font-size: 5.5vw;
`;

const PlaceHolders = styled.div`
  height: 3vh;
`;

import React, { useEffect, useState } from "react";
import styled, { ThemeProvider, useTheme } from "styled-components";
import { theme } from "styles/theme";
import { ResponsiveBar } from "@nivo/bar";

import {
  patternData0,
  patternData1,
  patternData2,
} from "constant/preset/watchingPatternPreset";

const WatchingPattern = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [data, setData] = useState(patternData0);

  const customTheme = {
    axis: {
      ticks: {
        text: {
          fill: "white",
        },
      },
    },
  };

  return (
    <SContainer>
      <SDiv>나의 시청 패턴</SDiv>
      <SDiv2>출퇴근 하면서 조금씩, 주말에 몰아서!</SDiv2>

      <SBtnDiv>
        <Sbtn
          isActive={activeIndex === 0}
          onClick={() => {
            setActiveIndex(0);
            setData(patternData0);
          }}
        >
          밥 먹을 때 한 편씩!
        </Sbtn>
        <Sbtn
          isActive={activeIndex === 1}
          onClick={() => {
            setActiveIndex(1);
            setData(patternData1);
          }}
        >
          주말에 정주행!
        </Sbtn>
        <Sbtn
          isActive={activeIndex === 2}
          onClick={() => {
            setActiveIndex(2);
            setData(patternData2);
          }}
        >
          밸런스 형
        </Sbtn>
        <Sbtn isActive={activeIndex === 3} onClick={() => setActiveIndex(3)}>
          커스텀
        </Sbtn>
      </SBtnDiv>

      <SChartContainer>
        <ResponsiveBar
          data={data}
          keys={["watch time"]}
          indexBy="day"
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          padding={0.3}
          colors={theme.netflix.pointColor}
          borderRadius={7}
          axisTop={null}
          axisLeft={null}
          axisRight={null}
          enableLabel={true}
          labelTextColor="white"
          enableGridY={false}
          animate={true}
          // motionStiffness={90}
          // motionDamping={15}
          axisBottom={{
            tickSize: 0,
          }}
          theme={customTheme}
          isInteractive={false}
          maxValue={8}
        />
      </SChartContainer>
    </SContainer>
  );
};

export default WatchingPattern;
const SContainer = styled.div`
  height: 50vh;
`;

const SDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 0.5rem 0;
  padding-left: 0.5rem;
`;

const SDiv2 = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  text-align: left;
  margin: 0.5rem 0;
  padding-left: 0.5rem;
`;

const Sbtn = styled.div<{ isActive?: boolean; color?: string }>`
  background-color: ${(props) =>
    props.isActive ? props.theme.netflix.pointColor : "white"};
  color: ${(props) => (props.isActive ? "white" : "black")};
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize};
  margin: 0rem 0.2rem;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SBtnDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SChartContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 60%;
  width: 100%;
  margin: 1rem 0;
  fill: white;
  max-height: 40vh; // 추가된 부분
  max-width: 100%; // 추가된 부분
`;

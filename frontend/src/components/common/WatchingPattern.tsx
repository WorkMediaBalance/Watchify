import React, { useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import { ResponsiveBar, BarItemProps } from "@nivo/bar";
import Graph from "./graph/Graph";

import {
  patternData0,
  patternData1,
  patternData2,
} from "constant/preset/watchingPatternPreset";

const WatchingPattern = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const [data, setData] = useState(patternData0); // TODO: 유저 패턴 받아와서 넣어주기

  return (
    <SContainer>
      <div style={{ height: "auto" }}>
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
      </div>
      <div style={{ height: "30vh" }}>
        <Graph
          data={data}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
      </div>
    </SContainer>
  );
};

export default WatchingPattern;
const SContainer = styled.div`
  height: 100%;
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
  padding: 0.7rem 0.6rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SBtnDiv = styled.div`
  display: flex;
  justify-content: center;
`;

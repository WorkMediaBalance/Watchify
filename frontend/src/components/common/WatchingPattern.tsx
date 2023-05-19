import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import { ResponsiveBar, BarItemProps } from "@nivo/bar";
import Graph from "./graph/Graph";

import { patternData0, patternData1, patternData2 } from "constant/preset/watchingPatternPreset";

import { myPatternGet } from "apis/apiMy";

const WatchingPattern = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const [data, setData] = useState<number[]>(patternData0); // TODO: 유저 패턴 받아와서 넣어주기

  async function myPatternGetAPI() {
    const myPattern = await myPatternGet();
    const myPatternData = myPattern.pattern;

    setData(myPatternData);
  }
  useEffect(() => {
    myPatternGetAPI();
  }, []);

  return (
    <SContainer>
      <div style={{ height: "auto" }}>
        <SDiv>나의 시청 패턴</SDiv>
        <SDiv2>그래프를 움직여서 시청패턴을 설정하세요</SDiv2>

        {/* <SBtnDiv>
          <Sbtn
            style={{ fontSize: "2.5vw" }}
            isActive={activeIndex === 0}
            onClick={() => {
              setActiveIndex(0);
              setData(patternData0);
            }}
          >
            밥 먹을 때만!
          </Sbtn>
          <Sbtn
            style={{ fontSize: "2.5vw" }}
            isActive={activeIndex === 1}
            onClick={() => {
              setActiveIndex(1);
              setData(patternData1);
            }}
          >
            주말 정주행!
          </Sbtn>
          <Sbtn
            style={{ fontSize: "3vw" }}
            isActive={activeIndex === 2}
            onClick={() => {
              setActiveIndex(2);
              setData(patternData2);
            }}
          >
            밸런스 형
          </Sbtn>
          <Sbtn
            style={{ fontSize: "3vw" }}
            isActive={activeIndex === 3}
            onClick={() => setActiveIndex(3)}
          >
            커스텀
          </Sbtn>
        </SBtnDiv> */}
      </div>
      <div style={{ height: "30vh" }}>
        <Graph data={data} setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
      </div>
    </SContainer>
  );
};

export default WatchingPattern;
const SContainer = styled.div`
  height: 100%;
  width: 90%;
  margin-top: 1vh;
`;

const SDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 1vh 0;

  padding-left: 2vw;
`;

const SDiv2 = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  text-align: left;
  margin: 1vh 0;
  padding-left: 2vw;
`;

const Sbtn = styled.div<{ isActive?: boolean; color?: string }>`
  background-color: ${(props) => (props.isActive ? props.theme.netflix.pointColor : "transparent")};
  // color: ${(props) => (props.isActive ? "white" : `${props.theme.netflix.lightColor}`)};
  color: white;
  font-weight: 500;
  margin: 1vw 2vw;
  padding: 1vw;
  border: ${(props) =>
    props.isActive
      ? `2px solid ${props.theme.netflix.pointColor}`
      : `2px solid ${props.theme.netflix.lightColor}`};
  border-radius: 10px;
  cursor: pointer;
  width: 20vw;
  height: 7vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SBtnDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

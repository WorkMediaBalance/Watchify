import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { myPatternChange, myPatternGet } from "apis/apiMy";

import { useRecoilState } from "recoil";
import { schedulePreInfoState } from "recoil/schedulePreInfoState";

const Wrapper = styled.div`
  height: 100%;
  overscroll-behavior-y: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100%;
  margin 3vw;
`;

const NumberAndBarAndName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 12.5%;
  color: ${({ theme }) => `${theme.netflix.fontColor}`};
  margin: 2vw;
`;

const Number = styled.div``;

const Bar = styled.div<{ time: number }>`
  width: 100%;
  height: ${({ time }) => `${time * 10}%`};
  background-color: ${({ theme }) => `${theme.netflix.pointColor}`};
  border-radius: 10px 10px 0 0;
`;

const Name = styled.div`
  margin-top: 0.8vh;
`;

interface graphProps {
  data: number[];
  setActiveIndex: (newValue: number) => void;
  activeIndex: number;
}

const Graph: React.FC<graphProps> = ({ data, setActiveIndex, activeIndex }) => {
  const [pattern, setPattern] = useState(data);
  const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(1);

  // 스케줄 생성 preData recoil
  const [preData, setPreData] = useRecoilState(schedulePreInfoState);

  // 시청패턴 recoil 변경 로직
  useEffect(() => {
    let copy = { ...preData };
    copy = { ...copy, patterns: pattern };
    setPreData(copy);
  }, [pattern]);

  const getMypattern = async () => {
    const data = await myPatternGet();
    setPattern(data.pattern);
  };

  useEffect(() => {
    const originalOverscrollBehaviorY = document.body.style.overscrollBehaviorY;
    document.body.style.overscrollBehaviorY = "none";
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
    getMypattern();
    return () => {
      document.body.style.overscrollBehaviorY = originalOverscrollBehaviorY;
    };
  }, []);

  // 드래그 로직
  const handleTouchStart = (event: React.TouchEvent, index: number) => {
    event.preventDefault();
    let initialValue = pattern;
    let initialIndex = activeIndex;
    let initialY = event.touches[0].clientY;
    const handleTouchMove = (event: TouchEvent) => {
      const movementY = event.touches[0].clientY - initialY;

      let newPattern = [...pattern];
      if (newPattern[index] - Math.floor(movementY / (containerHeight / 8)) < 0) {
        newPattern[index] = 0;
      } else if (newPattern[index] - Math.floor(movementY / (containerHeight / 8)) > 8) {
        newPattern[index] = 8;
      } else {
        newPattern[index] = newPattern[index] - Math.floor(movementY / (containerHeight / 8));
      }
      setPattern(newPattern);
      // 시청패턴 변경 API
      myPatternChange({ pattern: newPattern });
    };

    const handleTouchEnd = async () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <Wrapper>
      <Container>
        {pattern.map((time, index) => {
          return (
            <NumberAndBarAndName
              ref={containerRef}
              onTouchStart={(event) => {
                // event.stopPropagation();
                handleTouchStart(event, index);
              }}
            >
              <Number>{time}</Number>
              <Bar time={time}></Bar>
              <Name>{weekday[index]}</Name>
            </NumberAndBarAndName>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default Graph;

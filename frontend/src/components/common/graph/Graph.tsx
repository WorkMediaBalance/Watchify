import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { myPatternChange } from "apis/apiMy";

const Wrapper = styled.div`
  height: 100%;
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

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    setPattern(data);
    // TODO: 여기서도 axios 보내기
    // 수정 요청은 잘 가나 문제가 탭 이동하면서 문제가 있어보임(기존 프리셋 이동 때는 Axios 요청 막아야함)
    myPatternChange({ pattern: data });
  }, [data]);

  // 드래그 로직
  const handleTouchStart = (event: React.TouchEvent, index: number) => {
    let initialValue = pattern;
    let initialIndex = activeIndex;
    let initialY = event.touches[0].clientY;
    const handleTouchMove = (event: TouchEvent) => {
      const movementY = event.touches[0].clientY - initialY;
      console.log("Y-axis movement:", movementY, "containerHeight:", containerHeight);

      let newPattern = [...pattern];
      if (newPattern[index] - Math.floor(movementY / (containerHeight / 8)) < 0) {
        newPattern[index] = 0;
      } else if (newPattern[index] - Math.floor(movementY / (containerHeight / 8)) > 8) {
        newPattern[index] = 8;
      } else {
        newPattern[index] = newPattern[index] - Math.floor(movementY / (containerHeight / 8));
      }
      setPattern(newPattern);
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      console.log("finished"); //TODO: 이 자리에서 axios
      if (initialValue === pattern) {
        setActiveIndex(3);
      }
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

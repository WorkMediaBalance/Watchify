import React from "react";
import styled from "styled-components";

interface Indicator {
  currentIndex: number;
  arrayLength: number;
}

const Indicator: React.FC<Indicator> = ({ currentIndex, arrayLength }) => {
  return (
    <Line>
      <ColoredSection currentIndex={currentIndex} arrayLength={arrayLength} />
    </Line>
  );
};

export default Indicator;

const Line = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: white;
`;

const ColoredSection = styled.div<{
  currentIndex: number;
  arrayLength: number;
}>`
  position: absolute;
  top: 0;
  left: ${({ currentIndex, arrayLength }) => currentIndex * (100 / arrayLength)}%;
  width: ${({ arrayLength }) => 100 / arrayLength}%;
  height:100%;
  background-color: ${({ theme }) => theme.netflix.pointColor};
  transition left 0.5s;
`;

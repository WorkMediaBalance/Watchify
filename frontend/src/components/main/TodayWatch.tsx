import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const TodayWatch = () => {
  const [clickState, setClickState] = useState(0);
  const handleState = (index: number) => {
    setClickState(index);
  };

  return (
    <Container
      onClick={() => {
        console.log(clickState);

        handleState(1);
      }}
    >
      <BottomRectangle
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
          console.log(clickState);
          handleState(2);
        }}
        clickState={clickState}
      ></BottomRectangle>
    </Container>
  );
};

export default TodayWatch;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 30vh;
  background-color: red;
  // overflow: hidden;
`;

const state0to1 = keyframes`
  from {
    clip-path: polygon(0% 70%, 100% 30%, 100% 100%, 0% 100%);
  }
  
  to {
    clip-path: polygon(100% 70%, 100% 100%, 25% 100%);
  }
`;

const state1to2 = keyframes`
  from {
    clip-path: polygon(0% 70%, 100% 30%, 100% 100%, 0% 100%);
  }
  
  to {
    clip-path: polygon(0% 30%, 75% 0%, 100% 0%, 100% 30%, 100% 100%, 0% 100%);
  }
`;

const BottomRectangle = styled.div<{ clickState: number }>`
  height: 30vh;
  width: 100vw;
  background-color: green;
  clip-path: polygon(0% 70%, 100% 30%, 100% 100%, 0% 100%);
  animation: ${(props) => {
    if (props.clickState === 1) {
      return css`
        ${state0to1} 1s forwards;
      `;
    } else if (props.clickState === 2) {
      return css`
        ${state1to2} 1s forwards;
      `;
    }
  }};
`;

// @keyframes diamond-out-center {
//   from {
//     clip-path: polygon(-50% 50%, 50% -50%, 150% 50%, 50% 150%);
//   }
//   to {
//     clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
//   }
// }

// [transition-style="out:diamond:center"] {
//   animation: 1.5s cubic-bezier(.25, 1, .30, 1) diamond-out-center both;
// }

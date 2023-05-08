import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

interface TodayWatchProps {
  clickState: number;
  setClickState: React.Dispatch<React.SetStateAction<number>>;
  prevState: number;
  setPrevState: React.Dispatch<React.SetStateAction<number>>;
}

const TodayWatch: React.FC<TodayWatchProps> = ({
  clickState,
  setClickState,
  prevState,
  setPrevState,
}) => {
  const handleState = async (index: number) => {
    await setPrevState(clickState);
    await setClickState(index);
  };

  return (
    <Container
      clickState={clickState}
      onClick={() => {
        console.log(clickState);

        handleState(1);
      }}
    >
      {clickState === 1 ? (
        <TopInformation className="top">
          <div>
            <Title>{"모범택시"}</Title>
            <Episode>{"1화"}</Episode>
          </div>
          <CalendarLink>{"보러가기"}</CalendarLink>
        </TopInformation>
      ) : null}
      <BottomRectangle
        className="rectangle"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
          console.log(clickState);
          handleState(2);
        }}
        clickState={clickState}
        prevState={prevState}
      >
        {clickState === 2 ? (
          <BottomInformation className="bottom">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Title>{"테드 라소"}</Title>
              <Episode>{"1화"}</Episode>
            </div>
            <CalendarLink>{"보러가기"}</CalendarLink>
          </BottomInformation>
        ) : null}
      </BottomRectangle>
    </Container>
  );
};

export default TodayWatch;

const Container = styled.div<{ clickState: number }>`
  position: relative;
  width: 100vw;
  height: 30vh;
  background-image: ${({ clickState }) =>
    clickState === 1
      ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.justwatch.com/backdrop/302937718/s1920/mobeomtaegsi.webp")`
      : `url("https://images.justwatch.com/backdrop/302937718/s1920/mobeomtaegsi.webp")`};
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

// 애니메이션용 키프레임
const state0to1 = keyframes`
  0% {
    clip-path: polygon(0% 70%, 100% 30%, 100% 30%, 100% 100%, 0% 100%);
  }
  
  20% {
    clip-path: polygon(0% 100%, 100% 60%, 100% 60%, 100% 100%, 0% 100%);
  }

  100% {
    clip-path: polygon(25% 100%, 100% 70%, 100% 70%, 100% 100%, 25% 100%);
  }
`;
const state1to0 = keyframes`
0% {
  clip-path: polygon(25% 100%, 100% 70%, 100% 70%, 100% 100%, 25% 100%);
}

20% {
  clip-path: polygon(0% 100%, 100% 60%, 100% 60%, 100% 100%, 0% 100%);
}

100% {
  clip-path: polygon(0% 70%, 100% 30%, 100% 30%, 100% 100%, 0% 100%);
}
`;

const state0to2 = keyframes`
  0% {
    clip-path: polygon(0% 70%, 100% 30%, 100% 30%, 100% 100%, 0% 100%);
  }
  10% {
    clip-path: polygon(0% 40%, 100% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  
  100% {
    clip-path: polygon(0% 30%, 75% 0%, 100% 0%,  100% 100%, 0% 100%);
  }
`;
const state2to0 = keyframes`
  0% {
    clip-path: polygon(0% 30%, 75% 0%, 100% 0%,  100% 100%, 0% 100%);
  }
  10% {
    clip-path: polygon(0% 40%, 100% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(0% 70%, 100% 30%, 100% 30%, 100% 100%, 0% 100%);
  }
  
`;

const state1to2 = keyframes`
  0% {
    clip-path: polygon(25% 100%, 100% 70%, 100% 70%, 100% 100%, 25% 100%);
  }
  10% {
    clip-path: polygon(0% 100%, 100% 60%, 100% 60%, 100% 100%, 0% 100%);
  }


  90% {
    clip-path: polygon(0% 40%, 100% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  
  100% {
    clip-path: polygon(0% 30%, 75% 0%, 100% 0%,  100% 100%, 0% 100%);
  }
`;
const state2to1 = keyframes`
  0% {
    clip-path: polygon(0% 30%, 75% 0%, 100% 0%,  100% 100%, 0% 100%);
  }
  10% {
    clip-path: polygon(0% 40%, 100% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  90% {
    clip-path: polygon(0% 100%, 100% 60%, 100% 60%, 100% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(25% 100%, 100% 70%, 100% 70%, 100% 100%, 25% 100%);
  }

  


  
`;

// 아랫쪽 사각형
const BottomRectangle = styled.div<{ clickState: number; prevState: number }>`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-image: ${({ clickState }) =>
    clickState === 2
      ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.justwatch.com/backdrop/246950734/s1920/tedeu-raso.webp")`
      : `url("https://images.justwatch.com/backdrop/246950734/s1920/tedeu-raso.webp")`};
  background-size: cover;
  background-position: center;
  clip-path: ${(props) => {
    if (props.clickState === 1) {
      return "polygon(25% 100%, 100% 70%, 100% 70%, 100% 100%, 25% 100%)";
    } else if (props.clickState === 2) {
      return "polygon(0% 30%, 75% 0%, 100% 0%, 100% 100%, 0% 100%)";
    }
    return "polygon(0% 70%, 100% 30%, 100% 30%, 100% 100%, 0% 100%)";
  }};

  ${({ clickState, prevState }) => {
    if (prevState == 0 && clickState === 1) {
      return css`
        animation: ${state0to1} 0.5s linear;
      `;
    } else if (prevState == 0 && clickState === 2) {
      return css`
        animation: ${state0to2} 0.5s linear;
      `;
    } else if (prevState == 1 && clickState === 2) {
      return css`
        animation: ${state1to2} 0.5s linear;
      `;
    } else if (prevState == 2 && clickState === 1) {
      return css`
        animation: ${state2to1} 0.5s linear;
      `;
    } else if (prevState == 1 && clickState === 0) {
      return css`
        animation: ${state1to0} 0.5s linear;
      `;
    } else if (prevState == 2 && clickState === 0) {
      return css`
        animation: ${state2to0} 0.5s linear;
      `;
    }
  }}
`;

const TopInformation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  margin-left: 5vw;
`;

const BottomInformation = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: end;
  margin-right: 5vw;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  color: white;
`;

const Episode = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  color: white;
`;

const CalendarLink = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  color: white;
  border: 1px solid white;
  border-radius: 10px;
  padding: 1vw;
`;

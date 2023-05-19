import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { content } from "interface/content";
import { useNavigate } from "react-router-dom";

interface todayWatch extends content {
  episode: number;
}
interface TodayWatchProps {
  clickState: number;
  setClickState: React.Dispatch<React.SetStateAction<number>>;
  prevState: number;
  setPrevState: React.Dispatch<React.SetStateAction<number>>;
  todayWatch: todayWatch[] | [];
  isUserLoggedIn: boolean;
}

const TodayWatch: React.FC<TodayWatchProps> = ({
  clickState,
  setClickState,
  prevState,
  setPrevState,
  todayWatch,
  isUserLoggedIn,
}) => {
  const handleState = async (index: number) => {
    await setPrevState(clickState);
    await setClickState(index);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn === false) {
      setClickState(1);
    }
  }, []);

  return (
    <Container
      clickState={clickState}
      backdropPath={todayWatch.length > 0 ? todayWatch[0]["backdropPath"] : "/WatchifyLogo2.png"}
      onClick={() => {
        handleState(1);
      }}
    >
      {clickState === 1 ? (
        <TopInformation className="top">
          <div>
            <Title>{todayWatch.length > 0 ? todayWatch[0]["title"] : null}</Title>
            <Episode>
              {todayWatch.length > 0 ? (
                todayWatch[0]["episode"] !== 0 ? (
                  todayWatch[0]["episode"] + "화"
                ) : null
              ) : isUserLoggedIn ? (
                <NoContentDiv>스케줄이 없습니다.</NoContentDiv>
              ) : (
                <NoContentDiv>
                  <div>
                    시청 스케줄을 만들고 싶다면{" "}
                    <ColoredLogin onClick={() => navigate("/login")}>로그인</ColoredLogin>하세요!
                  </div>
                </NoContentDiv>
              )}
            </Episode>
          </div>
          {todayWatch.length > 0 ? (
            <CalendarLink
              onClick={() => {
                navigate("/schedule/result", {
                  state: {
                    month: new Date().getMonth() + 1,
                    date: new Date().getDate(),
                  },
                });
              }}
            >
              {"보러가기"}
            </CalendarLink> // TODO: 라우팅 파라미터로 날짜 보내주면 그 날짜 클릭되는 느낌으로
          ) : null}
        </TopInformation>
      ) : null}
      {todayWatch.length > 0 && todayWatch.length > 1 && (
        <BottomRectangle
          className="rectangle"
          backdropPath={todayWatch[1]["backdropPath"]}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();

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
                <Title>{todayWatch[1]["title"]}</Title>
                <Episode>
                  {todayWatch[1]["episode"] !== 0 ? todayWatch[1]["episode"] + "화" : null}
                </Episode>
              </div>
              <CalendarLink
                onClick={() => {
                  navigate("/schedule/result", {
                    state: {
                      month: new Date().getMonth() + 1,
                      date: new Date().getDate(),
                    },
                  });
                }}
              >
                {"보러가기"}
              </CalendarLink>
            </BottomInformation>
          ) : null}
        </BottomRectangle>
      )}
    </Container>
  );
};

export default TodayWatch;

const Container = styled.div<{ clickState: number; backdropPath: string }>`
  position: relative;
  width: 100vw;
  height: 30vh;
  background-image: ${({ clickState, backdropPath }) =>
    clickState === 1
      ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backdropPath})`
      : `url(${backdropPath})`};
  background-position: center;
  overflow: hidden;
  background-size: ${({ backdropPath }) =>
    backdropPath === "/WatchifyLogo2.png" ? "contain" : "cover"};
  background-repeat: no-repeat;
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

const ColoredLogin = styled.span`
  color: ${({ theme }) => theme.netflix.lightColor};
  text-decoration: underline;
`;

// 아랫쪽 사각형
const BottomRectangle = styled.div<{ clickState: number; prevState: number; backdropPath: string }>`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-image: ${({ clickState, backdropPath }) =>
    clickState === 2
      ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backdropPath})`
      : `url(${backdropPath})`};
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
  padding-left: 2vw;
  padding-right: 2vw;
`;

const NoContentDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

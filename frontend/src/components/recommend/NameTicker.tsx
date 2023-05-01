import React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "styles/theme";

// Ticker 스타일
const TickerContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

const ticker = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
`;

const TickerContent = styled.div`
  display: inline-block;
  animation-name: ${ticker};
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const STitleP = styled.p`
  font-size: ${theme.fontSizeType.big.fontSize};
  color: ${theme.netflix.fontColor};
  font-weight: ${theme.fontSizeType.big.fontWeight};
  margin-top: 1vh;
  text-align: center;
  margin-bottom: 1vh;
`;

const SEpisodeP = styled.p`
  font-size: ${theme.fontSizeType.middle.fontSize};
  font-weight: ${theme.fontSizeType.middle.fontWeight};
  color: ${theme.netflix.fontColor};
  margin-top: 0;
`;

const NameTicker = (props: { title: string; episode: number }) => {
  const title = props.title;
  const episode = props.episode;
  if (title.length > 20) {
    return (
      <>
        <TickerContainer>
          <TickerContent>
            <STitleP style={{ marginLeft: "20vw" }}>{title}</STitleP>
          </TickerContent>
        </TickerContainer>
        {episode !== 0 ? <SEpisodeP>{episode}부작</SEpisodeP> : <SEpisodeP>&nbsp;</SEpisodeP>}
      </>
    );
  } else {
    return (
      <>
        <STitleP>{title}</STitleP>
        {episode !== 0 ? <SEpisodeP>{episode}부작</SEpisodeP> : <SEpisodeP>&nbsp;</SEpisodeP>}
      </>
    );
  }
};

export default NameTicker;

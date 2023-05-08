import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

import disney from "assets/img/disneyIcon.png";
import netflix from "assets/img/netflixIcon.png";
import watcha from "assets/img/watchaIcon.png";
import wavve from "assets/img/wavveIcon.png";

const ContentSwal = () => {
  const [isWish, setIsWish] = useState(false); //TODO: props받아서 찜여부 초기값 설정 해주기

  const handleWishClick = () => {
    // axios 요청보내서 찜 설정/ 해제
    // 그 후 동작
    setIsWish(!isWish);
  };

  type OTTIconType = {
    [key: string]: string;
  };

  const OTTIcons: OTTIconType = {
    disney: disney,
    netflix: netflix,
    watcha: watcha,
    wavve: wavve,
  };

  const OTTStaticArray = ["disney", "netflix", "watcha", "wavve"]; //TODO: 나중에 props 여기 초기화

  const [OTTArray, setOTTArray] = useState([
    "disney",
    "netflix",
    "watcha",
    "wavve",
  ]); //TODO: 여기서 나중에 초기값 세팅

  return (
    <Container className="myModal">
      {isWish ? (
        <RibonTrue onClick={() => handleWishClick()} />
      ) : (
        <RibonFalse onClick={() => handleWishClick()} />
      )}
      <BackdropContainer
        className="backdropContainer"
        backdrop={
          "https://images.justwatch.com/backdrop/302937718/s1920/mobeomtaegsi.webp"
        }
      >
        <TitleSeasonContainer>
          <Title>{"모범택시"}</Title>
          <Season>{"시즌 1"}</Season>
        </TitleSeasonContainer>
        <RateAndGenresContainer>
          <Rate>{"5.0 / 5.0"}</Rate>
          <Genres>{"액션, 드라마"}</Genres>
          <FinalEpisode>{"16부작"}</FinalEpisode>
        </RateAndGenresContainer>
      </BackdropContainer>

      <ContentContainer>
        <Summarize>
          {
            "“정의가 실종된 사회, 전화 한 통이면 오케이” 베일에 가려진 택시회사 무지개 운수와 택시기사 김도기가 억울한 피해자를 대신해 복수를 완성하는 사적 복수 대행극"
          }
        </Summarize>
        <Footer>
          <LinkDescriptions>보러가기</LinkDescriptions>
          <OTTContainer>
            {OTTStaticArray.map((OTT: string, index) => {
              return <OTTIcon src={OTTIcons[OTT]}></OTTIcon>;
            })}
          </OTTContainer>
        </Footer>
      </ContentContainer>
    </Container>
  );
};

export default ContentSwal;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 80vw;
  height: 45vh;
  background-color: ${({ theme }) => theme.netflix.tabColor};
  color: white;
`;
const BackdropContainer = styled.div<{ backdrop: string }>`
  width: 100%;
  height: 24vh;
  display: flex;
  flex-direction: column;
  justify-content: end;

  background-image: ${({ backdrop }) => `
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 1) 100%
    ),
    url(${backdrop})
  `};
  background-size: cover;
  background-position: center;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const TitleSeasonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 2vw;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
`;
const Season = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  margin-left: 1vw;
`;

const RateAndGenresContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 3vw;
  margin-bottom: 1vw;
`;
const Rate = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
`;
const Genres = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
  margin-left: 2vw;
`;
const FinalEpisode = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
  margin-left: 2vw;
`;

const Summarize = styled.div`
  margin: 3vw;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const LinkDescriptions = styled.div`
  margin-left: 10vw;
`;
const OTTContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 3vw;
`;

const OTTIcon = styled.img`
  width: 12vw;
  height: 12vw;
  position: relative;
`;

const growShrink = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

// TODO: 이부분 커졌다 작아지는거, 재렌더링 때문에 그냥 애니메이션 무시되는 거 같은데, 나중에 다시 도전하기
const RibonTrue = styled.div`
  position: absolute;
  right: 3%;

  width: 10%;
  height: 15%;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 67%, 0% 100%);

  background-color: ${({ theme }) => theme.netflix.pointColor};
  animation: ${growShrink} 0.6s ease-in-out forwards;
`;
const RibonFalse = styled.div`
  position: absolute;
  right: 3%;

  width: 10%;
  height: 15%;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 67%, 0% 100%);

  background-color: white;
  animation: ${growShrink} 0.6s ease-in-out forwards;
`;

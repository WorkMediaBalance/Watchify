import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillCheckCircle } from "react-icons/ai";
import disney from "assets/img/disneyIcon.png";
import netflix from "assets/img/netflixIcon.png";
import watcha from "assets/img/watchaIcon.png";
import wavve from "assets/img/wavveIcon.png";

interface MoviePosterProps {
  imageUrl: string;
  title: string;
}

const PosterContainer = styled.div<{ imageUrl: string; showOverlay: boolean }>`
  width: 100%;
  padding-bottom: 150%;
  background-image: ${({ showOverlay, imageUrl }) =>
    showOverlay
      ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`
      : `url(${imageUrl})`};
  background-size: cover; // 이 속성을 추가합니다.
  background-position: center; // 이 속성을 추가합니다.
  position: relative;
`;

const OTTOverlayContainer = styled.div`
  position: absolute;
  bottom: -2vh;
  right: -2vh;
`;

const OTTOverlay = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ContentContainer = styled.div<{ showOverlay: boolean }>`
  position: absolute;
  oveflow: hidden;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  transition: background-image 0.3s;
  opacity: ${({ showOverlay }) => (showOverlay ? 1 : 0)};
  transition: opacity 0.3s;
`;
const WishButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;

  color: white;
  margin-top: 1vh;
  margin-right: 1vh;
`;

const TitleAndOTTContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
`;

const Title = styled.div`
  color: white;
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OTTContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const OTTGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 12vw);
  gap: 5px;
  justify-content: center;
`;

const OTTIcon = styled.img`
  width: 12vw;
  height: 12vw;
  position: relative;
`;

const ContentPoster: React.FC<MoviePosterProps> = ({ imageUrl, title }) => {
  const [isWish, setIsWish] = useState(true); //TODO: props받아서 찜여부 초기값 설정 해주기

  const handleWishClick = () => {
    // axios 요청보내서 찜 설정/ 해제
    // 그 후 동작
    setIsWish(!isWish);
  };

  const [showOverlay, setShowOverlay] = useState(false);
  const handlePosterClick = () => {
    setShowOverlay(!showOverlay);
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

  const moveOTT = () => {
    setOTTArray((prev) => {
      const moved = [...prev];
      moved.push(moved.shift()!);
      return moved;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(moveOTT, 1500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <PosterContainer
      onClick={() => {
        handlePosterClick();
      }}
      imageUrl={imageUrl}
      showOverlay={showOverlay}
    >
      <ContentContainer showOverlay={showOverlay}>
        <WishButtonContainer>
          {isWish ? (
            <AiFillCheckCircle
              size={30}
              onClick={(event) => {
                event.stopPropagation();
                handleWishClick();
              }}
            />
          ) : (
            <AiFillPlusCircle
              size={30}
              onClick={(event) => {
                event.stopPropagation();
                handleWishClick();
              }}
            />
          )}
        </WishButtonContainer>
        <TitleAndOTTContainer>
          <Title>{title}</Title>
          {OTTStaticArray.length == 4 ? (
            <OTTGridContainer>
              {OTTStaticArray.map((OTT: string, index) => {
                return <OTTIcon src={OTTIcons[OTT]}></OTTIcon>;
              })}
            </OTTGridContainer>
          ) : (
            <OTTContainer>
              {OTTStaticArray.map((OTT: string, index) => {
                return <OTTIcon src={OTTIcons[OTT]}></OTTIcon>;
              })}
            </OTTContainer>
          )}
        </TitleAndOTTContainer>
      </ContentContainer>
      {!showOverlay ? (
        <OTTOverlayContainer>
          <OTTOverlay>
            {OTTArray.map((OTT: string, index) => {
              return (
                <OTTIcon
                  src={OTTIcons[OTT]}
                  style={{ marginLeft: -30, zIndex: -index + 10 }}
                ></OTTIcon>
              );
            })}
          </OTTOverlay>
        </OTTOverlayContainer>
      ) : null}
    </PosterContainer>
  );
};

export default ContentPoster;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import disney from "../../assets/img/otticons/DisneyIcon.png";
import netflix from "../../assets/img/otticons/NetflixIcon.png";
import watcha from "../../assets/img/otticons/WatchaIcon.png";
import wavve from "../../assets/img/otticons/WavveIcon.png";
import disneySelected from "../../assets/img/otticons/DisneyIconSelected.png";
import netflixSelected from "../../assets/img/otticons/NetflixIconSelected.png";
import watchaSelected from "../../assets/img/otticons/WatchaIconSelected.png";
import wavveSelected from "../../assets/img/otticons/WavveIconSelected.png";

import { mainRecommend, mainRecommendNon } from "apis/apiMain";

import { recResultState } from "recoil/recommendState";
import { useRecoilState } from "recoil";

import ContentPoster from "components/common/ContentPoster";

import { content } from "interface/content";

import spinner from "./../../assets/gif/93297-simple-spinner.json";

import Lottie from "lottie-react";

type recommendPerOtt = {
  [key: string]: content[];
};

const RecommendPerOTT = () => {
  const [recResult, SetRecResult] = useRecoilState(recResultState); //TODO: recResult[0] 을 컨텐츠 result[ott][index]으로 치환하면 됨

  const [result, setResult] = useState<recommendPerOtt | undefined>();

  const [isLoading, setIsLoading] = useState(false);

  const [ott, setOtt] = useState("netflix");
  const [index, setIndex] = useState(0);

  const handleIconClick = (icon: string) => {
    setOtt(icon);
    setIndex(0);
  };

  const handleNext = (add: number) => {
    setIndex((index + add + 10) % 10);
  };

  const getOttRecommend = async () => {
    setIsLoading(true);
    const data = await mainRecommend();
    setResult(data);
    setIsLoading(false);
  };

  const getOttRecommendNon = async () => {
    setIsLoading(true);
    const data = await mainRecommendNon();
    setResult(data);

    setIsLoading(false);
  };

  useEffect(() => {
    const Token = localStorage.getItem("accessToken");
    if (Token !== null) {
      getOttRecommend();
    } else {
      getOttRecommendNon();
    }
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Header>
          OTT별<TitleSpan> 추천</TitleSpan>
        </Header>
      </HeaderContainer>
      {isLoading ? (
        <div
          className="here"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Lottie animationData={spinner} />
        </div>
      ) : (
        <ContentContainer>
          <Poster className="poster">
            {result && (
              <ContentPoster
                title={result[ott][index].title}
                imageUrl={result[ott][index].imgPath}
                content={result[ott][index]}
              />
            )}
          </Poster>
          <Content>
            <OTTIcons>
              <OTTIcon
                src={ott === "netflix" ? netflixSelected : netflix}
                onClick={() => {
                  handleIconClick("netflix");
                }}
              ></OTTIcon>
              <OTTIcon
                src={ott === "disney" ? disneySelected : disney}
                onClick={() => {
                  handleIconClick("disney");
                }}
              ></OTTIcon>
              <OTTIcon
                src={ott === "wavve" ? wavveSelected : wavve}
                onClick={() => {
                  handleIconClick("wavve");
                }}
              ></OTTIcon>
              <OTTIcon
                src={ott === "watcha" ? watchaSelected : watcha}
                onClick={() => {
                  handleIconClick("watcha");
                }}
              ></OTTIcon>
            </OTTIcons>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "80%",
                margin: "2vw",
                width: "90%",
              }}
            >
              <div>
                <Title>{result !== undefined && result[ott][index].title}</Title>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginRight: "1vw",
                      alignItems: "center",
                    }}
                  >
                    <div></div>
                    {result !== undefined &&
                      (result[ott][index].season === 0 ? null : (
                        <div style={{ marginRight: "2vw" }}>
                          {`시즌 ${result[ott][index].season}`}
                        </div>
                      ))}
                    <Rating>{result !== undefined && `${result[ott][index].rate} / 10.0`} </Rating>
                  </div>
                </div>
              </div>
              <Story>
                {result !== undefined &&
                  (result[ott][index].summarize === "0"
                    ? "추가 예정"
                    : result[ott][index].summarize)}
              </Story>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "1vw",
                }}
              >
                <Watch
                  onClick={() => {
                    handleNext(-1);
                  }}
                >
                  {"<<"}
                </Watch>
                <DotContaier>
                  {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((no, i) => {
                    return <Dot isOn={index === i} />;
                  })}
                </DotContaier>
                <Watch
                  onClick={() => {
                    handleNext(1);
                  }}
                >
                  {">>"}
                </Watch>
              </div>
            </div>
          </Content>
        </ContentContainer>
      )}
    </Container>
  );
};

export default RecommendPerOTT;

const Container = styled.div`
  hegiht: 30vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: end;
  color: ${({ theme }) => theme.netflix.fontColor};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
`;

const Header = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  color: ${({ theme }) => theme.netflix.fontColor};
  padding-left: 1vh;
`;

const OTTIcons = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: -6vh;
  right: 0;
`;

const OTTIcon = styled.img`
  width: 9vw;
  height: 9vw;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: ${({ theme }) => theme.netflix.tabColor};
  overflow: visible;
  position: relative;
  height: 100%;
  align-items: center;
  margin-top: 4vh;
`;

const Poster = styled.div`
  position: absolute;
  height: 34vh;
  width: 50vw;
  left: 0;

  overflow: visible;
`;

const Content = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 30vh;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
`;

const Rating = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
`;

const Story = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
`;

const Watch = styled.div`
  text-align: end;
  padding-right: 1vw;
`;

const TitleSpan = styled.span`
  color: ${({ theme }) => theme.netflix.lightColor};
  font-size: 5.5vw;
`;

const Dot = styled.div<{ isOn: boolean }>`
  background-color: ${({ theme, isOn }) =>
    isOn ? theme.netflix.pointColor : theme.netflix.fontColor};
  border-radius: 50%;
  width: 1.2vw;
  height: 1.2vw;
  margin: 0.2vw;
`;

const DotContaier = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 50%;
  margin-top: 0.2vh;
`;

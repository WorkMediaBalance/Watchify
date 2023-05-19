import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { recResultState } from "recoil/recommendState";
import { userState } from "recoil/userState";
import { useRecoilState } from "recoil";
// import { USER_NAME } from "constant/constant";
import { theme } from "styles/theme";
import NameTicker from "components/recommend/NameTicker";

import disney from "../assets/img/otticons/DisneyIcon.png";
import netflix from "../assets/img/otticons/NetflixIcon.png";
import watcha from "../assets/img/otticons/WatchaIcon.png";
import wavve from "../assets/img/otticons/WavveIcon.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Mousewheel } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import ContentPoster from "components/common/ContentPoster";

const Wrapper = styled.div`
  width: 100%;
  min-height: 94vh;
  margin-top: 0;
  background-color: ${theme.netflix.backgroundColor};
  overflow: hidden; // 얘를 추가함...
`;

const SubWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const SRibbonDiv = styled.div<{ selected: boolean }>`
  width: 0;
  height: 0;
  margin-right: 2.5vw;
  border-bottom: ${(props) =>
    props.selected ? "2.1vh solid transparent" : "1.6vh solid transparent"};
  border-top: ${(props) =>
    props.selected ? `5vh solid ${props.theme.netflix.pointColor}` : "4vh solid #ffffff"};
  border-left: ${(props) =>
    props.selected ? `2.1vh solid ${props.theme.netflix.pointColor}` : "1.6vh solid #ffffff"};
  border-right: ${(props) =>
    props.selected ? `2.1vh solid ${props.theme.netflix.pointColor}` : "1.6vh solid #ffffff"};
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transition: all 0.2s ease-in-out;
`;

const SRibbonP = styled.p<{ selected: boolean }>`
  font-size: ${(props) => (props.selected ? "1.5rem" : "1.3rem")};
  font-weight: 600;
  margin-bottom: ${(props) => (props.selected ? "8.5vh" : "6.5vh")};
  color: ${(props) =>
    props.selected ? `${props.theme.netflix.fontColor}` : `${props.theme.netflix.pointColor}`};
  transition: all 0.2s ease-in-out;
`;

const STitleP = styled.p`
  font-size: ${theme.fontSizeType.big.fontSize};
  font-weight: ${theme.fontSizeType.big.fontWeight};
  color: ${theme.netflix.fontColor};
`;

const SMiniTitle = styled.div`
  font-size: 4vw;
  font-weight: ${theme.fontSizeType.big.fontWeight};
  color: ${theme.netflix.fontColor};
  margin: 1vh;
  margin-left: 10vw;
  width: 100%;
  text-align: left;
`;

const SMainDiv = styled.div`
  display: flex;
  width: 100vw;
  min-height: 55vh;
  // border: 1px solid grey; TODO: 여기 보더 별로라고 하심...
  border-radius: 12px;
  background-color: ${theme.netflix.tabColor};
  flex-direction: column;
  margin-bottom: 1vh;
`;

const SContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7vh;
  height: auto;
`;

const SImg = styled.img`
  width: 35vw;
  height: 53vw;
  border-radius: 12px;
  margin-right: 6vw;
  margin-left: 6vw;
`;

const STextP = styled.p`
  font-size: ${theme.fontSizeType.middle.fontSize};
  font-weight: ${theme.fontSizeType.middle.fontWeight};
  color: ${theme.netflix.fontColor};
  margin-bottom: 2vh;
  margin-top: 0.5vh;
`;

const SSummaryP = styled.p`
  font-size: ${theme.fontSizeType.middle.fontSize};
  font-weight: ${theme.fontSizeType.middle.fontWeight};
  color: ${theme.netflix.fontColor};
  width: 90%;
  margin-top: 3vh;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SSummaryP2 = styled.p`
  font-size: ${theme.fontSizeType.middle.fontSize};
  font-weight: ${theme.fontSizeType.middle.fontWeight};
  color: ${theme.netflix.fontColor};
  width: 90%;
  margin-top: 3vh;
`;

const Container = styled.div`
  height: auto;
  z-index: 0;
  position: relative;
  margin: 1vw;
`;

const UserSpan = styled.span`
  color: ${theme.netflix.lightColor};
`;
const PlaceHolder = styled.div`
  height: 4vh;
`;

const PageRecommendResult = () => {
  const [recResult, SetRecResult] = useRecoilState(recResultState);
  const [selectedNum, SetSelectedNum] = useState<number>(0);
  const [user, SetUser] = useRecoilState(userState);

  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const selectedId = event.currentTarget.id;
    SetSelectedNum(parseInt(selectedId));
  };

  const renderOTTIcons = () => {
    const ottList = Object.keys(recResult[selectedNum].ott);

    interface IconMap {
      [key: string]: string;
    }

    const icons: IconMap = {
      netflix: netflix,
      wavve: wavve,
      watcha: watcha,
      disney: disney,
    };

    const openNewTab = (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return ottList.map((ott, index) => {
      if (icons.hasOwnProperty(ott)) {
        return (
          <img
            key={index}
            src={icons[ott]}
            alt={`${ott} 아이콘`}
            style={{ marginRight: "1vw", width: "5vh", height: "5vh" }}
            onClick={() => {
              openNewTab(recResult[selectedNum].ott[ott]);
            }}
          />
        );
      } else {
        return null;
      }
    });
  };

  const runtime = recResult[selectedNum].runtime;
  const hour = Math.floor(runtime / 60);
  const minute = runtime % 60 === 0 ? 0 : runtime % 60;
  const run =
    hour >= 1 && minute === 0
      ? `${hour}시간`
      : hour === 0
      ? `${minute}분`
      : `${hour}시간 ${minute}분`;

  const location = useLocation();

  useEffect(() => {
    const data = location.state?.data;
    SetRecResult(data);
  }, []);

  const [isNeedMore, setIsNeedMore] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const textContainer = document.getElementById("summary");
  useEffect(() => {
    setIsNeedMore(false);
    if (textContainer) {
      const computedStyle = window.getComputedStyle(textContainer);
      const lineHeight = parseInt(computedStyle.getPropertyValue("line-height"));
      const containerHeight = textContainer.clientHeight;
      const textHeight = textContainer.scrollHeight;
      const isOverflow = textHeight !== containerHeight;
      const isExceedsFourLines = Math.ceil(textHeight / lineHeight) > 4;

      if (isOverflow) {
        setIsNeedMore(true);
      }
    }
  }, [selectedNum]);

  return (
    <Wrapper>
      <SubWrapper>
        <STitleP>
          <UserSpan>{user["name"] ? user["name"] : "guest"}</UserSpan>님을 위한 추천 컨텐츠
        </STitleP>
        <SMainDiv className={"mainDiv"}>
          <div style={{ display: "flex", marginLeft: "5vw", position: "absolute" }}>
            <SRibbonDiv id="0" onClick={onClickHandler} selected={selectedNum === 0}>
              <SRibbonP selected={selectedNum === 0}>1</SRibbonP>
            </SRibbonDiv>
            <SRibbonDiv id="1" onClick={onClickHandler} selected={selectedNum === 1}>
              <SRibbonP selected={selectedNum === 1}>2</SRibbonP>
            </SRibbonDiv>
            <SRibbonDiv id="2" onClick={onClickHandler} selected={selectedNum === 2}>
              <SRibbonP selected={selectedNum === 2}>3</SRibbonP>
            </SRibbonDiv>
          </div>
          <SContentDiv>
            <NameTicker
              title={recResult[selectedNum].title}
              episode={recResult[selectedNum].finalEpisode}
              season={recResult[selectedNum].season}
            />
            <div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
              <div style={{ width: "50vw", marginLeft: "6vw", marginRight: "6vw" }}>
                <ContentPoster
                  imageUrl={recResult[selectedNum].imgPath}
                  title={recResult[selectedNum].title}
                  content={recResult[selectedNum]}
                />
              </div>
              <div style={{ marginRight: "6vw", width: "50vw" }}>
                <STextP>추천도 : {recResult[selectedNum].score}%</STextP>
                <STextP>장르 : {recResult[selectedNum].genres.join(", ")}</STextP>
                <STextP>재생 시간 : {run}</STextP>
                {/* <STextP>
                  등급 :{" "}
                  {recResult[selectedNum].audienceAge === 0
                    ? "전체 관람가"
                    : `${recResult[selectedNum].audienceAge}세 이용가`}
                </STextP> */}
                <div style={{ marginTop: "3vh", marginLeft: "-1vh" }}>{renderOTTIcons()}</div>{" "}
              </div>
            </div>
            {!isMoreOpen ? (
              <SSummaryP id="summary">
                {recResult[selectedNum].summarize !== "0"
                  ? recResult[selectedNum].summarize
                  : "추가 예정"}
              </SSummaryP>
            ) : (
              <SSummaryP2 id="summary">
                {recResult[selectedNum].summarize !== "0"
                  ? recResult[selectedNum].summarize
                  : "추가 예정"}
              </SSummaryP2>
            )}

            {isNeedMore ? (
              !isMoreOpen ? (
                <div
                  onClick={() => {
                    setIsMoreOpen(true);
                  }}
                  style={{ color: "white", marginBottom: "1vh" }}
                >
                  더보기
                </div>
              ) : (
                <div
                  onClick={() => {
                    setIsMoreOpen(false);
                  }}
                  style={{ color: "white", marginBottom: "1vh" }}
                >
                  접기
                </div>
              )
            ) : null}
          </SContentDiv>
        </SMainDiv>
        <SMiniTitle>이런 컨텐츠는 어때요?</SMiniTitle>
        <Container>
          <Swiper
            style={{ width: "100vw" }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={4} // 몇개가 동시에 보이는지 (2면 1개 + 0.5개 * 2)
            spaceBetween={-40} // 겹치는 정도
            initialSlide={2} // 시작 슬라이드!
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: true,
            }}
            // onSlideChange={(swiper) => {
            //   setActiveIndex(swiper.activeIndex);
            // }}
            navigation={true} // 네비게이션 버튼
            mousewheel={true} // 마우스 휠
            pagination={true}
            modules={[EffectCoverflow, Navigation, Mousewheel]}
            className="mySwiper"
          >
            {recResult.slice(3, 10).map((content, index) => (
              <SwiperSlide key={index}>
                <div style={{ width: "33vw" }}>
                  <ContentPoster
                    imageUrl={content["imgPath"]}
                    title={content["title"]}
                    content={content}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
        <PlaceHolder></PlaceHolder>
      </SubWrapper>
    </Wrapper>
  );
};

export default PageRecommendResult;

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Mousewheel } from "swiper";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { content } from "interface/content";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { weekScheduleState } from "./../../recoil/scheduleState";

const Container = styled.div`
  height: auto;
  z-index: 0;
  position: relative;
`;

const SlideContainer = styled.div`
  width: 60vw;
  height: 30vw;
`;

const SlideImage = styled.div<{ url: string }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${({ isActive }) =>
    isActive &&
    `
    opacity: 1;
  `}
`;

const OverlayContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-top: 2vw;
  margin-left: 2vw;
  height: 100%;
`;

const MonthDiv = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: -1vh;
`;
const DateDiv = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: -1vh;
`;
const DayDiv = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1vh;
`;

const OverlayEpisodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  margin-top: 2vw;
  margin-right: 2vw;
  height: 100%;
  color: #e4e4e4;
  width: 70%;
`;

const EpisodeAndMore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
`;

const Episode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin: 1vw;
  justify-content: end;
  width: 100%;
`;
const EpisodeTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap; // 줄바꿈 방지
  overflow: hidden; // 넘치는 부분 숨김
  text-overflow: ellipsis; // 넘치는 부분을 ... 으로 표시
  max-width: 80%; // 여기가 넘어가면 안되는 너비
`;
const EpisodeNumber = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  margin-left: 1vw;
`;

const Extra = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  margin-right: 1vw;
`;

const More = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-right: 1vw;
  margin-bottom: 3.5vw;
`;

const DivForUnlogged = styled.div`
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToLogIn = styled.div`
  border: ${({ theme }) => `1px solid ${theme.netflix.pointColor}`};
  background-color: ${({ theme }) => `${theme.netflix.pointColor}`};

  margin: 1vh;
  padding: 1vh;
  border-radius: 20%;
`;

interface contentEpisode extends content {
  episode: number;
}
interface CarouselProps {
  weeklySchedule: contentEpisode[][];
}

const Carousel: React.FC<CarouselProps> = ({ weeklySchedule }) => {
  const contentArray = [0, 0, 0, 0, 0, 0, 0];
  const [activeIndex, setActiveIndex] = useState(4);
  let today = new Date();
  let thisWeek = [
    new Date().setDate(today.getDate() - 3),
    new Date().setDate(today.getDate() - 2),
    new Date().setDate(today.getDate() - 1),
    today,
    new Date().setDate(today.getDate() + 1),
    new Date().setDate(today.getDate() + 2),
    new Date().setDate(today.getDate() + 3),
  ];

  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      setIsUserLoggedIn(true);
    }
  }, []);
  const navigate = useNavigate();
  return (
    <Container className="CarouselContainer">
      {isUserLoggedIn ? (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2} // 몇개가 동시에 보이는지 (2면 1개 + 0.5개 * 2)
          spaceBetween={-40} // 겹치는 정도
          initialSlide={3} // 시작 슬라이드!
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          navigation={true} // 네비게이션 버튼
          mousewheel={true} // 마우스 휠
          pagination={true}
          modules={[EffectCoverflow, Navigation, Mousewheel]}
          className="mySwiper"
        >
          {contentArray.map((content, index) => (
            <SwiperSlide key={index}>
              <SlideContainer>
                <SlideImage
                  url={
                    weeklySchedule[index].length === 0
                      ? "/WatchifyLogo2.png"
                      : weeklySchedule[index][0]["backdropPath"]
                  }
                >
                  <Overlay isActive={activeIndex === index}>
                    <OverlayContainer>
                      <DateContainer>
                        <MonthDiv>
                          {new Date(thisWeek[index]).getMonth() + 1 < 10
                            ? "0" + (new Date(thisWeek[index]).getMonth() + 1)
                            : new Date(thisWeek[index]).getMonth() + 1}
                        </MonthDiv>
                        <DateDiv>
                          {new Date(thisWeek[index]).getDate() < 10
                            ? "0" + new Date(thisWeek[index]).getDate()
                            : new Date(thisWeek[index]).getDate()}
                        </DateDiv>
                        <DayDiv>{days[new Date(thisWeek[index]).getDay()]}</DayDiv>
                      </DateContainer>
                      {weeklySchedule[index].length === 0 ? null : weeklySchedule[index].length <=
                        2 ? (
                        <OverlayEpisodesContainer>
                          <EpisodeAndMore>
                            {weeklySchedule[index].map((episode, index) => (
                              <Episode>
                                <EpisodeTitle>{episode["title"]}</EpisodeTitle>
                                <EpisodeNumber>
                                  {episode["episode"] === 0 ? null : episode["episode"] + "화"}
                                </EpisodeNumber>
                              </Episode>
                            ))}
                          </EpisodeAndMore>
                        </OverlayEpisodesContainer>
                      ) : (
                        <OverlayEpisodesContainer>
                          <EpisodeAndMore>
                            {weeklySchedule[index].slice(0, 2).map((episode, index) => (
                              <Episode>
                                <EpisodeTitle>{episode["title"]}</EpisodeTitle>
                                <EpisodeNumber>
                                  {episode["episode"] === 0 ? null : episode["episode"] + "화"}
                                </EpisodeNumber>
                              </Episode>
                            ))}
                            <Extra>{`외 ${weeklySchedule[index].length - 2}편`}</Extra>
                          </EpisodeAndMore>
                          <More
                            onClick={() => {
                              navigate("/schedule/result", {
                                state: {
                                  month: new Date(thisWeek[index]).getMonth() + 1,
                                  date: new Date(thisWeek[index]).getDate(),
                                },
                              });
                            }}
                          >{`more >`}</More>
                        </OverlayEpisodesContainer>
                      )}
                    </OverlayContainer>
                  </Overlay>
                </SlideImage>
              </SlideContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <DivForUnlogged>
          <div>로그인 해서 스케줄을 확인하세요!</div>
          <ToLogIn
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </ToLogIn>
        </DivForUnlogged>
      )}
    </Container>
  );
};

export default Carousel;

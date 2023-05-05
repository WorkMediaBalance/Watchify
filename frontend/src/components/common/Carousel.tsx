import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Mousewheel } from "swiper";
import styled from "styled-components";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Container = styled.div`
  height: 40vh;
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

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
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
  margin: 2vw;
  height: 100%;
`;

const Month = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: -1vh;
`;
const Date = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: -1vh;
`;
const Day = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1vh;
`;

const OverlayEpisode = styled.div`
  font-size: 0.5rem;
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
`;

// const StyledSwiperSlide = styled(SwiperSlide)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

function Carousel() {
  const contentArray = [0, 0, 0, 0, 0, 0, 0];
  const [activeIndex, setActiveIndex] = useState(4);
  return (
    <Container>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2} // 몇개가 동시에 보이는지 (2면 1개 + 0.5개 * 2)
        spaceBetween={-40} // 겹치는 정도
        initialSlide={4} // 시작 슬라이드!
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
              <SlideImage url="https://images.justwatch.com/backdrop/302937718/s1920/mobeomtaegsi.webp">
                {index === activeIndex && (
                  <Overlay>
                    <OverlayContainer>
                      <DateContainer>
                        <Month>{"05"}</Month>
                        <Date>{"05"}</Date>
                        <Day>{"FRI"}</Day>
                      </DateContainer>
                    </OverlayContainer>
                  </Overlay>
                )}
              </SlideImage>
            </SlideContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default Carousel;

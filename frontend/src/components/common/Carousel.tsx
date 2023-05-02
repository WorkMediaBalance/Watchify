import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Mousewheel } from "swiper";
import styled from "styled-components";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Container = styled.div`
  height: 40vh;
`;

const SlideImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-height: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Carousel() {
  return (
    <Container>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2} // 몇개가 동시에 보이는지 (2면 1개 + 0.5개 * 2)
        spaceBetween={-60} // 겹치는 정도
        initialSlide={4} // 시작 슬라이드!
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        navigation={true} // 네비게이션 버튼
        mousewheel={true} // 마우스 휠
        pagination={true}
        modules={[EffectCoverflow, Navigation, Mousewheel]}
        className="mySwiper"
      >
        {/* 얘를 반복하는 것 */}
        <StyledSwiperSlide>
          <SlideImage src="http://via.placeholder.com/132x84" alt="" />
        </StyledSwiperSlide>
        {/* 여기까지 반복 */}
        <StyledSwiperSlide>
          <SlideImage src="http://via.placeholder.com/140x84" alt="" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <SlideImage src="http://via.placeholder.com/140x84" alt="" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <SlideImage src="http://via.placeholder.com/140x84" alt="" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <SlideImage src="http://via.placeholder.com/140x84" alt="" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <SlideImage src="http://via.placeholder.com/140x84" alt="" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <SlideImage src="http://via.placeholder.com/140x84" alt="" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <SlideImage src="http://via.placeholder.com/140x84" alt="" />
        </StyledSwiperSlide>
      </Swiper>
    </Container>
  );
}

export default Carousel;

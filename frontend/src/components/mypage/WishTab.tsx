import React, { useState } from "react";
import styled from "styled-components";
import ContentPoster from "components/common/ContentPoster";
import { content } from "interface/content";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8vw; //
  margin: 4vw;
`;

const WishTab = () => {
  const [wishList, setWishList] = useState<content[]>([
    {
      pk: 1,
      title: "더 글로리",
      runtime: 50, // 분 단위로 해서 보내주세요 (1시간 20분 -> 80)
      rate: 4.5, // 없을시 0
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1", // 없을 시 빈 string ''
      type: "드라마",
      season: 1, // 없을 시 0
      finalEpisode: 10, // 없을 시 0
      ott: { netflix: "https://www.netflix.com/kr/title/81519223" }, // 없을 시 빈 array
      genres: ["드라마"], // 없을 시 빈 array
      isWish: false, // 비로그인시 무조건 false
      isLike: 1, // 좋아요=1 / 없음=0 / 싫어요=-1
      // 없을 시 빈 string ''
      summarize:
        "어느 날 길을 걷던 걸무고는 우연히 알 수 없는 동전을 줍게 되고, 이 동전의 충격적인 정체가 알려지며 사건에 휩싸이게 되는데... 과연 걸무고는 무사할 수 있을까?",
      audienceAge: 15, // 없을 시 0
    },
    {
      pk: 2,
      title: "트와일라잇",
      runtime: 60,
      rate: 3.7,
      img_path: "https://images.justwatch.com/poster/129382738/s592/twilight.webp",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "영화",
      season: 0,
      finalEpisode: 0,
      ott: {
        wavve: "https://www.wavve.com/player/movie?movieid=MV_LO01_LO0000000038",
        watcha: "https://watcha.com/contents/myWqyBW",
      },
      genres: ["야생", "뱀파이어"],
      isWish: true,
      summarize: "뱀파이어가 울부지저따. 뱀파이어는 짱 쎄따. 크와아앙",
      audienceAge: 15,
    },
    {
      pk: 3,
      title: "고병진이 살아있다 : Walking Moving Byeongjin",
      runtime: 88,
      rate: 1.2,
      img_path: "https://images.justwatch.com/poster/8733916/s592/bagmulgwani-salaissda.webp",
      backdrop_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      isLike: 1,
      type: "영화",
      season: 0,
      finalEpisode: 0,
      ott: {
        wavve: "https://www.wavve.com/player/movie?movieid=MV_CH01_FX0000011513",
        disney:
          "https://www.disneyplus.com/ko-kr/movies/night-at-the-museum/7CIEBLbWIbTR?irclickid=QtOQ7aX85xyNW8FQSXWPO3CrUkAX00XKjQzmRU0&irgwc=1&cid=DSS-Affiliate-Impact-Content-JustWatch+GmbH-705874&tgclid=0f010036-956b-4d13-8f00-1ef16459f3ec&dclid=CjkKEQjw3ueiBhD6mL2q9ajRr5ABEiQAewM-7icpU5wK0vK8mOV_QSB276CtpQmwQhrtxJqj3PNNgjHw_wcB",
      },
      genres: ["박물관", "리얼리티"],
      isWish: false,
      summarize:
        "한참 어린 동생으로부터 스타 도전을 받은 걸무고, 과연 그는 저그의 자존심을 지켜낼 수 있을 것인가? 5월 1일. Python 개봉 박두",
      audienceAge: 15,
    },
  ]);

  return (
    <div>
      <Title>나의 찜 목록</Title>
      <GridContainer>
        {wishList.map((content, index) => (
          <ContentPoster
            imageUrl={wishList[index]["img_path"]}
            title={wishList[index]["title"]}
            content={wishList[index]}
          />
        ))}
      </GridContainer>
    </div>
  );
};

const Title = styled.div`
  color: ${({ theme }) => theme.netflix.fontColor};
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 0.5rem 0;
  padding-left: 0.5rem;
`;
export default WishTab;

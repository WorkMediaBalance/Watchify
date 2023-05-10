import React, { useState } from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";

import { content } from "interface/content";

import { RxCross2 } from "react-icons/rx";

const Search = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [autocompleteWords, setAutocompleteWords] = useState<string[] | null>([
    "고병진은 살아있다",
    "고병진 프리즌 브레이크",
    "나는 내일 어제의 고병진과 만난다",
    "고병진스 :: 인피니트 워",
    "6시 내 고병진",
    "내 머릿속의 고병진",
  ]);

  // 검색 결과
  const [searchResult, setSearchResult] = useState<content[]>([
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

  // 검색창 focus시 div가 나오게 함. div에는 최근 검색어와 자동완성 표출
  // 검색창 외부를 클릭 시 위의 div가 사라짐 (상용 검색 사이트와 동일한 기능)
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);

  const wordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  // 검색 시 돋보기 아이콘 클릭 시 함수
  const onClickSearchIcon = () => {
    if (searchWord) {
      console.log(`${searchWord}이(가) 검색되었습니다.`);
      // API 요청 보내기
    } else {
      console.log("검색어를 입력하세요.");
    }
  };

  // 엔터 터치 시 검색 실행
  function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    // 모바일 환경에서도 enter 클릭했을 때 작동하는지 봐야함
    const word = searchWord;
    if (event.key === "Enter") {
      setAutocompleteVisible(false);
      console.log(`Enter 키를 눌러 ${word}을(를) 검색했습니다.`);
      // API 요청 보내기
    }
  }

  // 초기화면에서 자동완성 태그 숨기기
  const hideAutocomplete = () => {
    setAutocompleteVisible(false);
  };

  // 탭 써치 작업하면서 넣은 것들 (5.10 ~ )
  const onClickXIcon = () => {
    setSearchWord("");
  };
  return (
    <Layout>
      <InputContainer>
        <SInput onChange={wordChange} value={searchWord} />
        <SRxCross2 onClick={onClickXIcon} />
      </InputContainer>
    </Layout>
  );
};

export default Search;

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.3rem;
  margin-top: 3vw;
  overflow: auto;
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const SInput = styled.input`
  width: 80vw;
  height: 4vw;
  outline: none;
  box-shadow: none;
  border: none;
  border-radius: 7px;
  margin: 2vw;
  padding: 0.5rem 0.7rem;
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  color: ${({ theme }) => theme.netflix.fontColor};
  background-color: ${({ theme }) => theme.netflix.backgroundColor};

  ::placeholder {
    color: #adadad;
  }
`;

const SRxCross2 = styled(RxCross2)`
  position: absolute;
  left: 87%;
  width: 5vw;
  height: 5vw;
`;

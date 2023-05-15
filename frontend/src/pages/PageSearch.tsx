import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { AiOutlineLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import { content } from "interface/content";

import logoImg from "assets/img/logo.png";
import ContentPoster from "components/common/ContentPoster";

const PageSearch = () => {
  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState<string>("");
  const [autocompleteWords, setAutocompleteWords] = useState<string[] | null>([
    "고병진은 살아있다",
    "고병진 프리즌 브레이크",
    "나는 내일 어제의 고병진과 만난다",
    "고병진스 :: 인피니트 워",
    "6시 내 고병진",
    "내 머릿속의 고병진",
  ]);
  // 검색 했는지 여부 state
  const [isResult, setIsResult] = useState<boolean>(false);
  // 검색 결과에 컨텐츠 존재하는지 여부 state
  const [searchResult, setSearchResult] = useState<content[]>([
    {
      pk: 1,
      title: "더 글로리",
      runtime: 50, // 분 단위로 해서 보내주세요 (1시간 20분 -> 80)
      rate: 4.5, // 없을시 0
      img_path: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1", // 없을 시 빈 string ''
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
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
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
      backdropPath: "https://images.justwatch.com/poster/302518136/s592/시즌-1",
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

  const onClickXIcon = () => {
    setSearchWord("");
  };

  // 자동완성 텍스트 (돋보기 icon 포함) 클릭했을 때 검색 실행
  const onClickSearchAutoComplete = (word: string) => {
    setAutocompleteVisible(false);
    setIsResult(true);
    console.log(`${word}이(가) 검색되었습니다.`);
    // API 요청 보내기
  };

  // 엔터 터치 시 검색 실행
  function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    // 모바일 환경에서도 enter 클릭했을 때 작동하는지 봐야함
    const word = searchWord;
    if (event.key === "Enter") {
      setAutocompleteVisible(false);
      setIsResult(true);
      console.log(`Enter 키를 눌러 ${word}을(를) 검색했습니다.`);
      // API 요청 보내기
    }
  }

  // 초기화면에서 자동완성 태그 숨기기
  const hideAutocomplete = () => {
    setAutocompleteVisible(false);
  };

  // 해당 이벤트 학습 필요
  // onTouchStart
  // onTouchEnd
  // onKeyPress

  useEffect(() => {
    let appBar = document.getElementById("app-bar");
    let appBarMargin = document.getElementById("app-bar-margin");
    let searchLayout = document.getElementById("search-layout");
    if (autocompleteVisible || isResult) {
      if (appBar) {
        appBar.style.display = "none";
        appBar.style.position = "absolute";
      }
      if (appBarMargin) {
        appBarMargin.style.marginTop = "0";
      }
      if (searchLayout) {
        searchLayout.style.height = "96vh";
      }
    } else {
      if (appBar) {
        appBar.style.display = "block";
        appBar.style.position = "sticky";
      }
      if (appBarMargin) {
        appBarMargin.style.marginTop = "5vh";
      }
      if (searchLayout) {
        searchLayout.style.height = "91vh";
      }
    }
    return () => {
      if (appBar) {
        appBar.style.display = "block";
        appBar.style.position = "sticky";
      }
      if (appBarMargin) {
        appBarMargin.style.marginTop = "5vh";
      }
      if (searchLayout) {
        searchLayout.style.height = "91vh";
      }
    };
  }, [autocompleteVisible]);

  return (
    <Slayout
      id="search-layout"
      onClick={hideAutocomplete}
      onScroll={() => {
        const searchInput = document.getElementById("search-input");
        searchInput?.blur();
      }}
    >
      {!autocompleteVisible ? (
        isResult ? (
          // 검색 결과 창
          <>
            <InputContainer>
              <SAiOutlineLeft
                onClick={() => {
                  setAutocompleteVisible(false);
                  setIsResult(false);
                }}
              />
              <SInput
                // onFocus={() => setAutocompleteVisible(true)} 웹에서 사용시 사용할 event
                // onFocus={() => setAutocompleteVisible(true)}
                // onTouchStart={() => setAutocompleteVisible(true)}
                onKeyPress={(e) => onKeyPress(e)}
                onClick={(e) => {
                  e.stopPropagation();
                  setAutocompleteVisible(true);
                }}
                onChange={wordChange}
                // placeholder="찾고자 하는 컨텐츠 제목을 입력하세요."
                value={searchWord}
              />
              {searchWord ? (
                // 검색 결과 존재할 경우
                <SRxCross2
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickXIcon();
                  }}
                />
              ) : (
                // 검색 결과 없을 경우
                <SBsSearch2
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickSearchIcon();
                  }}
                />
              )}
            </InputContainer>
            <SHr />
            {searchResult.length > 0 ? (
              <>
                <SSearchLengthDiv>총 {searchResult.length}개의 컨텐츠</SSearchLengthDiv>
                <ContentsContainer>
                  {searchResult.map((content, idx) => (
                    <ContentContainer>
                      <ContentPoster
                        content={searchResult[idx]}
                        key={idx}
                        title={content.title}
                        imageUrl={content.img_path}
                      />
                    </ContentContainer>
                  ))}
                </ContentsContainer>
              </>
            ) : (
              <SNoResultDIV>
                <div>검색 결과가 존재하지 않습니다.</div>
              </SNoResultDIV>
            )}
          </>
        ) : (
          // 초기 검색 창
          <>
            <SLogoImg src={logoImg}></SLogoImg>
            <SearchContainer>
              <SSearch
                onClick={(e) => {
                  e.stopPropagation();
                  setAutocompleteVisible(true);
                  setTimeout(() => {
                    const searchInput = document.getElementById("search-input");
                    searchInput?.focus();
                  }, 0);
                }}
              />
              <SBsSearch
                onClick={(e) => {
                  e.stopPropagation();
                  setAutocompleteVisible(true);
                }}
              />
            </SearchContainer>
          </>
        )
      ) : (
        <>
          <InputContainer>
            <SAiOutlineLeft
              onClick={() => {
                setAutocompleteVisible(false);
                setIsResult(false);
              }}
            />
            <SInput
              id="search-input"
              // onFocus={() => setAutocompleteVisible(true)} 웹에서 사용시 사용할 event
              // onFocus={() => setAutocompleteVisible(true)}
              // onTouchStart={() => setAutocompleteVisible(true)}
              onKeyPress={(e) => onKeyPress(e)}
              onClick={(e) => {
                e.stopPropagation();
                setAutocompleteVisible(true);
              }}
              onChange={wordChange}
              // placeholder="찾고자 하는 컨텐츠 제목을 입력하세요."
              value={searchWord}
            />
            {searchWord ? (
              <SRxCross2
                onClick={(e) => {
                  e.stopPropagation();
                  onClickXIcon();
                }}
              />
            ) : (
              <SBsSearch2
                onClick={(e) => {
                  e.stopPropagation();
                  onClickSearchIcon();
                }}
              />
            )}
          </InputContainer>
          <SHr />
        </>
      )}

      {autocompleteVisible && (
        <SAutoContainer>
          {autocompleteWords &&
            autocompleteWords.map((word, idx) => (
              <SAutoCompleteDiv
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchWord(word);
                  onClickSearchAutoComplete(word);
                }}
              >
                <SIconWrapper>
                  <SBsSearch3 />
                </SIconWrapper>

                <SP>{word.length > 70 ? `${word.slice(0, 70)}...` : word}</SP>
              </SAutoCompleteDiv>
            ))}
        </SAutoContainer>
      )}
    </Slayout>
  );
};

export default PageSearch;

const Slayout = styled.div`
  height: 91vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const SLogoImg = styled.img`
  width: 45vw;
  height: 29vw;
  margin-top: 20vw;
  margin-bottom: 5vw;
`;

const SearchContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const SAiOutlineLeft = styled(AiOutlineLeft)`
  width: 5vw;
  height: 5vw;
`;

const SBsSearch = styled(BsSearch)`
  position: absolute;
  top: 22%;
  left: 7%;
  width: 5vw;
  height: 5vw;
`;

const SBsSearch2 = styled(BsSearch)`
  width: 4.5vw;
  height: 4.5vw;
`;

const SIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5vw;
`;

const SBsSearch3 = styled(BsSearch)`
  width: 4.5vw;
  height: 4.5vw;
`;

const SRxCross2 = styled(RxCross2)`
  width: 5vw;
  height: 5vw;
`;

const SSearch = styled.input`
  background-color: #403d3d;
  border-radius: 15px;
  width: 85vw;
  height: 5vw;
  border: 1px solid white;
  outline: none;
  margin: 0 0.7rem;
  padding: 0.5rem 0.7rem;
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  color: ${({ theme }) => theme.netflix.fontColor};

  ::placeholder {
    color: #adadad;
  }
`;

const SInput = styled.input`
  width: 75vw;
  height: 5vw;
  outline: none;
  box-shadow: none;
  border: none;
  margin: 0.5rem;
  padding: 0.5rem 0.7rem;
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  color: ${({ theme }) => theme.netflix.fontColor};
  background-color: ${({ theme }) => theme.netflix.backgroundColor};

  ::placeholder {
    color: #adadad;
  }
`;

const SHr = styled.hr`
  width: 94vw;
  margin: 0;
`;

const SAutoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SAutoCompleteDiv = styled.div`
  display: flex;
  width: 80vw;
  text-align: center;
  // border-color: rgba(248, 79, 90, 0.4);
  // border-radius: 1rem;
  // box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  z-index: 3;
`;

const SP = styled.p`
  display: flex;
  font-size: 14px;
  color: white;
  cursor: pointer;
`;

const SNoResultDIV = styled.div`
  display: flex;
  align-items: center;

  height: 80%;
  font-size: 5vw;
`;

const SSearchLengthDiv = styled.div`
  font-size: 5vw;
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
`;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5vw;

  margin-top: 3vh;
`;

const ContentContainer = styled.div`
  width: 40vw;
`;

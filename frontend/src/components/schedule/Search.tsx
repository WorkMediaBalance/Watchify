import React, { useState, useRef, HTMLAttributes } from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";

import { content } from "interface/content";

import { essListState } from "recoil/userState";
import { useRecoilState } from "recoil";

import { RxCross2 } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";

import { FiCheckCircle } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // recoil state
  const [essList, setEssList] = useRecoilState(essListState);

  // 실제 검색 단어
  const [searchWord, setSearchWord] = useState<string>("");
  // 검색창 focus시 div가 나오게 함. div에는 최근 검색어와 자동완성 표출
  // 검색창 외부를 클릭 시 위의 div가 사라짐 (상용 검색 사이트와 동일한 기능)
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);

  const [autocompleteWords, setAutocompleteWords] = useState<string[] | null>([
    "6시 내 고병진",
    "고병진 프리즌 브레이크",
    "나는 내일 어제의 고병진과 만난다",
    "내 머릿속의 고병진",
  ]);
  // 검색 결과 (존재할 경우)
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

  const wordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  // 탭 써치 작업하면서 넣은 것들 (5.10 ~ )
  //////////////////////////////////////////////////////////
  const onClickXIcon = () => {
    setSearchWord("");
  };

  const onClickSearchAutoComplete = (word: string) => {
    setAutocompleteVisible(false);
    console.log(`${word}이(가) 검색되었습니다.`);
    // API 요청 보내기
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

  // X아이콘 클릭했을 때 그대로 input 태그에 focus가 활성화되게 해주는 함수
  const onClickInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onClickAddContent = (content: content) => {
    let copy = [...essList];
    copy = [...copy, content];
    setEssList(copy);
  };

  return (
    <Layout>
      <InputContainer>
        <SInput
          value={searchWord}
          ref={inputRef}
          onChange={wordChange}
          onKeyPress={(e) => onKeyPress(e)}
          onClick={() => {
            setAutocompleteVisible(true);
          }}
        />
        <SRxCross2
          onClick={() => {
            onClickXIcon();
            onClickInputFocus();
          }}
        />
      </InputContainer>
      {/* 검색 중 자동완성 부분 */}
      {autocompleteVisible && (
        <SAutoContainer>
          {autocompleteWords &&
            autocompleteWords.map((autoWord, idx) => (
              <SAutoCompleteDiv
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchWord(autoWord);
                  onClickSearchAutoComplete(autoWord);
                }}
              >
                <SIconWrapper>
                  <SBsSearch3 />
                </SIconWrapper>
                <SP>{autoWord.length > 70 ? `${autoWord.slice(0, 70)}...` : autoWord}</SP>
              </SAutoCompleteDiv>
            ))}
        </SAutoContainer>
      )}
      {/* 검색 결과 부분 */}
      {!autocompleteVisible && (
        <SSearchResultDiv>
          {searchResult.length > 0 ? (
            <>
              {/* <SSearchLengthDiv>총 {searchResult.length}개의 컨텐츠</SSearchLengthDiv> */}
              {searchResult.map((content, idx) => {
                const isAlready = essList.some((ess) => ess.pk === content.pk);
                return (
                  <SContentsContainer key={idx}>
                    <SBoxContainer>
                      <SContent imgUrl={content.img_path} />
                    </SBoxContainer>
                    <S1DepthContainer>
                      <S2DepthContainer>
                        <S3DepthContainer>
                          <STitleDiv>{content.title}</STitleDiv>
                          {content.finalEpisode > 0 ? <div>{content.finalEpisode}부작</div> : null}
                        </S3DepthContainer>
                        {isAlready ? (
                          <SFiCheckCircle />
                        ) : (
                          <SBsPlusCircle onClick={() => onClickAddContent(content)} />
                        )}
                      </S2DepthContainer>

                      <SSumDiv>{content.summarize}</SSumDiv>
                    </S1DepthContainer>
                  </SContentsContainer>
                );
              })}
            </>
          ) : (
            <SNoResultDIV>
              <div>검색 결과가 존재하지 않습니다.</div>
            </SNoResultDIV>
          )}
        </SSearchResultDiv>
      )}
    </Layout>
  );
};

export default Search;

const SSearchResultDiv = styled.div`
  display: flex-column;
  justify-content: center;
`;

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

const SIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5vw;
`;

const SBsSearch3 = styled(BsSearch)`
  width: 4.5vw;
  height: 4.5vw;
`;

const SNoResultDIV = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 10%;

  width: 100vw;
  height: 80%;
  font-size: 5vw;
`;

// 기존 wishList에서 가져온 태그들 (검색결과 띄우기 용)
const SFiCheckCircle = styled(FiCheckCircle)`
  width: 1.5rem;
  height: 1.5rem;
`;

const SBsPlusCircle = styled(BsPlusCircle)`
  color: ${({ theme }) => theme.netflix.pointColor};
  width: 1.5rem;
  height: 1.5rem;
`;

const SContentsContainer = styled.div`
  display: flex;
`;

const S1DepthContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;
`;
const S2DepthContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const S3DepthContainer = styled.div`
  width: 60vw;
`;

const STitleDiv = styled.div`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
`;

const SSumDiv = styled.div`
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
`;

interface SContentProps extends HTMLAttributes<HTMLDivElement> {
  imgUrl?: string;
}

const SContent = styled.div`
  background-image: url(${({ imgUrl }: SContentProps) => imgUrl});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 10px;
  margin: 0 0.5rem;
  width: 25vw;
  height: 35vw;
`;

const SBoxContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

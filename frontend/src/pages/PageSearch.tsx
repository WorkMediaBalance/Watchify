import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { AiOutlineLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import { content } from "interface/content";

import { searchResult } from "apis/apiSearch";

import logoImg from "assets/WatchifyLogo2.png";
import ContentPoster from "components/common/ContentPoster";
import { getRegExp } from "korean-regexp";

import titleJson from "./../assets/titles.json";
import spinner from "./../assets/gif/93297-simple-spinner.json";

import Lottie from "lottie-react";

const PageSearch = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTitles(titleJson);
  }, []);

  const [searchWord, setSearchWord] = useState<string>("");
  const [autocompleteWords, setAutocompleteWords] = useState<string[] | null>([]);
  // 검색 했는지 여부 state
  const [isResult, setIsResult] = useState<boolean>(false);
  // 검색 결과에 컨텐츠 존재하는지 여부 state
  const [searchResultData, setSearchResultData] = useState<content[]>([]);

  // 검색창 focus시 div가 나오게 함. div에는 최근 검색어와 자동완성 표출
  // 검색창 외부를 클릭 시 위의 div가 사라짐 (상용 검색 사이트와 동일한 기능)
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);

  const wordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetWord = getRegExp(e.target.value, {
      initialSearch: true,
      startsWith: false,
      endsWith: false,
      ignoreSpace: true,
      ignoreCase: false,
      global: true,
    });

    let suggestion = [];
    suggestion = titles.filter((title) => {
      return targetWord.test(title);
    });
    let uniqueArray = [...new Set(suggestion)];

    setAutocompleteWords(uniqueArray.slice(0, 9));
    setSearchWord(e.target.value);
  };

  // 검색 시 돋보기 아이콘 클릭 시 함수
  const onClickSearchIcon = () => {
    if (searchWord) {
      // API 요청 보내기
      searchResultAPI(searchWord);
    } else {
    }
  };

  const onClickXIcon = () => {
    setSearchWord("");
  };

  // 자동완성 텍스트 (돋보기 icon 포함) 클릭했을 때 검색 실행
  const onClickSearchAutoComplete = (word: string) => {
    setAutocompleteVisible(false);
    setIsResult(true);

    // API 요청 보내기
    searchResultAPI(word);
  };

  // 엔터 터치 시 검색 실행
  function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    // 모바일 환경에서도 enter 클릭했을 때 작동하는지 봐야함
    const word = searchWord;
    if (event.key === "Enter") {
      setAutocompleteVisible(false);
      setIsResult(true);

      // API 요청 보내기
      searchResultAPI(word);
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
        searchLayout.style.minHeight = "96vh";
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
        searchLayout.style.minHeight = "91vh";
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
        searchLayout.style.minHeight = "91vh";
      }
    };
  }, [autocompleteVisible]);

  const [isLoading, setIsLoading] = useState(false);

  async function searchResultAPI(word: string) {
    const searchInput = document.getElementById("search-input");
    if (searchInput !== null) {
      searchInput.blur();
    }
    setIsLoading(true);
    const searchedWordResult = await searchResult(word);

    setSearchResultData(searchedWordResult);
    setIsLoading(false);
  }

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
                onKeyUp={(e) => onKeyPress(e)}
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
            {isLoading ? (
              <div
                style={{
                  height: "70vh",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Lottie animationData={spinner} />
              </div>
            ) : searchResultData && searchResultData.length > 0 ? (
              <>
                <div
                  style={{
                    width: "95%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <SSearchLengthDiv>
                    총 <OrangeSpan>{searchResultData.length}</OrangeSpan> 개의 컨텐츠
                  </SSearchLengthDiv>
                </div>
                <ContentsContainer>
                  {searchResultData.map((content, idx) => (
                    <PosterWrapper>
                      <ContentContainer>
                        <ContentPoster
                          content={content}
                          key={idx}
                          title={content.title}
                          imageUrl={content.imgPath}
                        />
                      </ContentContainer>
                      <TitleDiv>{content.title}</TitleDiv>
                    </PosterWrapper>
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
              onKeyUp={(e) => onKeyPress(e)}
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
  min-height: 91vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const SLogoImg = styled.img`
  width: auto;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin-top: 10vh;
`;

const SSearchLengthDiv = styled.div`
  font-size: 5vw;
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  margin: 3vw;
`;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5vw;
`;

const ContentContainer = styled.div`
  width: 40vw;
`;

const OrangeSpan = styled.span`
  color: ${({ theme }) => theme.netflix.lightColor};
`;

const TitleDiv = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const PosterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  text-align: center;
`;

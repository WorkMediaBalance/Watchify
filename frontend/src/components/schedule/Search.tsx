import React, { useState, useRef, HTMLAttributes, useEffect } from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";

import { content } from "interface/content";

import { essListState } from "recoil/userState";
import { useRecoilState } from "recoil";

import { RxCross2 } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";

import { FiCheckCircle } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";

import { searchResult } from "apis/apiSearch";
import ContentPoster from "components/common/ContentPoster";
import { getRegExp } from "korean-regexp";
import titleJson from "../../assets/titles.json";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [titles, setTitles] = useState<string[]>([]);
  useEffect(() => {
    setTitles(titleJson);
  }, []);

  // recoil state
  const [essList, setEssList] = useRecoilState(essListState);

  // 실제 검색 단어
  const [searchWord, setSearchWord] = useState<string>("");
  // 검색창 focus시 div가 나오게 함. div에는 최근 검색어와 자동완성 표출
  // 검색창 외부를 클릭 시 위의 div가 사라짐 (상용 검색 사이트와 동일한 기능)
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);

  const [autocompleteWords, setAutocompleteWords] = useState<string[] | null>([]);
  // 검색 결과 (존재할 경우)
  const [searchResultData, setSearchResultData] = useState<content[]>([]);

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

    setAutocompleteWords(uniqueArray.slice(0, 5));
    setSearchWord(e.target.value);
  };

  // 탭 써치 작업하면서 넣은 것들 (5.10 ~ )
  //////////////////////////////////////////////////////////
  const onClickXIcon = () => {
    setSearchWord("");
  };

  const onClickSearchAutoComplete = (word: string) => {
    setAutocompleteVisible(false);

    searchResultAPI(word);
    // API 요청 보내기
  };

  // 엔터 터치 시 검색 실행
  function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    // 모바일 환경에서도 enter 클릭했을 때 작동하는지 봐야함
    const word = searchWord;
    if (event.key === "Enter") {
      setAutocompleteVisible(false);

      // API 요청 보내기
      searchResultAPI(word);
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

  // 검색 Axios 요청
  async function searchResultAPI(word: string) {
    const searchedWordResult = await searchResult(word);

    setSearchResultData(searchedWordResult);
  }
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
          {searchResultData && searchResultData.length > 0 ? (
            <>
              {/* <SSearchLengthDiv>총 {searchResultData.length}개의 컨텐츠</SSearchLengthDiv> */}
              {searchResultData.map((content, idx) => {
                const isAlready = essList.some((ess) => ess.pk === content.pk);
                return (
                  <SContentsContainer key={idx}>
                    <SBoxContainer>
                      <SContent>
                        <ContentPoster
                          content={content}
                          title={content.title}
                          imageUrl={content.imgPath}
                        />
                      </SContent>
                    </SBoxContainer>
                    <S1DepthContainer>
                      <S2DepthContainer>
                        <S3DepthContainer>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <STitleDiv className="STitleDiv">{content.title}</STitleDiv>
                            {isAlready ? (
                              <SFiCheckCircle />
                            ) : (
                              <SBsPlusCircle
                                onClick={() => onClickAddContent(content)}
                                className="SBsPlusCircle"
                              />
                            )}
                          </div>
                          {content.finalEpisode > 0 ? <div>{content.finalEpisode}부작</div> : null}
                        </S3DepthContainer>
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
      <PlaceHolder />
    </Layout>
  );
};

export default Search;

const PlaceHolder = styled.div`
  height: 10vh;
`;

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
  padding-bottom: 0.2vh;
  width: 6vw;
  height: 6vw;
  color: ${({ theme }) => theme.netflix.pointColor};
`;

const SBsPlusCircle = styled(BsPlusCircle)`
  padding-bottom: 0.2vh;
  width: 6vw;
  height: 6vw;
`;

const SContentsContainer = styled.div`
  display: flex;
  margin: 3vw;
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
  width: 80%;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
`;

const SSumDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize}
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
  margin-top: 1vh;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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

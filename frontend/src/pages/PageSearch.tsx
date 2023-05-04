import React, { useState } from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { AiOutlineLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import logoImg from "assets/img/logo.png";

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
    console.log(`${word}이(가) 검색되었습니다.`);
    // API 요청 보내기
  };

  // 엔터 터치 시 검색 실행
  function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    // 모바일 환경에서도 enter 클릭했을 때 작동하는지 봐야함
    const word = searchWord;
    if (event.key === "Enter") {
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

  return (
    <Slayout onClick={hideAutocomplete}>
      {!autocompleteVisible ? (
        <>
          <SLogoImg src={logoImg}></SLogoImg>
          <SearchContainer>
            <SSearch
              onClick={(e) => {
                e.stopPropagation();
                setAutocompleteVisible(true);
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
      ) : (
        <>
          <InputContainer>
            <SAiOutlineLeft onClick={() => navigate("/search")} />
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
              <SAutoCompleteDiv key={idx} onClick={() => onClickSearchAutoComplete(word)}>
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
  height: 100vh;
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
  margin: 0 0.5rem;
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

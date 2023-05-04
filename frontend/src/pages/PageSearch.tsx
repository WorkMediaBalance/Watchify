import React, { useState } from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";

import { AiOutlineLeft } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

const PageSearch = () => {
  const [searchWord, setSearchWord] = useState<string>("");

  const wordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const onClickSearch = () => {
    if (searchWord) {
      console.log(searchWord);
    } else {
    }
  };

  // 해당 이벤트 학습 필요
  // onTouchStart
  // onTouchEnd
  // onKeyPress

  return (
    <Slayout>
      <SearchContainer>
        <SAiOutlineLeft />
        <SInput onChange={wordChange} placeholder="찾고자 하는 컨텐츠 제목을 입력하세요." />
        <SBsSearch onClick={() => onClickSearch()} />
      </SearchContainer>
    </Slayout>
  );
};

export default PageSearch;

const Slayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const SAiOutlineLeft = styled(AiOutlineLeft)`
  width: 1.5rem;
  height: 1.5rem;
`;

const SBsSearch = styled(BsSearch)`
  width: 1.5rem;
  height: 1.5rem;
`;

const SInput = styled.input`
  background-color: #403d3d;
  border-radius: 10px;
  width: 71vw;
  height: 5vw;
  border: none;
  outline: none;
  margin: 0 0.7rem;
  padding: 0.5rem 0.7rem;
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  color: ${({ theme }) => theme.netflix.fontColor};

  ::placeholder {
    color: #adadad;
  }
`;

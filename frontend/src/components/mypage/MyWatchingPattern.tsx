import React, { useState } from "react";
import styled from "styled-components";
import WatchingPattern from "components/common/WatchingPattern";

const FavoriteGenresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
  margin-left: 3vw;
`;

const FavoriteGenresTitle = styled.div`
  color: ${({ theme }) => theme.netflix.fontColor};
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-wight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
`;

const FavoriteGenres = styled.button`
  height: 4.5vh;
  color: ${({ theme }) => theme.netflix.tapColor};
  background-color: ${({ theme }) => theme.netflix.fontColor};
  border: transparent;
  border-radius: 12px;
  min-width: 15.5vw;
  font-size: 0.8rem;
  padding-left: 8px;
  padding-right: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.netflix.fontColor};
`;

const MyWatchingPattern = () => {
  const [genreList, setGenreList] = useState(["임시", "임시2", "임시3"]);
  return (
    <Container>
      <WatchingPattern />
      <FavoriteGenresTitle>선호 장르 목록</FavoriteGenresTitle>
      <FavoriteGenresContainer>
        {genreList.map((name: string) => {
          return <FavoriteGenres>{name}</FavoriteGenres>;
        })}
      </FavoriteGenresContainer>
    </Container>
  );
};

export default MyWatchingPattern;

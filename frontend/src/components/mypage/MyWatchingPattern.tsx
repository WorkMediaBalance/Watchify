import React, { useState } from "react";
import styled from "styled-components";
import WatchingPattern from "components/common/WatchingPattern";

const FavoriteGenresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
  margin-left: 3vw;
`;

const FavoriteGenres = styled.button`
  height: 4.5vh;
  color: ${({ theme }) => theme.netflix.tabColor};
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

const Title = styled.div`
  color: ${({ theme }) => theme.netflix.fontColor};
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  margin: 0.5rem;
`;

const MyWatchingPattern = () => {
  return (
    <Container>
      <div
        style={{ height: "45vh", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <WatchingPattern />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "90%" }}></div>
      </div>
    </Container>
  );
};

export default MyWatchingPattern;

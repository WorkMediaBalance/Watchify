import React, { useState } from "react";
import styled from "styled-components";
import Profile from "components/mypage/Profile";
import MyWatchingPattern from "components/mypage/MyWatchingPattern";
import HistoryTab from "components/mypage/HistoryTab";
import WishTab from "components/mypage/WishTab";
import CustomTabComponent from "components/common/tab/CustomTabComponent";

const PageMy = () => {
  const titleArray = ["시청 패턴", "히스토리", " 찜 목록"];
  const componentArray = [MyWatchingPattern, HistoryTab, WishTab];
  return (
    <Container>
      <Profile />
      <CustomTabComponent
        width={"100vw"}
        titleArray={titleArray}
        componentArray={componentArray}
        minHeight={"66vh"}
      />
    </Container>
  );
};

export default PageMy;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

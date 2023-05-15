import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Profile from "components/mypage/Profile";
import MyWatchingPattern from "components/mypage/MyWatchingPattern";
import HistoryTab from "components/mypage/HistoryTab";
import WishTab from "components/mypage/WishTab";
import MyInfoTab from "components/mypage/MyInfoTab";
import CustomTabComponent from "components/common/tab/CustomTabComponent";

import { mainSchedule } from "apis/apiMain";

const PageMy = () => {
  const titleArray = ["시청 패턴", "히스토리", " 찜 목록", "내 정보"];
  const componentArray = [MyWatchingPattern, HistoryTab, WishTab, MyInfoTab];
  return (
    <Container>
      <Profile />
      <CustomTabComponent
        width={"100vw"}
        titleArray={titleArray}
        componentArray={componentArray}
        minHeight={"66vh"}
        marginTop={"20vh"}
        top={"3vh"}
      />
    </Container>
  );
};

export default PageMy;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

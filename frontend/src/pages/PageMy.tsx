import React, { useState } from "react";
import styled from "styled-components";
import Profile from "components/mypage/Profile";
import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import MyWatchingPattern from "components/mypage/MyWatchingPattern";
import HistoryTab from "components/mypage/HistoryTab";
import WishTab from "components/mypage/WishTab";

const StyledTabs = styled(Tabs)`
  & .rb-tabs-item {
    width: 25%;
    // border-top: 0.5px solid ${({ theme }) => theme.netflix.fontColor};
    border-bottom: 0.5px solid ${({ theme }) => theme.netflix.fontColor};
    color: ${({ theme }) => theme.netflix.fontColor};
    font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize} !important;
    font-weight: ${({ theme }) =>
      theme.fontSizeType.middle.fontWeight} !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .activeTab {
    border-bottom: 1px solid ${({ theme }) => theme.netflix.pointColor};
  }

  & .active {
    color: ${({ theme }) => theme.netflix.pointColor};
    font-weight: bold;
  }
`;
const StyledTab = styled(Tab)`
  overflow: "auto";
`;

const PageMy = () => {
  const [tab, setTab] = useState(1);
  return (
    <div>
      <Profile />
      <div id="tabs" style={{ marginTop: "2vh" }}>
        <StyledTabs
          activeTab={1}
          className=""
          ulClassName=""
          activityClassName="activeTab"
          onClick={(event, tab) => setTab(tab)}
        >
          <StyledTab title="시청 패턴">
            <MyWatchingPattern />
          </StyledTab>
          <StyledTab title="히스토리">
            <HistoryTab />
          </StyledTab>
          <StyledTab title="찜 목록">
            <WishTab />
          </StyledTab>
          <StyledTab title="내 정보"></StyledTab>
        </StyledTabs>
      </div>
    </div>
  );
};

export default PageMy;

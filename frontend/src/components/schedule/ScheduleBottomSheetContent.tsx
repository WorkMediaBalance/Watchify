import React, { useState } from "react";
import styled from "styled-components";

import Tabs, { Tab } from "react-best-tabs";

import WishList from "./WishList";
import RecList from "./RecList";
import Search from "./Search";

const ScheduleBottomSheetContent = () => {
  const [tab, setTab] = useState(1);
  return (
    <>
      <SCategoryContainer>
        <StyledTabs
          activeTab={1}
          className=""
          ulClassName=""
          activityClassName="activeTab"
          onClick={(event, tab) => setTab(tab)}
        >
          <StyledTab title="찜 목록">
            <WishList tab={tab} />
          </StyledTab>
          <StyledTab title="추천 목록">
            <RecList tab={tab} />
          </StyledTab>
          <StyledTab title="검색">
            <Search tab={tab} />
          </StyledTab>
        </StyledTabs>
      </SCategoryContainer>
    </>
  );
};

export default ScheduleBottomSheetContent;

const SCategoryContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.8rem;
`;

const StyledTabs = styled(Tabs)`
  & .rb-tabs-item {
    width: 25vw;
    // border-top: 0.5px solid ${({ theme }) => theme.netflix.fontColor};
    // border-bottom: 0.5px solid ${({ theme }) => theme.netflix.fontColor};
    color: ${({ theme }) => theme.netflix.fontColor};
    font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize} !important;
    font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight} !important;
    display: flex;
    justify-content: space-evenly;
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
const StyledTab = styled(Tab)``;

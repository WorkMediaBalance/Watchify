import React, { useState } from "react";
import styled from "styled-components";

import CustomTabComponent from "components/common/tab/CustomTabComponent";

import WishList from "./WishList";
import RecList from "./RecList";
import Search from "./Search";

const ScheduleBottomSheetContent = () => {
  const titleArray = ["찜 목록", "추천 목록", "검색"];
  const componentArray = [WishList, RecList, Search];

  return (
    <div className={"customTabComponent"}>
      <CustomTabComponent
        titleArray={titleArray} // 탭 제목 리스트
        componentArray={componentArray} // 탭 제목 순과 같은 순서로 틀어줄 컴포넌트
        width={"100vw"} // 전체 탭 길이
        minHeight={"10vh"} // 컨텐츠의 최소길이
        marginTop={"-3vh"} // 위에서 부터의 마진 조절
        top={"3vh"} // 탭바와 컨텐츠 사이의 거리 조절
      ></CustomTabComponent>
    </div>
  );
};

export default ScheduleBottomSheetContent;

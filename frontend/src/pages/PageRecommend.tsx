import React from "react";
import styled from "styled-components";
import RecBottomSheet from "../components/recommend/RecBottomSheet";

const BaseDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #232323;
`;

const PageRecommend = () => {
  return (
    <BaseDiv>
      <RecBottomSheet />
    </BaseDiv>
  );
};
export default PageRecommend;

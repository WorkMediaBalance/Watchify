import React from "react";
import styled from "styled-components";

import CalendarBottomSheetFirst from "./CalendarBottomSheetFirst";

const SDiv = styled.div`
  width: 100vw;
  height: 30vh;
  color: ${({ theme }) => theme.netflix.fontColor};
`;

const CalendarBottomSheetContent = (props: { date: string }) => {
  return (
    <SDiv>
      <CalendarBottomSheetFirst></CalendarBottomSheetFirst>;
    </SDiv>
  );
};

export default CalendarBottomSheetContent;

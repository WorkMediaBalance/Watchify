import React from "react";
import styled from "styled-components";

import CalendarBottomSheetFirst from "./CalendarBottomSheetFirst";

const SDiv = styled.div`
  width: 100vw;
  height: 30vh;
  color: ${({ theme }) => theme.netflix.fontColor};
`;

const CalendarBottomSheetContent = (props: { date: number; month: number }) => {
  return (
    <SDiv>
      <CalendarBottomSheetFirst date={props.date} month={props.month}></CalendarBottomSheetFirst>;
    </SDiv>
  );
};

export default CalendarBottomSheetContent;

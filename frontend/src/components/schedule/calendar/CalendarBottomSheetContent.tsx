import React from "react";
import styled from "styled-components";

import CalendarBottomSheetFirst from "./CalendarBottomSheetFirst";
import CalendarBottomSheetSecond from "./CalendarBottomSheetSecond";

const SDiv1 = styled.div`
  width: 100vw;

  color: ${({ theme }) => theme.netflix.fontColor};
`;
const SDiv2 = styled.div`
  width: 100vw;
  color: ${({ theme }) => theme.netflix.fontColor};
`;

const CalendarBottomSheetContent = (props: {
  date: number;
  month: number;
  year: number;
  sheetDepth: number;
}) => {
  return (
    <div>
      {props.sheetDepth === 1 ? (
        <SDiv1>
          <CalendarBottomSheetFirst
            date={props.date}
            month={props.month}
            year={props.year}
          ></CalendarBottomSheetFirst>
        </SDiv1>
      ) : (
        <SDiv2>
          <CalendarBottomSheetSecond date={props.date} month={props.month} />
        </SDiv2>
      )}
    </div>
  );
};

export default CalendarBottomSheetContent;

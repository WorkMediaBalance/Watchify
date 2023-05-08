import React from "react";
import styled from "styled-components";

const SDiv = styled.div`
  color: #ffffff;
`;

const CalendarBottomSheetContent = (props: { date: string }) => {
  return <SDiv>{props.date}</SDiv>;
};

export default CalendarBottomSheetContent;

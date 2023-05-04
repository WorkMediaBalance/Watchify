import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import Calendar from "components/schedule/calendar/Calendar";
import CalendarBottomSheet from "components/schedule/calendar/CalendarBottomSheet";

const Wrapper = styled.div`
  height: 91vh;
  width: 100vw;
  background-color: ${theme.netflix.backgroundColor};
`;

const PageScheduleResult = () => {
  return (
    <Wrapper>
      <Calendar onDateClick={() => {}} />
      <CalendarBottomSheet />
    </Wrapper>
  );
};

export default PageScheduleResult;

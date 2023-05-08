import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import Calendar from "components/schedule/calendar/Calendar";
import CalendarBottomSheet from "components/schedule/calendar/CalendarBottomSheet";
import useTwoDepthBottomSheet from "hooks/twoDepthBottomSheet";

const Wrapper = styled.div`
  height: 91vh;
  width: 100vw;
  background-color: ${theme.netflix.backgroundColor};
`;

const PageScheduleResult = () => {
  const [sheet, setSheet] = useState(0);

  return (
    <Wrapper>
      <Calendar
        onDateClick={() => {
          setSheet(1);
        }}
      />
      <CalendarBottomSheet sheet={sheet} />
    </Wrapper>
  );
};

export default PageScheduleResult;

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
  const [depth, setDepth] = useState<number>(0);

  return (
    <Wrapper>
      <Calendar
        onDateClick={() => {
          setDepth(1);
        }}
      />
      <CalendarBottomSheet
        depth={depth}
        onClose={() => {
          setDepth(depth - 1);
        }}
      />
    </Wrapper>
  );
};

export default PageScheduleResult;

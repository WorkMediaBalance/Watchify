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
  const [sheet, setSheet] = useState(0);
  const [date, setDate] = useState("");
  const [close, setClose] = useState(0);

  return (
    <Wrapper>
      <Calendar
        onDateClick={(date: string) => {
          setSheet(sheet + 1);
          setDate(date);
        }}
        onCloseSheet={() => {
          setClose(close + 1);
        }}
      />
      <CalendarBottomSheet close={close} date={date} sheet={sheet} />
    </Wrapper>
  );
};

export default PageScheduleResult;

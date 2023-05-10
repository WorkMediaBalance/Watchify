import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import Calendar from "components/schedule/calendar/Calendar";
import CalendarBottomSheet from "components/schedule/calendar/CalendarBottomSheet";

// month 스케줄 state
import { monthScheduleState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";

const Wrapper = styled.div`
  height: 91vh;
  width: 100vw;
  background-color: ${theme.netflix.backgroundColor};
`;

const PageScheduleResult = () => {
  const [sheet, setSheet] = useState(0);
  const [month, setMonth] = useState(1);
  const [date, setDate] = useState(1);
  const [close, setClose] = useState(0);

  // month 스케줄
  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);

  return (
    <Wrapper>
      <Calendar
        onDateClick={(date: number, month: number) => {
          setSheet(sheet + 1);
          setMonth(month);
          setDate(date);
        }}
        onCloseSheet={() => {
          setClose(close + 1);
        }}
      />
      <CalendarBottomSheet close={close} date={date} month={month} sheet={sheet} />
    </Wrapper>
  );
};

export default PageScheduleResult;

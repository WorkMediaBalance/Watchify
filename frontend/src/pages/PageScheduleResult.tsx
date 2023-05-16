import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import Calendar from "components/schedule/calendar/Calendar";
import CalendarBottomSheet from "components/schedule/calendar/CalendarBottomSheet";
import { useNavigate, useLocation } from "react-router-dom";
// month 스케줄 state
import { monthScheduleState, scheduleAllState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";
import { scheduleInfo } from "apis/apiSchedule";

const Wrapper = styled.div`
  height: 91vh;
  width: 100vw;
  background-color: ${theme.netflix.backgroundColor};
`;

const PageScheduleResult = () => {
  const navigate = useNavigate();
  const [sheet, setSheet] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState(1);
  const [close, setClose] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());

  // 전체 스케줄
  const [scheduleAll, setScheduleAll] = useRecoilState(scheduleAllState);

  // month 스케줄
  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);
  const getMonthSchedule = async () => {
    try {
      console.log(`${year}년 ${month}월 스케줄 정보 받아오기`);
      const data = await scheduleInfo(year, month);
      setMonthSchedule(data);
      console.log(data);
    } catch {}
  };
  useEffect(() => {
    getMonthSchedule();
  }, [month]);

  const [bottomSheetState, setBottomSheetState] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const routerMonth = location.state?.month;
    const routerDate = location.state?.date;
    if (routerMonth !== undefined && routerDate !== undefined) {
      setMonth(routerMonth);
      setDate(routerDate);
      setSheet(1);
    }
  }, []);

  return (
    <Wrapper>
      <Calendar
        onDateClick={(date: number, month: number, year: number) => {
          setSheet(sheet + 1);
          setMonth(month);
          setDate(date);
          setYear(year);
        }}
        onCloseSheet={() => {
          setClose(close + 1);
        }}
        bottomSheetState={bottomSheetState}
        monthSchedule={monthSchedule}
        setMonthSchedule={setMonthSchedule}
        setMonth={setMonth}
      />

      <CalendarBottomSheet
        close={close}
        date={date}
        month={month}
        year={year}
        sheet={sheet}
        setMonthSchedule={setMonthSchedule}
        setBottomSheetState={setBottomSheetState}
      />
    </Wrapper>
  );
};

export default PageScheduleResult;

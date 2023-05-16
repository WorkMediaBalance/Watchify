import React, { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import Calendar from "components/schedule/calendar/Calendar";
import CalendarBottomSheet from "components/schedule/calendar/CalendarBottomSheet";
import { useNavigate, useLocation } from "react-router-dom";
// month 스케줄 state
import { monthScheduleState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";

const Wrapper = styled.div`
  height: 91vh;
  width: 100vw;
  background-color: ${theme.netflix.backgroundColor};
`;

const PageScheduleResult = () => {
  const navigate = useNavigate();
  const [sheet, setSheet] = useState(0);
  const [month, setMonth] = useState(1);
  const [date, setDate] = useState(1);
  const [close, setClose] = useState(0);

  // month 스케줄
  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);

  // 바텀시트 위치 구하기
  const bottomSheetRef = useRef<HTMLTableElement>(null);

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
      {/* 스케줄 다시 추천 받기 (5.12 민혁 추가) */}
      <button onClick={() => navigate("/schedule")}>스케줄 다시 만들기 버튼</button>
      <Calendar
        onDateClick={(date: number, month: number) => {
          setSheet(sheet + 1);
          setMonth(month);
          setDate(date);
        }}
        onCloseSheet={() => {
          setClose(close + 1);
        }}
        bottomSheetState={bottomSheetState}
      />

      <CalendarBottomSheet
        close={close}
        date={date}
        month={month}
        sheet={sheet}
        setBottomSheetState={setBottomSheetState}
      />
    </Wrapper>
  );
};

export default PageScheduleResult;

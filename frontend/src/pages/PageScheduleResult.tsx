import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import Calendar from "components/schedule/calendar/Calendar";
import CalendarBottomSheet from "components/schedule/calendar/CalendarBottomSheet";
import { useNavigate } from "react-router-dom";
// month 스케줄 state
import { monthScheduleState } from "recoil/scheduleState";
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

  // month 스케줄
  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);
  const getMonthSchedule = async () => {
    try {
      const data = await scheduleInfo(year, month);
      console.log(data);
      setMonthSchedule(data);
    } catch {}
  };
  useEffect(() => {
    getMonthSchedule();
  }, [month]);
  // 바텀시트 위치 구하기
  const bottomSheetRef = useRef<HTMLTableElement>(null);

  const [bottomSheetState, setBottomSheetState] = useState(0);

  return (
    <Wrapper>
      {/* 스케줄 다시 추천 받기 (5.12 민혁 추가) */}
      <button onClick={() => navigate("/schedule")}>스케줄 다시 만들기 버튼</button>
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
      />

      <CalendarBottomSheet
        close={close}
        date={date}
        month={month}
        sheet={sheet}
        setMonthSchedule={setMonthSchedule}
        setBottomSheetState={setBottomSheetState}
      />
    </Wrapper>
  );
};

export default PageScheduleResult;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import Calendar from "components/schedule/calendar/Calendar";
import CalendarBottomSheet from "components/schedule/calendar/CalendarBottomSheet";
import { useNavigate, useLocation } from "react-router-dom";
// month 스케줄 state
import { monthScheduleState, scheduleAllState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";
import { userState } from "recoil/userState";
import { scheduleInfo, scheduleInfoAll, scheduleShare } from "apis/apiSchedule";
import { shareKakao } from "hooks/shareKakaoLink";

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

  const [user, SetUser] = useRecoilState(userState);

  // 전체 스케줄
  const [scheduleAll, setScheduleAll] = useRecoilState(scheduleAllState);
  const getScheduleAll = async () => {
    const data = await scheduleInfoAll();
    if (data !== false) {
      setScheduleAll(data);
    }
  };

  useEffect(() => {
    getScheduleAll();
  }, []);

  // month 스케줄
  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);
  const getMonthSchedule = async () => {
    await setMonthSchedule({});
    try {
      const data = await scheduleInfo(year, month);
      setMonthSchedule(data);
    } catch {
      setMonthSchedule(scheduleAll[month]);
    }
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sharing = async (name: string) => {
    const sharePk = await scheduleShare(scheduleAll);
    shareKakao(
      `https://k8a207.p.ssafy.io/share/${sharePk.pk}`,
      `${name}님의 OTT 시청 패턴이 궁금하다면?`,
      user.imgPath
        ? user.imgPath
        : "https://watchify.s3.ap-northeast-2.amazonaws.com/%EC%BA%A1%EC%B2%98.PNG"
    );
  };

  return (
    <Wrapper>
      <KakaoWrapper>
        공유
        <KakaoButton
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="#"
          onClick={() => {
            sharing(user["name"] ? user["name"] : "guest");
          }}
        />
      </KakaoWrapper>

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

const KakaoWrapper = styled.div`
  position: absolute;
  top: -4.5vh;
  right: 1vh;
  z-index: 100000;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const KakaoButton = styled.img`
  width: 4vh;
  height: 4vh;
  margin-left: 1vh;
`;

// const KakaoDiv = styled.div`
//   position: absolute;
//   bottom: 4vh;
//   right: 4vh;
//   border-radius: 50%;
//   overflow: hidden;
//   width: 5vh;
//   height: 5vh;
// `;

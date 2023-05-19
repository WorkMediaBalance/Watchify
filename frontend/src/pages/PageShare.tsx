import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { myHistoryInfo } from "apis/apiMy";
import HistoryCalendar from "components/mypage/history/HistoryCalendar";
import ShareBottomSheet from "components/common/share/ShareBottomSheet";
import { useRecoilState } from "recoil";
import { HistoryDetailContent } from "interface/content";
import { scheduleShareGet } from "apis/apiSchedule";

interface HistoryData {
  [key: string]: number;
}

interface HistoryDetailContentObject {
  [key: number]: HistoryDetailContent[];
}

interface ShareDetailContentObject {
  [key: string]: HistoryDetailContentObject;
}

const PageShare = () => {
  // const { pk } = useParams();
  const location = useLocation();
  const startYear = location.state && location.state.year;
  const startMonth = location.state && location.state.month;
  const startDay = location.state && location.state.day;
  const pk = location.state && location.state.pk;
  let { sharedPK } = useParams();

  const [year, setYear] = useState(startYear);
  const [month, setMonth] = useState(startMonth);
  const [date, setDate] = useState(startDay);

  const [shareDetail, setShareDetail] = useState<ShareDetailContentObject>({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  // 히스토리 상세 정보 받아오기
  async function getScheduleShare(sharedPK: number) {
    try {
      const newShareDetail = await scheduleShareGet(sharedPK);
      if (newShareDetail !== undefined) {
        setShareDetail(newShareDetail);
      }
    } catch {}
  }

  useEffect(() => {
    if (sharedPK === undefined) {
    } else {
      getScheduleShare(Number(sharedPK));
    }
  }, []);

  // bottomsheet open 변수
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sheetLevel, setSheetLevel] = useState<number>(0);

  // 이제 시작...
  const [dataToProps, setDataToProps] = useState<HistoryDetailContentObject>();
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    totalFunction();
  }, [selectedDate, shareDetail]);

  const [formatDay, setFromatDay] = useState(1);
  const [formatMonth, setFromatMonth] = useState(1);
  const [formatYear, setFromatYear] = useState(2023);

  const totalFunction = async () => {
    const formattedYear = selectedDate.getFullYear().toString();
    const formattedMonth = selectedDate.getMonth() + 1;
    if (formattedMonth < 10) {
      const formattedDate = formattedYear + "-0" + formattedMonth.toString();
      if (shareDetail[formattedDate]) {
        setDataToProps(shareDetail[formattedDate]);
      } else {
        setDataToProps({});
      }
    } else {
      const formattedDate = formattedYear + "-" + formattedMonth.toString();
      if (shareDetail[formattedDate]) {
        setDataToProps(shareDetail[formattedDate]);
      } else {
        setDataToProps({});
      }
    }
    setFromatDay(selectedDate.getDate());
    setFromatMonth(formattedMonth);
    setFromatYear(selectedDate.getFullYear());
  };

  return (
    <div>
      <div></div>
      {dataToProps && (
        <HistoryCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          historyDetail={dataToProps}
          onDateClick={(date: number, month: number) => {
            setMonth(month);
            setDate(date);
            setIsOpen(true);
            setSheetLevel(1);
          }}
          bottomSheetState={sheetLevel}
          onCloseSheet={() => {
            setIsOpen(false);
            setSheetLevel(0);
          }}
        />
      )}
      <ShareBottomSheet
        data={dataToProps?.[date] ?? []}
        selectedDate={selectedDate}
        date={date}
        month={month}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSheetLevel(0);
        }}
      />
    </div>
  );
};

export default PageShare;

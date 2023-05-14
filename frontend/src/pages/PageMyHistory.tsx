import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { myHistoryInfo } from "apis/apiMy";
import HistoryCalendar from "components/mypage/history/HistoryCalendar";
import HistoryBottomSheet from "components/mypage/history/HistoryBottomSheet";

interface HistoryData {
  [key: string]: number;
}

const PageMyHistory = () => {
  const { pk } = useParams();
  const location = useLocation();
  const year = location.state && location.state.year;
  const startMonth = location.state && location.state.month;
  const startDay = location.state && location.state.day;

  const [month, setMonth] = useState(startMonth);
  const [date, setDate] = useState(startDay);

  const [historyDetail, setHistoryDetail] = useState();
  // 히스토리 상세 정보 받아오기
  async function MyHistoryInfoAPI() {
    try {
      const data: HistoryData = {
        pk: Number(pk),
        year: Number(year),
        month: Number(startMonth),
      };
      const newHistoryDetail = await myHistoryInfo(data);
      console.log(newHistoryDetail);
      setHistoryDetail(newHistoryDetail);
    } catch {}
  }
  useEffect(() => {
    MyHistoryInfoAPI();
  }, []);

  return (
    <div>
      <HistoryCalendar
        onDateClick={(date: number, month: number) => {
          setMonth(month);
          setDate(date);
        }}
        bottomSheetState={1}
        onCloseSheet={() => {
          console.log("1");
        }}
      />
      <HistoryBottomSheet
        isOpen={true}
        onClose={() => {
          console.log("1");
        }}
      />
    </div>
  );
};

export default PageMyHistory;

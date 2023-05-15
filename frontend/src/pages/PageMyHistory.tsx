import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { myHistoryInfo } from "apis/apiMy";
import HistoryCalendar from "components/mypage/history/HistoryCalendar";
import HistoryBottomSheet from "components/mypage/history/HistoryBottomSheet";
import { useRecoilState } from "recoil";
import { historyDetailState } from "recoil/history";

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

  const [historyDetail, setHistoryDetail] = useRecoilState(historyDetailState);

  // 히스토리 상세 정보 받아오기
  async function MyHistoryInfoAPI() {
    try {
      const data: HistoryData = {
        pk: Number(pk),
        year: Number(year),
        month: Number(startMonth),
      };
      const newHistoryDetail = await myHistoryInfo(data);
      if (newHistoryDetail !== undefined) {
        setHistoryDetail(newHistoryDetail);
      }
    } catch {}
  }
  useEffect(() => {
    MyHistoryInfoAPI();
  }, []);

  // bottomsheet open 변수
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sheetLevel, setSheetLevel] = useState<number>(0);

  return (
    <div>
      <HistoryCalendar
        historyDetail={historyDetail}
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
      <HistoryBottomSheet
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSheetLevel(0);
        }}
      />
    </div>
  );
};

export default PageMyHistory;

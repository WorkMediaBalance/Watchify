import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { myHistoryInfo } from "apis/apiMy";
import HistoryCalendar from "components/mypage/history/HistoryCalendar";
import HistoryBottomSheet from "components/mypage/history/HistoryBottomSheet";
import { useRecoilState } from "recoil";
import { HistoryDetailContent } from "interface/content";

interface HistoryData {
  [key: string]: number;
}

interface HistoryDetailContentObject {
  [key: number]: HistoryDetailContent[];
}

const PageMyHistory = () => {
  // const { pk } = useParams();
  const location = useLocation();
  const startYear = location.state && location.state.year;
  const startMonth = location.state && location.state.month;
  const startDay = location.state && location.state.day;
  const pk = location.state && location.state.pk;

  const [year, setYear] = useState(startYear);
  const [month, setMonth] = useState(startMonth);
  const [date, setDate] = useState(startDay);

  const [historyDetail, setHistoryDetail] = useState<HistoryDetailContentObject>();

  const [selectedDate, setSelectedDate] = useState(new Date());
  // 히스토리 상세 정보 받아오기
  async function MyHistoryInfoAPI(pk: number, year: number, month: number) {
    try {
      const data: HistoryData = {
        pk: Number(pk),
        year: Number(year),
        month: Number(month),
      };
      const newHistoryDetail = await myHistoryInfo(data);

      if (newHistoryDetail !== undefined) {
        setHistoryDetail(newHistoryDetail);
      }
    } catch {}
  }
  useEffect(() => {
    MyHistoryInfoAPI(pk, selectedDate.getFullYear(), selectedDate.getMonth() + 1);
  }, [selectedDate]);

  // useEffect(() => {
  //   MyHistoryInfoAPI(pk, year, month);
  // }, [month]);

  // bottomsheet open 변수
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sheetLevel, setSheetLevel] = useState<number>(0);

  return (
    <div>
      {historyDetail && (
        <HistoryCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
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
      )}
      <HistoryBottomSheet
        data={historyDetail?.[date] ?? []}
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

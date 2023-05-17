import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { myHistoryInfo } from "apis/apiMy";
import ShareCalendar from "components/share/ShareCalendar";
import ShareBottomSheet from "components/share/ShareBottomSheet";
import { useRecoilState } from "recoil";
import { ShareDetailContent } from "interface/content";

interface ShareData {
  [key: string]: number;
}

interface ShareDetailContentObject {
  [key: number]: ShareDetailContent[];
}

const PageShared = () => {
  // const { pk } = useParams();
  const location = useLocation();
  const startYear = location.state && location.state.year;
  const startMonth = location.state && location.state.month;
  const startDay = location.state && location.state.day;
  const pk = location.state && location.state.pk;

  const [year, setYear] = useState(startYear);
  const [month, setMonth] = useState(startMonth);
  const [date, setDate] = useState(startDay);

  const [shareDetail, setShareDetail] = useState<ShareDetailContentObject>();

  const [selectedDate, setSelectedDate] = useState(new Date());
  // 히스토리 상세 정보 받아오기
  async function MyHistoryInfoAPI(pk: number, year: number, month: number) {
    try {
      const data: ShareData = {
        pk: Number(pk),
        year: Number(year),
        month: Number(month),
      };
      const newShareDetail = await myHistoryInfo(data);
      if (newShareDetail !== undefined) {
        setShareDetail(newShareDetail);
      }
    } catch {}
  }

  // bottomsheet open 변수
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sheetLevel, setSheetLevel] = useState<number>(0);

  return (
    <div>
      {shareDetail && (
        <ShareCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          shareDetail={shareDetail}
          onDateClick={(date: number, month: number) => {
            setMonth(month);
            setDate(date);
            setIsOpen(true);
            setSheetLevel(1);
            console.log(shareDetail);
          }}
          bottomSheetState={sheetLevel}
          onCloseSheet={() => {
            setIsOpen(false);
            setSheetLevel(0);
          }}
        />
      )}
      <ShareBottomSheet
        data={shareDetail?.[date] ?? []}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSheetLevel(0);
        }}
      />
    </div>
  );
};

export default PageShared;

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { myHistoryInfo } from "apis/apiMy";
import ShareCalendar from "components/share/ShareCalendar";
import ShareBottomSheet from "components/share/ShareBottomSheet";
import { useRecoilState } from "recoil";
import { ShareDetailContent } from "interface/content";
import { scheduleShareGet } from "apis/apiSchedule";

interface ShareData {
  [key: string]: number;
}

interface ShareDetailContentObject {
  [key: number]: ShareDetailContent[];
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

  const [shareDetail, setShareDetail] = useState<ShareDetailContentObject>();

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
    console.log(sharedPK);
    if (sharedPK === undefined) {
    } else {
      getScheduleShare(Number(sharedPK));
    }
  }, []);

  // useEffect(() => {
  //   MyHistoryInfoAPI(pk, selectedDate.getFullYear(), selectedDate.getMonth() + 1);
  // }, [selectedDate]);

  // useEffect(() => {
  //   MyHistoryInfoAPI(pk, year, month);
  // }, [month]);

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

export default PageShare;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HistoryComponent from "./HistoryComponent";

import { monthScheduleState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";

import { content } from "./../../interface/content";
import { myHistory } from "apis/apiMy";

const HistoryTab = () => {
  const dummyArray = [0, 0, 0, 0, 0, 0, 0];
  const [historyArray, setHistoryArray] = useState<content[]>([]);

  // async function MyHistoryAPI() {
  //   try {
  //     const newHistoryArray = await myHistory();
  //     console.log(newHistoryArray);
  //     setHistoryArray(newHistoryArray);
  //   } catch {}
  // }
  // useEffect(() => {
  //   MyHistoryAPI();
  // }, []);

  // month 스케줄 state

  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);

  return (
    <div>
      <Title>스케줄 히스토리</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div style={{ height: "100%", overflowY: "auto" }}>
          {dummyArray.map((index) => {
            return <HistoryComponent contentHistory={monthSchedule} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Title = styled.div`
  color: ${({ theme }) => theme.netflix.fontColor};
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 0.5rem 0;
  padding-left: 0.5rem;
`;

export default HistoryTab;

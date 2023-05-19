import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HistoryComponent from "./HistoryComponent";

import { monthScheduleState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";

import { content } from "./../../interface/content";
import { historyState, HistoryContent } from "recoil/history";
import { myHistory } from "apis/apiMy";

const HistoryTab = () => {
  const dummyArray = [0, 0, 0, 0, 0, 0, 0];
  const [historyArray, setHistoryArray] = useState<HistoryContent[]>();

  const getMyHistoryArray = async () => {
    const result = await myHistory();
    setHistoryArray(result);
  };

  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);

  useEffect(() => {
    getMyHistoryArray();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "90%" }}>
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
            {historyArray &&
              historyArray.map((history, index) => {
                return <HistoryComponent contentHistory={history} />;
              })}
          </div>
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
  margin-top: 2vh;
  padding-left: 0.5rem;
`;

export default HistoryTab;

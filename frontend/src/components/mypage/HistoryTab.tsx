import React from "react";
import styled from "styled-components";
import HistoryComponent from "./HistoryComponent";

// month 스케줄 state
import { monthScheduleState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";

const HistoryTab = () => {
  // month 스케줄
  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);

  const dummyArray = [0, 0, 0, 0, 0, 0, 0, 0];
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

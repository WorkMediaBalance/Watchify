import React from "react";
import HistoryComponent from "./HistoryComponent";

const HistoryTab = () => {
  const dummyArray = [0, 0, 0, 0, 0, 0, 0, 0];
  return (
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
          return <HistoryComponent />;
        })}
      </div>
    </div>
  );
};

export default HistoryTab;

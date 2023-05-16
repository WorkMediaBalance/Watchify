import React from "react";
import { HistoryDetailContent } from "interface/content";

const HistoryBottomSheetContent = (props: { data: HistoryDetailContent[] }) => {
  console.log(props.data);
  return <div style={{ color: "white" }}>{props.data[0].title}</div>;
};

export default HistoryBottomSheetContent;

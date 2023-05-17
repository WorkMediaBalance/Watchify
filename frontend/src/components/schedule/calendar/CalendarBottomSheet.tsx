import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { TWO_BOTTOM_SHEET_HEIGHT } from "constant/constant";
import CalendarBottomSheetHeader from "./CalendarBottomSheetHeader";
import CalendarBottomSheetContent from "./CalendarBottomSheetContent";
import useRecBottomSheet from "hooks/twoDepthBottomSheet";
import { schedule } from "interface/schedule";

const CalendarBottomSheet = (props: {
  sheet: number;
  date: number;
  month: number;
  year: number;
  close: number;
  setBottomSheetState: React.Dispatch<React.SetStateAction<number>>;
  setMonthSchedule: (data: schedule) => void;
}) => {
  const { sheet, content, handle, setSheetDepth, sheetDepth } = useRecBottomSheet();

  useEffect(() => {
    if (props.sheet !== 0) {
      setSheetDepth(1);
    }
  }, [props.sheet]);

  useEffect(() => {
    if (props.close !== 0) {
      setSheetDepth(0);
    }
  }, [props.close]);

  useEffect(() => {
    props.setBottomSheetState(sheetDepth);
  }, [sheetDepth]);

  return (
    <Wrapper ref={sheet}>
      <div ref={handle}>
        <CalendarBottomSheetHeader />
      </div>
      <BottomSheetContent ref={content}>
        <CalendarBottomSheetContent
          date={props.date}
          month={props.month}
          year={props.year}
          sheetDepth={sheetDepth}
        />
      </BottomSheetContent>
    </Wrapper>
  );
};

export default CalendarBottomSheet;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 500;
  top: 100%;
  left: 0;
  right: 0;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  border-top: ${({ theme }) => `1px solid grey`};
  height: ${TWO_BOTTOM_SHEET_HEIGHT}px;

  // background: linear-gradient(359.26deg, #3c41c7 0.02%, #3742b2 83.23%, #3642ae 98.76%);
  background: ${({ theme }) => theme.netflix.tabColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: transform 280ms ease-out; /*바텀시트 애니메이션 속도*/
`;

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

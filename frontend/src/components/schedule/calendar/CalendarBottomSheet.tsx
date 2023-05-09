import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { TWO_BOTTOM_SHEET_HEIGHT } from "constant/constant";
import CalendarBottomSheetHeader from "./CalendarBottomSheetHeader";
import CalendarBottomSheetContent from "./CalendarBottomSheetContent";
import useRecBottomSheet from "hooks/twoDepthBottomSheet";

const CalendarBottomSheet = (props: {
  sheet: number;
  date: number;
  month: number;
  close: number;
}) => {
  const { sheet, content, handle, setSheetDepth } = useRecBottomSheet();

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

  return (
    <Wrapper ref={sheet}>
      <div ref={handle}>
        <CalendarBottomSheetHeader />
      </div>
      <BottomSheetContent ref={content}>
        <CalendarBottomSheetContent date={props.date} month={props.month} />
      </BottomSheetContent>
    </Wrapper>
  );
};

export default CalendarBottomSheet;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 50;
  top: 100%;
  left: 0;
  right: 0;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  border-top: 2px solid #ffffff;
  height: ${TWO_BOTTOM_SHEET_HEIGHT}px;

  // background: linear-gradient(359.26deg, #3c41c7 0.02%, #3742b2 83.23%, #3642ae 98.76%);
  background: #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: transform 280ms ease-out; /*바텀시트 애니메이션 속도*/
`;

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

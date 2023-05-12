import React, { FC } from "react";
import styled from "styled-components";

const ScheduleBottomSheetHeader = () => {
  return (
    <Wrapper>
      <Handle />
    </Wrapper>
  );
};

export default ScheduleBottomSheetHeader;
const Wrapper = styled.div`
  height: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding: 2vh 0;
`;

const Handle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

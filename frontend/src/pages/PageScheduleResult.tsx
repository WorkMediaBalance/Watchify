import React from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import Calendar from "components/schedule/Calendar";

const Wrapper = styled.div`
  height: 91vh;
  width: 100vw;
  background-color: ${theme.netflix.backgroundColor};
`;

const PageScheduleResult = () => {
  return (
    <Wrapper>
      <Calendar />
    </Wrapper>
  );
};

export default PageScheduleResult;

import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import Calendar from "components/schedule/calendar/Calendar";
import CalendarBottomSheet from "components/schedule/calendar/CalendarBottomSheet";

const Wrapper = styled.div`
  height: 91vh;
  width: 100vw;
  background-color: ${theme.netflix.backgroundColor};
`;

const PageScheduleResult = () => {
  const [sheet, setSheet] = useState(0);
  const [date, setDate] = useState("");
<<<<<<< HEAD
=======
  const [close, setClose] = useState(0);
>>>>>>> 8555bfd9a43364d6716b684914f4e17035d68d76

  return (
    <Wrapper>
      <Calendar
        onDateClick={(date: string) => {
          setSheet(sheet + 1);
          setDate(date);
        }}
<<<<<<< HEAD
      />
      <CalendarBottomSheet date={date} sheet={sheet} />
=======
        onCloseSheet={() => {
          setClose(close + 1);
        }}
      />
      <CalendarBottomSheet close={close} date={date} sheet={sheet} />
>>>>>>> 8555bfd9a43364d6716b684914f4e17035d68d76
    </Wrapper>
  );
};

export default PageScheduleResult;

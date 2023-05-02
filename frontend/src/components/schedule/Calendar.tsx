import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "styles/theme";

const Wrapper = styled.div`
  color: ${theme.netflix.fontColor};
  max-width: 100vw;
`;

const SCalendarDiv = styled(motion.div)`
  color: ${theme.netflix.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SHeader = styled.div`
  margin-top: 2vh;
  padding-bottom: 0.5vh;
  margin-bottom: 1vh;
  width: 100vw;
  color: ${theme.netflix.fontColor};
`;

const SMonth = styled.p`
  font-size: ${theme.fontSizeType.big.fontSize};
  font-weight: ${theme.fontSizeType.big.fontWeight};
  margin-bottom: 1vh;
  margin-top: 0;
  text-align: center;
`;

const SToday = styled.p`
  position: absolute;
  right: 2vw;
  margin-bottom: 0;
  margin-top: 0;
  line-height: 2;
`;

const STable = styled.table`
  width: 100vw;
  height: 75vh;
  border-collapse: collapse;
`;

const STd = styled.td`
  text-align: center;
  vertical-align: middle;
  width: calc(100vw / 7);
`;

const SThead = styled.thead`
  th {
    border-bottom: 1px solid ${theme.netflix.fontColor};
    padding-bottom: 1vh;
  }
`;

const STbody = styled.tbody`
  .selected-day {
    border: 2px solid ${theme.netflix.pointColor};
  }
  .today {
    border: 2px solid yellow;
  }
`;

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [clickedDay, setClickedDay] = useState<HTMLElement | null>(null);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = getMonthAbbreviation(selectedDate);

  function getMonthAbbreviation(date: Date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const year = date.getFullYear();
    const monthIndex = date.getMonth();

    if (year !== currentYear) {
      return `${year} ${months[monthIndex]}`;
    }

    return months[monthIndex];
  }

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function getLastDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  }

  const daysInMonth = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(selectedDate);
  const lastDayOfMonth = getLastDayOfMonth(selectedDate);

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(`prev-${i}`);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${i}`);
  }

  for (let i = 0; i < 6 - lastDayOfMonth; i++) {
    days.push(`next-${i}`);
  }

  const rows = [];
  let cells: string[] = [];

  days.forEach((day, index) => {
    if (index % 7 !== 0 || index === 0) {
      cells.push(day);
    } else {
      rows.push({ cells });
      cells = [day];
    }
  });

  rows.push({ cells });

  function thisMonth() {
    setSelectedDate(new Date());
  }

  function prevMonth() {
    setSelectedDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  }

  function nextMonth() {
    setSelectedDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  }

  const handlers = useSwipeable({
    onSwipedLeft: nextMonth,
    onSwipedRight: prevMonth,
  });

  const handleDateClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (clickedDay) {
      clickedDay.classList.remove("selected-day");
    }
    event.currentTarget.classList.add("selected-day");
    setClickedDay(event.currentTarget);
  };

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <motion.div>
        <AnimatePresence>
          <SCalendarDiv
            key={selectedDate.toISOString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
            }}
            {...handlers}
          >
            <SHeader>
              <SToday onClick={thisMonth}>Today</SToday>
              <SMonth>{month}</SMonth>
            </SHeader>
            <STable>
              <SThead>
                <tr>
                  {weekdays.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </SThead>
              <STbody>
                {rows.map((row, rowIndex) => {
                  return (
                    <tr key={rowIndex}>
                      {row.cells.map((day, dayIndex) => {
                        let content;
                        let className = "";
                        if (day.includes("prev")) {
                          content = "";
                        } else if (day.includes("next")) {
                          content = "";
                        } else {
                          content = new Date(day).getDate();
                          const today = new Date();
                          if (
                            new Date(day).getFullYear() === today.getFullYear() &&
                            new Date(day).getMonth() === today.getMonth() &&
                            new Date(day).getDate() === today.getDate()
                          ) {
                            className = "today active-day";
                          } else {
                            className = "active-day";
                          }
                        }
                        return (
                          <STd
                            onClick={handleDateClick}
                            key={`${rowIndex}-${dayIndex}`}
                            data-key={`${rowIndex}-${dayIndex}`}
                            className={className}
                          >
                            {content}
                          </STd>
                        );
                      })}
                    </tr>
                  );
                })}
              </STbody>
            </STable>
          </SCalendarDiv>
        </AnimatePresence>
      </motion.div>
    </Wrapper>
  );
};

export default Calendar;

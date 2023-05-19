import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "styles/theme";
import { months } from "constant/constant";
import { HistoryDetailContent } from "recoil/history";
import { myHistoryInfo } from "apis/apiMy";

const HistoryCalendar = (props: {
  onDateClick: (date: number, month: number) => void;
  onCloseSheet: () => void;
  bottomSheetState: number;
  historyDetail: { [key: number]: HistoryDetailContent[] };
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [clickedDay, setClickedDay] = useState<HTMLElement | null>(null);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = getMonthAbbreviation(props.selectedDate);

  function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 255;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  }

  function getMonthAbbreviation(date: Date) {
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

  const daysInMonth = getDaysInMonth(
    props.selectedDate.getFullYear(),
    props.selectedDate.getMonth()
  );
  const firstDayOfMonth = getFirstDayOfMonth(props.selectedDate);
  const lastDayOfMonth = getLastDayOfMonth(props.selectedDate);

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(`prev-${i}`);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(`${props.selectedDate.getFullYear()}-${props.selectedDate.getMonth() + 1}-${i}`);
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
    props.setSelectedDate(new Date());
    props.onCloseSheet();
  }

  function prevMonth() {
    props.setSelectedDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
    props.onCloseSheet();
  }

  function nextMonth() {
    props.setSelectedDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
    props.onCloseSheet();
  }

  const handlers = useSwipeable({
    onSwipedLeft: nextMonth,
    onSwipedRight: prevMonth,
  });

  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const handleDateClick = (
    event: React.MouseEvent<HTMLDivElement>,
    rowIndex: number,
    day: string
  ) => {
    const YMD = day.split("-");
    if (YMD.length === 3) {
      if (clickedDay) {
        clickedDay.classList.remove("selected-day");
      }
      event.currentTarget.classList.add("selected-day");
      setClickedDay(event.currentTarget);
      const date = props.selectedDate.getMonth() + 1;
      const month = Number(YMD[2]);
      if (props.historyDetail[parseInt(YMD[2])]) {
        props.onDateClick(month, date);
      }
    }
    setCurrentRowIndex(rowIndex);
  };

  // 해당 스케줄 불러오기
  useEffect(() => {}, []);

  return (
    <Wrapper className={"wrapper"}>
      <motion.div>
        <AnimatePresence>
          <SCalendarDiv
            key={props.selectedDate.toISOString()}
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

            <STable bottomSheetState={props.bottomSheetState}>
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
                          const dayArray = day.split("-");
                          content = new Date(
                            Number(dayArray[0]),
                            Number(dayArray[1]) - 1,
                            Number(dayArray[2])
                          ).getDate();
                          const today = new Date();
                          if (
                            new Date(
                              Number(dayArray[0]),
                              Number(dayArray[1]) - 1,
                              Number(dayArray[2])
                            ).getFullYear() === today.getFullYear() &&
                            new Date(
                              Number(dayArray[0]),
                              Number(dayArray[1]) - 1,
                              Number(dayArray[2])
                            ).getMonth() === today.getMonth() &&
                            new Date(
                              Number(dayArray[0]),
                              Number(dayArray[1]) - 1,
                              Number(dayArray[2])
                            ).getDate() === today.getDate()
                          ) {
                            className = "today active-day";
                          } else {
                            className = "active-day";
                          }
                        }

                        return props.bottomSheetState === 1 ? (
                          <STd
                            onClick={(event) => handleDateClick(event, rowIndex, day)}
                            key={`${rowIndex}-${dayIndex}`}
                            data-key={`${rowIndex}-${dayIndex}`}
                            className={className}
                            rowsLength={rows.length}
                            bottomSheetState={props.bottomSheetState}
                          >
                            <STdDiv>
                              <SP>{content}</SP>

                              <InnerConteiner>
                                {typeof content === "number" && props.historyDetail[content]
                                  ? props.historyDetail[content].map((content, index) => {
                                      const colorCode = stringToColor(content.title);
                                      return <IndicationBar color={colorCode} />;
                                    })
                                  : null}
                              </InnerConteiner>
                            </STdDiv>
                          </STd>
                        ) : (
                          <STd
                            onClick={(event) => handleDateClick(event, rowIndex, day)}
                            key={`${rowIndex}-${dayIndex}`}
                            data-key={`${rowIndex}-${dayIndex}`}
                            className={className}
                            rowsLength={rows.length}
                            bottomSheetState={props.bottomSheetState}
                          >
                            <STdDiv>
                              <SP>{content}</SP>

                              <InnerConteiner>
                                {typeof content === "number" && props.historyDetail[content]
                                  ? props.historyDetail[content]
                                      .slice(0, 4)
                                      .map((content, index) => {
                                        const colorCode = stringToColor(content.title);
                                        return (
                                          <ContentTag>
                                            <ContentTagDot color={colorCode} />
                                            <ContentName>
                                              {content.episode !== 0
                                                ? `${content.episode}화`
                                                : "단편"}
                                            </ContentName>
                                          </ContentTag>
                                        );
                                      })
                                  : null}
                              </InnerConteiner>
                              {typeof content === "number" &&
                                props.historyDetail[content] &&
                                props.historyDetail[content].length > 4 && (
                                  <div
                                    style={{ width: "100%", textAlign: "end", marginRight: "20%" }}
                                  >
                                    +{props.historyDetail[content].length - 4}
                                  </div>
                                )}
                            </STdDiv>
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

export default HistoryCalendar;

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

const STable = styled.table<{ bottomSheetState: number }>`
  width: 100vw;
  height: ${({ bottomSheetState }) => ["75vh", "45vh", "16vh"][bottomSheetState]};
  border-collapse: collapse;
`;

const STd = styled.td<{ rowsLength: number; bottomSheetState: number }>`
  text-align: center;
  width: calc(100vw / 7);
  height: ${({ rowsLength, bottomSheetState }) =>
    bottomSheetState === 2 ? "100%" : `calc(100% / ${rowsLength})`}};
`;

const SThead = styled.thead`
  th {
    border-bottom: 1px solid ${theme.netflix.fontColor};
    padding-bottom: 1vh;
  }
`;

const STbody = styled.tbody`
  .selected-day div {
    border-radius: 8px;
    // border: 1px solid ${theme.netflix.pointColor};
    background-color: ${theme.netflix.pointColor};
    color: ${theme.netflix.pointColor};
  }
  .today p {
    background-color: rgba(209, 209, 209, 0.2);
    border-radius: 50%;
    width: 35%;
  }
`;

const STdDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const SP = styled.div`
  margin-top: 1vh;
  color: white !important;
`;

const InnerConteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 0.2vh;
`;

const ContentTag = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  margin: 1px;
`;

const ContentTagDot = styled.div<{ color: string }>`
  border-radius: 50%;
  background-color: ${({ color }) => color};
  height: 2vw;
  width: 2vw;
  margin: 1vw;
`;

const ContentName = styled.div`
  color: ${theme.netflix.tabColor};
  font-size: 0.8rem;
  margin: 0.4vw;
  margin-right: 2vw;
`;

const IndicationBar = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  height: 0.3vh;
  width: 90%;
  margin-bottom: 0.2vh;
`;

const ContentPlus = styled.div`
  width: 100%;
  text-align: end;
`;

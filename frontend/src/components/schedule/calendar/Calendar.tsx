import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "styles/theme";
import { months } from "constant/constant";
import { useNavigate } from "react-router-dom";
import { schedule } from "interface/schedule";

// month 스케줄 state
import { monthScheduleState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";
const Calendar = (props: {
  onDateClick: (date: number, month: number, year: number) => void;
  onCloseSheet: () => void;
  bottomSheetState: number;
  monthSchedule: schedule;
  setMonthSchedule: (data: schedule) => void;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [clickedDay, setClickedDay] = useState<HTMLElement | null>(null);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = getMonthAbbreviation(selectedDate);

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

  // 여기서부터 클릭 로직
  const [isTodayClicked, setIsTodayClicked] = useState(false);
  function handleClickToday() {
    let todayElement;
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    if (document.getElementsByClassName("today").length !== 0) {
      todayElement = document.getElementsByClassName("today")[0];
      todayElement.dispatchEvent(event);
    } else {
      setIsTodayClicked(true);
      props.setMonth(new Date().getMonth() + 1);
      setSelectedDate(new Date());
    }
  }
  useEffect(() => {
    if (isTodayClicked) {
      handleClickToday();
      setIsTodayClicked(false);
    }
  }, [selectedDate]);

  function prevMonth() {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      props.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
    props.onCloseSheet();
  }

  function nextMonth() {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      props.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
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
      const date = selectedDate.getMonth() + 1;
      const month = Number(YMD[2]);
      const year = selectedDate.getFullYear();
      props.onDateClick(month, date, year);
    }
    setCurrentRowIndex(rowIndex);
  };

  // 해당 스케줄 불러오기
  const monthSchedule = props.monthSchedule;
  const navigate = useNavigate();
  return (
    <Wrapper className={"wrapper"}>
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
              <RescheduleButton
                onClick={() => navigate("/schedule", { state: { isMakeNew: true } })}
              >
                New Schedule
              </RescheduleButton>
              <SMonth>{month}</SMonth>
              <SToday
                onClick={() => {
                  handleClickToday();
                }}
              >
                Today
              </SToday>
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
                        let id = "";
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
                            className = "today active-day ";
                            id = `${rowIndex}`;
                          } else {
                            className = "active-day";
                          }
                        }

                        return props.bottomSheetState === 2 ? (
                          currentRowIndex === rowIndex && (
                            <STd
                              onClick={(event) => handleDateClick(event, rowIndex, day)}
                              key={`${rowIndex}-${dayIndex}`}
                              data-key={`${rowIndex}-${dayIndex}`}
                              className={className}
                              rowsLength={rows.length}
                              bottomSheetState={props.bottomSheetState}
                            >
                              <STdDiv>
                                <SP className="SP">{content}</SP>

                                <InnerConteiner>
                                  {typeof content === "number" && monthSchedule[content]
                                    ? monthSchedule[content].map((content, index) => {
                                        const colorCode = stringToColor(content.title);
                                        return <IndicationBar color={colorCode} />;
                                      })
                                    : null}
                                </InnerConteiner>
                              </STdDiv>
                            </STd>
                          )
                        ) : props.bottomSheetState === 1 ? (
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
                                {typeof content === "number" && monthSchedule[content]
                                  ? monthSchedule[content].map((content, index) => {
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
                                {typeof content === "number" && monthSchedule[content]
                                  ? monthSchedule[content].slice(0, 4).map((content, index) => {
                                      const colorCode = stringToColor(content.title);

                                      return (
                                        <ContentTag view={content.view}>
                                          <ContentTagDot color={colorCode} />
                                          <ContentName>
                                            {content.finalEpisode === 0
                                              ? "단편"
                                              : `${content.episode}화`}
                                          </ContentName>
                                        </ContentTag>
                                      );
                                    })
                                  : null}
                              </InnerConteiner>
                              {typeof content === "number" &&
                                monthSchedule[content] &&
                                monthSchedule[content].length > 4 && (
                                  <div
                                    style={{
                                      backgroundColor: "transparent",
                                      width: "100%",
                                      textAlign: "end",
                                      marginRight: "20%",
                                    }}
                                  >
                                    +{monthSchedule[content].length - 4}
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

export default Calendar;

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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SMonth = styled.div`
  font-size: ${theme.fontSizeType.big.fontSize};
  font-weight: ${theme.fontSizeType.big.fontWeight};
  margin-bottom: 1vh;
  margin-top: 0;
  text-align: center;
  width: calc(100% / 3);
`;

const SToday = styled.div`
  right: 2vw;
  line-height: 2;
  width: calc(100% / 3);
  text-align: end;
  margin-right: 3vw;
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

const ContentTag = styled.div<{ view: boolean }>`
  display: flex;

  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ view }) => (view ? `#FF5500` : "white")};
  color: ${({ view }) => (view ? "white" : "black")};
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 2vw;
  font-weight: 600;
  margin: 0.4vw;
  margin-right: 2vw;
  overflow: hidden;
`;

const IndicationBar = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  height: 0.3vh;
  width: 90%;
`;

const ContentPlus = styled.div`
  width: 100%;
  text-align: end;
`;

const RescheduleButton = styled.div`
  width: calc(100% / 3);
  margin-left: 3vw;
`;

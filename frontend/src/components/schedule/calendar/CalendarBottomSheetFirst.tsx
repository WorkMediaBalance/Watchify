import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ContentPoster from "components/common/ContentPoster";
// month 스케줄 state
import { monthScheduleState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";
// 좌우 스와이프
import { useSwipeable } from "react-swipeable";
import { scheduleCheck, scheduleCheckCancel } from "apis/apiSchedule";
import { scheduleAllState } from "recoil/scheduleState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { scheduleModify, scheduleInfoAll, scheduleInfo } from "apis/apiSchedule";
import { ScheduleAll } from "interface/schedule";
import { later } from "constant/constant";

const CalendarBottomSheetFirst = (props: { date: number; month: number; year: number }) => {
  // month 스케줄
  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);
  const dateScheduleList = monthSchedule[props.date] === undefined ? [] : monthSchedule[props.date];

  useEffect(() => {
    console.log(dateScheduleList, "here");
  }, []);

  const nextContent = () => {
    if (
      Array.isArray(dateScheduleList) &&
      dateScheduleList.length > 1 &&
      index !== dateScheduleList.length - 1
    ) {
      setIndex(index + 1);
    }
  };
  const prevContent = () => {
    if (Array.isArray(dateScheduleList) && dateScheduleList.length > 1 && index !== 0) {
      setIndex(index - 1);
    }
  };
  // 스와이프
  const handlers = useSwipeable({
    onSwipedLeft: nextContent,
    onSwipedRight: prevContent,
  });

  const [index, setIndex] = useState(0);
  const [isSeen, setIsSeen] = useState(dateScheduleList[index]?.view);
  useEffect(() => {
    setIsSeen(dateScheduleList[index]?.view);
  }, [index]);
  const seenHandler = async () => {
    const data = {
      pk: dateScheduleList[index].pk,
      episode: dateScheduleList[index].finalEpisode !== 0 ? dateScheduleList[index].episode : 0,
      date: dateScheduleList[index].date,
    };
    if (!isSeen) {
      try {
        await scheduleCheck(data);
      } catch {}
    } else {
      try {
        await scheduleCheckCancel(data);
      } catch {}
    }
    setIsSeen(!isSeen);
  };

  const [scheduleAll, setScheduleAll] = useRecoilState(scheduleAllState);
  const [onChange, setOnChange] = useState(false);
  const laterHandler = (date: Date) => {
    const year1 = date.getFullYear();
    const month1 = date.getMonth();
    const day1 = date.getDate();

    const year2 = new Date().getFullYear();
    const month2 = new Date().getMonth();
    const day2 = new Date().getDate();

    if (
      year1 < year2 ||
      (year1 === year2 && month1 < month2) ||
      (year1 === year2 && month1 === month2 && day1 < day2)
    ) {
      Swal.fire({
        title: "오늘 이후의 날짜를 선택해주세요",
        text: "오늘 이후의 날짜를 선택해주세요",
        icon: "warning",
        timer: 2000,
        showCloseButton: true,
        customClass: {
          container: "my-swal-container",
          confirmButton: "my-swal-confirm-button",
          cancelButton: "my-swal-cancel-button",
          icon: "my-swal-icon",
        },
      });
    } else {
      const paddedPropsMonth = props.month.toString().padStart(2, "0");
      const paddedMonth = (month1 + 1).toString().padStart(2, "0");
      const paddedDay = day1.toString().padStart(2, "0");

      const changed: later = {
        date: scheduleAll[`${props.year}-${paddedPropsMonth}`][props.date][index].date,
        contentId: scheduleAll[`${props.year}-${paddedPropsMonth}`][props.date][index].pk,
        episode: scheduleAll[`${props.year}-${paddedPropsMonth}`][props.date][index].episode,
        newDate: `${year1}-${paddedMonth}-${paddedDay}`,
      };

      ChangeScheduleAll(changed);

      setOnChange(false);
    }
  };

  const ChangeScheduleAll = async (data: later) => {
    const success = await scheduleModify(data);

    if (success) {
      const newData = await scheduleInfoAll();
      if (newData !== false) {
        setScheduleAll(newData);
        console.log("전체 스케줄", newData);
        await getMonthSchedule();
      }
    }
  };

  const getMonthSchedule = async () => {
    try {
      console.log(`${props.year}년 ${props.month}월 스케줄 정보 받아오기`);
      const data = await scheduleInfo(props.year, props.month);
      setMonthSchedule(data);
    } catch {}
  };

  return (
    <div>
      <Container {...handlers}>
        <DateAndAdd>
          <SDate>{`${props.month}월 ${props.date}일`}</SDate>
          <Add>{/* <AiOutlinePlusCircle /> */}</Add>
        </DateAndAdd>
        {Array.isArray(dateScheduleList) && dateScheduleList.length === 0 ? (
          <NoContentDiv>
            <div>일정이 없습니다.</div>
          </NoContentDiv>
        ) : (
          <ContentContainer>
            <PosterContainer>
              <ContentPoster
                imageUrl={dateScheduleList[index]["imgPath"]}
                title={dateScheduleList[index]["title"]}
                content={dateScheduleList[index]}
              ></ContentPoster>
            </PosterContainer>
            {onChange ? (
              <DatePickerWrapper>
                <DatePicker
                  selected={new Date(dateScheduleList[index].date)}
                  onChange={(date: Date) => {
                    laterHandler(date);
                  }}
                  inline
                />
              </DatePickerWrapper>
            ) : null}
            <TextContainer>
              <TitleAndDot>
                <Title>{dateScheduleList[index]["title"]}</Title>
                {/* <Dot></Dot> */}
              </TitleAndDot>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Season>
                  {dateScheduleList[index]["season"] !== 0 &&
                    `시즌 ${dateScheduleList[index]["season"]} :`}{" "}
                </Season>
                <Episode>
                  {dateScheduleList[index]["episode"] !== 0 &&
                    `${dateScheduleList[index]["episode"]} 화`}
                </Episode>
              </div>
              <ButtonContainer>
                <SeenButton onClick={seenHandler}>{isSeen ? "시청 취소" : "시청함"}</SeenButton>
                <PostponeButton
                  onClick={() => {
                    setOnChange(true);
                  }}
                >
                  {"일정 변경"}
                </PostponeButton>
              </ButtonContainer>
            </TextContainer>
          </ContentContainer>
        )}
        <Footer>
          <PageDotContainer>
            {dateScheduleList.map((data, i) => (
              <PageDot status={index === i} />
            ))}
          </PageDotContainer>
        </Footer>
      </Container>
    </div>
  );
};

export default CalendarBottomSheetFirst;

const Container = styled.div`
  height: 30vh;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DateAndAdd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const SDate = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  margin-left: 10vw;
`;

const Add = styled.div`
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  margin-right: 10vw;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const PosterContainer = styled.div`
  height: auto;
  width: 30vw;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const TitleAndDot = styled.div`
  display: flex;
  flex-direction: row;
  // width: 30vw;
  justify-content: center;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
`;

const Dot = styled.div``;

const Season = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
`;
const Episode = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  margin-left: 2vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ;
`;

const SeenButton = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  border: ${({ theme }) => `2px solid ${theme.netflix.fontColor}`};
  border-radius: 10px;
  margin: 2vw;
  padding: 2vw;
`;

const PostponeButton = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  border: ${({ theme }) => `2px solid ${theme.netflix.fontColor}`};
  border-radius: 10px;
  margin: 2vw;
  padding: 2vw;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PageDotContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const PageDot = styled.div<{ status: boolean }>`
  background-color: ${({ theme }) => `${theme.netflix.fontColor}`};
  opacity: ${({ status }) => (status ? 1 : 0.5)};
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  margin: 1vw;
`;

const NoContentDiv = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
`;

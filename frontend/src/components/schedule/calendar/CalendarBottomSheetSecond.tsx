import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ContentPoster from "components/common/ContentPoster";
// month 스케줄 state
import { monthScheduleState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";
// 좌우 스와이프
import { useSwipeable } from "react-swipeable";

const CalendarBottomSheetSecond = (props: { date: number; month: number }) => {
  // month 스케줄
  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);
  // const [dateSchedule, setDateSchedule] = useState(monthSchedule[Number(props.date)]);
  //  useEffect(() => {
  // const [dateScheduleList, setDateScheduleList] = useState(monthSchedule[props.date]);
  //   }, )
  const dateScheduleList = monthSchedule[props.date] === undefined ? [] : monthSchedule[props.date];

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
  const season =
    Array.isArray(dateScheduleList) &&
    dateScheduleList.length > 0 &&
    dateScheduleList[index]["season"] !== 0
      ? `시즌 ${dateScheduleList[index]["season"]} `
      : "";
  const episode =
    Array.isArray(dateScheduleList) &&
    dateScheduleList.length > 0 &&
    dateScheduleList[index]["finalEpisode"] !== 0
      ? `${dateScheduleList[index]["episode"]} 화`
      : "";
  return (
    <Container {...handlers}>
      <Date>{`${props.month}월 ${props.date}일`}</Date>
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
          <TitleContainer>
            {`${dateScheduleList[index]["title"]} ` + `${season}` + `${episode}`}
          </TitleContainer>
          <Footer>
            <PageDotContainer>
              {dateScheduleList.map((data, i) => (
                <PageDot status={index === i} />
              ))}
            </PageDotContainer>
          </Footer>
        </ContentContainer>
      )}
    </Container>
  );
};

export default CalendarBottomSheetSecond;

const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Date = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  margin-left: 10vw;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const PosterContainer = styled.div`
  margin: 5vw;
  height: auto;
  width: 60vw;
`;

const TitleContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5vw;
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
  height: 20vh;
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

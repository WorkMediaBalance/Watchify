import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ContentPoster from "components/common/ContentPoster";
// month 스케줄 state
import { monthScheduleState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";
// 좌우 스와이프
import { useSwipeable } from "react-swipeable";

const CalendarBottomSheetFirst = (props: { date: number; month: number }) => {
  // month 스케줄
  const [monthSchedule, setMonthSchedule] = useRecoilState(monthScheduleState);
  // const [dateSchedule, setDateSchedule] = useState(monthSchedule[Number(props.date)]);
  //  useEffect(() => {
  // const [dateScheduleList, setDateScheduleList] = useState(monthSchedule[props.date]);
  //   }, )
  const dateScheduleList = monthSchedule[props.date];

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
  return (
    <div>
      <Container {...handlers}>
        <DateAndAdd>
          <Date>{`${props.month}월 ${props.date}일`}</Date>
          <Add>
            {"일정 추가"}
            {/* <AiOutlinePlusCircle /> */}
          </Add>
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
            <TextContainer>
              <TitleAndDot>
                <Title>{dateScheduleList[index]["title"]}</Title>
                {/* <Dot></Dot> */}
              </TitleAndDot>
              <ButtonContainer>
                <SeenButton>{"시청함"}</SeenButton>
                <PostponeButton>{"미루기"}</PostponeButton>
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

const Date = styled.div`
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
  justify-content: space-around;
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

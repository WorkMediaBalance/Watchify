import React from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ContentPoster from "components/common/ContentPoster";

const CalendarBottomSheetFirst = () => {
  return (
    <Container>
      <DateAndAdd>
        <Date>{"4월 19일"}</Date>
        <Add>
          {"컨텐츠 일정 추가"} <AiOutlinePlusCircle />
        </Add>
      </DateAndAdd>
      <ContentContainer>
        <PosterContainer>
          <ContentPoster
            imageUrl={
              "https://images.justwatch.com/poster/302148591/s166/%EC%8B%9C%EC%A6%8C-2.webp"
            }
            title={"메이어 킹스타운"}
          ></ContentPoster>
        </PosterContainer>
        <TextContainer>
          <TitleAndDot>
            <Title>{"메이어 킹스타운"}</Title>
            <Dot></Dot>
          </TitleAndDot>
          <ButtonContainer>
            <SeenButton>{"시청함"}</SeenButton>
            <PostponeButton>{"미루기"}</PostponeButton>
          </ButtonContainer>
        </TextContainer>
      </ContentContainer>
      <Footer>
        <PageDotContainer></PageDotContainer>
      </Footer>
    </Container>
  );
};

export default CalendarBottomSheetFirst;

const Container = styled.div`
  height: 30vh;
  width: 100%;
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
  margin-left: 5vw;
`;

const Add = styled.div`
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  margin-right: 5vw;
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
  width: 30vw;
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
  border: ${({ theme }) => `1px solid ${theme.netflix.fontColor}`};
  border-radius: 5px;
  margin: 2vw;
  padding: 1vw;
`;

const PostponeButton = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  border: ${({ theme }) => `1px solid ${theme.netflix.fontColor}`};
  border-radius: 5px;
  margin: 2vw;
  padding: 1vw;
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

const PageDot = styled.div``;

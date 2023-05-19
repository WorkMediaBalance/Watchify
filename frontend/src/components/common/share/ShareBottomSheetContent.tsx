import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { HistoryDetailContent } from "interface/content";
import { useSwipeable } from "react-swipeable";
import ContentPoster from "components/common/ContentPoster";
import { motion, useAnimation } from "framer-motion";

const ShareBottomSheetContent = (props: {
  data: HistoryDetailContent[];
  selectedDate: Date;
  date: number;
  month: number;
}) => {
  const [index, setIndex] = useState(0);
  const nextContent = () => {
    if (Array.isArray(props.data) && props.data.length > 1 && index !== props.data.length - 1) {
      setIndex(index + 1);
    }
  };
  const prevContent = () => {
    if (Array.isArray(props.data) && props.data.length > 1 && index !== 0) {
      setIndex(index - 1);
    }
  };
  const prevIndex = useRef(index);
  const controls = useAnimation();
  useEffect(() => {
    setIndex(0);
  }, [props.date, props.month]);
  // 애니메이션
  useEffect(() => {
    controls
      .start({
        opacity: 0,
        transition: { duration: 0 },
      })
      .then(() => {
        controls.start({
          opacity: 1,
          transition: { duration: 0.3 },
        });
      });
  }, [props.date, props.month]);

  useEffect(() => {
    const direction = index > prevIndex.current ? 1 : -1;

    controls
      .start({
        x: 50 * direction,
        opacity: 0,
        transition: { duration: 0 },
      })
      .then(() => {
        controls.start({
          x: 0,
          opacity: 1,
          transition: { duration: 0.3 },
        });
      });

    prevIndex.current = index;
  }, [index, controls]);

  const handlers = useSwipeable({
    onSwipedLeft: nextContent,
    onSwipedRight: prevContent,
  });

  return (
    <div>
      {props.data && props.data[index] && (
        <Container {...handlers}>
          <DateAndAdd>
            <SDate>{`${props.month}월 ${props.date}일`}</SDate>
            <Add>{/* <AiOutlinePlusCircle /> */}</Add>
          </DateAndAdd>
          <motion.div animate={controls}>
            {Array.isArray(props.data) && props.data.length === 0 ? (
              <NoContentDiv>
                <div>일정이 없습니다.</div>
              </NoContentDiv>
            ) : (
              <ContentContainer>
                <PosterContainer>
                  <ContentPoster
                    imageUrl={props.data[index]["imgPath"]}
                    title={props.data[index]["title"]}
                    content={props.data[index]}
                  ></ContentPoster>
                </PosterContainer>
                {props.data && props.data[index] && (
                  <TextContainer>
                    <TitleAndDot>
                      <Title>{props.data[index]["title"]}</Title>
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
                        {props.data[index]["season"] !== 0 &&
                          `시즌 ${props.data[index]["season"]} :`}{" "}
                      </Season>
                      <Episode>
                        {props.data[index]["episode"] !== 0 && `${props.data[index]["episode"]} 화`}
                      </Episode>
                    </div>
                  </TextContainer>
                )}
              </ContentContainer>
            )}
          </motion.div>
          <Footer>
            <PageDotContainer>
              {props.data.map((data, i) => (
                <PageDot status={index === i} />
              ))}
            </PageDotContainer>
          </Footer>
        </Container>
      )}
    </div>
  );
};

export default ShareBottomSheetContent;

const Container = styled.div`
  height: 30vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
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
  width: 100%;
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
  width: 50%;
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

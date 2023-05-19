import React from "react";
import styled from "styled-components";
import { HistoryDetailContent } from "interface/content";

const HistoryBottomSheetContent = (props: { data: HistoryDetailContent[] }) => {
  return (
    <div>
      {props.data.length > 0 && <Title>{props.data[0].title}</Title>}
      {props.data.length > 0 &&
        props.data.map((history, index) => (
          <Wrapper key={index}>
            <HistoryContainer>
              {/* <Title>{history.title}</Title> */}
              <DateDiv>{history.date}</DateDiv>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row", width: "70%" }}>
                  <SeasonDiv>{history.season !== 0 && `시즌 ${history.season} `}</SeasonDiv>
                  <EpisodeDiv>{history.season !== 0 ? ` ${history.episode}화` : "단편"}</EpisodeDiv>
                </div>
                <div>시청함</div>
              </div>
            </HistoryContainer>
          </Wrapper>
        ))}
    </div>
  );
};

export default HistoryBottomSheetContent;

const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 90%;
`;

const HistoryContainer = styled.div`
  width: 80%;
  border-bottom: 1px solid white;
  padding: 1vh;
`;

const Title = styled.div`
  color: white;
  font-size: 3vh;
  margin: 2vh;
  margin-left: 3vh;
`;

const DateDiv = styled.div`
  font-size: 2vh;
  margin-bottom: 1vh;
`;

const SeasonDiv = styled.div`
  margin-right: 1vw;
`;

const EpisodeDiv = styled.div``;

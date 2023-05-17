import React from "react";
import styled from "styled-components";
import { ShareDetailContent } from "interface/content";

const ShareBottomSheetContent = (props: { data: ShareDetailContent[] }) => {
  console.log(props.data);
  return (
    <div>
      {props.data.length > 0 && <Title>{props.data[0].title}</Title>}
      {props.data.length > 0 &&
        props.data.map((share, index) => (
          <Wrapper key={index}>
            <ShareContainer>
              {/* <Title>{history.title}</Title> */}
              <DateDiv>{share.date}</DateDiv>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row", width: "70%" }}>
                  <SeasonDiv>{share.season !== 0 && `시즌 ${share.season} `}</SeasonDiv>
                  <EpisodeDiv>{share.season !== 0 ? ` ${share.episode}화` : "단편"}</EpisodeDiv>
                </div>
                <div>시청함</div>
              </div>
            </ShareContainer>
          </Wrapper>
        ))}
    </div>
  );
};

export default ShareBottomSheetContent;

const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 90%;
`;

const ShareContainer = styled.div`
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

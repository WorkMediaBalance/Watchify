import React from "react";
import styled from "styled-components";
import ContentPoster from "components/common/ContentPoster";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8vw; //
  margin: 4vw;
`;

const WishTab = () => {
  const contentArray = [0, 0, 0, 0, 0, 0, 0];

  return (
    <GridContainer>
      {contentArray.map((content, index) => (
        <ContentPoster
          imageUrl={"https://t1.daumcdn.net/cfile/tistory/997F7A385E4A920F28"}
          title={"1945"}
        />
      ))}
    </GridContainer>
  );
};

export default WishTab;

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
    <div>
      <Title>나의 찜 목록</Title>
      <GridContainer>
        {contentArray.map((content, index) => (
          <ContentPoster
            imageUrl={"https://t1.daumcdn.net/cfile/tistory/997F7A385E4A920F28"}
            title={"1945"}
          />
        ))}
      </GridContainer>
    </div>
  );
};

const Title = styled.div`
  color: ${({ theme }) => theme.netflix.fontColor};
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 0.5rem 0;
  padding-left: 0.5rem;
`;
export default WishTab;

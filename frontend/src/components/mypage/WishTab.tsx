import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ContentPoster from "components/common/ContentPoster";
import { content } from "interface/content";

import { myWishList } from "apis/apiMy";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8vw; //
  margin: 4vw;
`;

const WishTab = () => {
  const [wishList, setWishList] = useState<content[]>([]);

  // 나의 찜 목록 API 불러오기
  async function myWishListAPI() {
    const newWishList = await myWishList();

    setWishList(newWishList);
  }
  useEffect(() => {
    myWishListAPI();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "90%" }}>
        <Title>나의 찜 목록</Title>
        <GridContainer>
          {wishList &&
            wishList.map((content, index) => (
              <ContentPoster
                imageUrl={wishList[index]["imgPath"]}
                title={wishList[index]["title"]}
                content={wishList[index]}
              />
            ))}
        </GridContainer>
      </div>
    </div>
  );
};

const Title = styled.div`
  color: ${({ theme }) => theme.netflix.fontColor};
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 2vh 0.5rem 0;
  padding-left: 0.5rem;
`;
export default WishTab;

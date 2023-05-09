import React from "react";
import styled from "styled-components";

import ContentPoster from "components/common/ContentPoster";
// recommend recoil
import { recResultState } from "recoil/recommendState";
import { useRecoilState } from "recoil";

const RecommendRest = () => {
  const [recommendArray, setRcommendArray] = useRecoilState(recResultState);

  const menuItems = recommendArray.map((item, index) => (
    <div key={index} style={{ display: "inline-block", width: "40vw", margin: "3vw" }}>
      <ContentPoster
        imageUrl={"https://images.justwatch.com/poster/302148591/s166/%EC%8B%9C%EC%A6%8C-2.webp"}
        title={"메이어 킹스타운입니다람쥐"}
        content={recommendArray[index]}
      />
    </div>
  ));

  return (
    <div
      style={{
        width: "100%",
        overflowX: "scroll",
        overflowY: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {menuItems}
    </div>
  );
};
export default RecommendRest;

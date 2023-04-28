import React, { useState } from "react";
import styled from "styled-components";
import { recResultState } from "recoil/recommendState";
import { useRecoilState } from "recoil";
import netflixIcon from "../assets/img/netflixIcon.png";
import disneyIcon from "../assets/img/disneyIcon.png";
import watchaIcon from "../assets/img/watchaIcon.png";
import wavveIcon from "../assets/img/wavveIcon.png";
import Swal from "sweetalert2";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 91vh;
  margin-top: 0;
`;

const SRibbonDiv = styled.div`
  width: 0;
  height: 0;
  margin-right: 2vw;
  border-bottom: 2.7vh solid transparent;
  border-top: 7vh solid #ff0000;
  border-left: 2.7vh solid #ff0000;
  border-right: 2.7vh solid #ff0000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SRibbonP = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8.5vh;
  color: #ffffff;
`;

const PageRecommendResult = () => {
  const [recResult, SetRecResult] = useRecoilState(recResultState);
  const [selectedNum, SetSelectedNum] = useState<string>("1");

  const onClickHandler = () => {};

  return (
    <Wrapper>
      <div style={{ display: "flex" }}>
        <SRibbonDiv onClick={onClickHandler}>
          <SRibbonP>1</SRibbonP>
        </SRibbonDiv>
        <SRibbonDiv onClick={onClickHandler}>
          <SRibbonP>2</SRibbonP>
        </SRibbonDiv>
        <SRibbonDiv onClick={onClickHandler}>
          <SRibbonP>3</SRibbonP>
        </SRibbonDiv>
      </div>
    </Wrapper>
  );
};

export default PageRecommendResult;

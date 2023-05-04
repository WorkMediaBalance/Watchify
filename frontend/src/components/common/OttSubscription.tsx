import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { useRecoilState, useSetRecoilState } from "recoil";
import { ottSubscriptionState } from "recoil/userState";

import { AiOutlineClose } from "react-icons/ai";

import netflixIcon from "assets/img/netflixIcon.png";
import disneyIcon from "assets/img/disneyIcon.png";
import watchaIcon from "assets/img/watchaIcon.png";
import wavveIcon from "assets/img/wavveIcon.png";

// ott 추가 함수 정의를 위한 기초 설정 (왜 global 설정하고 window에서 하는지는 모름..)
declare global {
  interface Window {
    addOtt: (name: string, subscriptionDate: string) => void;
  }
}

const OttSubscription = () => {
  const navigate = useNavigate();
  const [otts, setOtts] = useRecoilState(ottSubscriptionState);

  // OTT 삭제 함수
  const onClickDeleteOtt = (idx: number) => {
    let copy = [...otts];
    copy = copy.filter((ott, index) => index !== idx);
    setOtts(copy);
  };

  // OTT 추가 함수
  window.addOtt = (name, subscriptionDate) => {
    let copy = [...otts];
    copy = [...otts, { name: name, subscriptionDate: subscriptionDate }];
    setOtts(copy);
  };

  // sweetAlert 띄우기 (`` 위치 주의)
  const modalHandler = () => {
    Swal.fire({
      title: "",
      text: "",
      html: `<div>
        <img src="${netflixIcon}" onclick="addOtt('netflix', '2023-05-01')" />
        <img src="${disneyIcon}" onclick="addOtt('disney', '2023-05-01')" />
        <img src="${watchaIcon}" onclick="addOtt('watcha', '2023-05-01')" />
        <img src="${wavveIcon}" onclick="addOtt('wavve', '2023-05-01')" />
      </div>`,
    });
  };

  return (
    <SContainer>
      <Sdiv>보유 OTT</Sdiv>
      <SDiv2>
        구독중인 OTT가 있으시면 알려주세요. <br /> OTT 맞춤으로 스케줄링 할게요!
      </SDiv2>
      {otts.map((ott, idx) => {
        let icon;
        if (ott.name === "netflix") {
          icon = netflixIcon;
        } else if (ott.name === "disney") {
          icon = disneyIcon;
        } else if (ott.name === "watcha") {
          icon = watchaIcon;
        } else if (ott.name === "wavve") {
          icon = wavveIcon;
        }
        return (
          <SOttDiv key={idx}>
            <SImg src={icon} alt={ott.name} />
            <span>최근 구독일 : {ott.subscriptionDate}</span>
            <AiOutlineClose
              onClick={() => onClickDeleteOtt(idx)}
              style={{
                fontSize: "5vw",
                color: "white",
              }}
            />
          </SOttDiv>
        );
      })}
      <SBoxContainer>
        <SAddBox onClick={modalHandler}>+</SAddBox>
      </SBoxContainer>
    </SContainer>
  );
};

export default OttSubscription;

const SContainer = styled.div`
  height: 40vh;
  overflow: auto;
`;

const Sdiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 0.5rem 0;
  padding-left: 0.5rem;
`;

const SDiv2 = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  text-align: left;
  margin: 0.2rem 0;
  padding-left: 0.5rem;
`;

const SOttDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.5rem;
`;

const SImg = styled.img`
  width: 13vw;
  height: 13vw;
`;

const SBoxContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SAddBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed white;
  border-radius: 10px;
  padding: 0.5rem;
  width: 80vw;
  height: 15vw;
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
`;

import React, { useState } from "react";
import styled from "styled-components";

import Swal from "sweetalert2";

import { useRecoilValue } from "recoil";
import { ottSubscriptionState } from "recoil/userState";

import { AiOutlineClose } from "react-icons/ai";

import netflixIcon from "assets/img/netflixIcon.png";
import disneyIcon from "assets/img/disneyIcon.png";
import watchaIcon from "assets/img/watchaIcon.png";
import wavveIcon from "assets/img/wavveIcon.png";

declare global {
  interface Window {
    addOtt: () => void;
  }
}

type Props = {
  onClickShowOttModal: () => void;
  showOttModal: boolean;
  setShowOttModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const OttSubscription = ({ onClickShowOttModal, showOttModal, setShowOttModal }: Props) => {
  const [otts, setOtts] = useState(useRecoilValue(ottSubscriptionState));

  const onClickDeleteOtt = (idx: number) => {
    let copy = [...otts];
    copy = copy.filter((ott, index) => index !== idx);
    setOtts(copy);
    console.log(copy);
  };

  const onClickAddOtt = () => {};

  const modalHandler = () => {
    window.addOtt = () => {
      let copy = [...otts];
      copy = [...otts, { name: "watcha", subscriptionDate: "모름" }];
      setOtts(copy);
    };
    Swal.fire({
      title: "",
      text: "",
      html: `<div>
        <img src="${netflixIcon}" onclick="addOtt()" />
        <img src="${disneyIcon}" onclick="addOtt()" />
        <img src="${watchaIcon}" onclick="addOtt()" />
        <img src="${wavveIcon}" onclick="addOtt()" />
      </div>`,
    });
  };

  return (
    <>
      <div onClick={modalHandler}>모달띄우는 버튼</div>
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
        <SAddBox onClick={onClickShowOttModal}>+</SAddBox>
      </SBoxContainer>
    </>
  );
};

export default OttSubscription;

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

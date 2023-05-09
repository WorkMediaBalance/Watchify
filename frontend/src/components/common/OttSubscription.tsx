import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useRecoilState, useSetRecoilState } from "recoil";
import { ottSubscriptionState, ottSubscriptionState2 } from "recoil/userState";

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
  const myTheme = useTheme();

  const [otts, setOtts] = useRecoilState(ottSubscriptionState);
  const [otts2, setOtts2] = useRecoilState(ottSubscriptionState2);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean[]>([false, false, false, false]);

  const [today, setToday] = useState(new Date());

  // OTT 삭제 함수
  const onClickDeleteOtt = (idx: number) => {
    setIsAdded(false);
    let copy = [...otts];
    copy = copy.filter((ott, index) => index !== idx);
    setOtts(copy);
  };

  const onClickDeleteOtt2 = (key: string) => {
    setIsAdded(false);
    setOtts2((prev) => {
      const copy = { ...prev }; // 기존 객체 복사
      console.log(copy);
      copy[key] = { start: null, end: null }; // 새로운 객체 생성 후 업데이트
      console.log(copy);
      return copy; // 새로운 배열 반환
    });
  };

  // OTT 추가 함수
  window.addOtt = (name, subscriptionDate) => {
    setIsAdded(true);
    let copy = [...otts];
    copy = [...otts, { name: name, subscriptionDate: subscriptionDate }];
    setOtts(copy);
  };

  useEffect(() => {
    if (!isAdded) return;
    if (otts.length === 4) {
      console.log("드디어 4개 다 구독함");
      Swal.close();
      return;
    }
    modalHandler();
  }, [otts]);

  // sweetAlert 띄우기 (`` 위치 주의)
  const modalHandler = () => {
    const result: { [key: string]: boolean } = {};
    if (otts.some((ott) => ott.name === "netflix")) {
      result["netflix"] = true;
    } else {
      result["netflix"] = false;
    }
    if (otts.some((ott) => ott.name === "disney")) {
      result["disney"] = true;
    } else {
      result["disney"] = false;
    }
    if (otts.some((ott) => ott.name === "watcha")) {
      result["watcha"] = true;
    } else {
      result["watcha"] = false;
    }
    if (otts.some((ott) => ott.name === "wavve")) {
      result["wavve"] = true;
    } else {
      result["wavve"] = false;
    }

    Swal.fire({
      title: "",
      text: "",
      background: myTheme.netflix.backgroundColor,
      html: `<div>
  ${
    result.netflix
      ? ""
      : `<img src="${netflixIcon}" onclick="addOtt('netflix', '2023-05-01')" width="60vw" />`
  }
  ${
    result.disney
      ? ""
      : `<img src="${disneyIcon}" onclick="addOtt('disney', '2023-05-01')" width="60vw"/>`
  }
  ${
    result.watcha
      ? ""
      : `<img src="${watchaIcon}" onclick="addOtt('watcha', '2023-05-01')" width="60vw"/>`
  }
  ${
    result.wavve
      ? ""
      : `<img src="${wavveIcon}" onclick="addOtt('wavve', '2023-05-01')" width="60vw"/>`
  }

</div>`,
    });
  };

  const handleDateChange = (date: Date, idx: number) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const newDate = `${year}-${month}-${day}`;

    setOtts((prev) => {
      const copy = [...prev]; // 기존 배열 복사
      copy[idx] = { ...copy[idx], subscriptionDate: newDate }; // 해당 객체의 값을 변경하여 복사본에 할당
      return copy; // 새로운 배열 반환
    });
  };

  return (
    <SContainer>
      <Sdiv>보유 OTT</Sdiv>
      <SDiv2>
        구독중인 OTT가 있으시면 알려주세요. <br /> OTT 맞춤으로 스케줄링 할게요!
      </SDiv2>
      {Object.entries(otts2).map(([key, value]) => {
        let icon;
        if (key === "netflix") {
          icon = netflixIcon;
        } else if (key === "disney") {
          icon = disneyIcon;
        } else if (key === "watcha") {
          icon = watchaIcon;
        } else if (key === "wavve") {
          icon = wavveIcon;
        }
        return (
          <SOttDiv key={key}>
            <SImg src={icon} alt={key} />
            <span onClick={() => {}}>최근 구독일 : {value.start}</span>

            <AiOutlineClose
              onClick={() => onClickDeleteOtt2(key)}
              style={{
                fontSize: "5vw",
                color: "white",
              }}
            />
          </SOttDiv>
        );
      })}
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
            <span
              onClick={() => {
                let copy = [...showDatePicker];
                copy[idx] = true;
                setShowDatePicker(copy);
              }}
            >
              최근 구독일 : {ott.subscriptionDate}
            </span>
            {showDatePicker[idx] ? (
              <DatePickerWrapper>
                <DatePicker
                  selected={today}
                  onChange={(date: Date) => handleDateChange(date, idx)}
                  inline
                />
              </DatePickerWrapper>
            ) : null}

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
      {otts.length >= 4 ? null : (
        <SBoxContainer>
          <SAddBox onClick={modalHandler}>+</SAddBox>
        </SBoxContainer>
      )}
    </SContainer>
  );
};

export default OttSubscription;

const DatePickerWrapper = styled.div`
  position: relative;
  z-index: 9999;
`;

const SContainer = styled.div`
  height: 40vh;
  overflow: auto;
`;

const Sdiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 1vw 0;
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

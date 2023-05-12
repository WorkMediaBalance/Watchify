import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useRecoilState } from "recoil";
import { ottSubscriptionState } from "recoil/userState";

import { AiOutlineClose } from "react-icons/ai";

import netflixIcon from "assets/img/netflixIcon.png";
import disneyIcon from "assets/img/disneyIcon.png";
import watchaIcon from "assets/img/watchaIcon.png";
import wavveIcon from "assets/img/wavveIcon.png";
import { theme } from "styles/theme";

// ott 추가 함수 정의를 위한 기초 설정 (왜 global 설정하고 window에서 하는지는 모름..)
declare global {
  interface Window {
    addOtt: (name: string, subscriptionDate: string) => void;
  }
}

const OttSubscription = () => {
  const navigate = useNavigate();

  const [ott, setOtt] = useRecoilState(ottSubscriptionState);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<{ [key: string]: boolean }>({
    netflix: false,
    disney: false,
    watcha: false,
    wavve: false,
  });

  const [today, setToday] = useState(new Date());
  const [is4, setIs4] = useState<boolean>(false);

  // OTT 삭제 함수
  const onClickDeleteOtt = (key: string) => {
    setIsAdded(false);
    setIs4(false);
    setOtt((prev) => {
      const copy = { ...prev }; // 기존 객체 복사
      copy[key] = { start: null, end: null }; // 새로운 객체 생성 후 업데이트
      return copy; // 새로운 배열 반환
    });
  };

  // OTT 추가 함수
  window.addOtt = (key) => {
    setIsAdded(true);
    setOtt((prev) => {
      const copy = { ...prev }; // 기존 객체 복사

      let date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const newDate = `${year}-${month}-${day}`;

      copy[key] = { start: newDate, end: null }; // 새로운 객체 생성 후 업데이트
      return copy; // 새로운 배열 반환
    });
  };

  // 모달 이상한 상황에서 뜨는 거 방지 위해 만든 state
  const [blockModal, setBlockModal] = useState(false);
  // 달력 닫기 (Modal 활성화 안되게 하기 위해 함수형으로 분리)
  const closeDatePicker = (key: string) => {
    let copy = { ...showDatePicker };
    copy[key] = false;
    setShowDatePicker(copy);
    setBlockModal(true);
  };

  useEffect(() => {
    if (!isAdded) return;
    if (blockModal) return;

    // OTT 모두 구독중이면 모달 끄기
    let cnt = 0;
    for (const key in ott) {
      if (ott[key].start !== null) {
        cnt++;
      }
    }
    if (cnt === 4) {
      setIs4(true);
      Swal.close();
      return;
    }

    modalHandler();
  }, [ott]);

  const modalHandler = () => {
    setBlockModal(false);
    const result: { [key: string]: boolean } = {};
    if (ott.netflix.start) {
      result["netflix"] = true;
    } else {
      result["netflix"] = false;
    }
    if (ott.disney.start) {
      result["disney"] = true;
    } else {
      result["disney"] = false;
    }
    if (ott.watcha.start) {
      result["watcha"] = true;
    } else {
      result["watcha"] = false;
    }
    if (ott.wavve.start) {
      result["wavve"] = true;
    } else {
      result["wavve"] = false;
    }

    Swal.fire({
      title: "",
      text: "",
      background: theme.netflix.backgroundColor,
      confirmButtonText: "확인",
      confirmButtonColor: theme.netflix.pointColor,

      html: `<div>
  ${result.netflix ? "" : `<img src="${netflixIcon}" onclick="addOtt('netflix')" width="60vw" />`}
  ${result.disney ? "" : `<img src="${disneyIcon}" onclick="addOtt('disney')" width="60vw"/>`}
  ${result.watcha ? "" : `<img src="${watchaIcon}" onclick="addOtt('watcha')" width="60vw"/>`}
  ${result.wavve ? "" : `<img src="${wavveIcon}" onclick="addOtt('wavve')" width="60vw"/>`}

</div>`,
    });
  };

  const handDateChange = (date: Date, key: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const newDate = `${year}-${month}-${day}`;

    setOtt((prev) => {
      const copy = { ...prev };
      copy[key] = { ...copy[key], start: newDate }; // 해당 객체의 값을 변경하여 복사본에 할당
      return copy; // 새로운 배열 반환
    });
  };

  return (
    <SContainer>
      <Sdiv>보유 OTT</Sdiv>
      <SDiv2>
        구독중인 OTT가 있으시면 알려주세요. <br /> OTT 맞춤으로 스케줄링 할게요!
      </SDiv2>
      {Object.entries(ott).map(([key, value]) => {
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
          <>
            {value.start ? (
              <SOttDiv key={key}>
                <SImg src={icon} alt={key} />
                <span
                  onClick={() => {
                    let copy = { ...showDatePicker };
                    copy[key] = true;
                    setShowDatePicker(copy);
                  }}
                >
                  최근 구독일 : {value.start}
                </span>
                {showDatePicker[key] ? (
                  <DatePickerWrapper>
                    <DatePicker
                      selected={today}
                      onChange={(date: Date) => {
                        handDateChange(date, key);
                        closeDatePicker(key);
                      }}
                      inline
                    />
                  </DatePickerWrapper>
                ) : null}
                <AiOutlineClose
                  onClick={() => onClickDeleteOtt(key)}
                  style={{
                    fontSize: "5vw",
                    color: "white",
                  }}
                />
              </SOttDiv>
            ) : null}
          </>
        );
      })}

      {!is4 ? (
        <SBoxContainer>
          <SAddBox onClick={modalHandler}> + </SAddBox>
        </SBoxContainer>
      ) : null}
    </SContainer>
  );
};

export default OttSubscription;

const DatePickerWrapper = styled.div`
  position: fixed;
  z-index: 10;

  top: 50%;
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

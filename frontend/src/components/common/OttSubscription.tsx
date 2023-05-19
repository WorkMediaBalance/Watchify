import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AiOutlineClose } from "react-icons/ai";

import disneyIcon from "assets/img/otticons/DisneyIcon.png";
import netflixIcon from "assets/img/otticons/NetflixIcon.png";
import watchaIcon from "assets/img/otticons/WatchaIcon.png";
import wavveIcon from "assets/img/otticons/WavveIcon.png";
import { theme } from "styles/theme";

import { myOTTget, myOTTChange } from "apis/apiMy";
import { subscription } from "interface/user";

import { DateTime } from "luxon";

// ott 추가 함수 정의를 위한 기초 설정 (왜 global 설정하고 window에서 하는지는 모름..)
declare global {
  interface Window {
    addOtt: (name: string, subscriptionDate: string) => void;
  }
}

const OttSubscription = () => {
  const navigate = useNavigate();

  // OTT별 구독 상태 state
  const [ott, setOtt] = useState<subscription>({
    netflix: { start: null, end: null },
    watcha: { start: null, end: null },
    wavve: { start: null, end: null },
    disney: { start: null, end: null },
  });

  // OTT 구독이 추가되었는지
  const [isAdded, setIsAdded] = useState<boolean>(false);
  // 달력 띄우기 위한 state (index 0 : 구독시작날짜, index 1 : 구독종료날짜)
  const [showDatePicker, setShowDatePicker] = useState<{ [key: string]: [boolean, boolean] }>({
    netflix: [false, false],
    disney: [false, false],
    watcha: [false, false],
    wavve: [false, false],
  });

  const [today, setToday] = useState(new Date());
  const [is4, setIs4] = useState<boolean>(false);

  // 추가, 또는 삭제가 발생했는지 알기위해
  const [sthHappend, setSthHappend] = useState(false);

  // 유저 OTT 구독 정보 불러오기
  async function myOTTgetAPI() {
    try {
      const myOTTInfo = await myOTTget();

      let copy = { ...ott };
      copy = myOTTInfo;
      setOtt(copy);
    } catch {}
  }

  // OTT 구독정보 업데이트 시 다시 정보 올라오기
  useEffect(() => {
    setTimeout(() => {
      myOTTgetAPI();
    }, 100);
  }, [sthHappend]);

  // OTT 구독해지, 삭제 함수
  const onClickDeleteOtt = (key: string) => {
    Swal.fire({
      title: "",
      text: "구독해지 또는 삭제 버튼을 터치하세요.",
      background: theme.netflix.backgroundColor,
      confirmButtonText: "구독해지",
      confirmButtonColor: theme.netflix.pointColor,

      showCancelButton: true,
      cancelButtonText: "OTT 삭제",
      cancelButtonColor: theme.netflix.pointColor,

      //       html: `<div>
      // </div>`,
    }).then((result) => {
      // 구독해지시 만료일이 null이면 현재일 기준 가장 가까운 -1일 계산해서 보여줌
      if (result.isConfirmed) {
        setIsAdded(false);
        const copy = { ...ott };

        // 여기서부터 구독해지일 logic구현
        const startDate = copy[key].start as string; // 반드시 null이 아니기 때문에 string으로 지정
        const today = new Date().toISOString().split("T")[0]; // 오늘 날짜

        const endDate = calculateNetflixSubscriptionCancellationDate(startDate, today); // 계산된 구독해지일

        copy[key] = { ...copy[key], end: endDate };
        myOTTChange(copy);
        setSthHappend(!sthHappend);
      }
      if (result.dismiss === Swal.DismissReason.cancel) {
        const copy = { ...ott };
        copy[key] = { ...copy[key], start: null, end: null };

        myOTTChange(copy);
        setIsAdded(false);
        setIs4(false);
        setSthHappend(!sthHappend);
      }
    });
  };

  // 구독해지일 계산 함수
  function calculateNetflixSubscriptionCancellationDate(
    subscriptionStartDate: string,
    today: string
  ): string | null {
    const startDate = DateTime.fromISO(subscriptionStartDate).startOf("day");
    const currentDate = DateTime.fromISO(today).startOf("day");

    let cancellationDate = startDate.plus({ months: 1 }).minus({ days: 1 });

    while (cancellationDate < currentDate) {
      const daysInMonth = cancellationDate.daysInMonth;
      cancellationDate = cancellationDate.plus({ days: daysInMonth });
    }

    return cancellationDate.toISODate();
  }

  // OTT 추가 함수
  window.addOtt = (key) => {
    setIsAdded(true);
    const copy = { ...ott };
    let date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const newDate = `${year}-${month}-${day}`;
    copy[key] = { start: newDate, end: null }; // 새로운 객체 생성 후 업데이트

    myOTTChange(copy);
    setSthHappend(!sthHappend);
  };

  // 모달 이상한 상황에서 뜨는 거 방지 위해 만든 state
  const [blockModal, setBlockModal] = useState(false);
  // OTT 구독 시작 달력 닫기 (Modal 활성화 안되게 하기 위해 함수형으로 분리)
  const closeDatePicker = (key: string) => {
    let copy = { ...showDatePicker };
    copy[key][0] = false;
    setShowDatePicker(copy);
    setBlockModal(true);
  };

  // OTT 구독 해지 달력 닫기 (Modal 활성화 안되게 하기 위해 함수형으로 분리)
  const closeDatePicker2 = (key: string) => {
    let copy = { ...showDatePicker };
    copy[key][1] = false;
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

  // 구독 시작 날짜 변경
  const handleDateChange = (date: Date, key: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const newDate = `${year}-${month}-${day}`;

    // 시작날짜, 종료날짜를 숫자 형태로 가져와서 비교
    const startDateNumber = Number(`${year}${month}${day}`);
    // 무기한 구독이 아닐 때 로직 (number 비교를 위해)
    if (ott[key].end !== null) {
      const endDateNumber = Number(ott[key].end?.replace(/-/g, "")); // 정규표현식 사용해서 -를 ''로 변경
      if (startDateNumber > endDateNumber) {
        Swal.fire({
          title: "",
          text: "구독 종료일 이전 날짜를 선택해주세요.",
          background: theme.netflix.backgroundColor,
          confirmButtonText: "확인",
          confirmButtonColor: theme.netflix.pointColor,
        });
        return;
      }
    }
    const copy = { ...ott };
    copy[key] = { ...copy[key], start: newDate };

    myOTTChange(copy);
    setSthHappend(!sthHappend);
  };

  // 구독 해지 날짜 변경
  const handleDateChange2 = (date: Date, key: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const newDate = `${year}-${month}-${day}`;

    // 시작날짜, 종료날짜를 숫자 형태로 가져와서 비교
    const startDateNumber = Number(ott[key].start?.replace(/-/g, "")); // 정규표현식 사용해서 -를 ''로 변경
    const endDateNumber = Number(`${year}${month}${day}`);
    if (startDateNumber > endDateNumber) {
      Swal.fire({
        title: "",
        text: "구독 시작일 이후 날짜를 선택해주세요.",
        background: theme.netflix.backgroundColor,
        confirmButtonText: "확인",
        confirmButtonColor: theme.netflix.pointColor,
      });
      return;
    }

    const copy = { ...ott };
    copy[key] = { ...copy[key], end: newDate };

    myOTTChange(copy);
    setSthHappend(!sthHappend);
  };

  return (
    <Wrapper>
      <SContainer>
        <Sdiv>보유 OTT</Sdiv>
        <SDiv2>
          구독중인 OTT가 있으시면 알려주세요. <br /> OTT 맞춤으로 스케줄링 할게요!
        </SDiv2>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        width: "60%",
                      }}
                    >
                      <div
                        onClick={() => {
                          let copy = { ...showDatePicker };
                          copy[key][0] = true;
                          setShowDatePicker(copy);
                        }}
                      >
                        {value.start}
                      </div>
                      <div>~</div>
                      <div
                        onClick={() => {
                          let copy = { ...showDatePicker };
                          copy[key][1] = true;
                          setShowDatePicker(copy);
                        }}
                      >
                        {/* 해지일이 존재하면 띄워주고 아니면 제한없음으로 표시 */}
                        {value.end ? <div>{value.end}</div> : <div>∞</div>}
                      </div>
                      {showDatePicker[key][0] ? (
                        <DatePickerWrapper>
                          <DatePicker
                            selected={today}
                            onChange={(date: Date) => {
                              handleDateChange(date, key);
                              closeDatePicker(key);
                            }}
                            inline
                          />
                        </DatePickerWrapper>
                      ) : null}
                      {showDatePicker[key][1] ? (
                        <DatePickerWrapper>
                          <DatePicker
                            selected={today}
                            onChange={(date: Date) => {
                              handleDateChange2(date, key);
                              closeDatePicker2(key);
                            }}
                            inline
                          />
                        </DatePickerWrapper>
                      ) : null}
                    </div>
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
        </div>

        {!is4 ? (
          <SBoxContainer>
            <SAddBox onClick={modalHandler}> + </SAddBox>
          </SBoxContainer>
        ) : null}
      </SContainer>
    </Wrapper>
  );
};

export default OttSubscription;

const DatePickerWrapper = styled.div`
  position: fixed;
  z-index: 10;

  top: 50%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SContainer = styled.div`
  height: 40vh;
  overflow: auto;
  // width: 90%;
`;

const Sdiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 1vh 0;
  padding-left: 0.5rem;
`;

const SDiv2 = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  text-align: left;
  margin: 1vh 0;
  padding-left: 2vw;
  margin-bottom: 1vh;
`;

const SOttDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  width: 90%;
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

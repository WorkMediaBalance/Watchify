import React, { useState, useEffect } from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

import { theme } from "styles/theme";

import disneyIcon from "assets/img/otticons/DisneyIcon.png";
import disneySelected from "assets/img/otticons/DisneyIconSelected.png";
import netflixIcon from "assets/img/otticons/NetflixIcon.png";
import netflixSelected from "assets/img/otticons/NetflixIconSelected.png";
import watchaIcon from "assets/img/otticons/WatchaIcon.png";
import watchaSelected from "assets/img/otticons/WatchaIconSelected.png";
import wavveIcon from "assets/img/otticons/WavveIcon.png";
import wavveSelected from "assets/img/otticons/WavveIconSelected.png";

import { useRecoilState } from "recoil";
import { schedulePreInfoState } from "recoil/schedulePreInfoState";

import { AiOutlineCalendar } from "react-icons/ai";

const ScheduleOttDate = () => {
  // OTT별 구독 상태 state
  const [ott, setOtt] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [today, setToday] = useState<number>();

  // 스케줄 생성 preData recoil
  const [preData, setPreData] = useRecoilState(schedulePreInfoState);

  // OTT 수정 recoil 반영
  useEffect(() => {
    let copy = { ...preData };
    copy = { ...copy, ott: ott, startDate: startDate };
    setPreData(copy);
  }, [ott, startDate]);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const newDate = `${year}-${month}-${day}`;

    const numberDate = Number(`${year}${month}${day}`);
    setToday(numberDate);
    setStartDate(newDate);
  }, []);

  const ottChange = (e: React.MouseEvent<HTMLImageElement>) => {
    const clickedOtt: string = e.currentTarget.alt;

    if (ott.includes(clickedOtt)) {
      const index = ott.indexOf(clickedOtt);
      setOtt((prevOtt) => {
        const newOtt = [...prevOtt];
        newOtt.splice(index, 1);
        return newOtt;
      });
    } else {
      setOtt((prevOtt) => prevOtt.concat(clickedOtt));
    }
  };

  const handleDateChange = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const newDate = `${year}-${month}-${day}`;

    const numberDate = Number(`${year}${month}${day}`);
    if (today) {
      if (numberDate >= today) {
        setStartDate(newDate);
        setShowDatePicker(false);
      } else {
        Swal.fire({
          title: "",
          text: "오늘 이전 날짜는 선택할 수 없습니다.",
          background: theme.netflix.backgroundColor,
          confirmButtonText: "확인",
          confirmButtonColor: theme.netflix.pointColor,
        });
      }
    }
  };
  return (
    <Wrapper>
      <SContainer>
        <Sdiv>OTT</Sdiv>
        <SDiv2>
          스케줄에 포함시킬 OTT가 있으시면 알려주세요. <br /> OTT 맞춤으로 스케줄링 할게요!
        </SDiv2>
        <OTTContainer>
          <SImg
            onClick={ottChange}
            src={ott.includes("netflix") ? netflixSelected : netflixIcon}
            alt="netflix"
          />
          <SImg
            onClick={ottChange}
            src={ott.includes("disney") ? disneySelected : disneyIcon}
            alt="disney"
          />
          <SImg
            onClick={ottChange}
            src={ott.includes("watcha") ? watchaSelected : watchaIcon}
            alt="watcha"
          />
          <SImg
            onClick={ottChange}
            src={ott.includes("wavve") ? wavveSelected : wavveIcon}
            alt="wavve"
          />
        </OTTContainer>
        <Sdiv style={{}}>스케줄 시작 날짜</Sdiv>
        <SDiv2>스케줄을 시작할 날짜를 설정해주세요</SDiv2>
        <Sdiv
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: "10vh",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <span>
              {startDate &&
                `${startDate.slice(0, 4)}년 ${startDate.slice(5, 7)}월 ${startDate.slice(
                  8,
                  10
                )}일  `}
            </span>
            <span
              style={{ color: "#F08C5A", marginLeft: "3vw", paddingTop: "0.5vh" }}
              onClick={() => setShowDatePicker(true)}
            >
              <AiOutlineCalendar size={30} />
            </span>
          </div>
        </Sdiv>
        {showDatePicker ? (
          <DatePickerWrapper>
            <DatePicker
              selected={new Date()}
              inline
              onChange={(date: Date) => handleDateChange(date)}
            />
          </DatePickerWrapper>
        ) : null}
      </SContainer>
    </Wrapper>
  );
};

export default ScheduleOttDate;

const DatePickerWrapper = styled.div`
  position: fixed;
  z-index: 10;

  top: 50%;
  left: 20%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SContainer = styled.div`
  height: 40vh;
  overflow: auto;
  width: 90%;
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
  justify-content: space-around;
  margin-bottom: 0.5rem;
`;

const SImg = styled.img`
  width: 17vw;
  height: 17vw;

  margin: 1vw;
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

const OTTContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

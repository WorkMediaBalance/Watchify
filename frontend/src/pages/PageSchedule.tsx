import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import WatchingPattern from "components/common/WatchingPattern";
import ScheduleOttDate from "components/common/ScheduleOttDate";

import { scheduleInfoAll } from "apis/apiSchedule";

import { scheduleAllState } from "recoil/scheduleState";
import { useRecoilState } from "recoil";

const PageSchedule = () => {
  const [scheduleAll, setScheduleAll] = useState({});
  const [recoilScheduleAll, setRecoilScheduleAll] = useRecoilState(scheduleAllState);
  const getScheduleAll = async () => {
    const data = await scheduleInfoAll();

    if (data !== false) {
      setScheduleAll(data);
      setRecoilScheduleAll(data);
    }
    return data;
  };

  const location = useLocation();
  const [isShow, setIsShow] = useState(false);
  const setNavigation = async () => {
    if (!location.state?.isMakeNew) {
      if (localStorage.getItem("accessToken") !== null) {
        const data = await getScheduleAll();

        if (Object.keys(data).length !== 0) {
          navigate("/schedule/result");
        } else {
          setIsShow(true);
        }
      } else {
        if (recoilScheduleAll !== null) {
        } else {
        }
      }
    } else {
      setIsShow(true);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    setNavigation();
  }, []);

  return (
    <>
      {isShow && (
        <Container className={"container"}>
          <div
            style={{
              height: "45vh",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <WatchingPattern />
          </div>
          <ScheduleOttDate />
          <SBtnContainer>
            <SNextBtn onClick={() => navigate("/schedule/content")}>다음</SNextBtn>
          </SBtnContainer>
          <PlaceHolder />
        </Container>
      )}
    </>
  );
};

export default PageSchedule;

const Container = styled.div`
  height: 91vh;
  display: flex;
  flex-direction: column;
  color: white;
  width: 100vw;
`;

const SBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const SNextBtn = styled.div`
  width: 85vw;
  border-radius: 8px;

  padding: 0.2rem 0;
  background-color: ${({ theme }) => theme.netflix.pointColor};
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  text-align: center;
`;

const PlaceHolder = styled.div`
  height: 5vh;
`;

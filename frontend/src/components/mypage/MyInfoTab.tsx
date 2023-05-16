import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OttSubscription from "components/common/OttSubscription";
import NotificationSettingComponent from "./NotificationSettingComponent";

import { myAlarmInfo } from "apis/apiMy";
import { content } from "./../../interface/content";

import LogoutLogic from "hooks/LogoutLogic";
import { useNavigate } from "react-router-dom";

const MyInfoTab = () => {
  const navigate = useNavigate();
  const [ottInfo, setOttInfo] = useState("없음");
  const [contentInfo, setContentInfo] = useState("없음");

  const logout = LogoutLogic();
  const onClickLogout = () => {
    logout();
  };
  // 유저 알람 설정 정보 불러오기
  async function setMyAlarmInfo() {
    try {
      const newUserInfo = await myAlarmInfo();
      // boolean -> string 형태로 변경
      if (newUserInfo.ott === true) {
        setOttInfo("true");
      } else {
        setOttInfo("false");
      }

      if (newUserInfo.content === true) {
        setContentInfo("true");
      } else {
        setContentInfo("false");
      }
    } catch {}
  }

  useEffect(() => {
    setMyAlarmInfo();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "90%" }}>
        <Container>
          {/* <OttSubscription /> */}
          <Title>알림 설정</Title>
          <RadioConatainerContainer>
            <RadioConatainer>
              <NotificationSettingComponent
                title={"OTT 구독 알림"}
                apiLink={"ottalarm"}
                isOn={ottInfo} // TODO: 여기 axios 받아온 값을 문자로 바꿔서 내려주기
              />
              <NotificationSettingComponent
                title={"컨텐츠 시청 알림"}
                apiLink={"contentalarm"}
                isOn={contentInfo} // TODO: 여기 axios 받아온 값을 문자로 바꿔서 내려주기
              />
            </RadioConatainer>
          </RadioConatainerContainer>
          <button
            onClick={() => {
              onClickLogout();
              navigate("/login");
            }}
          >
            로그아웃
          </button>
        </Container>
      </div>
    </div>
  );
};

export default MyInfoTab;

const Container = styled.div`
  color: ${({ theme }) => theme.netflix.fontColor};
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 0.5rem 0;
  padding-left: 0.5rem;
`;

const RadioConatainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RadioConatainer = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OttSubscription from "components/common/OttSubscription";
import NotificationSettingComponent from "./NotificationSettingComponent";

import { myAlarmInfo } from "apis/apiMy";

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
      <div>
        <Container>
          <OttSubscription />
          <BottomContainer>
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
            <LogOutContainer>
              <LogOut
                onClick={() => {
                  onClickLogout();
                  navigate("/");
                }}
              >
                로그아웃
              </LogOut>
            </LogOutContainer>
          </BottomContainer>
        </Container>
      </div>
    </div>
  );
};

export default MyInfoTab;

const Container = styled.div`
  color: ${({ theme }) => theme.netflix.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 5vw;
  font-weight: 600;
  text-align: left;
  width: 100%;
`;

const RadioConatainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 100%;
  padding: 0.5rem;
`;

const RadioConatainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const LogOutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const LogOut = styled.div`
  margin: 3vw;
  margin-top: 10vw;
  text-decoration: underline;
`;

const BottomContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

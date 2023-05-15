import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { myOttAlarm, myContentAlarm } from "apis/apiMy";

interface NotificationSettingComponentProps {
  title: string;
  apiLink: string; // 어느 API로 쏠 것인지 -> api/my/{이부분}
  isOn: string;
}

const NotificationSettingComponent: React.FC<NotificationSettingComponentProps> = ({
  title,
  apiLink,
  isOn,
}) => {
  const [selected, setSelected] = useState<string | null>(null); //TODO: axios 받아와서 초기값 세팅, 라디오 버튼은 문자열 밸류라 axios 전송시 조건문으로 bool로 바꿔줄것

  const handleRadiSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    // OTT, 알람 변경 API 요청
    if (title === "OTT 구독 알림") {
      myOttAlarm();
    } else if (title === "컨텐츠 시청 알림") {
      myContentAlarm();
    }
  };

  useEffect(() => {
    setSelected(isOn);
  }, [isOn]);

  return (
    <Container>
      <STitle>{title}</STitle>
      <ButtonContainer>
        <div>
          <SLabel>On</SLabel>
          <input
            type="radio"
            value="true"
            checked={selected === "true"}
            onChange={handleRadiSelect}
          />
        </div>
        <div>
          <SLabel>Off</SLabel>
          <input
            type="radio"
            value="false"
            checked={selected === "false"}
            onChange={handleRadiSelect}
          />
        </div>
      </ButtonContainer>
    </Container>
  );
};

export default NotificationSettingComponent;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 2vh;
`;

const STitle = styled.div`
  font-size: 4vw;
  font-weight: 600;
`;

const SLabel = styled.label`
  font-size: 4vw;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

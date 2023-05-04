import React from "react";
import styled from "styled-components";
import OttSubscription from "components/common/OttSubscription";
import NotificationSettingComponent from "./NotificationSettingComponent";

const MyInfoTab = () => {
  return (
    <Container>
      <OttSubscription />
      <Title>알림 설정</Title>
      <RadioConatainerContainer>
        <RadioConatainer>
          <NotificationSettingComponent
            title={"OTT 구독 알림"}
            apiLink={"ottalarm"}
            isOn={"true"} // TODO: 여기 axios 받아온 값을 문자로 바꿔서 내려주기
          />
          <NotificationSettingComponent
            title={"컨텐츠 시청 알림"}
            apiLink={"contentalarm"}
            isOn={"false"} // TODO: 여기 axios 받아온 값을 문자로 바꿔서 내려주기
          />
        </RadioConatainer>
      </RadioConatainerContainer>
    </Container>
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

import React from "react";
import styled from "styled-components";

const OttSubscription = () => {
  return (
    <>
      <Sdiv>보유 OTT</Sdiv>
      <SDiv2>구독중인 OTT가 있으시면 알려주세요.</SDiv2>
      <SDiv2>OTT 맞춤으로 스케줄링 할게요!</SDiv2>
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

import React, { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ScheduleBottomSheet from "components/schedule/ScheduleBottomSheet";

import pic from "assets/img/netflixIcon.png";

const PageScheduleContent = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [essContents, setEssContents] = useState<string[] | null>(["병진", "용찬", "준형", "은성"]);

  return (
    <Container>
      <SDiv>필수 시청 목록</SDiv>
      <SDiv2>스케줄 생성시 꼭 보고 싶은 컨텐츠를 담아주세요!</SDiv2>
      <ContentsContainer>
        {essContents &&
          essContents.map((content, idx) => (
            <SBoxContainer key={idx}>
              <SContent />
            </SBoxContainer>
          ))}
        <SBoxContainer>
          <SAddBox onClick={() => setIsOpen(true)}>+</SAddBox>
        </SBoxContainer>
      </ContentsContainer>

      <SBtnContainer>
        <SNextBtn onClick={() => navigate("/schedule/result")}>다음</SNextBtn>
      </SBtnContainer>
      <ScheduleBottomSheet
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </Container>
  );
};

export default PageScheduleContent;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
`;

const SDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin: 0.5rem 0;
  padding-left: 0.5rem;
`;

const SDiv2 = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  text-align: left;
  margin: 0.2rem 0;
  padding-left: 0.5rem;
`;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.3rem;
  justify-items: center;
`;

const SContent = styled.div`
  background-image: url("https://picsum.photos/1920/1080");
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 10px;
  margin: 0 0.5rem;
  width: 25vw;
  height: 35vw;
`;

const SBoxContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const SAddBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed white;
  border-radius: 10px;
  margin: 0 0.5rem;

  width: 25vw;
  height: 35vw;
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
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

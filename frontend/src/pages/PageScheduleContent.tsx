import React, { useState, HTMLAttributes, useEffect } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { essListState } from "recoil/userState";
import { schedulePreInfoState } from "recoil/schedulePreInfoState";
import { useRecoilState } from "recoil";

import ScheduleBottomSheet from "components/schedule/ScheduleBottomSheet";

import { AiOutlineMinusCircle } from "react-icons/ai";
import Lottie from "lottie-react";
import scheduleGIF from "assets/gif/schedule-calendar-animation.json";

import { scheduleCreate } from "apis/apiSchedule";

const PageScheduleContent = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 필수시청목록 (API 요청시에는 사용 X)
  const [essList, setEssList] = useRecoilState(essListState);

  // 스케줄 생성 preData recoil
  const [preData, setPreData] = useRecoilState(schedulePreInfoState);

  // 필수 시청 목록 recoil 반영
  useEffect(() => {
    let pks: number[] = [];
    essList.forEach((content) => {
      pks.push(content.pk);
    });
    let copy = { ...preData };
    copy = { ...copy, contents: pks };
    setPreData(copy);
  }, [essList]);

  // 로딩 관련 state (0: 첫화면, 1: 다음 클릭 0~2초, 2: 다음 클릭 2초 후)
  const [isLoading, setIsLoading] = useState<number>(0);

  const onClickDelete = (idx: number) => {
    const index = essList.findIndex((ess, essIdx) => essIdx === idx);
    if (index !== -1) {
      const newEssList = [...essList];
      newEssList.splice(index, 1);
      setEssList(newEssList);
    }
  };

  useEffect(() => {
    let appBar = document.getElementById("app-bar");
    let appBarMargin = document.getElementById("app-bar-margin");
    let BottomDot = document.getElementById("bottom-dot");
    if (isLoading === 1) {
      if (appBar) {
        appBar.style.display = "none";
        appBar.style.position = "absolute";
        if (appBarMargin) {
          appBarMargin.style.marginTop = "0";
        }
      }
      if (BottomDot) {
        BottomDot.style.display = "none";
        BottomDot.style.position = "absolute";
      }
    } else if (isLoading === 2) {
      if (appBar) {
        appBar.style.display = "block";
        appBar.style.position = "sticky";
        if (appBarMargin) {
          appBarMargin.style.marginTop = "5vh";
        }
      }
      if (BottomDot) {
        BottomDot.style.display = "block";
        BottomDot.style.position = "sticky";
      }
    }
    return () => {
      if (appBar) {
        appBar.style.display = "block";
        appBar.style.position = "sticky";
        if (appBarMargin) {
          appBarMargin.style.marginTop = "5vh";
        }
      }
      if (BottomDot) {
        BottomDot.style.display = "block";
        BottomDot.style.position = "sticky";
      }
    };
  }, [isLoading]);

  const onClickLoading = () => {
    setIsLoading(1);
    // 스케줄 생성 API 요청
    scheduleCreate(preData);
    setTimeout(() => {
      setIsLoading(2);
      // setPreData({
      //   startDate: "",
      //   contents: [],
      //   patterns: [],
      //   ott: [],
      // });
    }, 2000);
  };

  useEffect(() => {
    if (isLoading === 2) {
      navigate("/schedule/result");
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingComponent>
          <LottieContainer>
            <Lottie animationData={scheduleGIF} />
          </LottieContainer>
        </LoadingComponent>
      ) : (
        <Wrapper>
          <Container>
            <SDiv>필수 시청 목록</SDiv>
            <SDiv2>스케줄 생성시 꼭 보고 싶은 컨텐츠를 담아주세요!</SDiv2>
            <ContentsContainer>
              {essList &&
                essList.map((content, idx) => (
                  <SBoxContainer key={idx}>
                    <SContent imgUrl={essList[idx].imgPath}>
                      <SRemoveDiv onClick={() => onClickDelete(idx)}>
                        <SAiOutlineMinusCircle />
                      </SRemoveDiv>
                    </SContent>
                  </SBoxContainer>
                ))}
              <SBoxContainer>
                <SAddBox onClick={() => setIsOpen(true)}>+</SAddBox>
              </SBoxContainer>
            </ContentsContainer>

            <SBtnContainer>
              <SNextBtn onClick={onClickLoading}>다음</SNextBtn>
            </SBtnContainer>
            <ScheduleBottomSheet
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
            />
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default PageScheduleContent;

const Container = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  text-align: left;
  margin-top: 2vh;
  padding-left: 2vw;
`;

const SDiv2 = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  text-align: left;
  margin: 1vh 0;
  padding-left: 2vw;
`;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.3rem;
  justify-items: center;
`;

interface SContentProps extends HTMLAttributes<HTMLDivElement> {
  imgUrl?: string;
}

const SContent = styled.div`
  background-image: url(${({ imgUrl }: SContentProps) => imgUrl});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 10px;
  margin: 0 0.5rem;
  width: 25vw;
  height: 35vw;
`;

const SAiOutlineMinusCircle = styled(AiOutlineMinusCircle)`
  color: ${({ theme }) => theme.netflix.pointColor};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.netflix.tabColor};
`;

const SRemoveDiv = styled.div`
  position: absolute;
  top: -5%;
  left: 80%;
`;

const SBoxContainer = styled.div`
  display: flex;
  position: relative;
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

const LoadingComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LottieContainer = styled.div`
  width: 40vw;
  height: 40vw;
`;

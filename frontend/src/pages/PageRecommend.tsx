import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RecBottomSheet from "../components/recommend/RecBottomSheet";
import disney from "../assets/img/disneyIcon.png";
import netflix from "../assets/img/netflixIcon.png";
import wavve from "../assets/img/wavveIcon.png";
import watcha from "../assets/img/watchaIcon.png";

const BaseDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #232323;
`;

const SheetDiv = styled.div`
  padding-top: 8vh;
  padding-left: 5vw;
  display: flex;
  flex-direction: column;
`;

const SheetBtn = styled.button`
  color: #ffffff;
  font-size: 1rem;
  border-radius: 12px;
  width: 32vw;
  height: 9vw;
  font-weight: 400;
  background-color: transparent;
  border: 1px solid #ffffff;
  margin-left: 1vw;
`;

const STitleP = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
`;

const SImg = styled.img`
  width: 20vw;
  height: 20vw;
  margin-right: 3vw;
`;

const SLabel = styled.label`
  margin-top: 2vh;
  margin-left: 2vw;
  font-size: 0.8rem;
  color: #ffffff;
  display: flex;
`;

const SRecBtn = styled.button`
  width: 90vw;
  height: 10vw;
  margin-top: 2vh;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #e50914;
  font-weight: 600;
  color: #ffffff;
  border: transparent;
`;

const PageRecommend = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdult, setIsAdult] = useState<boolean>(false);
  const [ott, setOtt] = useState<Array<string>>([]);
  const navigate = useNavigate();
  const goRecHandler = () => {
    // 추천 요청 axios 필요
    navigate("/recommend/result");
  };

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

  return (
    <BaseDiv>
      <SheetDiv>
        <STitleP>선호 장르</STitleP>
        <SheetBtn
          onClick={() => {
            setIsOpen(true);
          }}
        >
          선호 장르 선택
        </SheetBtn>
        <STitleP>대상 OTT</STitleP>
        <div style={{ display: "flex" }}>
          <SImg onClick={ottChange} src={netflix} alt="netflix" />
          <SImg onClick={ottChange} src={wavve} alt="wavve" />
          <SImg onClick={ottChange} src={disney} alt="disney" />
          <SImg onClick={ottChange} src={watcha} alt="watcha" />
        </div>
        <SLabel>
          민감 정보 포함 &nbsp;
          <input
            type="radio"
            name="sensitive"
            checked={isAdult}
            onClick={() => {
              setIsAdult(!isAdult);
            }}
            readOnly
          />
        </SLabel>
        <SRecBtn onClick={goRecHandler}>추천 받기</SRecBtn>
      </SheetDiv>
      <RecBottomSheet
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </BaseDiv>
  );
};
export default PageRecommend;

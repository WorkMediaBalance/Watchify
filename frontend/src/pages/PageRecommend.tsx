import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RecBottomSheet from "../components/recommend/RecBottomSheet";
import disney from "../assets/img/disneyIcon.png";
import netflix from "../assets/img/netflixIcon.png";
import wavve from "../assets/img/wavveIcon.png";
import watcha from "../assets/img/watchaIcon.png";
import { recGenreState } from "../recoil/recommendState";
import { useRecoilState } from "recoil";

const BaseDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SheetDiv = styled.div`
  padding-top: 8vh;
  // padding-left: 5vw;
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.netflix.backgroundColor};
`;

const SheetBtn = styled.button`
  color: #ffffff;
  font-size: 0.9rem;
  border-radius: 12px;
  width: 32vw;
  height: 4.5vh;
  font-weight: 400;
  background-color: transparent;
  border: 1px solid #ffffff;
  margin-left: 1vw;

  &.plus {
    width: 10vw;
  }
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
  background-color: ${({ theme }) => theme.netflix.pointColor};
  font-weight: 600;
  color: #ffffff;
  border: transparent;
`;

const SGridDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
  margin-left: 3vw;
`;

const SGenreBtn = styled.button`
  height: 4.5vh;
  color: #ffffff;
  background-color: ${({ theme }) => theme.netflix.pointColor};
  border: transparent;
  border-radius: 12px;
  min-width: 15.5vw;
  font-size: 0.8rem;
  padding-left: 8px;
  padding-right: 8px;
`;

const PageRecommend = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdult, setIsAdult] = useState<boolean>(false);
  const [ott, setOtt] = useState<Array<string>>([]);
  const [recGenre, setRecGenre] = useRecoilState(recGenreState);
  const genreHandler = (selGenre: string) => {
    setRecGenre(recGenre.filter((genre) => genre !== selGenre));
  };
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
        {recGenre.length ? (
          <SGridDiv>
            {recGenre.map((genre, idx) => {
              return (
                <SGenreBtn onClick={() => genreHandler(genre)} key={idx}>
                  {genre}
                </SGenreBtn>
              );
            })}
            <SheetBtn
              style={{ width: "10vw" }}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              +
            </SheetBtn>
          </SGridDiv>
        ) : (
          <SheetBtn
            onClick={() => {
              setIsOpen(true);
            }}
          >
            선호 장르 선택
          </SheetBtn>
        )}

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

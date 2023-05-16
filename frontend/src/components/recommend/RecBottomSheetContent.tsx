import React from "react";
import styled from "styled-components";
import { genres } from "../../constant/constant";
import { recGenreState } from "../../recoil/recommendState";
import { useRecoilState } from "recoil";

const SGridDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
  margin-top: 3vh;
  margin-left: 5vw;
`;

const SGenreBtn = styled.button<{ active: boolean }>`
  height: 4.5vh;
  color: ${({ theme }) => theme.netflix.fontColor};
  background-color: ${({ active, theme }) => (active ? theme.netflix.pointColor : "transparent")};
  border: ${({ active }) => (active ? "transparent" : "1px solid #ffffff")};
  border-radius: 12px;
  min-width: 15.5vw;
  font-size: 0.8rem;
  padding-left: 8px;
  padding-right: 8px;
`;

const SP = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-left: 5vw;
  margin-top: 0;
`;

const RecBottomSheetContent = () => {
  const [recGenre, setRecGenre] = useRecoilState(recGenreState);
  const genreSet = new Set(recGenre);

  const genreHandler = (selGenre: string) => {
    if (genreSet.has(selGenre)) {
      setRecGenre(recGenre.filter((genre) => genre !== selGenre));
    } else {
      setRecGenre([...recGenre, selGenre]);
    }
  };

  return (
    <>
      <div>
        <SP>장르 목록</SP>
        <SGridDiv>
          {genres.map((genre, idx) => {
            return (
              <SGenreBtn active={genreSet.has(genre)} onClick={() => genreHandler(genre)} key={idx}>
                {genre}
              </SGenreBtn>
            );
          })}
        </SGridDiv>
      </div>
    </>
  );
};

export default RecBottomSheetContent;

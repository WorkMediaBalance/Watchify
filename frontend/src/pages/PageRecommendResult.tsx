import React, { useState } from "react";
import styled from "styled-components";
import { recResultState } from "recoil/recommendState";
import { useRecoilState } from "recoil";
import { USER_NAME } from "constant/constant";
import { theme } from "styles/theme";
import NameTicker from "components/recommend/NameTicker";
import disney from "assets/img/disneyIcon.png";
import netflix from "assets/img/netflixIcon.png";
import watcha from "assets/img/watchaIcon.png";
import wavve from "assets/img/wavveIcon.png";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 92vh;
  margin-top: 0;
  background-color: ${theme.netflix.backgroundColor};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SRibbonDiv = styled.div<{ selected: boolean }>`
  width: 0;
  height: 0;
  margin-right: 2.5vw;
  border-bottom: ${(props) =>
    props.selected ? "2.7vh solid transparent" : "2vh solid transparent"};
  border-top: ${(props) => (props.selected ? "7vh solid #ff0000" : "5vh solid #ccc")};
  border-left: ${(props) => (props.selected ? "2.7vh solid #ff0000" : "2vh solid #ccc")};
  border-right: ${(props) => (props.selected ? "2.7vh solid #ff0000" : "2vh solid #ccc")};
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transition: all 0.2s ease-in-out;
`;

const SRibbonP = styled.p<{ selected: boolean }>`
  font-size: ${(props) => (props.selected ? "1.5rem" : "1.3rem")};
  font-weight: 600;
  margin-bottom: ${(props) => (props.selected ? "8.5vh" : "6.5vh")};
  color: #ffffff;
  transition: all 0.2s ease-in-out;
`;

const STitleP = styled.p`
  font-size: ${theme.fontSizeType.big.fontSize};
  font-weight: ${theme.fontSizeType.big.fontWeight};
  color: ${theme.netflix.fontColor};
  margin-top: 4vh;
`;

const SMainDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 55vh;
  border: 1px solid ${theme.netflix.fontColor};
  border-radius: 12px;
  background-color: ${theme.netflix.tabColor};
  margin-top: 1vh;
  flex-direction: column;
`;

const SContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`;

const SImg = styled.img`
  width: 40vw;
  height: 60vw;
  border-radius: 12px;
  margin-right: 6vw;
  margin-left: 6vw;
`;

const STextP = styled.p`
  font-size: ${theme.fontSizeType.middle.fontSize};
  font-weight: ${theme.fontSizeType.middle.fontWeight};
  color: ${theme.netflix.fontColor};
  margin-bottom: 2vh;
`;

const PageRecommendResult = () => {
  const [recResult, SetRecResult] = useRecoilState(recResultState);
  const [selectedNum, SetSelectedNum] = useState<number>(0);

  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const selectedId = event.currentTarget.id;
    SetSelectedNum(parseInt(selectedId));
  };

  const renderOTTIcons = () => {
    const ottList = recResult[selectedNum].ott;

    interface IconMap {
      [key: string]: string;
    }

    const icons: IconMap = {
      netflix: netflix,
      wavve: wavve,
      watcha: watcha,
      disney: disney,
    };

    return ottList.map((ott, index) => {
      if (icons.hasOwnProperty(ott)) {
        return (
          <img
            key={index}
            src={icons[ott]}
            alt={`${ott} 아이콘`}
            style={{ marginRight: "1vw", width: "5vh", height: "5vh" }}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <Wrapper>
      <STitleP>{USER_NAME}님을 위한 추천 컨텐츠</STitleP>
      <SMainDiv>
        <div style={{ display: "flex", marginLeft: "5vw", position: "absolute" }}>
          <SRibbonDiv id="0" onClick={onClickHandler} selected={selectedNum === 0}>
            <SRibbonP selected={selectedNum === 0}>1</SRibbonP>
          </SRibbonDiv>
          <SRibbonDiv id="1" onClick={onClickHandler} selected={selectedNum === 1}>
            <SRibbonP selected={selectedNum === 1}>2</SRibbonP>
          </SRibbonDiv>
          <SRibbonDiv id="2" onClick={onClickHandler} selected={selectedNum === 2}>
            <SRibbonP selected={selectedNum === 2}>3</SRibbonP>
          </SRibbonDiv>
        </div>
        <SContentDiv>
          <NameTicker
            title={recResult[selectedNum].title}
            episode={recResult[selectedNum].finalEpisode}
          />
          <div style={{ display: "flex", width: "100vw" }}>
            <SImg src={recResult[selectedNum].img_path} alt="#" />
            <div style={{ marginRight: "1vw" }}>
              <STextP>추천도 : 93%</STextP>
              <STextP>장르 : {recResult[selectedNum].genres.join(", ")}</STextP>
              <STextP>재생 시간 : {recResult[selectedNum].runtime}</STextP>
              <STextP>등급 : {recResult[selectedNum].audienceAge}</STextP>
              <div style={{ marginTop: "3vh", marginLeft: "-1vh" }}>{renderOTTIcons()}</div>{" "}
              {/*클릭 이벤트 (링크 이동) 필요 */}
            </div>
          </div>
        </SContentDiv>
      </SMainDiv>
    </Wrapper>
  );
};

export default PageRecommendResult;

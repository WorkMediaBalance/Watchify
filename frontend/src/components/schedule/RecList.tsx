import React, { useState, useEffect, HTMLAttributes } from "react";
import styled from "styled-components";

import { essListState } from "recoil/userState";
// import { recResultState } from "recoil/recommendState";
import { schedulePreInfoState } from "recoil/schedulePreInfoState";
import { useRecoilState } from "recoil";

import { FiCheckCircle } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";

import { content } from "interface/content";
import ContentPoster from "components/common/ContentPoster";

import { mainRecommend } from "apis/apiMain";

type recommendPerOtt = {
  [key: string]: content[];
};

const RecList = () => {
  const [recList, setRecList] = useState<content[]>([]);
  const [essList, setEssList] = useRecoilState(essListState);
  const [preData, setPreData] = useRecoilState(schedulePreInfoState);

  const [apiList, setApiList] = useState<recommendPerOtt | undefined>();

  // 추천목록 가져오기 API 함수
  const mainRecommendAPI = async () => {
    const data = await mainRecommend();
    setApiList(data);
  };
  useEffect(() => {
    mainRecommendAPI();
  }, []);

  // 바텀시트 추천목록 띄우기
  useEffect(() => {
    if (!apiList) return;
    // OTT를 선택하지 않았을 경우 - 각 OTT별 10개씩 총 40개 다 띄우기
    let copy = [];
    if (preData.ott.length === 0) {
      for (const key in apiList) {
        copy.push(...apiList[key]);
      }
      // OTT 선택했을 경우 - 각 OTT 컨텐츠 띄우기
    } else {
      if (preData.ott.includes("netflix")) {
        copy.push(...apiList["Netflix"]);
      }
      if (preData.ott.includes("disney")) {
        copy.push(...apiList["disney"]);
      }
      if (preData.ott.includes("watcha")) {
        copy.push(...apiList["watcha"]);
      }
      if (preData.ott.includes("wavve")) {
        copy.push(...apiList["Wavve"]);
      }
      setRecList(copy);
    }
  }, [apiList]);

  const onClickAddContent = (content: content) => {
    let copy = [...essList];
    copy = [...copy, content];
    setEssList(copy);
  };
  return (
    <div>
      <Layout>
        {recList &&
          recList.map((content, idx) => {
            const isAlready = essList.some((ess) => ess.pk === content.pk);
            return (
              <SContentsContainer key={idx}>
                <SBoxContainer>
                  <SContent>
                    <ContentPoster
                      content={content}
                      title={content.title}
                      imageUrl={content.imgPath}
                    ></ContentPoster>
                  </SContent>
                </SBoxContainer>
                <S1DepthContainer>
                  <S2DepthContainer>
                    <S3DepthContainer>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <STitleDiv className="STitleDiv">{content.title}</STitleDiv>
                        {isAlready ? (
                          <SFiCheckCircle />
                        ) : (
                          <SBsPlusCircle
                            onClick={() => onClickAddContent(content)}
                            className="SBsPlusCircle"
                          />
                        )}
                      </div>
                      {content.finalEpisode > 0 ? <div>{content.finalEpisode}부작</div> : null}
                    </S3DepthContainer>
                  </S2DepthContainer>

                  <SSumDiv>{content.summarize}</SSumDiv>
                </S1DepthContainer>
              </SContentsContainer>
            );
          })}
        <PlaceHolder />
      </Layout>
    </div>
  );
};

export default RecList;

const SFiCheckCircle = styled(FiCheckCircle)`
  padding-bottom: 0.2vh;
  width: 6vw;
  height: 6vw;
  color: ${({ theme }) => theme.netflix.pointColor};
`;

const SBsPlusCircle = styled(BsPlusCircle)`
  padding-bottom: 0.2vh;
  width: 6vw;
  height: 6vw;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.3rem;
  margin-top: 1rem;
  overflow: auto;
`;

const SContentsContainer = styled.div`
  display: flex;
  margin: 3vw;
`;

const S1DepthContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;
`;
const S2DepthContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const S3DepthContainer = styled.div`
  width: 60vw;
`;

const STitleDiv = styled.div`
  width: 80%;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
`;

const SSumDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize}
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
  margin-top: 1vh;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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

const SBoxContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const PlaceHolder = styled.div`
  height: 10vh;
`;

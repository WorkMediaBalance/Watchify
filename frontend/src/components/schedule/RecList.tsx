import React, { useState, useEffect, HTMLAttributes } from "react";
import styled from "styled-components";

import { essListState } from "recoil/userState";
import { recResultState } from "recoil/recommendState";
import { useRecoilState } from "recoil";

import { FiCheckCircle } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";

import { content } from "interface/content";

const RecList = () => {
  const [recList, setRecList] = useRecoilState(recResultState);
  const [essList, setEssList] = useRecoilState(essListState);

  const onClickAddContent = (content: content) => {
    let copy = [...essList];
    copy = [...copy, content];
    setEssList(copy);
  };
  return (
    <Layout>
      {recList &&
        recList.map((content, idx) => {
          const isAlready = essList.some((ess) => ess.pk === content.pk);
          return (
            <SContentsContainer key={idx}>
              <SBoxContainer>
                <SContent imgUrl={recList[idx].img_path} />
              </SBoxContainer>
              <S1DepthContainer>
                <S2DepthContainer>
                  <S3DepthContainer>
                    <STitleDiv>{content.title}</STitleDiv>
                    {content.finalEpisode > 0 ? (
                      <div>{content.finalEpisode}부작</div>
                    ) : null}
                  </S3DepthContainer>
                  {isAlready ? (
                    <SFiCheckCircle />
                  ) : (
                    <SBsPlusCircle onClick={() => onClickAddContent(content)} />
                  )}
                </S2DepthContainer>

                <SSumDiv>{content.summarize}</SSumDiv>
              </S1DepthContainer>
            </SContentsContainer>
          );
        })}
    </Layout>
  );
};

export default RecList;

const SFiCheckCircle = styled(FiCheckCircle)`
  width: 1.5rem;
  height: 1.5rem;
`;

const SBsPlusCircle = styled(BsPlusCircle)`
  color: ${({ theme }) => theme.netflix.pointColor};
  width: 1.5rem;
  height: 1.5rem;
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
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
`;

const SSumDiv = styled.div`
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
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

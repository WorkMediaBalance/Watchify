import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

import disney from "assets/img/otticons/DisneyIcon.png";
import netflix from "assets/img/otticons/NetflixIcon.png";
import watcha from "assets/img/otticons/WatchaIcon.png";
import wavve from "assets/img/otticons/WavveIcon.png";

import { content } from "interface/content";

import { contentInfo, contentLike, contentWishSwitch } from "apis/apiContent";

import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import ReactStars from "react-stars";

interface ContentSwalProps {
  content: content;
}

const ContentSwal: React.FC<ContentSwalProps> = ({ content: content }) => {
  const [isWish, setIsWish] = useState<boolean | null>(null); //TODO: props받아서 찜여부 초기값 설정 해주기
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [newContentInfo, setNewContentInfo] = useState<content | null>(null);

  // 단일 컨텐츠 정보 조회 API - 찜 최신화용
  async function contentInfoAPI(pk: number) {
    let newData = await contentInfo({ pk: pk });

    setNewContentInfo(newData);
    setIsWish(newData.wish);
    setRating(newData.like);
  }
  useEffect(() => {
    if (!content) return;

    contentInfoAPI(content.pk);
  }, []);

  const handleWishClick = () => {
    contentWishSwitch({ pk: content.pk });
    setIsWish(!isWish);
  };

  type OTTIconType = {
    [key: string]: string;
  };

  const OTTIcons: OTTIconType = {
    disney: disney,
    netflix: netflix,
    watcha: watcha,
    wavve: wavve,
  };

  const OTTStaticArray = Object.keys(content.ott); //TODO: 나중에 props 여기 초기화

  // const [OTTArray, setOTTArray] = useState(["disney", "netflix", "watcha", "wavve"]); //TODO: 여기서 나중에 초기값 세팅
  // 다른 탭 열기
  const openNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // 평점 변경 API
  const changeRating = (e: number) => {
    contentLike({ pk: content.pk, like: e });
    setRating(e);
  };

  return (
    <Container className="myModal">
      {isWish ? (
        <RibonTrue onClick={() => handleWishClick()} />
      ) : (
        <RibonFalse onClick={() => handleWishClick()} />
      )}
      <BackdropContainer className="backdropContainer" backdrop={content.backdropPath}>
        <Header>
          <LeftDiv>
            <TitleSeasonContainer>
              <Title>
                <div>{content.title}</div>
                <Season>{content.season > 0 ? `시즌 ${content.season}` : ""}</Season>
              </Title>
            </TitleSeasonContainer>
            <RateAndGenresContainer>
              <Rate>{`${content.rate} / 10.0`}</Rate>
              <Genres>
                {content.genres.length > 1
                  ? `${content.genres.slice(0, 2).join(", ")}`
                  : content.genres.length === 1
                  ? content.genres[0]
                  : ""}
              </Genres>
              <FinalEpisode>
                {content.finalEpisode > 0 ? `${content.finalEpisode}부작` : ""}
              </FinalEpisode>
            </RateAndGenresContainer>
          </LeftDiv>
          <LikeDislike>
            <div style={{ marginBottom: "1vh" }}>
              <ReactStars
                count={5}
                value={rating}
                edit={true}
                size={20}
                color1={"grey"}
                color2={"#F08C5A"}
                onChange={(e) => changeRating(e)}
              />
            </div>
            {/* <Like>
              {isLike === 1 ? (
                <StyledAiFillLike
                  size={20}
                  color="#FF5500"
                  onClick={() => {
                    handleLikeCancel();
                  }}
                />
              ) : (
                <StyledAiOutlineLike
                  size={20}
                  color="white"
                  onClick={() => {
                    handleLike();
                  }}
                />
              )}
            </Like>
            <Dislike>
              {isLike === -1 ? (
                <StyledAiFillDislike
                  size={20}
                  color="#FF5500"
                  onClick={() => {
                    handleDislikeCancel();
                  }}
                />
              ) : (
                <StyledAiOutlineDislike
                  size={20}
                  color="white"
                  onClick={() => {
                    handleDislike();
                  }}
                />
              )}
            </Dislike> */}
          </LikeDislike>
        </Header>
      </BackdropContainer>

      <ContentContainer>
        <div style={{ width: "100%" }}>
          <Summarize>{content.summarize !== "0" ? content.summarize : "추가 예정"}</Summarize>
        </div>
        <Footer>
          <LinkDescriptions>보러가기</LinkDescriptions>
          <OTTContainer>
            {OTTStaticArray.map((OTT: string, index) => {
              return (
                <OTTIcon
                  src={OTTIcons[OTT]}
                  onClick={() => {
                    openNewTab(content.ott[OTT]);
                  }}
                ></OTTIcon>
              );
            })}
          </OTTContainer>
        </Footer>
      </ContentContainer>
    </Container>
  );
};

export default ContentSwal;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 80vw;
  height: 45vh;
  background-color: ${({ theme }) => theme.netflix.tabColor};
  color: white;
  overflow: hidden;
`;
const BackdropContainer = styled.div<{ backdrop: string }>`
  width: 100%;
  height: 24vh;
  display: flex;
  flex-direction: column;
  justify-content: end;

  background-image: ${({ backdrop }) => `
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 1) 100%
    ),
    url(${backdrop})
  `};
  background-size: cover;
  background-position: center;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  height: 21vh;
`;
const TitleSeasonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 4vw;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
const Season = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
  margin-left: 1vw;
  width: 30%;
`;

const RateAndGenresContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 4vw;
  margin-bottom: 2vw;
`;
const Rate = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
`;
const Genres = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
  margin-left: 2vw;
`;
const FinalEpisode = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
  margin-left: 2vw;
`;

const Summarize = styled.div`
  margin: 4vw;
  margin-bottom: 2vw;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  height: 50%;
  margin-bottom: 1vh;
`;
const LinkDescriptions = styled.div`
  margin-left: 10vw;
`;
const OTTContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 3vw;
`;

const OTTIcon = styled.img`
  width: 6vh;
  height: 6vh;
  position: relative;
  margin: 1vw;
`;

const growShrink = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

// TODO: 이부분 커졌다 작아지는거, 재렌더링 때문에 그냥 애니메이션 무시되는 거 같은데, 나중에 다시 도전하기
const RibonTrue = styled.div`
  position: absolute;
  right: 3%;

  width: 8%;
  height: 12%;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 67%, 0% 100%);

  background-color: ${({ theme }) => theme.netflix.pointColor};
  animation: ${growShrink} 0.6s ease-in-out forwards;
`;
const RibonFalse = styled.div`
  position: absolute;
  right: 3%;

  width: 8%;
  height: 12%;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 67%, 0% 100%);

  background-color: white;
  animation: ${growShrink} 0.6s ease-in-out forwards;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LikeDislike = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;

  height: 100%;
  align-items: center;
  justify-content: end;
`;

const Like = styled.div`
  margin: 1vw;
  animation: ${growShrink} 0.6s ease-in-out forwards;
`;

const Dislike = styled.div`
  margin: 1vw;
  animation: ${growShrink} 0.6s ease-in-out forwards;
`;

const StyledAiFillLike = styled(AiFillLike)`
  margin: 1vw;
  animation: ${growShrink} 0.6s ease-in-out forwards;
`;
const StyledAiOutlineLike = styled(AiOutlineLike)`
  margin: 1vw;
  animation: ${growShrink} 0.6s ease-in-out forwards;
`;
const StyledAiFillDislike = styled(AiFillDislike)`
  margin: 1vw;
  animation: ${growShrink} 0.6s ease-in-out forwards;
`;
const StyledAiOutlineDislike = styled(AiOutlineDislike)`
  margin: 1vw;
  animation: ${growShrink} 0.6s ease-in-out forwards;
`;

const LeftDiv = styled.div`
  width: 60%;
`;

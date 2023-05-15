import React from "react";
import styled from "styled-components";
import disney from "../../assets/img/disneyIcon.png";
import netflix from "../../assets/img/netflixIcon.png";
import wavve from "../../assets/img/wavveIcon.png";
import watcha from "../../assets/img/watchaIcon.png";

const RecommendPerOTT = () => {
  return (
    <Container>
      <HeaderContainer>
        <Header>
          OTT별<TitleSpan> 추천</TitleSpan>
        </Header>
      </HeaderContainer>

      <ContentContainer>
        <Poster className="poster"></Poster>
        <Content>
          <OTTIcons>
            <OTTIcon src={netflix}></OTTIcon>
            <OTTIcon src={disney}></OTTIcon>
            <OTTIcon src={wavve}></OTTIcon>
            <OTTIcon src={watcha}></OTTIcon>
          </OTTIcons>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "80%",
              margin: "2vw",
            }}
          >
            <div>
              <Title>{"낭만닥터 김사부"}</Title>
              <Rating>5.0 / 5.0</Rating>
            </div>
            <Story>
              {
                "지방의 초라한 돌담 병원, 한때 신의 손으로 불리었지만 이제는 스스로를 낭만닥터라 칭하며 은둔생활을 즐기고 있는 괴짜 천재 의사 김사부. 그런 그의 앞에 열정 넘치는 젊은 의사가 찾아온다."
              }
            </Story>
            <Watch>자세히</Watch>
          </div>
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default RecommendPerOTT;

const Container = styled.div`
  hegiht: 30vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: end;
  color: ${({ theme }) => theme.netflix.fontColor};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
`;

const Header = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
  color: ${({ theme }) => theme.netflix.fontColor};
  padding-left: 1vh;
`;

const OTTIcons = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -6vh;
  right: 0;
`;

const OTTIcon = styled.img`
  width: 12vw;
  height: 12vw;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: ${({ theme }) => theme.netflix.tabColor};
  overflow: visible;
  position: relative;
  height: 100%;
  align-items: center;
  margin-top: 4vh;
`;

const Poster = styled.div`
  position: absolute;
  height: 34vh;
  width: 50vw;
  left: 0;
  background-image: url("https://images.justwatch.com/poster/172352479/s592/romantic-doctor-teacher-kim.webp");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  overflow: visible;
`;

const Content = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 30vh;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
`;

const Rating = styled.div`
  font-size: ${({ theme }) => theme.fontSizeType.middle.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.middle.fontWeight};
`;

const Story = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`;

const Watch = styled.div`
  text-align: end;
  padding-right: 1vw;
`;

const TitleSpan = styled.span`
  color: ${({ theme }) => theme.netflix.lightColor};
  font-size: 5.5vw;
`;

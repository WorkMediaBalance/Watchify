import React from "react";
import styled from "styled-components";

interface BackgroundImageProps {
  imageUrl: string;
}

const Container = styled.div<BackgroundImageProps>`
  width: 85vw;
  height: 20vw;
  border: 2px solid ${({ theme }) => theme.netflix.fontColor};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1vh;
  // 여기부터 백그라운드 이미지
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${(
    props
  ) => props.imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  
  } 
`;

const DecorationBar = styled.div`
  height: 15vw;
  width: 2vw;
  margin-left: 3vw;
  margin-right: 2vw;

  background-color: ${({ theme }) => theme.netflix.pointColor};
`;

const DateIndicator = styled.div`
  height: 15vw;
  width: 15vw;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 5vw;
`;

const Date = styled.div`
  color: black;
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: 700;
`;
const Month = styled.div`
  color: grey;
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.small.fontWeight};
  margin-bottom: 2px;
`;

const TitleHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin-right: 5vw;
`;

const Title = styled.div`
  color: white;
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: ${({ theme }) => theme.fontSizeType.big.fontWeight};
`;

const HistoryComponent = () => {
  const imageUrl = "https://t1.daumcdn.net/cfile/tistory/997F7A385E4A920F28";

  return (
    <div>
      <Container imageUrl={imageUrl}>
        <DecorationBar />
        <DateIndicator>
          <Date>{"18"}</Date>
          <Month>{"Apr"}</Month>
        </DateIndicator>
        <TitleHolder>
          <Title>{"1945"}</Title>
        </TitleHolder>
      </Container>
    </div>
  );
};

export default HistoryComponent;

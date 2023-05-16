import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { schedule } from "interface/schedule";
import Modal from "react-modal";
import { HistoryContent } from "recoil/history";

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
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${(props) =>
    props.imageUrl});
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
  font-weight: 900;
`;
const Month = styled.div`
  color: grey;
  font-size: ${({ theme }) => theme.fontSizeType.small.fontSize};
  font-weight: 700;
  margin-bottom: 2px;
`;

const TitleHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin-right: 5vw;
`;

const Title = styled.div`
  color: white;
  font-size: ${({ theme }) => theme.fontSizeType.big.fontSize};
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface HistoryComponentProps {
  contentHistory: HistoryContent;
}

const HistoryComponent: React.FC<HistoryComponentProps> = ({ contentHistory }) => {
  const navigate = useNavigate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalStyle = {
    content: {
      postion: "fixed",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",

      padding: "0",
      borderRadius: "15px",
      border: "0",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.75)",
      zIndex: "1000",
    },
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  const handleHistoryClick = () => {
    const params = {
      year: contentHistory.firstYear,
      month: contentHistory.firstMonth,
      day: contentHistory.firstDay,
    };
    navigate(`/my/history/${contentHistory.pk}`, { state: params });
  };

  return (
    <div>
      <Container
        imageUrl={contentHistory && contentHistory.imgPath}
        onClick={() => {
          handleHistoryClick();
        }}
      >
        <DecorationBar />
        <DateIndicator>
          <Date>{contentHistory && contentHistory.firstDay}</Date>
          <Month>{contentHistory && months[contentHistory.firstMonth - 1]}</Month>
        </DateIndicator>
        <TitleHolder>
          <Title>{contentHistory && contentHistory.title}</Title>
        </TitleHolder>
      </Container>
    </div>
  );
};

export default HistoryComponent;

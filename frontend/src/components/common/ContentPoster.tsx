import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { AiFillPlusCircle, AiFillCheckCircle } from "react-icons/ai";
import disney from "assets/img/otticons/DisneyIcon.png";
import netflix from "assets/img/otticons/NetflixIcon.png";
import watcha from "assets/img/otticons/WatchaIcon.png";
import wavve from "assets/img/otticons/WavveIcon.png";
import ContentSwal from "./ContentSwal";
import { content } from "interface/content";

interface MoviePosterProps {
  imageUrl: string;
  title: string;
  content: content;
}

const PosterContainer = styled.div<{ imageUrl: string }>`
  width: 100%;
  padding-bottom: 150%;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const OTTOverlayContainer = styled.div`
  position: absolute;
  bottom: -2vh;
  right: -2vh;
`;

const fadeInOut = keyframes`
  0%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const OTTIcon = styled.img`
  width: 12vw;
  height: 12vw;
  position: relative;
  animation: ${fadeInOut} 1.5s linear ease;
`;

const ContentPoster: React.FC<MoviePosterProps> = ({ imageUrl, title, content }) => {
  // 여기부터 모달
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

  const handlePosterClick = () => {
    setIsModalOpen(true);
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

  // const OTTStaticArray = ["disney", "netflix", "watcha", "wavve"]; //TODO: 나중에 props 여기 초기화

  // const [OTTArray, setOTTArray] = useState([
  //   "disney",
  //   "netflix",
  //   "watcha",
  //   "wavve",
  // ]); //TODO: 여기서 나중에 초기값 세팅

  // const [OTTIndex, setOTTIndex] = useState(0);

  // const moveOTT = () => {
  //   setOTTIndex((prev) => {
  //     return (prev + 1) % OTTStaticArray.length;
  //   });
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(moveOTT, 1500);
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <>
      <PosterContainer
        onClick={() => {
          handlePosterClick();
        }}
        imageUrl={imageUrl}
      >
        {/* <OTTOverlayContainer>
          <OTTIcon src={OTTIcons[OTTStaticArray[OTTIndex]]}></OTTIcon>
        </OTTOverlayContainer> */}
      </PosterContainer>
      <Modal
        isOpen={isModalOpen}
        style={modalStyle}
        onAfterOpen={disableScroll}
        onRequestClose={() => {
          enableScroll();
          setIsModalOpen(false);
        }}
        ariaHideApp={false}
      >
        <ContentSwal content={content} />
      </Modal>
    </>
  );
};

export default ContentPoster;

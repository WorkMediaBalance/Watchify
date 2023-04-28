// 손민혁이 깡구현 했던 Modal... RIP... 일주일만 있다가 삭제할게요.

import React from "react";
import styled from "styled-components";

import { AiOutlineClose } from "react-icons/ai";

import netflixIcon from "assets/img/netflixIcon.png";
import disneyIcon from "assets/img/disneyIcon.png";
import watchaIcon from "assets/img/watchaIcon.png";
import wavveIcon from "assets/img/wavveIcon.png";

type Props = {
  showOttModal: boolean;
  setShowOttModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OttModal({ showOttModal, setShowOttModal }: Props) {
  const onClickCloseModal = () => {
    setShowOttModal(false);
  };
  const onClickOutsideCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowOttModal(false);
    }
  };
  return (
    <>
      {showOttModal && (
        <>
          <Overlay onClick={onClickOutsideCloseModal} />
          <Container>
            <Img src={netflixIcon} />
            <SIconWrapper>
              <AiOutlineClose onClick={onClickCloseModal} />
            </SIconWrapper>
          </Container>
        </>
      )}
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80vw;
  height: 60vh;

  background-color: orange;
  z-index: 10;
`;

const SIconWrapper = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  text-align: right;
  margin: 1rem;
`;

const Img = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 0.5rem;
  border: 3px solid white;
  border-radius: 7px;
`;

// const RelicName = styled.div`
//   font-size: 1.7rem;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 1rem;
// `;

// const RelicDetail = styled.div`
//   font-size: 1.3rem;

//   text-align: center;
//   margin-bottom: 1rem;
// `;

// const MyButton = styled.button`
//   background-color: green;
//   font-size: 1.5rem;
//   color: white;
//   border-radius: 10px;
//   padding: 0.2rem 2rem 0.2rem 2rem;
//   border: 2px solid white;
//   width: 10rem;
// `;

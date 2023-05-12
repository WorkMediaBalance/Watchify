import React, { useEffect } from "react";
import styled from "styled-components";

import { BASE_URL } from "constant/constant";

import logoImg from "assets/img/logo.png";
import kakao from "assets/img/kakao.png";
import google from "assets/img/google.png";
import { useNavigate } from "react-router-dom";

const PageLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const myToken = localStorage.getItem("accessToken");
    if (myToken) {
      console.log("이미 로그인 되어있음!");
      navigate("/");
    }
  }, []);

  const onClickHandler = (e: React.MouseEvent<HTMLImageElement>) => {
    const clicked = e.currentTarget.alt;
    window.location.href = `${BASE_URL}oauth2/authorization/${clicked}`;
  };

  return (
    <SLayout>
      <SLogoImg src={logoImg} />
      <SKakaoImg src={kakao} alt="kakao" onClick={onClickHandler} />
      <SGoogleImg src={google} alt="google" onClick={onClickHandler} />
    </SLayout>
  );
};

export default PageLogin;

const SLayout = styled.div`
  // height: 98vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-repeat: no-repeat;
  // background-image: url("https://image.tmdb.org/t/p/original/wv22frLmCpXDRjKj4MWFwa4eTOK.jpg");
  // background-size: cover;
  // background-position: center center;
  // filter: blur(2px);
`;

const SLogoImg = styled.img`
  width: 45vw;
  height: 29vw;
  margin-top: 30vw;
  margin-bottom: 20vw;
`;

const SKakaoImg = styled.img`
  width: 67.5vw;
  height: 15vw;
  margin-bottom: 3vw;
`;

const SGoogleImg = styled.img`
  width: 70vw;
  height: 17vw;
  border-radius: 20px;
`;

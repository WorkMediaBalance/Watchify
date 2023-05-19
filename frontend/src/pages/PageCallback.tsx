import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { userState } from "recoil/userState";

// import jwtDecode from "jwt-decode";

import { mybasicInfo } from "apis/apiMy";

const PageCallback = () => {
  // url에서 주소 따오는 hook
  const location = useLocation();
  const navigate = useNavigate();

  // 유저 recoil
  const [user, setUser] = useRecoilState(userState);

  const queryParams = new URLSearchParams(location.search);
  let accessToken = queryParams.get("access");
  let refreshToken = queryParams.get("refresh");

  // 처음 로그인한 유저인지 판단하는 state
  const [isNew, setIsNew] = useState(queryParams.get("isNew") === "true");

  // 엑세스/리프레시 토큰 정보 로컬스토리지 저장
  function setToken() {
    try {
      if (accessToken === null) {
        accessToken = "";
      }

      if (refreshToken === null) {
        refreshToken = "";
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {}
  }

  // 유저 정보 불러오는 axios 요청
  async function getUserInfo() {
    const newUserInfo = await mybasicInfo();
    setUser(newUserInfo);
  }

  useEffect(() => {
    setToken();
    getUserInfo();
    if (isNew) {
      // 새로 가입한 유저의 스케줄을 저장하는 axios 로직처리
    }
    navigate("/");
  }, []);

  // http://localhost:3000/callback?
  // accessToken=eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MTAwMDE3LCJleHAiOjE2NzkzNzM5OTd9.4zZ4xvYyhTbX1sePGPNXxFS6KzX8wjAVG8Oqcu3pzCc
  // &refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MTAwMDE3LCJleHAiOjE2ODExODY1OTd9.MNCW0u8jw_6bPOEHwKCDzO0kLIrQ7hbnb43QKe3Ausw
  // &isNew=false

  return <></>;
};

export default PageCallback;

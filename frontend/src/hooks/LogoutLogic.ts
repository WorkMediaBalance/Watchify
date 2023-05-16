import { useResetRecoilState } from "recoil";
import { userState } from "recoil/userState";
import React from "react";

const LogoutLogic = () => {
  const resetUser = useResetRecoilState(userState);

  const logout = () => {
    // 로컬 스토리지 초기화
    localStorage.clear();

    // userRecoil 초기화
    resetUser();
  };
  return logout;
};

export default LogoutLogic;

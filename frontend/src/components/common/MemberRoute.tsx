import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const MemberRoute = () => {
  // 로그인 로직 처리할 것임 (일단 임시로 항상 로그인 true)
  const isLogin = true;

  if (isLogin) {
    return <Outlet />;
  }
  alert("로그인 후 이용해주세요");
  return <Navigate to="/login" />;
};

export default MemberRoute;

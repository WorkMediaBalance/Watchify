import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const NonMemberRoute = () => {
  // 로그인 로직 처리할 것임 (일단 임시로 항상 로그인 false)
  const isLogin = false;

  if (!isLogin) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default NonMemberRoute;

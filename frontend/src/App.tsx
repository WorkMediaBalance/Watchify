import React from "react";
import RecoilTest from "./components/RecoilTest";

import styled, { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { Routes, Route } from "react-router-dom";

import PageError from "./pages/PageError";
import PageLogin from "./pages/PageLogin";
import PageMain from "./pages/PageMain";
import PageMy from "./pages/PageMy";
import PageRecommend from "./pages/PageRecommend";
import PageSchedule from "./pages/PageSchedule";
import PageSearch from "./pages/PageSearch";
import PageShare from "./pages/PageShare";

import MemberRoute from "./components/common/MemberRoute";
import NonMemberRoute from "./components/common/NonMemberRoute";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          {/* 회원, 비회원 모두 접근 가능 */}
          <Route path="/" element={<PageMain />} />
          <Route path="/search" element={<PageSearch />} />
          <Route path="/schedule" element={<PageSchedule />} />
          <Route path="/recommend" element={<PageRecommend />} />
          <Route path="/share" element={<PageShare />} />
          {/* 회원만 접근 가능 */}
          <Route element={<MemberRoute />}>
            <Route path="/my" element={<PageMy />} />
          </Route>
          {/* 비회원만 접근 가능 */}
          <Route element={<NonMemberRoute />}>
            <Route path="/login" element={<PageLogin />} />
          </Route>
          +{/* 404 페이지 */}
          <Route path="*" element={<PageError />} />
        </Routes>
        {/* <RecoilTest /> */}
      </ThemeProvider>
    </>
  );
};

export default App;

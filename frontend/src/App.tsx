import React from "react";

import styled, { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { Routes, Route } from "react-router-dom";

import Layout from "layout/Layout";
import LayoutAppBar from "layout/LayoutAppBar";
import LayoutRedDot from "layout/LayoutRedDot";

import PageError from "./pages/PageError";
import PageLogin from "./pages/PageLogin";
import PageMain from "./pages/PageMain";
import PageMy from "./pages/PageMy";
import PageRecommend from "./pages/PageRecommend";
import PageRecommendResult from "pages/PageRecommendResult";
import PageSchedule from "./pages/PageSchedule";
import PageScheduleContent from "pages/PageScheduleContent";
import PageScheduleResult from "pages/PageScheduleResult";
import PageSearch from "./pages/PageSearch";
import PageShare from "./pages/PageShare";

import MemberRoute from "./components/common/MemberRoute";
import NonMemberRoute from "./components/common/NonMemberRoute";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Layout />}>
            {/* 회원, 비회원 모두 접근 가능 */}
            <Route path="/" element={<PageMain />} />
            <Route path="/recommend" element={<PageRecommend />} />
            <Route path="/recommend/result" element={<PageRecommendResult />} />
            <Route path="/share" element={<PageShare />} />

            <Route path="/schedule/result" element={<PageScheduleResult />} />
            {/* 회원만 접근 가능 */}
            <Route element={<MemberRoute />}>
              <Route path="/my" element={<PageMy />} />
            </Route>

            {/* 비회원만 접근 가능 */}
            <Route element={<NonMemberRoute />}>
              <Route path="/login" element={<PageLogin />} />
            </Route>

            {/* 404 페이지 */}
            <Route path="*" element={<PageError />} />
          </Route>

          {/* Red Dot 없는 Layout Ver. */}
          <Route element={<LayoutAppBar />}>
            <Route path="/schedule" element={<PageSchedule />} />
            <Route path="/schedule/content" element={<PageScheduleContent />} />
          </Route>

          <Route element={<LayoutRedDot />}>
            <Route path="/search" element={<PageSearch />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;

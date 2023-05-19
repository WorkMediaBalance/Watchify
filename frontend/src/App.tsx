import React from "react";

import styled, { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { Routes, Route } from "react-router-dom";

import Layout from "layout/Layout";
import LayoutAppBar from "layout/LayoutAppBar";

import PageError from "./pages/PageError";
import PageLogin from "./pages/PageLogin";
import PageMain from "./pages/PageMain";
import PageMy from "./pages/PageMy";
import PageMyHistory from "pages/PageMyHistory";
import PageRecommend from "./pages/PageRecommend";
import PageRecommendResult from "pages/PageRecommendResult";
import PageSchedule from "./pages/PageSchedule";
import PageScheduleContent from "pages/PageScheduleContent";
import PageScheduleResult from "pages/PageScheduleResult";
import PageSearch from "./pages/PageSearch";
import PageShare from "./pages/PageShare";

import PageCallback from "pages/PageCallback";

import MemberRoute from "./components/common/MemberRoute";
import NonMemberRoute from "./components/common/NonMemberRoute";

import "./firebase-messaging-sw.js";

import { useEffect } from "react";
import { schedulePreInfoState } from "recoil/schedulePreInfoState";
import { RecoilState, useRecoilState } from "recoil";

const App = () => {
  const [preData, setPreData] = useRecoilState(schedulePreInfoState);

  useEffect(() => {}, [preData]);

  return (
    <div style={{ height: "100%" }}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Layout />}>
            {/* 회원, 비회원 모두 접근 가능 */}
            <Route path="/" element={<PageMain />} />
            <Route path="/recommend" element={<PageRecommend />} />
            <Route path="/recommend/result" element={<PageRecommendResult />} />
            <Route path="/share/:sharedPK" element={<PageShare />} />

            <Route path="/schedule" element={<PageSchedule />} />
            <Route path="/schedule/content" element={<PageScheduleContent />} />
            <Route path="/schedule/result" element={<PageScheduleResult />} />
            <Route path="/search" element={<PageSearch />} />

            <Route path="/callback" element={<PageCallback />} />

            {/* 회원만 접근 가능 */}
            <Route element={<MemberRoute />}>
              <Route path="/my" element={<PageMy />} />
              <Route path="/my/history/:pk" element={<PageMyHistory />} />
            </Route>

            {/* 비회원만 접근 가능 */}
            <Route element={<NonMemberRoute />}>
              <Route path="/login" element={<PageLogin />} />
            </Route>

            {/* 404 페이지 */}
            <Route path="*" element={<PageError />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;

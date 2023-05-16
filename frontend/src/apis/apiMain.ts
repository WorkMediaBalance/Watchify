import api from "./axiosInstance";
import { ContentRecForm } from "constant/constant";

// 일주일 스케줄 조회
export const mainSchedule = async () => {
  console.log("실행중");
  try {
    const res = await api.get("api/main/schedule");
    return res.data;
  } catch (err) {
    console.log("일주일 스케줄 조회 실패");
    console.log(err);
  }
};

// 로그인 유저의 추천 컨텐츠 조회
/* 요청 샘플
const sample = {
  ott: ["netflix", "disney"]
}
*/
export const mainRecommend = async () => {
  try {
    const res = await api.get("api/main/recommend");
    return res.data;
  } catch (err) {
    console.log("로그인 유저 추천 메인페이지 추천 컨텐츠 조회 실패");
    console.log(err);
  }
};

// 비로그인 유저의 추천 컨텐츠 조회
/* 요청 샘플
const sample = {
  ott: ["netflix", "disney"]
}
*/
export const mainRecommendNon = async () => {
  try {
    const res = await api.get("api/main/recommendnon");
    return res.data;
  } catch (err) {
    console.log("비로그인 유저 추천 메인페이지 추천 컨텐츠 조회 실패");
    console.log(err);
  }
};

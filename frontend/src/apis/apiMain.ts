import { apiR, apiCUD } from "./axiosInstance";
import { ContentRecForm } from "constant/constant";

// 일주일 스케줄 조회
export const mainSchedule = async () => {
  try {
    const res = await apiR.get("readapi/main/schedule");
    return res.data;
  } catch (err) {}
};

// 로그인 유저의 추천 컨텐츠 조회
/* 요청 샘플
const sample = {
  ott: ["netflix", "disney"]
}
*/
export const mainRecommend = async () => {
  try {
    const res = await apiR.get("readapi/main/recommend");
    return res.data;
  } catch (err) {}
};

// 비로그인 유저의 추천 컨텐츠 조회
/* 요청 샘플
const sample = {
  ott: ["netflix", "disney"]
}
*/
export const mainRecommendNon = async () => {
  try {
    const res = await apiR.get("readapi/main/recommendnon/nonauth");
    return res.data;
  } catch (err) {}
};

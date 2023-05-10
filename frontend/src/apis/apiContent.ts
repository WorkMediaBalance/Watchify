import api from "./axiosInstance";
import { ContentRecForm } from "constant/constant";

// 컨텐츠 추천
/* 요청 샘플
const data = {
  isAdult: true,
  ott: ["netflix", "disney"],
  genre: ["로맨스", "공포", "스릴러"],
};
*/
export const contentRecommend = async (data: ContentRecForm) => {
  try {
    const res = await api.get("api/content/recommend", { params: data });
    return res.data;
  } catch (err) {
    console.log("컨텐츠 추천 실패");
    console.log(err);
  }
};

// 컨텐츠 찜 스위치
/* 요청 샘플
{
  pk: 234,
}
*/
export const contentWishSwitch = async (data: { [key: string]: number }) => {
  try {
    await api.post("api/content/wishswitch", data);
    return true;
  } catch (err) {
    console.log("컨텐츠 찜/찜취소 실패");
    console.log(err);
  }
};

// 컨텐츠 좋아요/싫어요
/* 요청 샘플
{
  pk: 3,
  isLike: true,
}
*/
export const contentLike = async (data: { pk: number; isLike: boolean }) => {
  try {
    await api.post("api/content/like", data);
    return true;
  } catch (err) {
    console.log("컨텐츠 좋아요/싫어요 실패");
    console.log(err);
  }
};

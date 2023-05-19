import { apiR, apiCUD } from "./axiosInstance";
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
    const res = await apiCUD.post("api/recommend", data);
    return res.data;
  } catch (err) {}
};

// 컨텐츠 찜 스위치
/* 요청 샘플
{
  pk: 234,
}
*/
export const contentWishSwitch = async (data: { [pk: string]: number }) => {
  try {
    await apiCUD.put("api/content/wishswitch", data);
    return true;
  } catch (err) {}
};

// 컨텐츠 좋아요/싫어요
/* 요청 샘플
{
  pk: 3,
  isLike: true,
}
*/
export const contentLike = async (data: { pk: number; like: number }) => {
  try {
    await apiCUD.put("api/content/like", data);
    return true;
  } catch (err) {}
};

// 단일 컨텐츠 정보 조회 (5.15 민혁 추가)
export const contentInfo = async (data: { [pk: string]: number }) => {
  try {
    const res = await apiR.get(`readapi/content/nonauth/info/${data.pk}`);
    return res.data;
  } catch (err) {}
};

// 컨텐츠 평점 수정 (5.15 민혁 추가)
export const contentRating = async (data: { pk: number; rating: number }) => {
  try {
    await apiCUD.put("api/content/rating", data);
    return true;
  } catch (err) {}
};

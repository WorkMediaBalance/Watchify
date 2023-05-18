import { apiR, apiCUD } from "./axiosInstance";

// 검색어 자동 완성
export const searchBasic = async (word: string) => {
  try {
    const res = await apiR.get(`readapi/search/basic/${word}`);
    return res.data;
  } catch (err) {
    console.log("검색어 자동 완성 실패");
    console.log(err);
  }
};

// 검색어 자동 완성
export const searchResult = async (word: string) => {
  try {
    const res = await apiR.get(`readapi/search/result/${word}`);
    return res.data;
  } catch (err) {
    console.log("검색 결과 조회 실패");
    console.log(err);
  }
};

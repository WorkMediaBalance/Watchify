import api from "./axiosInstance";
import { Schedule } from "constant/constant";

// 월간 스케줄 조회
export const scheduleInfo = async (year: number, month: number) => {
  try {
    const res = await api.get(`api/schedule/info/${year}/${month}`);
    return res.data;
  } catch (err) {
    console.log("월간 스케줄 받아오기 실패");
    console.log(err);
  }
};

// 스케줄 만들기
export const scheduleCreate = async (data: Schedule) => {
  try {
    await api.post("api/sehedule/create", data);
    return true;
  } catch (err) {
    console.log("스케줄 생성 실패");
    console.log(err);
  }
};

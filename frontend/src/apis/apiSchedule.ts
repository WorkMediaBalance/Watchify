import api from "./axiosInstance";
import { Schedule, isSeen } from "constant/constant";
import { ScheduleAll } from "interface/schedule";

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

// 전체 스케줄 조회
export const scheduleInfoAll = async () => {
  try {
    const res = await api.get(`api/schedule/info/all`);
    return res.data;
  } catch (err) {
    console.log("월간 스케줄 받아오기 실패");
    console.log(err);
    return false;
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

// 시청함 체크
/*
data 샘플
{
	"pk" : 1231, // 컨텐츠 pk
	"episode" : 13, // 몇 화 단일 영화 같은건 0으로 주기
	"date" : "2023-05-01" // 스케줄 상 시청 일자(오늘 아님)
}
*/
export const scheduleCheck = async (data: isSeen) => {
  try {
    await api.post("api/schedule/check", data);
    console.log("시청함 체크 성공");
    return true;
  } catch (err) {
    console.log("시청함 체크 실패");
    console.log(err);
  }
};

// 스케줄 시청함 취소
/*
data 샘플
{
	"pk" : 1231, // 컨텐츠 pk
	"episode" : 13, // 몇 화 단일 영화 같은건 0으로 주기
	"date" : "2023-05-01" // 스케줄 상 시청 일자(오늘 아님)
}
*/
export const scheduleCheckCancel = async (data: isSeen) => {
  try {
    await api.put("api/schedule/cancel", data);
    console.log("시청함 체크 취소 성공");
    return true;
  } catch (err) {
    console.log("시청함 체크 취소 실패");
    console.log(err);
  }
};

// 스케줄 변경 + 미루기 포함
/*
recoil의 scheduleAllState를 변경한 뒤, 해당 state 전체를 인자로 담아 발송
*/
export const scheduleModify = async (data: ScheduleAll) => {
  try {
    await api.put("api/schedule/modify", data);
    console.log("스케줄 변경 / 미루기 성공");
    return true;
  } catch (err) {
    console.log("스케줄 변경 / 미루기 실패");
    console.log(err);
  }
};

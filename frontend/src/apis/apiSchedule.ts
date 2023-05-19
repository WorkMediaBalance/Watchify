import { Schedule, isSeen, later } from "constant/constant";

import { apiR, apiCUD } from "./axiosInstance";
import { schedulePreInfo, ScheduleAll } from "interface/schedule";

// 월간 스케줄 조회
export const scheduleInfo = async (year: number, month: number) => {
  try {
    const res = await apiR.get(`readapi/schedule/info/${year}/${month}`);
    return res.data;
  } catch (err) {}
};

// 전체 스케줄 조회
export const scheduleInfoAll = async () => {
  try {
    const res = await apiR.get(`readapi/schedule/info/all`);
    return res.data;
  } catch (err) {
    return false;
  }
};

// 스케줄 만들기
export const scheduleCreate = async (data: schedulePreInfo) => {
  try {
    const res = await apiCUD.post("api/schedule/create", data);

    return res.data;
  } catch (err) {}
};

// 스케줄 공유
export const scheduleShare = async (data: ScheduleAll) => {
  try {
    const res = await apiCUD.post("api/schedule/nonauth/share", data);

    return res.data;
  } catch (err) {}
};

// 스케줄 공유 틀기
export const scheduleShareGet = async (pk: number) => {
  try {
    const res = await apiR.get(`readapi/schedule/nonauth/share/${pk}`);
    return res.data;
  } catch (err) {}
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
    await apiCUD.post("api/schedule/check", data);

    return true;
  } catch (err) {}
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
    await apiCUD.put("api/schedule/cancel", data);

    return true;
  } catch (err) {}
};

// 스케줄 변경 + 미루기 포함
/*
recoil의 scheduleAllState를 변경한 뒤, 해당 state 전체를 인자로 담아 발송
*/
export const scheduleModify = async (data: later) => {
  try {
    await apiCUD.put("api/schedule/modify", data);

    return true;
  } catch (err) {
    return false;
  }
};

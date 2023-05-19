import { apiR, apiCUD } from "./axiosInstance";
import { OttPeriods } from "constant/constant";

// ott 구독 알람 on-off 스위치
export const myOttAlarm = async () => {
  try {
    await apiCUD.put("api/my/ottalarm");
    return true;
  } catch (err) {}
};

// 컨텐츠 알람 on-off 스위치
export const myContentAlarm = async () => {
  try {
    await apiCUD.put("api/my/contentalarm");
    return true;
  } catch (err) {}
};

// 프로필 사진 변경
export const myProfileImg = async (profileImageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("profileImageFile", profileImageFile);
    await apiCUD.put("api/my/profileimg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return true; // TODO 새 프로필 사진 주소 받아와야 함
  } catch (err) {
    return false;
  }
};

// 닉네임 변경
export const myProfileName = async (data: { [key: string]: string }) => {
  try {
    await apiCUD.put("api/my/profilename", data);
    return true;
  } catch (err) {}
};

// 찜 리스트 가져오기
export const myWishList = async () => {
  try {
    const res = await apiR.get("readapi/my/wishlist");
    return res.data;
  } catch (err) {}
};

// 시청 패턴 조회
export const myPatternGet = async () => {
  try {
    const res = await apiR.get("readapi/my/pattern");
    return res.data;
  } catch (err) {}
};

// 시청 패턴 수정
export const myPatternChange = async (data: { [key: string]: number[] }) => {
  try {
    await apiCUD.put("api/my/pattern", data);

    return true;
  } catch (err) {}
};

// 유저 기본 정보 조회
export const mybasicInfo = async () => {
  try {
    const res = await apiR.get("readapi/my/basicinfo");
    return res.data;
  } catch (err) {}
};

// 유저 알람 정보 조회
export const myAlarmInfo = async () => {
  try {
    const res = await apiR.get("readapi/my/alarminfo");
    return res.data;
  } catch (err) {}
};

// 유저 ott 구독 정보 조회
export const myOTTget = async () => {
  try {
    const res = await apiR.get("readapi/my/ott");
    return res.data;
  } catch (err) {}
};

// 유저 ott 구독 정보 수정
export const myOTTChange = async (data: OttPeriods) => {
  try {
    const res = await apiCUD.put("api/my/ott", data);
    return res.data;
  } catch (err) {}
};

// 유저 히스토리 목록 조회
export const myHistory = async () => {
  try {
    const res = await apiR.get("readapi/my/history");
    return res.data;
  } catch (err) {}
};

// 유저 히스토리 상세 조회
/* 요청 데이터 샘플
const data = {
  pk: 1,
  yaer: 2021,
  month: 5,
}
*/
export const myHistoryInfo = async (data: { [key: string]: number }) => {
  try {
    const res = await apiR.get(`readapi/my/history/${data.pk}/${data.year}/${data.month}`);
    return res.data;
  } catch (err) {}
};

// FCM TOKEN 전송
export const fcmSave = async (data: { fcmToken: string }) => {
  try {
    await apiCUD.put("api/fcm/save/nonauth", data);

    return true;
  } catch (err) {}
};

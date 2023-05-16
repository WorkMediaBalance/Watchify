import api from "./axiosInstance";
import { OttPeriods } from "constant/constant";

// ott 구독 알람 on-off 스위치
export const myOttAlarm = async () => {
  try {
    await api.put("api/my/ottalarm");
    return true;
  } catch (err) {
    console.log("ott 구독 알람 변경 실패");
    console.log(err);
  }
};

// 컨텐츠 알람 on-off 스위치
export const myContentAlarm = async () => {
  try {
    await api.put("api/my/contentalarm");
    return true;
  } catch (err) {
    console.log("컨텐츠 알람 변경 실패");
    console.log(err);
  }
};

// 프로필 사진 변경
export const myProfileImg = async (profileImageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("profileImageFile", profileImageFile);

    await api.put("api/my/profileimg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return true; // TODO 새 프로필 사진 주소 받아와야 함
  } catch (err) {
    console.log("프로필 사진 변경 실패");
    console.log(err);
  }
};

// 닉네임 변경
export const myProfileName = async (data: { [key: string]: string }) => {
  try {
    await api.put("api/my/profilename", data);
    return true;
  } catch (err) {
    console.log("닉네임 변경 실패");
    console.log(err);
  }
};

// 찜 리스트 가져오기
export const myWishList = async () => {
  try {
    console.log("성공?");
    const res = await api.get("api/my/wishlist");
    return res.data;
  } catch (err) {
    console.log("찜 목록 가져오기 실패");
    console.log(err);
  }
};

// 시청 패턴 조회
export const myPatternGet = async () => {
  try {
    const res = await api.get("api/my/pattern");
    return res.data;
  } catch (err) {
    console.log("시청 패턴 가져오기 실패");
    console.log(err);
  }
};

// 시청 패턴 수정
export const myPatternChange = async (data: { [key: string]: number[] }) => {
  try {
    console.log(data, "데이터!!!!");
    await api.put("api/my/pattern", data);
    console.log("here");
    return true;
  } catch (err) {
    console.log("시청 패턴 변경 실패");
    console.log(err);
  }
};

// 유저 기본 정보 조회
export const mybasicInfo = async () => {
  try {
    const res = await api.get("api/my/basicinfo");
    return res.data;
  } catch (err) {
    console.log("유저 기본 정보 조회 실패");
    console.log(err);
  }
};

// 유저 알람 정보 조회
export const myAlarmInfo = async () => {
  try {
    const res = await api.get("api/my/alarminfo");
    return res.data;
  } catch (err) {
    console.log("유저 알람 정보 조회 실패");
    console.log(err);
  }
};

// 유저 ott 구독 정보 조회
export const myOTTget = async () => {
  try {
    const res = await api.get("api/my/ott");
    return res.data;
  } catch (err) {
    console.log("ott 구독 정보 조회 실패");
    console.log(err);
  }
};

// 유저 ott 구독 정보 수정
export const myOTTChange = async (data: OttPeriods) => {
  console.log(data, "고뱀이 신청한 데이터다!");
  try {
    const res = await api.put("api/my/ott", data);
    return res.data;
  } catch (err) {
    console.log("ott 구독 정보 수정 실패");
    console.log(err);
  }
};

// 유저 히스토리 목록 조회
export const myHistory = async () => {
  try {
    const res = await api.get("api/my/history");
    return res.data;
  } catch (err) {
    console.log("유저 히스토리 목록 조회 실패");
    console.log(err);
  }
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
    const res = await api.get(`api/my/history/${data.pk}/${data.year}/${data.month}`);
    return res.data;
  } catch (err) {
    console.log("유저 히스토리 상세 조회 실패");
    console.log(err);
  }
};

// FCM TOKEN 전송
export const fcmSave = async (data: { fcmToken: string }) => {
  try {
    await api.put("api/fcm/save/nonauth", data);
    console.log("성공");
    return true;
  } catch (err) {
    console.log(data);
    console.log("fcm 토큰 전송 실패");
    console.log(err);
  }
};

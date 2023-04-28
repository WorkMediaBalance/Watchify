import api from "./axiosInstance";
import { myBasicInfo, myProfileImg } from "constant/constant";

// // 내 정보 불러오기
// export const getBasicInfoApi = async () => {
//   try {
//     const res = await api.get(myBasicInfo);
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// // 프로필 이미지 수정 (생성)
// export const putProfileImgApi = async (profileImg: File) => {
//   try {
//     const formData = new FormData();
//     formData.append("profileImg", profileImg);

//     const res = await api.put(myProfileImg, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return res.data;
//   } catch (error) {
//     return false;
//   }
// };

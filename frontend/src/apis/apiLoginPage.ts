import api from "./axiosInstance";

export const mybasicInfo = async () => {
  try {
    const URL = `api/my/basicinfo`;
    const res = await api.get(URL);
    return res.data;
  } catch (err) {
    console.log(err, "mybasicInfo 유저정보에러");
  }
};

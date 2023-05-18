import axios from "axios";
import { BASE_URL } from "../constant/constant";
import { parse, stringify } from "qs";
import Swal from "sweetalert2";

// 토큰 재발급 axios
const refreshAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  paramsSerializer: (params: any) => {
    return stringify(parse(params));
  },
});

export const reissueAccessToken = async () => {
  // authorization -> access로 바꿨음. + bears인가 뭔가도 지웠음
  refreshAxios.defaults.headers.access = localStorage.getItem("refreshToken");
  await refreshAxios
    .get("api/auth/refresh")
    .then((response) => {
      localStorage.setItem("accessToken", response.data);
    })
    .catch((error) => {
      localStorage.clear();
      Swal.fire({
        title: "세션이 만료되었습니다.",
        text: "다시 로그인해주세요",
        icon: "error",
        timer: 1500,
        customClass: {
          container: "my-swal-container",
          confirmButton: "my-swal-confirm-button",
          cancelButton: "my-swal-cancel-button",
          icon: "my-swal-icon",
        },
      }).then((result) => {
        window.location.href = `${BASE_URL}login`;
      });
    });
};

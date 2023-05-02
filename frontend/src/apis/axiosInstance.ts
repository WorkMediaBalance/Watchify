import axios from "axios";
import { BASE_URL } from "../constant/constant";
import { parse, stringify } from "qs";
import { reissueAccessToken } from "./reissueToken";

const api = axios.create({
  baseURL: BASE_URL,
  paramsSerializer: (params: any) => {
    return stringify(parse(params));
  },
});

// 요청 인터셉터 -> 토큰 체크용
api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 -> 응답 받기 전 로직
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { config, response } = error;
    if (response.status === 401) {
      const originRequest = config;
      await reissueAccessToken().then(() => {
        originRequest.headers.Authorization = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
      });

      return axios(originRequest);
    }
    return Promise.reject(error);
  }
);

export default api;

package com.watchify.watchify.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.transform.sax.SAXResult;


@RequiredArgsConstructor
@RestController
public class TokenController {
    private final TokenService tokenService;

    @GetMapping("/auth/kakao/callback")
    @ResponseBody
    public String KakaoCallback(String code) {
        String REQUEST_URL = "https://kauth.kakao.com/oauth/token";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 데이터를 담을 오브젝트인 MultiValueMap를 만들어보자
        // body는 보통 key, value의 쌍으로 이루어지기 때문에 자바에서 제공해주는 MultiValueMap 타입을 사용한다.
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "e054053c94984f87d0f21b0abe71d10e");
        params.add("redirect_uri", "http://localhost:8080/auth/kakao/callback");
        params.add("code", code);

        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
        // kakaoTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 된다.
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받는다.
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        return "카카오 인증 완료 : 토큰 요청 응답 : " + response;
    }


    // 토근 만료시  401: Unauthorized 상태코드 발송
    @GetMapping("token/expired")
    public String auth() {
        throw new UnauthorizedException();
    }


    // 만료된 토큰 재발급
    @GetMapping("/token/refresh")
    public String refreshAuth(HttpServletRequest request, HttpServletResponse response) {
        String token = request.getHeader("Refresh");

        if (token != null && tokenService.verifyToken(token)) {
            String email = tokenService.getUserEmail(token);
            String provider = tokenService.getProvider(token);
            String name = tokenService.getUserName(token);
            String imgPath = tokenService.getUserImgPath(token);

            Token newToken = tokenService.generateToken(email, provider, name, imgPath, "USER");

            response.addHeader("Auth", newToken.getToken());
            response.addHeader("Refresh", newToken.getRefreshToken());
            response.setContentType("application/json;charset=UTF-8");
            return "HAPPY NEW TOKEN";
        }

        throw new RuntimeException();
    }

}

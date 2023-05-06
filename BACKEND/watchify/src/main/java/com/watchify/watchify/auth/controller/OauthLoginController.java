package com.watchify.watchify.auth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.watchify.watchify.auth.*;
import com.watchify.watchify.auth.repository.CustomAuthorizationRequestRepository;
import com.watchify.watchify.auth.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@CrossOrigin(origins = "*")
@RequestMapping("/oauth2/login")
@RequiredArgsConstructor
@RestController
public class OauthLoginController {

    private final TokenService tokenService;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomAuthorizationRequestRepository customAuthorizationRequestRepository;


    @GetMapping("/kakao/callback")
    @ResponseBody
    public String KakaoCallback(@RequestParam("code") String code, HttpServletRequest request) throws IOException{
        String REQUEST_URL = "https://kauth.kakao.com/oauth/token";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        // 헤더를 꼭 이렇게 설정해야지만 401 Unauthorized: [no body] 에러를 피할 수 있다.
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 데이터를 담을 오브젝트인 MultiValueMap를 만들어보자
        // body는 보통 key, value의 쌍으로 이루어지기 때문에 자바에서 제공해주는 MultiValueMap 타입을 사용한다.
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "0056cd01e9f9bad8a1c939e485c59147");
        params.add("redirect_uri", "http://localhost:8080/oauth2/login/kakao/callback");
        params.add("code", code);

        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
        // kakaoTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 된다.
        HttpEntity<MultiValueMap<String, String>> accessTokenRequest = new HttpEntity<>(params, headers);
        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
                REQUEST_URL,
                HttpMethod.POST,
                accessTokenRequest,
                String.class
        );

        // JSON 을 데이터를 담을 ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoOauth2Token kakaoOauth2Token = null;
        try {
            kakaoOauth2Token = objectMapper.readValue(accessTokenResponse.getBody(), KakaoOauth2Token.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        System.out.println("accessToken 받기 완료 : " + kakaoOauth2Token.getAccess_token());
        // -- 여기까지 accessToken 받기 완료 --


        // 이제 accessToken 으로 회원정보를 가져오자
        RestTemplate restTemplate2 = new RestTemplate();
        HttpHeaders headers2 = new HttpHeaders();

        // 띄어쓰기 주의.. Bearer
        headers2.add("Authorization", "Bearer " + kakaoOauth2Token.getAccess_token());
        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileReq = new HttpEntity<>(headers2);
        ResponseEntity<String> kakaoUserInfo = restTemplate2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileReq,
                String.class
        );
        // -- 여기 까지 accessToken 으로 카카오 유저 정보 받기 완료 --

//        customAuthorizationRequestRepository.loadAuthorizationRequest(request);
//        customOAuth2UserService.loadUser()

        return kakaoUserInfo.getBody();



        // JWT 토큰 발급
//        ObjectMapper objectMapper2 = new ObjectMapper();
//        Map<String, Object> userInfoMap = null;
//        try {
//            userInfoMap = objectMapper.readValue(kakaoUserInfo.getBody(), Map.class);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        PrincipalDetails principalDetails = PrincipalDetails.of("KAKAO", userInfoMap);
//        String jwtToken = tokenService.generateAccessToken(principalDetails);
//        String refreshToken = tokenService.generateRefreshToken(principalDetails);
//
//        String redirectUrlWithTokens = UriComponentsBuilder.fromUriString("http://localhost:8080/oauth2/login/callback")
//                .queryParam("access", jwtToken)
//                .queryParam("refresh", refreshToken)
//                .build().toUriString();
//
//        response.sendRedirect(redirectUrlWithTokens);
    }

    @GetMapping("/google/callback")
    @ResponseBody
    public void GoogleCallback(HttpServletResponse response, String code) throws IOException {
        String REQUEST_URL = "https://oauth2.googleapis.com/token";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "68891012374-8ij9t01p6i3ucf9rufg334b2ahb3vhl7.apps.googleusercontent.com");
        params.add("client_secret", "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");
        params.add("redirect_uri", "http://localhost:8080/oauth2/login/google/callback");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> accessTokenRequest = new HttpEntity<>(params, headers);
        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
                REQUEST_URL,
                HttpMethod.POST,
                accessTokenRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        GoogleOauth2Token googleOauth2Token = null;
        try {
            googleOauth2Token = objectMapper.readValue(accessTokenResponse.getBody(), GoogleOauth2Token.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        RestTemplate restTemplate2 = new RestTemplate();
        HttpHeaders headers2 = new HttpHeaders();

        // 띄어쓰기 주의.. Bearer
        headers2.add("Authorization", "Bearer " + googleOauth2Token.getAccess_token());
        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> googleProfileReq = new HttpEntity<>(headers2);
        ResponseEntity<String> googleUserInfo = restTemplate2.exchange(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                HttpMethod.GET,
                googleProfileReq,
                String.class
        );


    }



}

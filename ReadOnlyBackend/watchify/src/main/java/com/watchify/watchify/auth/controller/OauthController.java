package com.watchify.watchify.auth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.auth.*;
import com.watchify.watchify.auth.repository.CustomAuthorizationRequestRepository;
import com.watchify.watchify.auth.service.CustomOAuth2UserService;
import com.watchify.watchify.auth.service.PrincipalDetails;
import com.watchify.watchify.auth.service.TokenService;
import com.watchify.watchify.auth.service.UserCheckService;
import com.watchify.watchify.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@CrossOrigin(origins = "*")
@RequestMapping("/oauth2")
@RequiredArgsConstructor
@RestController
public class OauthController {

    private final UserCheckService userCheckService;

    @GetMapping("/login/kakao/callback")
    @ResponseBody
    public RedirectView KakaoCallback(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response,
                                      @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}") String redirectURl) throws IOException{
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
        params.add("redirect_uri", redirectURl);
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

        // 카카오 유저 정보 JSON 문자열 파싱
        Map<String, Object> attributes = objectMapper.readValue(kakaoUserInfo.getBody(), Map.class);

        // PrincipalDetails 객체 생성
        PrincipalDetails principalDetails = PrincipalDetails.of("KAKAO", attributes);

        // 가입자 인지 확인 후 미가입이면 가입
        userCheckService.loadUser(principalDetails);

        // 토큰 생성후 리프레시는 레디스에 저장
        Token token = userCheckService.tokenGenerate(principalDetails);

        // 리다이렉트 수행
        String redirectUri = userCheckService.loginRedirect(token);
        return new RedirectView(redirectUri);

    }

    @GetMapping("/login/google/callback")
    @ResponseBody
    public RedirectView GoogleCallback(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response,
                                       @Value("${spring.security.oauth2.client.registration.google.redirect-uri}") String redirectURl) throws IOException {
        String REQUEST_URL = "https://oauth2.googleapis.com/token";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "68891012374-8ij9t01p6i3ucf9rufg334b2ahb3vhl7.apps.googleusercontent.com");
        params.add("client_secret", "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");
        params.add("redirect_uri", redirectURl);
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

        Map<String, Object> attributes = objectMapper.readValue(googleUserInfo.getBody(), Map.class);

        PrincipalDetails principalDetails = PrincipalDetails.of("GOOGLE", attributes);

        userCheckService.loadUser(principalDetails);

        Token token = userCheckService.tokenGenerate(principalDetails);

        String redirectUri = userCheckService.loginRedirect(token);
        return new RedirectView(redirectUri);
    }

    // 토근 만료시  401: Unauthorized 상태코드 발송
    @GetMapping("/token/expired")
    public String auth() {
        throw new UnauthorizedException();
    }


    // 리프레시 토큰으로 어세스토큰 재발급하고 리다이랙트
    @GetMapping("/regenerate/token")
    public RedirectView reGnerateToken(@RequestHeader("refresh") String refreshToken) {
        Token token = userCheckService.reGenerateAccess(refreshToken);
        String redirectUri = userCheckService.loginRedirect(token);

        return new RedirectView(redirectUri);
    }

}

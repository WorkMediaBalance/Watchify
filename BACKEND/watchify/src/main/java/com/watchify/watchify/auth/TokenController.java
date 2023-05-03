package com.watchify.watchify.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@RestController
public class TokenController {
    private final TokenService tokenService;


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

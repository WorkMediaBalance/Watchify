package com.watchify.watchify.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@RequiredArgsConstructor
@RestController
public class TokenController {
    private final TokenService tokenService;

    // 토근 만료시  401: Unauthorized 상태코드 발송
    @GetMapping("token/expired")
    public String auth() {
        throw new UnauthorizedException();
    }


}

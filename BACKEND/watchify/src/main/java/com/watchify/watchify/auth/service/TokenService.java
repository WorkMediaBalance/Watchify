package com.watchify.watchify.auth.service;


import com.watchify.watchify.auth.service.PrincipalDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Component
public class TokenService {
//    private String secretKey = "token-secret-key-i-am-go-byeong-jin";
    private Key key;

    // 토큰 10분
//    long tokenPeriod = 1000L * 60L * 10L;
    long tokenPeriod = 1000L * 60L * 10L * 100L; // api 테스트 용으로 매우 길게 잡음
    // 리프레시 토큰 21일
    long refreshPeriod = 1000L * 60L * 60L * 24L * 21L;

    // 객체 초기화, secretKey를 Base64로 인코딩한다.
    protected TokenService(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(PrincipalDetails user, long expirationTime) {
        return Jwts.builder()
                .claim("userId", user.getUserId())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(PrincipalDetails user) {
        return this.generateToken(user, refreshPeriod);
    }

    public String generateAccessToken(PrincipalDetails user) {
        return this.generateToken(user, tokenPeriod);
    }

    public String resolveToken(HttpServletRequest request) {
        String authorization = request.getHeader("access");
//        return this.resolveToken(authorization);
        return authorization;
    }

//    public String resolveToken(String authorization) {
//        // Bearer -> JWT 또는 OAuth 인증을 사용하는 경우 붙인다
//        if (StringUtils.hasText(authorization) && authorization.startsWith("Bearer ")) {
//            //authorization 문자열에서 Bearer 를 제거후 반환
//            return authorization.substring("Bearer ".length());
//        }
//
//        return null;
//    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    public Authentication getAuthentication(String token) {
        final Claims claims = this.getClaims(token);

        final PrincipalDetails user = PrincipalDetails.builder()
                .userId(((Integer) claims.get("userId")).longValue())
                .build();

        return new UsernamePasswordAuthenticationToken(user, token, null);
    }

    public boolean isValid(String token) {
        try {
            this.getClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.debug("만료된 토큰");
        } catch (JwtException e) {
            log.debug("유효하지 않은 토큰");
        } catch (Exception e) {
            log.debug("토큰 유효성 검사 중 알 수 없는 예외 발생");
        }
        return false;
    }


}

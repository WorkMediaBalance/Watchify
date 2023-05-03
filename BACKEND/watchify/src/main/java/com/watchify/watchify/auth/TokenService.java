package com.watchify.watchify.auth;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Service
public class TokenService {
    private String secretKey = "token-secret-key-i-am-go-byeong-jin";
    private Key key;

    // 토큰 10분
    long tokenPeriod = 1000L * 60L * 10L;
    // 리프레시 토큰 90일
    long refreshPeriod = 1000L * 60L * 60L * 24L * 30L * 3L;

    // 객체 초기화, secretKey를 Base64로 인코딩한다.
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        key = Keys.hmacShaKeyFor(keyBytes);
    }

    public Token generateToken(String userEmail, String provider, String name, String imgPath, String role) {

        // JWT payload 에 저장되는 정보단위, 보통 여기서 user를 식별하는 값을 넣는다.
        String uniqueSubject = userEmail + "_" + provider;
        Claims claims = Jwts.claims().setSubject(uniqueSubject);
        claims.put("role", role); // 정보는 key / value 쌍으로 저장된다.
        claims.put("name", name);
        claims.put("imgPath", imgPath);

        Date now = new Date();
        // Jwt 토큰 생성
        String jwtToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenPeriod))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        // Refresh 토큰 생성
        String refreshToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshPeriod))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return new Token(jwtToken, refreshToken);
    }

    public boolean verifyToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserEmail(String token) {
        String subject = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token).getBody().getSubject();
        String email = subject.split("_")[0];
        return email;
    }

    public String getProvider(String token) {
        String subject = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token).getBody().getSubject();
        String provider = subject.split("_")[1];
        return provider;
    }

    public String getUserName(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token).getBody().get("name", String.class);
    }

    public String getUserImgPath(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token).getBody().get("imgPath", String.class);
    }

}

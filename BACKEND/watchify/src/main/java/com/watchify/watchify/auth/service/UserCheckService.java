package com.watchify.watchify.auth.service;


import com.watchify.watchify.auth.Token;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserCheckService {

    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final RedisTemplate<String, String> redisTemplate;
    private static final String REFRESH_TOKEN_PREFIX = "rft_token:";

    // PrincipalDetail 로 로그인한 유저가 가입자인지 아닌지 확인
    public void loadUser(PrincipalDetails details) {
        if (details != null) {
            Optional<User> optionalUser = userRepository.findByEmailAndProvider(details.getEmail(), details.getProvider());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                details.setUserId(user.getId());
                if (optionalUser.get().isDeleted() == false) {
                    log.debug("이미 존재하는 회원 (user : {})", user);
                } else {
                    log.debug("과거 가입했지만 탈퇴한 회원 (user : {})", user);
                    details.join(); // 재가입도 isNew = true
                    reJoinProcess(user);
                }
            } else {
                joinProcess(details);
            }

        }
    }

    public void joinProcess(PrincipalDetails details) {

        details.join(); // 신규회원은 isNew = true

        final User user = User.builder()
                .provider(details.getProvider())
                .name(details.getName())
                .email(details.getEmail())
                .build();

        userRepository.save(user);
        details.setUserId(user.getId());
        log.debug("신규 회원 가입 완료({})", user);
    }

    public void reJoinProcess(User user) {
        log.debug("과거 회원 재가입 진행");

        user.updateIsDeleted();
        userRepository.save(user);
    }

    // 토큰 발급 후, rft 는 레디스 저장
    public Token tokenGenerate(PrincipalDetails details) {
        String access = tokenService.generateAccessToken(details);
        String refresh = tokenService.generateRefreshToken(details);

        String redisKey = getRedisKey(refresh);
        redisTemplate.opsForValue().set(redisKey, "", Duration.ofMinutes(5));
//        redisTemplate.opsForValue().set(redisKey, "", Duration.ofDays(21));

        Token token = new Token(access, refresh, details.isNew());
        return token;
    }

    private String getRedisKey(String refresh) {
        return REFRESH_TOKEN_PREFIX + refresh;
    }


    // rft 확인하고 발급
    public Token reGenerateAccess(String rft) {
        boolean exists = redisTemplate.hasKey(REFRESH_TOKEN_PREFIX + rft);
        Token token;
        if (exists) {
            // 리프레시 토큰 확인완료
            PrincipalDetails principalDetails = (PrincipalDetails) tokenService.getAuthentication(rft).getPrincipal();
            redisTemplate.delete(REFRESH_TOKEN_PREFIX + rft); // 기존 리프레시 삭제

            String accessToken = tokenService.generateAccessToken(principalDetails);
            String refreshToken = tokenService.generateRefreshToken(principalDetails);

            token = new Token(accessToken, refreshToken, false);
        } else {
            // 리프레시 만료되서 다시 발급받아야되는 경우 -> 로그인페이지로 리다이랙트 시킬 예정
            System.out.println("리프레시 만료!");
            token = null;
        }

        return token;
    }

    public String loginRedirect(Token token) {
        if (token == null) {
            // 프론트 로그인페이지
            return "http://localhost:8080/oauth2/frontlogin";
        }
        String callbackUri = "http://localhost:8080/oauth2/callback";
        return callbackUri +"?access=" + token.getAccessToken() + "&refresh=" + token.getRefreshToken() + "&isNew=" + token.isNew();
    }


}
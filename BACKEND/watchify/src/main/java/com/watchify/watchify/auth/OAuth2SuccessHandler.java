package com.watchify.watchify.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.dto.response.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenService tokenService;
    private final UserRequestMapper userRequestMapper;
    private final ObjectMapper objectMapper;
    private final UserService userService;
    private final RedisTemplate<String, String> redisTemplate;
    private final String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        UserDTO userDto = userRequestMapper.toDto(oAuth2User);
        final PrincipalDetails user = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        log.info("Principal에서 꺼낸 OAuth2User = {}", oAuth2User);

        // 최초 로그인이라면 회원가입 처리를 한다.
        Optional<User> optionalUser = userService.FindUserByEmailProvider(userDto.getEmail(), userDto.getProvider());
        if (optionalUser.isEmpty()) {
            // 새로운 유저면 DB 저장
            userService.InitialUserSave(userDto);
        } else if (optionalUser.get().isDeleted() == true) {
            // isDeleted 된 유저면 복구
            userService.UpdateUserIsDeleted(optionalUser.get());
        }

        log.info("토큰 발행 시작");
        final String accessToken = tokenService.generateAccessToken(user);
        final String refreshToken = tokenService.generateRefreshToken(user);


        // refresh DB 저장
        try {
            final ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

            // java compiler 에서 자동적으로 StringBuilder 를 사용하는 코드로 Optimization
            final String key = "user:rft:" + user.getUserId();
            valueOperations.set(key, refreshToken, Duration.ofDays(21));

        } catch (NoSuchElementException e) {
            log.debug("이런 일은 일어날 수 없습니다.");
        }

        // 6. Access, Refresh Token 은 Client 에게 전달
        // 7. Client 가 JWT 인증을 받도록 Redirect 전달
        getRedirectStrategy()
                .sendRedirect(request, response, getRedirectUrlWithTokens(accessToken, refreshToken, user));


    }

    private String getRedirectUrlWithTokens(String accessToken, String refreshToken, PrincipalDetails user) {
        return UriComponentsBuilder.fromUriString(redirectUrl)
                .queryParam("accessToken", accessToken)
                .queryParam("refreshToken", refreshToken)
                .queryParam("isNew", user.isNew())
                .build().toUriString();
    }
}


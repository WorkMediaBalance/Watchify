package com.watchify.watchify.auth;

import com.watchify.watchify.dto.response.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final TokenService tokenService;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        // 헤더에 "Auth" 라는 키값에서 토큰을 가져올 수 있다. OAuth2SuccessHandler 에서 설정함
        final String token = tokenService.resolveToken(request);

        // 1. request 로 보낸 token 이 valid 한지 확인
        // StringUtils.hasText(token) token 이 null 이 아니고 길이가 0이 아닌 String 이면 true
        if (StringUtils.hasText(token) && tokenService.isValid(token)) {
            // 2. valid 하면 authentication 을 SecurityContext 에 저장
            final Authentication authentication = tokenService.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.debug("JWT 인증 및 저장 완료 - authentication : {}", authentication);

        } else {
            // 3. valid 하지 않으면 authentication 이 null 이기 때문에 인증 실패
            log.debug("token 이 올바르지 않음");
        }
        // 4. 예외에 대한 처리는 AccessDeniedHandler 에서 처리

        chain.doFilter(request, response);
    }



}

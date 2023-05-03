package com.watchify.watchify.auth;

import com.watchify.watchify.dto.response.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;

@RequiredArgsConstructor
public class JwtAuthFilter extends GenericFilterBean {

    private final TokenService tokenService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 헤더에 "Auth" 라는 키값에서 토큰을 가져올 수 있다. OAuth2SuccessHandler 에서 설정함
        String token = ((HttpServletRequest)request).getHeader("Auth"); // JWT 토큰

        // 헤더에 토큰이 있고 유효기간이 지나지않음
        if (token != null && tokenService.verifyToken(token)) {
            String email = tokenService.getUserEmail(token);
            String provider = tokenService.getProvider(token);
            String name = tokenService.getUserName(token);
            String imgPath = tokenService.getUserImgPath(token);

            UserDTO userDto = UserDTO.builder()
                    .email(email)
                    .name(name)
                    .imgPath(imgPath)
                    .provider(provider).build();

            Authentication auth = getAuthentication(userDto);

            // Spring Security 의 SecurityContext 에  Authentication 객체를 설정하는 역할을 수행
            // -> 왜 하냐면...
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(request, response);
    }


    // 인증 객체 Authentication를 만드는 메서드
    // UsernamePasswordAuthenticationToken 의 2번째 인자(credentials)에는 유저의 비밀번호를 넣는다.
    // 하지만 Jwt 토큰을 이용해서 생성하기 때문에 별도의 비밀번호를 넣지 않고, 빈문자열을 이용해서 만들어준다.
    public Authentication getAuthentication(UserDTO userDto) {
        return new UsernamePasswordAuthenticationToken(userDto, "",
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}

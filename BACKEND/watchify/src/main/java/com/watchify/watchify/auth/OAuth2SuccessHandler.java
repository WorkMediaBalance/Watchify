package com.watchify.watchify.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.dto.response.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenService tokenService;
    private final UserRequestMapper userRequestMapper;
    private final ObjectMapper objectMapper;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        UserDTO userDto = userRequestMapper.toDto(oAuth2User);

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
        Token token = tokenService.generateToken(userDto.getEmail(), userDto.getProvider(), userDto.getName(), userDto.getImgPath(), "USER");
        log.info("발행한 토큰 = {}", token);

        writeTokenResponse(response, token);
    }

    private void writeTokenResponse(HttpServletResponse response, Token token) throws IOException {
//        response.setContentType("text/html;charset=UTF-8");
        response.addHeader("Auth", token.getToken());
        response.addHeader("Refresh", token.getRefreshToken());
        response.setContentType("application/json;charset=UTF-8");

        var writer = response.getWriter();
        writer.println(objectMapper.writeValueAsString(token));
        writer.flush();
    }
}


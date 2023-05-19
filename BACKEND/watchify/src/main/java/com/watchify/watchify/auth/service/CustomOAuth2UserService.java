package com.watchify.watchify.auth.service;

import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
//    private final DefaultOAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();

    // OAuth 2.0 로그인 성공시 loadUser 를 통해 확인
    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        DefaultOAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
        log.debug("사용자가 소셜 로그인 완료시 호출");
        log.debug("provider access token : {}", userRequest.getAccessToken().getTokenValue());

        // 1. name, email, provider 획득
        final OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        // provider 획득
        final String provider = userRequest.getClientRegistration().getRegistrationId().toUpperCase();
        log.debug("provider : {}", provider);

        // 필요한 정보 꺼내기
        final Map<String, Object> attributes = oAuth2User.getAttributes();
        log.debug("attributes : {}", attributes);

        //provider 마다 attributes 에서 필요한 정보를 꺼내는 방식이 달라 처리
        final PrincipalDetails details = PrincipalDetails.of(provider, attributes);

        // 2. 최초로 로그인 하는지 확인
        // 3. 최초 로그인 이면 회원 가입 + token 생성
        if (details != null) {
            Optional<User> optionalUser = userRepository.findByEmailAndProvider(details.getEmail(), details.getProvider());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                details.setUserId(user.getId());
                if (optionalUser.get().isDeleted() == false) {
                    log.debug("이미 존재하는 회원 (user : {})", user);
                } else {
                    log.debug("과거 가입했지만 탈퇴한 회원 (user : {})", user);
                    reJoinProcess(user);
                }
            } else {
                // details 의 역할이 궁금
                joinProcess(details);
            }
        }
        return null;
    }

    public void joinProcess(PrincipalDetails details) {
        log.debug("신규 회원 가입 진행");

        details.join();

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
}

package com.watchify.watchify.api.service;

import com.watchify.watchify.auth.service.PrincipalDetails;
import com.watchify.watchify.auth.service.TokenService;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.dto.response.UserBasicInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final TokenService tokenService;
    private final UserRepository userRepository;

    // 토큰에서 유저아이디 찾기
    public long findUserIdByAccessToken(String token) {
        PrincipalDetails principalDetails = (PrincipalDetails) tokenService.getAuthentication(token).getPrincipal();
        return principalDetails.getUserId();
    }

    public User returnUserById(Long userId) {
        User user = userRepository.getUserById(userId);
        return user;
    }

    public UserBasicInfoDTO getUserBasicInfo(Long userId) {
        User user = returnUserById(userId);
        UserBasicInfoDTO res = new UserBasicInfoDTO(user);
        return res;
    }
}

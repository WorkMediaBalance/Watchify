package com.watchify.watchify.api.service;

import com.watchify.watchify.auth.service.PrincipalDetails;
import com.watchify.watchify.auth.service.TokenService;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.dto.response.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final TokenService tokenService;

    // 토큰에서 유저아이디 찾기
    public long findUserIdByAccessToken(String token) {
        PrincipalDetails principalDetails = (PrincipalDetails) tokenService.getAuthentication(token).getPrincipal();
        return principalDetails.getUserId();
    }
}

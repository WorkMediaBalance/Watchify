package com.watchify.watchify.api.service;

import com.watchify.watchify.S3.AwsS3;
import com.watchify.watchify.S3.S3Service;
import com.watchify.watchify.auth.service.PrincipalDetails;
import com.watchify.watchify.auth.service.TokenService;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.dto.response.UserBasicInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final S3Service s3Service;

    @Value("${app.defaultImageName}")
    private String defaultImgName;

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

    @Transactional
    public void updateUserProfileImg(Long userId, MultipartFile multipartFile) throws IOException {
        User user = returnUserById(userId);
        AwsS3 awsS3 = new AwsS3(user);
        AwsS3 newAwsS3 = s3Service.upload(multipartFile, "userimages"); // 새로운 이미지
        if (newAwsS3.isValid()) {
            if (!defaultImgName.equals(awsS3.getKey())) {
                s3Service.remove(awsS3);
            }
            user.updateImage(newAwsS3);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Invalid AwsS3 object");
        }
    }
}

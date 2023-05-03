package com.watchify.watchify.auth;

import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.dto.response.UserDTO;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class UserRequestMapper {
    public UserDTO toDto(OAuth2User oAuth2User) {
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String imgPath = oAuth2User.getAttribute("picture");
        String provider = oAuth2User.getAttribute("provider");

        return UserDTO.builder()
                .email(email)
                .name(name)
                .imgPath(imgPath)
                .provider(provider)
                .build();
    }

}

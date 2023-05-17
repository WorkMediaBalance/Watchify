package com.watchify.watchify.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FcmTokenRequestDTO {
    private String fcmToken;
    public FcmTokenRequestDTO(String token) {
        this.fcmToken = token;
    }
}

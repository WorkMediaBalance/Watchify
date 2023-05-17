package com.watchify.watchify.auth;

import lombok.Data;

@Data
public class Token {
    private String accessToken;
    private String refreshToken;
    private boolean isNew;

    public Token(String accessToken, String refreshToken, boolean isNew) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.isNew = isNew;
    }
}

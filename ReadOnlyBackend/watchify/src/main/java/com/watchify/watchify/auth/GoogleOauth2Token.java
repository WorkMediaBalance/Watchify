package com.watchify.watchify.auth;

import lombok.Data;

@Data
public class GoogleOauth2Token {
    private String access_token;
    private int expires_in;
    private String token_type;
    private String scope;
    private String id_token;
}

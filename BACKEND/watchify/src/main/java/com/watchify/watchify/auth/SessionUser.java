package com.watchify.watchify.auth;

import com.watchify.watchify.db.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@Getter
public class SessionUser implements Serializable {
    private String name;
    private String email;
    private String provider;
    private String nickName;

    public SessionUser(User user) {
        this.name = user.getName();
        this.email = user.getEmail();
        this.provider = user.getProvider();
        this.nickName = user.getNickName();
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

}

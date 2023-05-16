package com.watchify.watchify.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserDTO {
    private String email;
    private int age = 0;
    private boolean gender = false;
    private String imgPath;
    private String imgName;
    private boolean isOttAlarm = false;
    private boolean isContentAlarm = false;
    private boolean isDeleted = false;

    private String name;
    private String nickName;
    private String provider;

    // oauth 에서 쓰고 있음
    @Builder
    public UserDTO(String email, String provider, String name, String imgPath) {
        this.email = email;
        this.name = name;
        this.imgPath = imgPath;
        this.provider = provider;
    }

    public void setUserNickName(String nickName) { this.nickName = nickName; }

}

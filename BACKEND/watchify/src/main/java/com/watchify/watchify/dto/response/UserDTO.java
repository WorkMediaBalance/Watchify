package com.watchify.watchify.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserDTO {
    private String email;
    private int age;
    private boolean gender;
    private String imgPath;
    private String imgName;
    private boolean isOttAlarm;
    private boolean isContentAlarm;
    private boolean isDeleted;

    private String name;
    private String nickName;
    private String provider;

    // oauth 에서 쓰고 있음
    @Builder
    public UserDTO(String email, String name, String imgPath) {
        this.email = email;
        this.name = name;
        this.imgPath = imgPath;

    }
}

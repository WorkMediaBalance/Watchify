package com.watchify.watchify.dto.response;

import com.watchify.watchify.db.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserBasicInfoDTO {
    private long pk;
    private String name;
    private String imgPath;

    public UserBasicInfoDTO(User user) {
        this.pk = user.getId();
        this.name = user.getNickName();
        this.imgPath = user.getImgPath();
    }
}

package com.watchify.watchify.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NickNameRequestDTO {
    private String nickName;

    public NickNameRequestDTO(String nickName) {
        this.nickName = nickName;
    }
}

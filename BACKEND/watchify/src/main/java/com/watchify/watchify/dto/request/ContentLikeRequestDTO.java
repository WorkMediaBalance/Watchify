package com.watchify.watchify.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContentLikeRequestDTO {
    private Long pk;
    private String isLike;

    public boolean getIsLikeAsBoolean() {
        return Boolean.parseBoolean(this.isLike);
    }
}

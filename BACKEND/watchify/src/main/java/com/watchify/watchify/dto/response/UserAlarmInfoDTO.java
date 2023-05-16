package com.watchify.watchify.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserAlarmInfoDTO {
    private boolean ott = false;
    private boolean content = false;

    public void setOtt(boolean flag) { this.ott = flag; }
    public void setContent(boolean flag) { this.content = flag; }
}

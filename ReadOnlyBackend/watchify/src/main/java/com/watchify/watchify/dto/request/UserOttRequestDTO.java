package com.watchify.watchify.dto.request;

import com.watchify.watchify.dto.response.OttDateDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserOttRequestDTO {
    private OttDateRequestDTO netflix;
    private OttDateRequestDTO watcha;
    private OttDateRequestDTO wavve;
    private OttDateRequestDTO disney;

    public OttDateRequestDTO getOf(String ott) {
        switch (ott) {
            case "netflix":
                return this.netflix;
            case "watcha":
                return this.watcha;
            case "wavve":
                return this.wavve;
            case "disney":
                return this.disney;
            default:
                return null;
        }
    }
}

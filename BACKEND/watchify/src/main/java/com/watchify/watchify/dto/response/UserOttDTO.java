package com.watchify.watchify.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
public class UserOttDTO {
    private OttDateDTO netflix;
    private OttDateDTO watcha;
    private OttDateDTO wavve;
    private OttDateDTO disney;

    public UserOttDTO() {
        OttDateDTO defaultDto = new OttDateDTO();
        this.netflix = defaultDto;
        this.watcha = defaultDto;
        this.wavve = defaultDto;
        this.disney = defaultDto;
    }

    public void setOf(String ott, OttDateDTO ottDateDTO) {
        switch (ott) {
            case "netflix":
                this.netflix = ottDateDTO; break;
            case "watcha":
                this.watcha = ottDateDTO; break;
            case "wavve":
                this.wavve = ottDateDTO; break;
            case "disney":
                this.disney = ottDateDTO; break;
            default:
                break;
        }
    }

}

package com.watchify.watchify.dto.response;

import com.watchify.watchify.db.entity.UserOtt;

import java.util.List;

public class MyOttDTO {
    private Boolean netflix = false;
    private Boolean watcha = false;
    private Boolean wavve = false;
    private Boolean disney = false;

    public MyOttDTO(List<UserOtt> userOTTS) {
        for (UserOtt userOtt : userOTTS) {
            switch (userOtt.getOtt().getName()) {
                case "netflix":
                    this.netflix = true;
                    break;
                case "watcha":
                    this.watcha = true;
                    break;
                case "wavve":
                    this.wavve = true;
                    break;
                case "disney":
                    this.disney = true;
                    break;
            }
        }
    }
}

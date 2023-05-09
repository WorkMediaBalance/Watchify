package com.watchify.watchify.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserOttDTO {
    private boolean netflix = false;
    private boolean watcha = false;
    private boolean wavve = false;
    private boolean disney = false;

    public Boolean getOf(String ott) {
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

    public void setOf(String ott, boolean flag) {
        switch (ott) {
            case "netflix":
                setNetflix(flag); break;
            case "watcha":
                setWatcha(flag); break;
            case "wavve":
                setWavve(flag); break;
            case "disney":
                setDisney(flag); break;
            default:
                return ;
        }
    }

    public void setNetflix(boolean flag) { this.netflix = flag; }
    public void setWatcha(boolean flag) { this.watcha = flag; }
    public void setWavve(boolean flag) { this.wavve = flag; }
    public void setDisney(boolean flag) { this.disney = flag; }
}

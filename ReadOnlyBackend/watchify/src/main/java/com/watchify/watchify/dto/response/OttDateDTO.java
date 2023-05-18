package com.watchify.watchify.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class OttDateDTO {
    private LocalDate start = null;
    private LocalDate end = null;

    public OttDateDTO(LocalDate st, LocalDate et) {
        this.start = st;
        this.end = et;
    }

    public void setStart(LocalDate date) { this.start = date; }
    public void setEnd(LocalDate date) { this.end = date; }
}

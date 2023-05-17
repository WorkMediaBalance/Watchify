package com.watchify.watchify.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ScheduleCheckRequestDTO {
    private Long pk;
    private Integer episode;
    private LocalDate date;
}

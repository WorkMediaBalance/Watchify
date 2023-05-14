package com.watchify.watchify.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
public class ScheduleCreateRequestDTO {

    private LocalDate startDate;
    private List<Long> contents;
    private List<Integer> patterns;
    private List<String> ott;

}

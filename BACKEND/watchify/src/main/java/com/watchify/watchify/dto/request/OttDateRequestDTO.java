package com.watchify.watchify.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class OttDateRequestDTO {
    private LocalDate start;
    private LocalDate end;


}

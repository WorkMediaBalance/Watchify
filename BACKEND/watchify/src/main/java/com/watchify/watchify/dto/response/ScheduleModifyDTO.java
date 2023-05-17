package com.watchify.watchify.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ScheduleModifyDTO {
    private LocalDate date; // 원래 날짜
    private Long contentId; // 컨텐츠 아이디
    private Integer episode; // 에피소드
    private LocalDate newDate; // 이동할 날짜
}

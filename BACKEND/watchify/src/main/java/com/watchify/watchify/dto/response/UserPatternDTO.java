package com.watchify.watchify.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class UserPatternDTO {
    private List<Integer> pattern;

    public UserPatternDTO(List<Integer> pattern) {
        this.pattern = pattern;
    }

}

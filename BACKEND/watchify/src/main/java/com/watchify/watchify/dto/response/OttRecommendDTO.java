package com.watchify.watchify.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class OttRecommendDTO {
    private List<Integer> netflixPk;
    private List<Integer> watchaPk;
    private List<Integer> wavvePk;
    private List<Integer> disneyPk;

    @Builder
    public OttRecommendDTO(List<Integer> netflixPk, List<Integer> watchaPk, List<Integer> wavvePk, List<Integer> disneyPk){
        this.netflixPk = netflixPk;
        this.watchaPk = watchaPk;
        this.wavvePk = wavvePk;
        this.disneyPk = disneyPk;
    }
}

package com.watchify.watchify.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Content implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String summarize;
    private int runtime;
    private double rate;
    private String imgPath;
    private String imgName;
    private int audienceAge;
    private Integer season;
    private Integer finalEpisode;
    private String horizontialImgPath;
    private String horizontialImgName;

    @Enumerated(EnumType.STRING)
    private EnumContentType type;

    private LocalDate releaseDate;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<WishContent> wishContents = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<LikeContent> likeContents = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<TurnContent> turnContents = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<ContentOtt> contentOtts = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<ContentGenre> contentGenres = new ArrayList<>();

}

package com.watchify.watchify.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
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

    @Column(nullable = true)
    private Integer season;

    @Column(nullable = true)
    private Integer finalEpisode;

    @Column(nullable = true)
    private String horizontialImgPath;

    @Column(nullable = true)
    private String horizontialImgName;

    @Enumerated(EnumType.STRING)
    private EnumContentType type;

    @Temporal(TemporalType.DATE)
    private Date releaseDate;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<WishContent> wishContents = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<LikeContent> likeContents = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<TurnContent> turnContents = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<ContentOTT> contentOTTS = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<ContentGenre> contentGenres = new ArrayList<>();

}

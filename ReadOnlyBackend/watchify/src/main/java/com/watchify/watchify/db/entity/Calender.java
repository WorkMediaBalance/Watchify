package com.watchify.watchify.db.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Calender implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    private LocalDate viewDate;

    private boolean isView;
    private boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "turn_content_id")
    private TurnContent turnContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ott_id")
    private OTT ott;

    public Calender(User user, TurnContent turnContent, OTT ott, LocalDate date) {
        this.user = user;
        this.turnContent = turnContent;
        this.ott = ott;
        this.date = date;
        this.viewDate = null;
        this.isView = false;
        this.isDeleted = false;
    }

    public void updateDelete(boolean flag) {this.isDeleted = flag;}

    public void watchThis() {
        LocalDate date = LocalDate.now();
        this.viewDate = date;
        this.isView = true;
    }

    public void cancelWatchThis() {
        this.viewDate = null;
        this.isView = false;
    }




}

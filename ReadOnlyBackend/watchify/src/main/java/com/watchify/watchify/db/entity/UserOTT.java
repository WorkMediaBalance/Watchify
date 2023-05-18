package com.watchify.watchify.db.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserOTT implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean isDeleted;
    private boolean isOvered;
    private LocalDate start;
    private LocalDate end;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ott_id")
    private OTT ott;

    public UserOTT(User user, OTT ott) {
        this.user =user;
        this.ott = ott;
        this.isDeleted = false;
        this.isOvered = false;
    }

    public void setDeleted(boolean flag) {this.isDeleted = flag; }
    public void setStart(LocalDate date) {this.start = date; }
    public void setEnd(LocalDate date) {this.end = date; }
}

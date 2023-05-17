package com.watchify.watchify.db.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserViewingStatus implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean isDeleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "turn_content_id")
    private TurnContent turnContent;

    public UserViewingStatus(User user, TurnContent turnContent) {
        this.user = user;
        this.turnContent = turnContent;
    }

    public void deleted() {
        this.isDeleted = true;
    }
}

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
public class LikeContent implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean isLike;
    private boolean isDeleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private Content content;

    public LikeContent(User user, Content content, boolean isLike) {
        this.user = user;
        this.content = content;
        this.isLike = isLike;
    }

    public void switchIsDeleted() {this.isDeleted = !this.isDeleted;}
    public void setIsLike(boolean isLike) {
        // 값을 업데이트 한다는건 DB 에 데이터가 있다는 거임
        if (this.isDeleted == true) {
            this.isLike = isLike;
            this.isDeleted = false;
        } else if (this.isLike == isLike){
            this.isDeleted = true;
        } else {
            this.isLike = isLike;
        }
    }

}

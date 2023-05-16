package com.watchify.watchify.db.entity;


import com.watchify.watchify.S3.AwsS3;
import com.watchify.watchify.S3.Image;
import com.watchify.watchify.dto.response.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@DynamicUpdate // update 시에 실제 변경된 컬럼으로만 update 쿼리를 생성해 준다.
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private int age;
    private boolean gender;
    private String imgPath;
    private String imgName;
    private boolean isOttAlarm;
    private boolean isContentAlarm;
    private boolean isDeleted;

    private String name;
    private String nickName;
    private String provider;
    private String fcmToken;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<WishContent> wishContents = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<LikeContent> likeContents = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Calender> calenders = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserOTT> userOTTS = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserDay> userDays = new ArrayList<>();

    public void updateOttAlarm() {
        this.isOttAlarm = !this.isOttAlarm;
    }

    public void updateContentAlarm() {
        this.isContentAlarm = !this.isContentAlarm;
    }

    public User(UserDTO userDto) {
        this.name = userDto.getName();
        this.email = userDto.getEmail();
        this.provider = userDto.getProvider();
        this.nickName = userDto.getName(); // 처음 별명은 이름으로 대체.
        this.age = userDto.getAge();
        this.isDeleted = userDto.isDeleted();
        this.isContentAlarm = userDto.isContentAlarm();
        this.isOttAlarm = userDto.isOttAlarm();
        this.isDeleted = userDto.isDeleted();
    }

    public void updateIsDeleted() {
        this.isDeleted = !this.isDeleted;
    }

    public void updateNickName(String nickName) {this.nickName = nickName;}

    public void updateImage(AwsS3 awsS3) {
        this.imgName = awsS3.getKey();
        this.imgPath = awsS3.getPath();
    }

    public void reJoin(String imgPath, String imgName) {
        this.isDeleted = false;
        this.nickName = this.name;
        this.imgName = imgName;
        this.imgPath = imgPath;
    }

    public void updateFcmToken(String token) {
        this.fcmToken = token;
    }
}

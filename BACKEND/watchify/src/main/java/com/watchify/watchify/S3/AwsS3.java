package com.watchify.watchify.S3;

import com.watchify.watchify.db.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AwsS3 {
    private String key;
    private String path;

    public AwsS3() {
    }

    public AwsS3(String key, String path) {
        this.key = key;
        this.path = path;
    }

    public AwsS3(User user) {
        this.key = user.getImgName();
        this.path = user.getImgPath();
    }

    public boolean isValid() {
        if (this.path == null || this.key == null) {
            return false;
        }
        return true;
    }
}

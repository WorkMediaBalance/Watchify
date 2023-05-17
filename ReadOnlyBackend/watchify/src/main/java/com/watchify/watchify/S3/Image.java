package com.watchify.watchify.S3;


import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.Convert;
import javax.persistence.Embeddable;
import java.io.UncheckedIOException;
import java.net.MalformedURLException;
import java.net.URL;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class Image {

    @NotNull
    private String savedPath; // path(저장된 경로 + 파일 이름)는 AWS에서 key를 의미한다.

    @NotNull
    private String originalName;

    public static Image getDefaultUserImage() {
        return Image.builder()
                .savedPath("userimages/default_user_image.png")
                .originalName("default_member_image.png")
                .build();
    }
}

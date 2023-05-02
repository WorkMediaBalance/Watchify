package com.watchify.watchify.auth;
// https://iseunghan.tistory.com/300 xx
// https://velog.io/@jkijki12/Spring-Boot-OAuth2-JWT-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EB%A6%AC%EA%B8%B0

import com.watchify.watchify.db.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;


@ToString
@Builder(access = AccessLevel.PRIVATE)
@Getter
public class OAuth2Attributes {
    private Map<String, Object> attributes;
    private String attributeKey;
    private String email;
    private String name;
    private String picture;

    static OAuth2Attributes of(String provider, String attributeKey,
                              Map<String, Object> attributes) {
        switch (provider) {
            case "google":
                return ofGoogle(attributeKey, attributes);
            case "kakao":
                return ofKakao("email", attributes);
            default:
                throw new RuntimeException();
        }
    }

    private static OAuth2Attributes ofGoogle(String attributeKey,
                                            Map<String, Object> attributes) {
        return OAuth2Attributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String)attributes.get("picture"))
                .attributes(attributes)
                .attributeKey(attributeKey)
                .build();
    }

    private static OAuth2Attributes ofKakao(String attributeKey,
                                           Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuth2Attributes.builder()
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .picture((String)kakaoProfile.get("profile_image_url"))
                .attributes(kakaoAccount)
                .attributeKey(attributeKey)
                .build();
    }

    Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", attributeKey);
        map.put("key", attributeKey);
        map.put("name", name);
        map.put("email", email);
        map.put("picture", picture);

        return map;
    }

}


//// OAuth2 로그인을 통해서 가져온 OAuth2User의 정보를 담아주기 위한 클래스를 생성합니다.
//@Getter
//public class OAuth2Attributes {
//    private Map<String, Object> attributes;
//    private String nameAttributeKey;
//    private String name;
//    private String email;
//    private String provider;
//
//    public OAuth2Attributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email, String provider) {
//        this.attributes = attributes;
//        this.nameAttributeKey = nameAttributeKey;
//        this.name = name;
//        this.email = email;
//        this.provider = provider;
//    }
//
//    public OAuth2Attributes() {
//    }
//
//    // 해당 로그인인 서비스가 kakao인지 google인지 구분하여, 알맞게 매핑을 해주도록 합니다.
//    // 여기서 registrationId는 OAuth2 로그인을 처리한 서비스 명("google","kakao","naver"..)이 되고,
//    // userNameAttributeName은 해당 서비스의 map의 키값이 되는 값이됩니다. {google="sub", kakao="id", naver="response"}
//    public static OAuth2Attributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
//        if (registrationId.equals("google")) {
//            return ofGoogle(userNameAttributeName, attributes);
//        }
//        return ofKakao(userNameAttributeName, attributes);
//    }
//
//    private static OAuth2Attributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
//        // 카카오로 받은 데이터에서 계정 정보가 담긴 kakao_account 값을 꺼낸다.
//        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");
//
//        // 마찬가지로 profile(nickname, image_url.. 등) 정보가 담긴 값을 꺼낸다.
//        Map<String, Object> profile = (Map<String, Object>) kakao_account.get("profile");
//
//        return new OAuth2Attributes(attributes,
//                userNameAttributeName,
//                (String) profile.get("nickname"),
//                (String) kakao_account.get("email"),
//                "카카오");
//    }
//
//    private static OAuth2Attributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
//        return new OAuth2Attributes(attributes,
//                userNameAttributeName,
//                (String) attributes.get("name"),
//                (String) attributes.get("email"),
//                "구글");
//    }
//
//    // getter, setter 생략..??
//
//    public User toEntity() {
//        return new User(name, email, provider);
//    }
//
//}

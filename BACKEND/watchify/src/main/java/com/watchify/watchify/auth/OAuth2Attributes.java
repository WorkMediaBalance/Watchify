//package com.watchify.watchify.auth;
//
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.ToString;
//
//import java.util.Map;
//
//
//@ToString
//@Builder(access = AccessLevel.PRIVATE)
//@Getter
//public class OAuth2Attributes {
//    private Map<String, Object> attributes;
//    private String attributeKey;
//    private String email;
//    private String name;
//    private String picture;
//    private String provider;
//
//    static OAuth2Attributes of(String provider, String attributeKey,
//                              Map<String, Object> attributes) {
//        switch (provider) {
//            case "google":
//                return ofGoogle(attributeKey, attributes);
//            case "kakao":
//                return ofKakao("email", attributes);
//            default:
//                throw new RuntimeException();
//        }
//    }
//
//    private static OAuth2Attributes ofGoogle(String attributeKey,
//                                            Map<String, Object> attributes) {
//        return OAuth2Attributes.builder()
//                .name((String) attributes.get("name"))
//                .email((String) attributes.get("email"))
//                .picture((String)attributes.get("picture"))
//                .provider("Google")
//                .attributes(attributes)
//                .attributeKey(attributeKey)
//                .build();
//    }
//
//    private static OAuth2Attributes ofKakao(String attributeKey,
//                                           Map<String, Object> attributes) {
//        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
//        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");
//
//        return OAuth2Attributes.builder()
//                .name((String) kakaoProfile.get("nickname"))
//                .email((String) kakaoAccount.get("email"))
//                .picture((String)kakaoProfile.get("profile_image_url"))
//                .provider("Kakao")
//                .attributes(kakaoAccount)
//                .attributeKey(attributeKey)
//                .build();
//    }
//
//}
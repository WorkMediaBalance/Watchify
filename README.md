# Watchify
다양한 컨텐츠를 스케줄링 받아 알차게 사용해보세요~~!!

## 목차
1. 서비스 개요
   1. 서비스 소개
   2. 기획 배경
   3. 디자인 컨셉
2. MVP 소개
   1. Backend
   2. Frontend
3. 시연 영상
4. 기술 스택
5. 프로젝트 산출물
6. 프로젝트 멤버
---
<br>

# 서비스 개요
## 1. 서비스 소개
Watchify는 사용자가 ott 서비스를 좀 더 알차게 즐길 수 있도록 ott 컨텐츠 추천 및 스케줄링을 해주는 서비스입니다. 

## 2. 기획 배경
OTT 구독 기간과 사용자의 취향 등을 반영하여 컨텐츠를 추천받고 시청 스케줄을 만든다면 보다 OTT를 알차게 사용할 수 있을 것이라는 기대에서 시작하였습니다.

## 3. 디자인 컨셉
- 네X버의 그린 닷을 모티브로 한 Watchify만의 레드 닷!
- 개성적인 orenge color~~
- 

# MVP 소개
## 컨텐츠 스케줄링
사용자가 시청하기 원하는 컨텐츠를 사용자의 시청 패턴에 맞도록, OTT 구독 정보에 맞춰 스케줄링합니다.
### 스케줄링 알고리즘

## 컨텐츠 추천
사용자가 시청하거나 별점을 매기거나, 혹은 위시리스트에 추가한 컨텐츠를 기반으로 컨텐츠를 추천합니다.
### 추천 알고리즘 
- ./AI/ml/recommendModels
- recommend_content.py
  - itemdict : 사용자가 선택한 장르, OTT 정보와 사용자의 시청, 평점 기록 및 위시 리스트를 반영하여 컨텐츠 데이터 조회
  - neighbor_item : 사용자와 비슷한 취향의 유저의 시청, 평점 기록을 기반으로 비슷한 취향의 유저들의 컨텐츠 데이터 조회
  - DB에서 조회한 컨텐츠 리스트를 predict 함수를 호출하여 상호 비교

- predict_rating.py
  - 추천도를 계산하기 위한 추천 종류에 따라 predict 함수를 정의
  - 비슷한 취향의 유저들의 컨텐츠 데이터와 사용자의 컨텐츠 데이터를 비교하며 SmilarytiyMatrix클래스의 get_user_similarity를 호출하여 유저 유사도(user_similarity)와 이를 이용하여 사용자들이 매긴 평점에 가중치를 부여(weighted_rating)
  - 가중치 점수가 높을수록 추천 순위가 높아짐
  - 가중치가 부여된 점수 순으로 컨텐츠를 정렬

- smilarity_matrix.py
  - 유저들 간의 smilarity를 계산하여 사용자와의 smilarity를 return
  - smilarity를 계산할 때 RatingCountMatrix 클래스의 get_agreement_count 함수를 호출하여 계산

- rating_count_matrix.py
  - smilarity를 계산할 각 유저의 취향정보를 조회
  - 시청하거나, 평점을 매긴 컨텐츠가 겹칠수록 유사도가 높아짐

## 알람 기능

## 공유 기능


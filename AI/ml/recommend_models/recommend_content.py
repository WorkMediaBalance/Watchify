from predict_rating import predict
from ml.models import User, Content, LikeContent, Genre, ContentGenre
from collections import defaultdict

def recommend(user_id, genres, age, top_n):
    userdict = User.objects.values_list('id', flat=True) # 리스트 반환
    itemdict = Content.objects.filter(audience_age__lte=age).values_list('id', flat=True)
    # genre_ids = Genre.objects.filter(name__in=genres).values('id')
    # item_ids = ContentGenre.objects.filter(genre_id__in=genre_ids).values_list('content_id')
    # itemdict = Content.objects.filter(id__in=item_ids, audience_age__lte=age).values_list('id', flat=True)
    print('조회할 컨텐츠 개수 :  ',len(itemdict))

    items_reviewed = LikeContent.objects.filter(user_id=user_id, is_deleted=False).values_list('content_id', flat=True) # user_id가 같고 is_deleted 값이 False인 데이터만 가져오기
    print(f'{user_id}의 items_reviewed 리스트 : ',list(items_reviewed))

    neighbor_user = LikeContent.objects.filter(content_id__in=items_reviewed, is_deleted=False).values_list('user_id', flat=True)
    neighbor_user = list(set(neighbor_user))
    try:
        neighbor_user.pop(list(neighbor_user).index(int(user_id)))
    except:
        pass
    neighbor_user = sorted(neighbor_user)
    print('가까운 유저 : ', neighbor_user)

    neighbor_item = LikeContent.objects.filter(user_id__in=neighbor_user, is_deleted=False).values_list('user_id', 'content_id', 'is_like')
    neighbor_item_list = defaultdict(list)
    for id, content_id, is_like in neighbor_item:
        neighbor_item_list[id].append((content_id, is_like))
    print('전처리 후 neighbor_item : ',neighbor_item_list)

    recommendations = []
    for item_id in itemdict:  # itemdict : DB에서 Content 테이블 조회하기
        if item_id not in items_reviewed:
            recommendations.append((item_id, predict(user_id, item_id, neighbor_user, userdict, neighbor_item_list)))
    recommendations = list(set(recommendations))
    recommendations.sort(key = lambda x:x[1], reverse=True) # 유사도가 높은 순서대로 정렬
    print('recommendations 리스트 : ', recommendations[:top_n])
    
    result = [(x[0], x[1]) for x in recommendations]
    # print(result)
    # result = [x for x in range(1,11)]
    return result[:top_n]
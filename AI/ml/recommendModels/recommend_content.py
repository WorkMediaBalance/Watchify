from predict_rating import predict, ott_predict
from ml.models import User, Content, LikeContent, Genre, ContentGenre, Contentott, WishContent, Ott
from collections import defaultdict

def recommend(user_id, genres, otts, age, top_n):
    userdict = User.objects.values_list('id', flat=True) # 리스트 반환
    ott_list = Ott.objects.filter(name__in=otts).values_list('id', flat=True)
    ottitem = Contentott.objects.filter(ott_id__in=ott_list).values_list('content_id', flat=True)
    # print('ottitem : ', ottitem, len(ottitem))
    itemdict = Content.objects.filter(id__in=ottitem).values_list('id', flat=True)
    # print('itemdict :: ', itemdict, len(itemdict))
    genre_ids = Genre.objects.filter(name__in=genres).values_list('id', flat=True)

    items_reviewed = []
    reviewed_item = LikeContent.objects.filter(user_id=user_id, is_deleted=False).values_list('content_id', flat=True) # user_id가 같고 is_deleted 값이 False인 데이터만 가져오기
    wished_item = WishContent.objects.filter(user_id=user_id, is_deleted=False).values_list('content_id', flat=True)
    items_reviewed += reviewed_item
    items_reviewed += wished_item
    items_reviewed = list(set(items_reviewed))
    # print('items_reviewed : ', items_reviewed)

    neighbor_user = LikeContent.objects.filter(content_id__in=items_reviewed, is_deleted=False).values_list('user_id', flat=True)
    neighbor_user = list(set(neighbor_user))
    try:
        neighbor_user.pop(list(neighbor_user).index(int(user_id)))
    except:
        pass

    neighbor_item_like = LikeContent.objects.filter(user_id__in=neighbor_user, is_deleted=False).values_list('user_id', 'content_id', 'is_like')
    neighbor_item_wish = WishContent.objects.filter(user_id__in=neighbor_user, is_deleted=False).values_list('user_id', 'content_id')
    neighbor_like_list, neighbor_wish_list = defaultdict(list), defaultdict(list)
    for id, content_id, is_like in neighbor_item_like:
        neighbor_like_list[id].append((content_id, is_like))
    for id, content_id in neighbor_item_wish:
        neighbor_wish_list[id].append((content_id))

    recommendations = []
    for item_id in itemdict:  # itemdict를 순회하면서 사용자가 보지 않은 컨텐츠에 대해서 점수 예측하기
        if item_id not in items_reviewed:
            recommendations.append((item_id, predict(user_id, item_id, neighbor_user, userdict, neighbor_like_list, neighbor_wish_list, genre_ids)))
    recommendations = list(set(recommendations))
    recommendations.sort(key = lambda x:x[1], reverse=True) # 유사도(x[1])가 높은 순서대로 정렬
    
    result = [(x[0], x[1]) for x in recommendations[:top_n]]
    return result

def ottRecommend(user_id):
    userdict = User.objects.values_list('id', flat=True)
    itemdict = Contentott.objects.values_list('content_id','ott_id')  # 현재 ott에 해당하는 컨텐츠만 가져오기

    items_reviewed = LikeContent.objects.filter(user_id=user_id, is_deleted=False).values_list('content_id', flat=True) # user_id가 같고 is_deleted 값이 False인 데이터만 가져오기

    neighbor_user = LikeContent.objects.filter(content_id__in=items_reviewed, is_deleted=False).values_list('user_id', flat=True)
    neighbor_user = list(set(neighbor_user))
    try:
        neighbor_user.pop(list(neighbor_user).index(int(user_id)))
    except:
        pass
    neighbor_user = sorted(neighbor_user)

    neighbor_item = LikeContent.objects.filter(user_id__in=neighbor_user, is_deleted=False).values_list('user_id', 'content_id', 'is_like')
    neighbor_item_list = defaultdict(list)
    for id, content_id, is_like in neighbor_item:
        neighbor_item_list[id].append((content_id, is_like))

    recommendations = [[] for _ in range(4)]
    for item_id, ott_id in itemdict:  # itemdict : DB에서 Content 테이블 조회하기
        if item_id not in items_reviewed:
            recommendations[ott_id-1].append((item_id, ott_predict(user_id, item_id, neighbor_user, userdict, neighbor_item_list)))
    
    for r in recommendations:
        r = list(set(r))
        r.sort(key = lambda x:x[1], reverse=True) # 유사도가 높은 순서대로 정렬

    result = dict()
    for r in range(4):
        try:
            content = recommendations[r][:10]
            result[r+1] = [x[0] for x in content]
        except:
            pass
    return result

def scheduleRecommend(user_id, content_ids, ott_ids):
    userdict = User.objects.values_list('id', flat=True)
    itemdict = Contentott.objects.filter(ott_id__in=ott_ids).values_list('id')  # 현재 ott에 해당하는 컨텐츠만 가져오기
    items_reviewed = content_ids # 작업대에 올라가있는 컨텐츠 id를 사용
    neighbor_user = LikeContent.objects.filter(content_id__in=items_reviewed, is_deleted=False).values_list('user_id', flat=True)
    neighbor_user = list(set(neighbor_user))
    try:
        neighbor_user.pop(list(neighbor_user).index(int(user_id)))
    except:
        pass
    neighbor_user = sorted(neighbor_user)

    neighbor_item = LikeContent.objects.filter(user_id__in=neighbor_user, is_deleted=False).values_list('user_id', 'content_id', 'is_like')
    neighbor_item_list = defaultdict(list)
    for id, content_id, is_like in neighbor_item:
        neighbor_item_list[id].append((content_id, is_like))

    recommendations = []
    for item_id in itemdict:  # itemdict : DB에서 Content 테이블 조회하기
        if item_id not in items_reviewed:
            recommendations.append((item_id[0], ott_predict(user_id, item_id, neighbor_user, userdict, neighbor_item_list)))
    recommendations = list(set(recommendations))
    recommendations.sort(key = lambda x:x[1], reverse=True) # 유사도(x[1])가 높은 순서대로 정렬

    result = [x[0] for x in recommendations[:10]]
    return result
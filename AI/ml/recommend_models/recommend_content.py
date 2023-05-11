from predict_rating import predict
from ml.models import User, Content, LikeContent, Genre, ContentGenre

def recommend(user_id, genres, top_n):

    userdict = User.objects.values_list('pk') # 리스트 반환
    itemdict = []
    for genre in genres:
        gen = Genre.objects.filter(name=genre).values('id')
        gen = gen[0]['id']
        # print(gen)
        genreitem = ContentGenre.objects.filter(genre_id=gen).values_list('content_id') # {'pk' : 'title', ~~} 딕셔너리 반환
        itemdict += genreitem
    print('rlfdlddldlld ',len(itemdict))
    itemdict = list(set(itemdict))
    items_reviewed = LikeContent.objects.filter(user_id=user_id, is_deleted=False).values_list() # user_id가 같고 is_deleted 값이 False인 데이터만 가져오기
    # print(items_reviewed)
    recommendations = []
    i = 1
    for item_id in itemdict:  # itemdict : DB에서 Content 테이블 조회하기
        print(i)
        item_id = item_id[0]
        # print(item_id)
        if item_id not in items_reviewed:
            recommendations.append((item_id, predict(user_id, item_id)))
        i += 1
    recommendations.sort(key = lambda x:x[1], reverse=True) # 유사도가 높은 순서대로 정렬

    
    result = [x[0] for x in recommendations[:top_n]]
    print(result)
    return result
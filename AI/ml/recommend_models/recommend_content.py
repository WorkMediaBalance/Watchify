import predict_rating
from ml.models import User, Content, LikeContent

def recommend(user_id, top_n):
    userdict = User.objects.values_list('pk') # 리스트 반환
    itemdict = Content.objects.values('pk', 'title') # {'pk' : 'title', ~~} 딕셔너리 반환
    items_reviewed = LikeContent.objects.filter(user_id=user_id, is_deleted=False) # user_id가 같고 is_deleted 값이 False인 데이터만 가져오기
    recommendations = []
    for item_id in itemdict.keys():  # itemdict : DB에서 Content 테이블 조회하기
        if item_id not in items_reviewed:
            recommendations.append((item_id, predict_rating(user_id, item_id)))
    recommendations.sort(key = lambda t:t[1], reverse=True) # 유사도가 높은 순서대로 정렬
    
    result = [x[0] for x in recommendations[:top_n]]
    return result
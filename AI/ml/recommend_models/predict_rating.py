from similarity_matrix import SimilarityMatrix
from ml.models import User, LikeContent, Content

def predict(user_id, item_id, neighbor_user, userdict):
    # print(f'===== predict')
    estimated_rating = 0
    similarity_sum = 0
    weighted_rating_sum = 0

    items_reviewed = LikeContent.objects.filter(user_id=user_id, is_deleted=False).values_list('content_id', flat=True)

    if item_id in items_reviewed:
        rate_bool = LikeContent.objects.filter(user_id=user_id, content_id=item_id).values('is_like')
        print('rate bool ==== ', rate_bool)
        rate = 5 if rate_bool == True else 0
        return rate
    else:
        # userlist = LikeContent.objects.filter(content_id=item_id, is_like=True).values_list('user_id') # 현재 item을 좋아하는 유저 리스트
        # print('겹치는 유저 리스트 :', userdict)
        for u in neighbor_user: # userdict : DB에서 조회해올 값
            # print(f'predict() 22줄 u of userdict :', u)
            other_id = u[0]
            # if item_id in items_reviewed:

            # item_is_like = LikeContent.objects.filter(user_id=other_id, content_id=item_id).values('is_like')
            item_rating = 5
            user_similarity = SimilarityMatrix(userdict).get_user_similarity(user_id, other_id)
            
            weighted_rating = user_similarity * item_rating
            weighted_rating_sum += weighted_rating
            similarity_sum += user_similarity
            # print('!!!!!!!!!!!!!!!!!!!!!!!!')
        if similarity_sum > 0.0:
            # print('biggggg')
            estimated_rating = weighted_rating_sum / similarity_sum

    return estimated_rating
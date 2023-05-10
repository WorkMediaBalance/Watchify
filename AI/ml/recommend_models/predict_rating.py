from similarity_matrix import SimilarityMatrix
from ml.models import User, LikeContent

def predict(user_id, item_id):
    # print(f'===== predict')
    estimated_rating = 0
    similarity_sum = 0
    weighted_rating_sum = 0

    userdict = User.objects.values('id')
    # print('???',userdict)
    items_reviewed = LikeContent.objects.filter(user_id=user_id, is_deleted=False).values_list('content_id', flat=True)

    if item_id in items_reviewed:
        # print('dlTekdkdkdkdk')
        rate_bool = LikeContent.objects.filter(user_id=user_id, content_id=item_id)
        rate = 5 if rate_bool == True else 0
        return rate
    else:
        for u in userdict: # userdict : DB에서 조회해올 값
            # print(f'???????????????????')
            other_id = u['id']
            if item_id in items_reviewed:
                # item_rating = get_score_item_reviewed(u, item_id)
                item_rating = LikeContent.objects.filter(user_id=u, content_id=item_id)
                user_similarity = SimilarityMatrix.get_user_similarity(user_id, other_id)
                
                weighted_rating = user_similarity * item_rating

                weighted_rating_sum += weighted_rating
                similarity_sum += user_similarity
            # print('!!!!!!!!!!!!!!!!!!!!!!!!')
        if similarity_sum > 0.0:
            # print('biggggg')
            estimated_rating = weighted_rating_sum / similarity_sum

    return estimated_rating
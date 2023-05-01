from similarity_matrix import SimilarityMatrix
from ml.models import User, LikeContent

def predict_rating(user_id, item_id):
    estimated_rating = None
    similarity_sum = 0
    weighted_rating_sum = 0

    userdict = User.objects.values()
    items_reviewed = LikeContent.objects.filter(user=user_id, is_deleted=False).values_list('content', flat=True)

    if item_id in items_reviewed:
        return LikeContent.objects.filter(user=user_id, content=item_id)
    else:
        for u in userdict.keys(): # userdict : DB에서 조회해올 값
            if item_id in items_reviewed:
                # item_rating = get_score_item_reviewed(u, item_id)
                item_rating = LikeContent.objects.filter(user=u, content=item_id)
                user_similarity = SimilarityMatrix.get_user_similarity(user_id, u)
                
                weighted_rating = user_similarity * item_rating

                weighted_rating_sum += weighted_rating
                similarity_sum += user_similarity
        if similarity_sum > 0.0:
            estimated_rating = weighted_rating_sum / similarity_sum

    return estimated_rating
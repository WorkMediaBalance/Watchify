from similarity_matrix import SimilarityMatrix
from ml.models import User, LikeContent, Content

def predict(user_id, item_id, neighbor_user, userdict, neighbor_item_list):
    # print(f'===== predict')
    estimated_rating = 0
    similarity_sum = 0
    weighted_rating_sum = 0

    # if item_id in items_reviewed:
    #     rate_bool = LikeContent.objects.filter(user_id=user_id, content_id=item_id).values('is_like')
    #     print('rate bool ==== ', rate_bool)
    #     rate = 5 if rate_bool == True else 0
    #     return rate

    for other_id in neighbor_user:
        # print(f'============================ {other_id} ===========================')
        items_reviewed_u = neighbor_item_list[other_id]
        # print(f'{other_id}가 본 컨텐츠 : ', items_reviewed_u)
        if item_id in (x[0] for x in items_reviewed_u):
            print(f' ==== {other_id}가 {item_id}를 봤다고 합니돠')
            # item_is_like = LikeContent.objects.filter(user_id=other_id, content_id=item_id).values('is_like')
            id, like = items_reviewed_u[list(x[0] for x in items_reviewed_u).index(item_id)]
            # print(id, like)
            item_rating = 5 if like == b'\x01' else 3
            user_similarity = SimilarityMatrix(userdict).get_user_similarity(int(user_id), int(other_id))
            print(f'유저 친밀도 ==== {user_id}, {other_id}', user_similarity)
            weighted_rating = user_similarity * item_rating
            weighted_rating_sum += weighted_rating # -> 무조건 5으 ㅣ배수
            similarity_sum += user_similarity # -> weighted_rating_sum을 5로 나눈 값
        # print('!!!!!!!!!!!!!!!!!!!!!!!!')
    if similarity_sum > 0.0:
        # print('biggggg')
        estimated_rating = weighted_rating_sum / similarity_sum # -> 무조건 5가 됨.

    return estimated_rating
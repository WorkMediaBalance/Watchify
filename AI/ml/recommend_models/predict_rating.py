from similarity_matrix import SimilarityMatrix
from ml.models import User, LikeContent, Content, ContentGenre

def predict(user_id, item_id, neighbor_user, userdict, neighbor_item_list, genre_ids):
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
            print(f' ======= {other_id}가 {item_id}를 봤다고 합니돠')
            # item_is_like = LikeContent.objects.filter(user_id=other_id, content_id=item_id).values('is_like')
            id, like = items_reviewed_u[list(x[0] for x in items_reviewed_u).index(item_id)]
            item_genre = ContentGenre.objects.filter(content_id=item_id).values_list('genre_id', flat=True)
            a = 0
            for genre in item_genre:
                if genre in genre_ids:
                    a += 1
            item_rating = 5 if like == b'\x01' else 3
            genre_rating = (a/len(genre_ids))*5  # 현재 item에 유저가 선택한 genre가 몇개나 들어있는지 : ((아이템에 포함된 장르 개수)/(사용자가 선택한 장르 개수))*5
            print(item_genre, genre_rating)

            item_rating += genre_rating
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
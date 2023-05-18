from similarity_matrix import SimilarityMatrix
from ml.models import ContentGenre

def predict(user_id, item_id, neighbor_user, max_id, neighbor_item_list, neighbor_wish_list, genre_ids):
    estimated_rating = 0
    similarity_sum = 0
    weighted_rating_sum = 0
    for other_id in neighbor_user:
        items_liked_u = neighbor_item_list[other_id]
        items_wished_u = neighbor_wish_list[other_id]
        # 점수를 부여한 컨텐츠의 경우
        if item_id in (x[0] for x in items_liked_u):
            item_genre = ContentGenre.objects.filter(content_id=item_id).values_list('genre_id', flat=True)
            a = 0
            for genre in item_genre:
                if genre in genre_ids:
                    a += 1
            id, like = items_liked_u[list(x[0] for x in items_liked_u).index(item_id)]
            genre_rating = (a / len(genre_ids))*5
            item_rating = like + genre_rating     # 유저가 부여한 점수에 취향 장르 점수
            user_similarity = SimilarityMatrix(max_id, neighbor_user).get_user_similarity(int(user_id), int(other_id))  # 유저 간의 유사도 측정

            weighted_rating = user_similarity * item_rating  # item_rating에 유저 유사도로 가중치를 부여
            weighted_rating_sum += weighted_rating
            similarity_sum += user_similarity

        # 찜 리스트의 컨텐츠인 경우    
        elif item_id in items_wished_u:
            item_genre = ContentGenre.objects.filter(content_id=item_id).values_list('genre_id', flat=True)
            a = 0
            for genre in item_genre:
                if genre in genre_ids:
                    a += 1
            genre_rating = (a/len(genre_ids))*5 
            item_rating = 5 + genre_rating        # 기본 점수 5점에, 취향 장르 점수
            user_similarity = SimilarityMatrix(max_id, neighbor_user).get_user_similarity(int(user_id), int(other_id))
            weighted_rating = user_similarity * item_rating
            weighted_rating_sum += weighted_rating
            similarity_sum += user_similarity

    if similarity_sum > 0.0:
        estimated_rating = weighted_rating_sum / similarity_sum  # 최종 예측 점수 계산

    return estimated_rating

def ott_predict(user_id, item_id, neighbor_user, max_id, neighbor_like_list, neighbor_wish_list):
    estimated_rating = 0
    similarity_sum = 0
    weighted_rating_sum = 0

    for other_id in neighbor_user:
        items_liked_u = neighbor_like_list[other_id]
        items_wished_u = neighbor_wish_list[other_id]
        if item_id in (x[0] for x in items_liked_u):
            id, like = items_liked_u[list(x[0] for x in items_liked_u).index(item_id)]
            item_rating = like * 2
            user_similarity = SimilarityMatrix(max_id, neighbor_user).get_user_similarity(int(user_id), int(other_id))
            weighted_rating = user_similarity * item_rating
            weighted_rating_sum += weighted_rating 
            similarity_sum += user_similarity

        elif item_id in items_wished_u:
            item_rating = 7
            user_similarity = SimilarityMatrix(max_id, neighbor_user).get_user_similarity(int(user_id), int(other_id))
            weighted_rating = user_similarity * item_rating
            weighted_rating_sum += weighted_rating
            similarity_sum += user_similarity

    if similarity_sum > 0.0:
        estimated_rating = weighted_rating_sum / similarity_sum

    return estimated_rating
from similarity_matrix import SimilarityMatrix
from ml.models import ContentGenre

def predict(user_id, item_id, neighbor_user, userdict, neighbor_item_list, neighbor_wish_list, genre_ids):
    estimated_rating = 0
    similarity_sum = 0
    weighted_rating_sum = 0
    for other_id in neighbor_user:
        items_liked_u = neighbor_item_list[other_id]
        items_wished_u = neighbor_wish_list[other_id]
        if item_id in (x[0] for x in items_liked_u):
            id, like = items_liked_u[list(x[0] for x in items_liked_u).index(item_id)]

            item_rating = like * 2
            user_similarity = SimilarityMatrix(userdict).get_user_similarity(int(user_id), int(other_id))

            weighted_rating = user_similarity * item_rating
            weighted_rating_sum += weighted_rating
            similarity_sum += user_similarity
            
        elif item_id in items_wished_u:
            item_genre = ContentGenre.objects.filter(content_id=item_id).values_list('genre_id', flat=True)
            a = 0
            for genre in item_genre:
                if genre in genre_ids:
                    a += 1
            genre_rating = (a/len(genre_ids))*5 
            item_rating = 5 + genre_rating
            user_similarity = SimilarityMatrix(userdict).get_user_similarity(int(user_id), int(other_id))
            weighted_rating = user_similarity * item_rating
            weighted_rating_sum += weighted_rating
            similarity_sum += user_similarity

    if similarity_sum > 0.0:
        estimated_rating = weighted_rating_sum / similarity_sum # -> 무조건 5가 됨.

    return estimated_rating

def ott_predict(user_id, item_id, neighbor_user, userdict, neighbor_like_list, neighbor_wish_list):
    estimated_rating = 0
    similarity_sum = 0
    weighted_rating_sum = 0

    for other_id in neighbor_user:
        items_liked_u = neighbor_like_list[other_id]
        items_wished_u = neighbor_wish_list[other_id]
        if item_id in (x[0] for x in items_liked_u):
            id, like = items_liked_u[list(x[0] for x in items_liked_u).index(item_id)]
            item_rating = like * 2
            user_similarity = SimilarityMatrix(userdict).get_user_similarity(int(user_id), int(other_id))
            weighted_rating = user_similarity * item_rating
            weighted_rating_sum += weighted_rating 
            similarity_sum += user_similarity

        elif item_id in items_wished_u:
            item_rating = 7
            user_similarity = SimilarityMatrix(userdict).get_user_similarity(int(user_id), int(other_id))
            weighted_rating = user_similarity * item_rating
            weighted_rating_sum += weighted_rating
            similarity_sum += user_similarity

    if similarity_sum > 0.0:
        estimated_rating = weighted_rating_sum / similarity_sum

    return estimated_rating
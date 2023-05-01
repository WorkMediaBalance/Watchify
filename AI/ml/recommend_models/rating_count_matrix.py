import numpy as np
from ml.models import User, LikeContent

class RatingCountMatrix:  # 사용자들 간의 유사도 계산
    user_id_a = None
    user_id_b = None
    matrix = None

    def __init__(self, user_id_a, user_id_b):
        # num_rating_values = max([x[0] for x in data])  # data에 어떤 값이 들어가야 하는지???????
        num_rating_values = len(User.objects.values_list('pk')) # 유저 개수?
        self.user_id_a = user_id_a
        self.user_id_b = user_id_b
        self.matrix = np.empty((num_rating_values, num_rating_values,))
        self.matrix[:] = 0
        self.calculate_matrix(user_id_a, user_id_b)
    
    def get_shape(self):
        a = self.matrix.shape
        return a
    
    def get_matrix(self):
        return self.matrix
    
    def calculate_matrix(self, user_id_a, user_id_b):
        items_reviewed_a = LikeContent.objects.filter(user=user_id_a).values_list('content')
        items_reviewed_b = LikeContent.objects.filter(user=user_id_b).values_list('content')
        for item in items_reviewed_a:
            if item in items_reviewed_b:
                # i = get_score_item_reviewed(user_id_a, item, userdict) - 1
                i = LikeContent.objects.filter(user=user_id_a, content=item).values('is_like') - 1
                # j = get_score_item_reviewed(user_id_b, item, userdict) - 1
                j = LikeContent.objects.filter(user=user_id_b, content=item).values('is_like') - 1
                self.matrix[i][j] += 1
    
    def get_total_count(self):
        return self.matrix.sum()
    
    def get_agreement_count(self):
        return np.trace(self.maxrix)
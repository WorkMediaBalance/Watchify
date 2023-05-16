import numpy as np
from ml.models import LikeContent

class RatingCountMatrix:  # 사용자들 간의 유사도 계산
    user_id_a = None
    user_id_b = None
    matrix = None

    def __init__(self, user_id_a, user_id_b):
        num_rating_values = 10 # 최대 점수 
        self.user_id_a = user_id_a
        self.user_id_b = user_id_b
        self.matrix = np.empty((num_rating_values, num_rating_values,))
        self.calculate_matrix(user_id_a, user_id_b)
    
    def get_shape(self):
        a = self.matrix.shape
        return a
    
    def get_matrix(self):
        return self.matrix
    
    def calculate_matrix(self, user_id_a, user_id_b):
        items_reviewed_a = LikeContent.objects.filter(user_id=user_id_a).values_list('content_id', 'like')
        reviewed_list_a = dict()
        for content_id, like in items_reviewed_a:
            reviewed_list_a[content_id] = like

        items_reviewed_b = LikeContent.objects.filter(user_id=user_id_b).values_list('content_id', 'like')
        reviewed_list_b = dict()
        for content_id, like in items_reviewed_b:
            reviewed_list_b[content_id] = like
        
        for item in reviewed_list_a.keys():
            try:
                if reviewed_list_b[item]:
                    i = reviewed_list_a[item]
                    j = reviewed_list_b[item]
                    self.matrix[i][j] += 1
            except:
                pass
    def get_total_count(self):
        return self.matrix.sum()
    
    def get_agreement_count(self):
        return np.trace(self.matrix)  # 2차원 배열(행렬)의 대각선 상의 원소의 합을 계산
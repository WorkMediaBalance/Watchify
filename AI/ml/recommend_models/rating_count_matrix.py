import numpy as np
from ml.models import User, LikeContent

class RatingCountMatrix:  # 사용자들 간의 유사도 계산
    user_id_a = None
    user_id_b = None
    matrix = None

    def __init__(self, user_id_a, user_id_b):
        # num_rating_values = max([x[0] for x in data])  # data에 어떤 값이 들어가야 하는지???????
        num_rating_values = 5 # 유저 개수?
        self.user_id_a = user_id_a
        self.user_id_b = user_id_b
        # self.items_reviewed_a = items_reviewed_a
        self.matrix = np.empty((num_rating_values, num_rating_values,))
        # self.matrix[:] = 0
        # print('Ratingcountmatrix ============ self.matrix : ', self.matrix)
        self.calculate_matrix(user_id_a, user_id_b)
    
    def get_shape(self):
        a = self.matrix.shape
        return a
    
    def get_matrix(self):
        return self.matrix
    
    def calculate_matrix(self, user_id_a, user_id_b):
        items_reviewed_a = LikeContent.objects.filter(user_id=user_id_a).values_list('content_id', 'is_like')
        # print(f'calculate matrix에서 {user_id_a} 유저의 조아요 리스트 : ', items_reviewed_a)
        reviewed_list_a = dict()
        for content_id, is_like in items_reviewed_a:
            reviewed_list_a[content_id] = 5 if is_like == True else 0
        items_reviewed_b = LikeContent.objects.filter(user_id=user_id_b).values_list('content_id', 'is_like')
        reviewed_list_b = dict()
        for content_id, is_like in items_reviewed_b:
            reviewed_list_b[content_id] = 5 if is_like == True else 0
        
        for item in reviewed_list_a.keys():
            try:
                if reviewed_list_b[item]:
                    # i = get_score_item_reviewed(user_id_a, item, userdict) - 1
                    # i = reviewed_list_a[item]
                    i = reviewed_list_a[item]
                    # j = get_score_item_reviewed(user_id_b, item, userdict) - 1
                    # j = reviewed_list_b[item]
                    j = reviewed_list_b[item]
                    self.matrix[i][j] += 1
            except:
                pass
    def get_total_count(self):
        return self.matrix.sum()
    
    def get_agreement_count(self):
        # print('===== get agreement count 함수 : ', self.matrix)
        # a = np.trace(self.matrix)
        # print(a)
        return np.trace(self.matrix)  # 2차원 배열(행렬)의 대각선 상의 원소의 합을 계산
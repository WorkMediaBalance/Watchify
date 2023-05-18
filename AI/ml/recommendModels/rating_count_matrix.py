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
        # 유저 a와 유저 b 각각의 좋아하는 컨텐츠 정보를 조회 후, 검색 속도를 높이기 위해 딕셔너리 형태로 바꿈.
        items_reviewed_a = LikeContent.objects.filter(user_id=user_id_a).values_list('content_id', 'like')
        reviewed_list_a = dict()
        for content_id, like in items_reviewed_a:
            reviewed_list_a[content_id] = like

        items_reviewed_b = LikeContent.objects.filter(user_id=user_id_b).values_list('content_id', 'like')
        reviewed_list_b = dict()
        for content_id, like in items_reviewed_b:
            reviewed_list_b[content_id] = like
        
        # a의 취향 리스트를 순회하면서 해당 item이 b의 취향 리스트에도 있을 경우, 각자 부여한 점수를 인덱스로하는 행렬 위치에 +1
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
        return np.trace(self.matrix)  # 2차원 배열(행렬)의 대각선 상의 원소의 합을 계산 -> 두 유저 간의 점수 부여 패턴이 비슷할수록 합이 커짐
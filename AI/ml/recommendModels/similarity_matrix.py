import numpy as np
from rating_count_matrix import RatingCountMatrix

class SimilarityMatrix:
    similarity_matrix = None

    def __init__(self, max_id, neighbor_user):
        self.build(max_id, neighbor_user)
    
    def build(self, max_id, neighbor_user):
        max_user_id = max_id + 1  # 현재 유저 수 만큼의 matrix 만들기
        self.similarity_matrix = np.empty((max_user_id, max_user_id))
        U = len(neighbor_user)
        for u in range(0, U-1):
            user_u = neighbor_user[u]
            for v in range(u+1, U):
                user_v = neighbor_user[v]
                rcm = RatingCountMatrix(user_u, user_v)  # 객체를 만들고
                agreement_count = rcm.get_agreement_count()   # 2차원 배열(행렬)의 대각선 상의 원소의 합을 계산  
                if agreement_count > 0:
                    self.similarity_matrix[user_u][user_v] = agreement_count / rcm.get_total_count() 
                else:
                    self.similarity_matrix[user_u][user_v] = 0
                self.similarity_matrix[user_u][user_u] = 1 # 사용자 본인의 유사도는 1
    
    def get_user_similarity(self, user_id1, user_id2):
        return self.similarity_matrix[min(user_id1, user_id2), max(user_id1, user_id2)]    # 현재 사용자와, 비교할 유저 간의 유사도를 반환
import numpy as np
from rating_count_matrix import RatingCountMatrix
from ml.models import User

class SimilarityMatrix:

    similarity_matrix = None
    # userdict = User.objects.values_list('id')

    def __init__(self, userdict):
        print('semilarity_matrix.py ===== userdict')
        self.build(userdict)
        # print('유저 리스트 : ',userdict)
    
    def build(self, userdict):
        max_user_id = int(max(userdict)) + 1
        self.similarity_matrix = np.empty((max_user_id, max_user_id))

        for u in range(0, len(userdict)-1):
            user_u = userdict[u]
            for v in range(u+1, len(userdict)):
                user_v = userdict[v]
                rcm = RatingCountMatrix(user_u, user_v)  # 객체를 만들고
                agreement_count = rcm.get_agreement_count()   # 2차원 배열(행렬)의 대각선 상의 원소의 합을 계산  
                if agreement_count > 0:
                    self.similarity_matrix[user_u][user_v] = agreement_count / rcm.get_total_count() # -> 항상 1이
                else:
                    self.similarity_matrix[user_u][user_v] = 0
                self.similarity_matrix[user_u][user_u] = 1 # 사용자 본인의 유사도는 1
    
    def get_user_similarity(self, user_id1, user_id2):
        return self.similarity_matrix[min(user_id1, user_id2), max(user_id1, user_id2)]
import numpy as np
from rating_count_matrix import RatingCountMatrix
from ml.models import User

class SimilarityMatrix:

    similarity_matrix = None
    userdict = User.objects.values_list('id')
    print('semilarity_matrix.py ===== userdict')
    print(userdict)

    def __init__(self):
        self.build()
    
    def build(self):
        self.similarity_matrix = np.empty((len(self.userdict), len(self.userdict),))

        for u in range(0, len(self.userdict)):
            for v in range(u+1, len(self.userdict)):
                rcm = RatingCountMatrix(u,v)
                if rcm.get_agreement_count() > 0:
                    self.similarity_matrix[u][v] = rcm.get_agreement_count() / rcm.get_total_count()
                else:
                    self.similarity_matrix[u][v] = 0
                self.similarity_matrix[u][u] = 1 # 사용자 본인의 유사도는 1
    
    def get_user_similarity(self, user_id1, user_id2):
        print('get_user_similarity')
        return self.similarity_matrix[min(user_id1, user_id2), max(user_id1, user_id2)]
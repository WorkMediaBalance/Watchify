from django.shortcuts import render

######## rest_framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

######## models & serializers
from models import *
from serializers import *

######## recommend model
import subprocess
from recommend_models import recommend_content
from model.Recommand import Recommands

# Create your views here.
class RecommendAPIView(APIView):
    def get(self,request):
        user_id = request.GET.get('user_id')
        '''
        <request로 받을 것>
        1. 유저 id
        2. 유저의 LikeContent 테이블 
           1. is_deleted = False 이면 평가한 컨텐츠
              1. is_like = True : 좋아요
              2. is_like = False : 싫어요
           2. is_deleted = True 이면 평가하지 않은 컨텐츠
        3. 유저의 wishContent 테이블 
           1. is_deleted = False 이면 찜한 컨텐츠 (컨텐츠에 대한 평가로 간주 - is_like = True)
        '''
        # Run GMF
        # python GMF.py --dataset ml-1m --epochs 20 --batch_size 256 --num_factors 8 --regs [0,0] --num_neg 4 --lr 0.001 --learner adam --verbose 1 --out 1
        
        # Run MLP
        # python MLP.py --dataset ml-1m --epochs 20 --batch_size 256 --layers [64,32,16,8] --reg_layers [0,0,0,0] --num_neg 4 --lr 0.001 --learner adam --verbose 1 --out 1

        # Run NeuMF (without pre-training): for small predictive factors, running NeuMF without pre-training can achieve better performance than GMF and MLP.
        # python NeuMF.py --dataset ml-1m --epochs 20 --batch_size 256 --num_factors 8 --layers [64,32,16,8] --reg_mf 0 --reg_layers [0,0,0,0] --num_neg 4 --lr 0.001 --learner adam --verbose 1 --out 1
        args = ["python", "./ml/model/NeuMF.py", "--dataset", "ml-1m", "--epochs", "20", "--batch_size", "256", "--num_factors", "8", "--layers", "[64,32,16,8]", "--reg_mf", "0", "--reg_layers", "[0,0,0,0]", "--num_neg", "4", "--lr", "0.001", "--learner", "adam", "--verbose", "1", "--out", "1"]

        try:
            subprocess.run(args, check=True)
        except subprocess.CalledProcessError:
            print('FAIL')
        predictions = Recommands(user_id)
        
        # Plan B
        # recommend_content(user_id, 10)

        return
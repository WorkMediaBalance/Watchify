from django.shortcuts import render

######## rest_framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

######## models & serializers
from .models import *
from .serializers import *

import sys
sys.path.append('./ml/recommend_models')

######## recommend model
import subprocess
from recommend_content import recommend
# from model.Recommand import Recommands

# Create your views here.
class RecommendAPIView(APIView):
    def get(self,request):
         user_id = request.GET.get('id')
         genres = request.GET.get('genres')
         genres = genres.split(',')
         print('장르르으ㅡㄹ응 : ',user_id, genres)
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
         # args = ["python", "./ml/model/NeuMF.py", "--dataset", "ml-1m", "--epochs", "20", "--batch_size", "256", "--num_factors", "8", "--layers", "[64,32,16,8]", "--reg_mf", "0", "--reg_layers", "[0,0,0,0]", "--num_neg", "4", "--lr", "0.001", "--learner", "adam", "--verbose", "1", "--out", "1"]

         # try:
         #     subprocess.run(args, check=True)
         # except subprocess.CalledProcessError:
         #     print('FAIL')
         # predictions = Recommands(user_id)

         # Plan B
         # result = recommend(user_id, genres, 10)
         import random

         result = random.sample(range(30000), 10)

         contents = {'content_pk' : result}
         print('결과~~~~ : ', contents)
         serializer = RecommendSerializer(contents)
         # print('응답확인 ===== ',serializer)
         return Response(serializer.data)
   
class PotatoAPIView(APIView):
   #  http://127.0.0.1:8000/api/potato?id=1&genres=액션
    def get(self,request):
         user_id = request.GET.get('id')
         genres = request.GET.get('genres')
         genres = genres.split(',')
         print('장르르으ㅡㄹ응 : ',user_id, genres)
         
         result = recommend(user_id, genres, 10)
         contents = {'content_pk' : result}
         print('포테이토 결과 ======> : ', contents)
         serializer = RecommendSerializer(contents)
         # print('응답확인 ===== ',serializer)
         return Response(serializer.data)
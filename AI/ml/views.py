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
class PotatoAPIView(APIView):
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
   
class RecommendAPIView(APIView):
   #  http://127.0.0.1:8000/api/recommend?id=1&genres=액션&rating=1
    def get(self,request):
         user_id = request.GET.get('id')
         genres = request.GET.get('genres')
         rating = request.GET.get('rating')
         genres = genres.split(',')
         audience_age = 19 if rating == 1 else 15
         print('장르르으ㅡㄹ응 : ',user_id, genres, rating, audience_age)
         import time
         start_time = time.time()
         result = recommend(user_id, genres, audience_age, 10)
         end_time = time.time()
         print('소요 시간 : ', end_time - start_time)
         contents = {
              'content_pk' : [x[0] for x in result],
              'content_rate' : [x[1]*18 for x in result]
              }
         print('포테이토 결과 ======> : ', contents)
         serializer = RecommendSerializer(contents)
         # print('응답확인 ===== ',serializer)
         return Response(serializer.data)

class mainRecommendAPIView(APIView):
     # 임시
     def get(self, request):
         import random
         contents = {
              'netflix' : random.sample(range(6000), 10),
              'watcha' : random.sample(range(6000,10000), 10),
              'wavve' : random.sample(range(10000,20000), 10),
              'disney_plus' : random.sample(range(20000,30000), 10)
         }
         serializer = mainRecommendSerializer(contents)
         return Response(serializer.data)
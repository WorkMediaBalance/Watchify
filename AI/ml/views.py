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
from recommend_content import recommend, ottRecommend, scheduleRecommend
# from model.Recommand import Recommands
import random

# Create your views here.
class PotatoAPIView(APIView):
    def get(self,request):
         user_id = request.GET.get('id')
         genres = request.GET.get('genres')
         genres = genres.split(',')

         result = random.sample(range(30000), 10)

         contents = {'content_pk' : result}
         serializer = RecommendSerializer(contents)
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
              'content_rate' : [x[1]*10 for x in result]
              }
         print('포테이토 결과 ======> : ', contents)
         serializer = RecommendSerializer(contents)
         # print('응답확인 ===== ',serializer)
         return Response(serializer.data)

class ottRecommendAPIView(APIView):
     def get(self, request):
         user_id = request.GET.get('id')

         result = ottRecommend(user_id)
         contents = {
              'netflix' : result[0],
              'watcha' : result[1],
              'wavve' : result[2],
              'disney_plus' : result[3]
         }
         serializer = mainRecommendSerializer(contents)
         return Response(serializer.data)

class scheduleRecommendAPIView(APIView):
   def get(self, request):
      user_id = request.GET.get('id')
      content_ids = request.GET.get('content_id')
      ott_ids = request.GET.get('ott_id')

      result = scheduleRecommend(user_id, content_ids, ott_ids)
      contents = {
         'content_pk': result
      }
      serializer = scheduleSerializer(contents)
      return Response(serializer.data)
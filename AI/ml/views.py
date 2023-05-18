from django.shortcuts import render

######## rest_framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

######## models & serializers
from .models import *
from .serializers import *

######## recommend model
import sys
sys.path.append('./ml/recommendModels')
from recommend_content import recommend, ottRecommend, scheduleRecommend
import time

# Create your views here.

class RecommendAPIView(APIView):
     #  http://127.0.0.1:8000/api/recommend?id=1&genres=액션&rating=1
     def get(self,request):
          user_id = request.GET.get('id')
          genres = request.GET.get('genres')
          otts = request.GET.get('ott')
          rating = request.GET.get('rating')
          genres = genres.split(',')
          otts = otts.split(',')
          audience_age = 19 if rating == 1 else 15

          start_time = time.time()
          result = recommend(user_id, genres, otts, audience_age, 10)
          end_time = time.time()
          print('recommend 소요 시간 : ', end_time - start_time)
          contents = {
               'contentPk' : [x[0] for x in result],
               'contentRate' : [x[1]*10 if x[1]*10 <= 100 else 100 for x in result]
               }

          serializer = RecommendSerializer(contents)
          return Response(serializer.data, status=status.HTTP_200_OK)

class mainRecommendAPIView(APIView):
     def get(self, request):
          user_id = request.GET.get('id')

          start_time = time.time()
          result = ottRecommend(user_id)
          end_time = time.time()
          print('ott recommend 소요 시간 : ', end_time - start_time)

          contents = {
               'contentPk': [
                    result[1],
                    result[2],
                    result[3],
                    result[4]
               ]
          }
          serializer = mainRecommendSerializer(contents)
          return Response(serializer.data, status=status.HTTP_200_OK)

class scheduleRecommendAPIView(APIView):
     def get(self, request):
          user_id = request.GET.get('id')
          content_ids = request.GET.get('content_id')
          ott_ids = request.GET.get('ott_id')
          content_ids = list(map(int, content_ids.split(',')))
          ott_ids = list(map(int, ott_ids.split(',')))

          start_time = time.time()
          result = scheduleRecommend(user_id, content_ids, ott_ids)
          end_time = time.time()
          print('schedule recommend 소요 시간 : ', end_time - start_time)

          contents = {
               'contentPk' : result
              }
          serializer = scheduleSerializer(contents)
          return Response(serializer.data, status=status.HTTP_200_OK)
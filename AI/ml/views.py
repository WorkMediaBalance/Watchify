from django.shortcuts import render

######## rest_framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from models import *
from serializers import *

######## recommend model
from recommend_models import recommend_content

# Create your views here.
class RecommendAPIView(APIView):
    def post(self,request):
        user_id = request.data['user_id']
        # request로 받을 것
        # 1. 유저 id
        # 2. 유저의 LikeContent 테이블 
        #    1. is_deleted = False 이면 평가한 컨텐츠
        #       1. is_like = True : 좋아요
        #       2. is_like = False : 싫어요
        #    2. is_deleted = True 이면 평가하지 않은 컨텐츠
        # 3. 유저의 wishContent 테이블 
        #    1. is_deleted = False 이면 찜한 컨텐츠 (컨텐츠에 대한 평가로 간주 - is_like = True)
        recommend_content(user_id, 10)

        return
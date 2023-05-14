from django.urls import path
from .views import *

app_name = 'ml'
urlpatterns = [
    path('recommend', RecommendAPIView.as_view()),
    path('potato', PotatoAPIView.as_view()),
    path('mainRecommend', mainRecommendAPIView.as_view()),
]

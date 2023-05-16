from django.urls import path
from .views import *

app_name = 'ml'
urlpatterns = [
    path('recommend', RecommendAPIView.as_view()),
    path('recommend/main', mainRecommendAPIView.as_view()),
    path('recommend/schedule', scheduleRecommendAPIView.as_view()),
]

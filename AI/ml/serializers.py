from rest_framework import serializers
# from .models import *

# class ContentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Content
#         fields = 'id'

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'

class RecommendSerializer(serializers.Serializer):
    # content_pk = serializers.IntegerField()
    contentPk = serializers.ListField(child=serializers.IntegerField())
    contentRate = serializers.ListField(child=serializers.FloatField())

class mainRecommendSerializer(serializers.Serializer):
    contentPk = serializers.ListField(child=serializers.ListField())
    # watcha = serializers.ListField(child=serializers.IntegerField())
    # wavve = serializers.ListField(child=serializers.IntegerField())
    # disney_plus = serializers.ListField(child=serializers.IntegerField())

class scheduleSerializer(serializers.Serializer):
    contentPk = serializers.ListField(child=serializers.IntegerField())
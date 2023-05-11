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
    content_pk = serializers.ListField(child=serializers.IntegerField())
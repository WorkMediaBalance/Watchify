from django.core import serializers
from .models import *

class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = 'id'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
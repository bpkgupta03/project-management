from rest_framework import serializers
from .models import Project,Task
from django.contrib.auth.models import User


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,required=True)
    
    class Meta:
        model = User
        fields = ('id','username','email','password')
        
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
# Serializer for retrieving user information (without password)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
    
class ProjectSerializer(serializers.ModelSerializer):
    # assigned_users = UserSerializer(many=True, read_only=True)
    progress = serializers.ReadOnlyField(source='calculate_progress')
    assigned_users = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'start_date', 'end_date', 'assigned_users', 'progress']

class TaskSerializer(serializers.ModelSerializer):
    # assigned_to = UserSerializer(read_only=True)
    assigned_to = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'due_date', 'assigned_to', 'project']

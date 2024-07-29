from django.shortcuts import render
from rest_framework import viewsets,generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import Project,Task
from django.contrib.auth.models import User
from .serializers import ProjectSerializer,TaskSerializer,UserCreateSerializer,UserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# Create your views here.

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
# class RegisterViewSet(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = (AllowAny,)
    
#     def create(self, request, *args, **kwargs):
#         response = super().create(request, *args, **kwargs)
#         user = User.objects.get(id=response.data['id'])
#         user.set_password(request.data['password'])
#         user.save()
#         return Response({'username': user.username, 'email': user.email})

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserCreateSerializer

    def create(self, request, *args, **kwargs):
        # Validate and save the user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()  # Save and get the user instance

        # Create a token for the user
        token, created = Token.objects.get_or_create(user=user)

        # Build the response
        response_data = {
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        }

        return Response(response_data)


class CustomAuthToken(ObtainAuthToken):
    @method_decorator(csrf_exempt)
    def post(self,request,*args,**kwargs):
        response = super().post(request,*args,**kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({
            'token':token.key,
            'user_id':token.user_id,
            'email':token.user.email
        })
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs):
        request.user.auth_token.delete()
        return Response(status=204)
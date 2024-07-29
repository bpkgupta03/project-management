from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet,TaskViewSet,RegisterView,CustomAuthToken,LogoutView,UserViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/',RegisterView.as_view(),name='register'),
    path('login/',CustomAuthToken.as_view(),name='login'),
    path('logout/',LogoutView.as_view(),name='logout'),
]

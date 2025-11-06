from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TaskViewSet #<-- from views.py

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('',include(router.urls)),
]

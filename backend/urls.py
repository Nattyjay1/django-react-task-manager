from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls), #maps all urls
    path('', RedirectView.as_view(url='api/',permanent=True)),
    path('api/',include('tasks.urls')),
    
]

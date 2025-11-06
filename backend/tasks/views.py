from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Task
from . serializers import TaskSerializer

class TaskViewSet(viewsets.ViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    #implement list (the GET /tasks/)
    def list(self, request):
        tasks = Task.objects.all().order_by('-created_at')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    #implement create (the POST /tasks/)
    def create(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    #implement retrieve (the GET /tasks/)
    def retrieve(self, request, pk=None):
        task = get_object_or_404(self.queryset, pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    #implement update (the PUT /tasks/)
    def update(self, request, pk=None):
        task = get_object_or_404(self.queryset, pk=pk) #tell serializer which object to update
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    
    #partial update (PATCH /tasks/{id})
    def partial_update(self, request, pk=None):
        task = get_object_or_404(self.queryset, pk=pk)
        
        serializer = TaskSerializer(task, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #for remove (DELETE /tasks/{id})
    def destroy(self, request, pk=None):
        task = get_object_or_404(self.queryset, pk=pk)
        task.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)
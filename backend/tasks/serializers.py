from rest_framework import serializers
from .models import Task    #importing the model defined

class TaskSerializer(serializers.ModelSerializer):
    #inherits so that it will automatically handle the crud operations and field validation
    class Meta:
        model = Task #specify the model
        fields = '__all__' #include all fields
        read_only_fields = ('id', 'created_at') #read only
        
        
        
    
    
    
    
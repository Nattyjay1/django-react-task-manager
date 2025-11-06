from django.db import models

class Task(models.Model):
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        #this is optional by order
        ordering = ['-created_at']
        
    def __str__(self):
        #this is human-readable object
        return self.title
    

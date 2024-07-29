from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    assigned_users = models.ManyToManyField(User, related_name='projects')

    def __str__(self):
        return self.title
    
    def calculate_progress(self):
        total_tasks = self.tasks.count()
        completed_tasks = self.tasks.filter(status='Completed').count()
        return (completed_tasks / total_tasks) * 100 if total_tasks else 0

class Task(models.Model):
    STATUS_CHOICES = [
        ('New', 'New'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='New')
    due_date = models.DateField()
    assigned_to = models.ForeignKey(User,on_delete=models.CASCADE,related_name='tasks')
    project = models.ForeignKey(Project,on_delete=models.CASCADE,related_name='tasks')
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.project.start_date <= self.due_date <= self.project.end_date:
            raise ValueError("Task due date must be within the project's start and end dates.")
        super().save(*args, **kwargs)
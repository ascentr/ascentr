from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Todo(models.Model):
    owner = models.ForeignKey(User, related_name="todo_list", on_delete=models.CASCADE, null=True)
    text = models.CharField(max_length=50)
    complete = models.BooleanField(default=False)
    lastdate = models.DateField(auto_now=False, null=True)


    def __str__(self):
        return self.text

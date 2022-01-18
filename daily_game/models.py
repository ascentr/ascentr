from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Daily_Game(models.Model):
    player = models.ForeignKey(User, related_name="daily_game", on_delete=models.CASCADE, null=True)
    date = models.DateField(auto_now=True, auto_now_add=False)
    letters = models.CharField(max_length=9)
    numbers = models.CharField(max_length=20)
    num_target = models.IntegerField(default=150)
    conundrum = models.CharField(max_length=9)
    score_letters = models.IntegerField(null=True)
    score_numbers = models.IntegerField(null=True)
    score_conundrum = models.IntegerField(null=True)
    score_total = models.IntegerField(null=True)

    def __str__(self):
        return self.letters
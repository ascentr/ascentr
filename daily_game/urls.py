from django.contrib import admin
from django.urls import path
from daily_game import views

app_name = 'daily_game'

urlpatterns = [

    path('', views.IndexView, name="index"),
    path('letters/', views.LettersView, name="letters"),
    path('numbers/', views.NumbersView, name="numbers"),
    path('word/', views.ConunView, name="word"),
    path('finish/', views.FinishView, name="finish"),
    path('results/', views.ResultsView, name="results"),

]
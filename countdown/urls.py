from django.urls import path
from . import views

app_name = 'countdown'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('numbers/', views.NumView.as_view(), name='numbers'),
    path('letters/', views.LettView.as_view(), name="letters"),
    path('conundrum/', views.CndView.as_view(), name="conundrum"),
    path('daily/', views.DailyView.as_view(), name="daily"),
]

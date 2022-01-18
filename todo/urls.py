from django.urls import path
from . import views

app_name = "todo"

urlpatterns = [
    path('', views.todoIndex, name='index'),
    path('add', views.addTodo, name='add'),
    path('complete/<todo_id>', views.completeTodo, name='complete'),
    path('deletecomplete', views.deleteComplete, name='deletecomplete'),
    path('deleteall', views.deleteAll, name='deleteall')
]

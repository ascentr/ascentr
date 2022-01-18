from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Todo
from .forms import TodoForm


# Create your views here.
@login_required
def todoIndex(request):
#    user = User.ForeignKey(User,  on_delete=models.CASCADE)
    todo_list = Todo.objects.order_by('lastdate')
    form = TodoForm()
    context = { 'todo_list' : todo_list , 'form': form }
    return render(request, 'todo/index.html', context)

@require_POST
def addTodo(request):
    form = TodoForm(request.POST)

    if form.is_valid():
        new_todo = Todo(text=request.POST['text'], lastdate=request.POST['lastdate'], owner=request.user)
        new_todo.save()

        request.user.todo_list.add(new_todo)
    return redirect('todo:index')

def completeTodo(request, todo_id):
    todo = Todo.objects.get(pk=todo_id)
    todo.complete = True
    todo.save()
    return redirect('todo:index')

def deleteComplete(request):
    this_user = request.user
    Todo.objects.filter(complete__exact=True, owner=this_user).delete()

    return redirect('todo:index')


def deleteAll(request):
    Todo.objects.filter(owner=request.user).delete()

    return redirect('todo:index')

from http.client import HTTPResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView
from .import forms
# Create your views here.

def signup(request):
    form = forms.UserCreateForm

    if request.method =="POST":
        form = forms.UserCreateForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            messages.info(request, 'Thanks for Registering')

            new_user = authenticate(
                username = form.cleaned_data['username'],
                password=form.cleaned_data['password1'],
                )
            login(request, new_user)

            if 'next' in request.POST:
                return redirect(request.POST.get('next'))
            else:
                return redirect('index')
        # else:
        #     # messages('There was an error Please try again')
        #     return redirect('accounts:signup')

    context = { 'form' : form }
    return render( request, 'accounts/signup.html',  context)



# class Signup(CreateView):
#     form_class = forms.UserCreateForm
#     success_url = reverse_lazy("index")
#     template_name = "accounts/signup.html"

# def login_user(request):
#     if request.method == "POST":
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user)

#             if 'next' in request.POST:
#                 return redirect(request.POST.get('next'))

#             else:
#                 messages.info(request, 'There was an ERROR. Please Check credentials and try again.')
#                 return redirect('login')
        
#         else:
#             return redirect('login')
#     else:

#         return render(request, 'accounts/login.html', {})


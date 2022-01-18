from django.shortcuts import render

# Create your views here.
from django.core.mail import send_mail, BadHeaderError
from django.core.mail import EmailMessage
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect

from django.core.mail import send_mail
from django.conf import settings

from .forms import ContactsForm


def contactsView(request):
    if request.method == 'GET':
        form = ContactsForm()

    else:
        form = ContactsForm(request.POST)
        if form.is_valid():
            subject = form.cleaned_data['subject']
            from_email = form.cleaned_data['from_email']
            message = form.cleaned_data['message']
            message = from_email + ' ' + message

            try:
                send_mail(subject, message, from_email, ['ascentrick@gmail.com'])
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return redirect('success/')

    return render(request, "contacts/contacts.html", {'form':form})


def successView(request):
    return render(request, "contacts/success.html")

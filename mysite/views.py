from django.urls import reverse, reverse_lazy
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView


class Index(TemplateView):
    template_name = 'index.html'

class About(TemplateView):
    template_name = 'about.html'

class Portfolio(TemplateView):
    template_name = 'portfolio.html'

class Services(TemplateView):
    template_name = 'services.html'


class TncPage(TemplateView):
    template_name = 'tnc.html'

class TestTodo(TemplateView):
    template_name = 'todo.html'



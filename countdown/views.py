from django.views.generic import TemplateView

#countdown views
class HomeView(TemplateView):
    template_name = 'cd_index.html'

class LettView(TemplateView):
    template_name = 'lett_index.html'

class NumView(TemplateView):
    template_name = 'num_index.html'

class CndView(TemplateView):
    template_name = 'cnd_index.html'

class DailyView(TemplateView):
    template_name = 'cd_daily.html'


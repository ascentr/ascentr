from django import forms

class  TodoForm(forms.Form):
    text = forms.CharField(max_length=50,
        widget = forms.TextInput (
            attrs ={'class': 'form-control p10', 'placeholder': 'Enter Todo Item, e.g clear junk', 'id':'space'} ))

    lastdate = forms.CharField( widget = forms.DateInput (
        attrs = { 'placeholder':'Enter deadline as YYYY-MM-DD' , 'class':'form-control datepicker'} ))

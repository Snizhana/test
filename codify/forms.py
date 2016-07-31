from django import forms
from django.forms import ModelForm, Textarea, NumberInput
from codify.models import Text


class TextForm(ModelForm):

    class Meta:
        model = Text
        fields = ['step', 'initial_text', 'modified_text']
        widgets = {
            'initial_text': Textarea(attrs={
                'cols': 80,
                'rows': 10,
                'placeholder': 'Text to encrypt or decrypt...',
                'required': True,
                'minlength': 20
            }),
            'modified_text': Textarea(attrs={
                'cols': 80,
                'rows': 10,
                'readonly': True
            }),
            'step': NumberInput(attrs={
                'required': True,
                'placeholder': 'Number of letters to shift...',
                'min': 1,
                'max': 25
            })
        }



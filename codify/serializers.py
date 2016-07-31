from rest_framework import serializers
from codify.models import Text

class TextSerializer(serializers.ModelSerializer):

    class Meta:
        model = Text
        fields = ('id', 'initial_text', 'modified_text', 'step')




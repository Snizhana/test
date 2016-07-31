from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from codify.forms import TextForm
from codify.serializers import TextSerializer
from codify.services import encoder, decoder, is_eng


def index(request):
    context = {'form': TextForm()}
    return render(request, 'form.html', context)


@api_view(['POST'])
def send_text(request):
    initial_text = request.data.get('text')
    step = int(request.data.get('step'))
    data = {
        'initial_text': initial_text,
        'step': step
    }
    if is_eng(initial_text):
        data['modified_text'] = encoder(initial_text, step)
    else:
        if is_eng(decoder(initial_text, step)):
            data['modified_text'] = decoder(initial_text, step)

    serializer = TextSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


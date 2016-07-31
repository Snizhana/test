from django.db import models


class Text(models.Model):
    initial_text = models.TextField()
    modified_text = models.TextField()
    step = models.IntegerField()

    def __str__(self):
        return self.initial_text

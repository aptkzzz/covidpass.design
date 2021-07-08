from django.db import models
from django.utils import timezone


class QR(models.Model):
    link = models.URLField('Ссылка для QR-кода')
    qr_1 = models.ImageField('Сгенерированный код 1', upload_to='static/qrs')
    qr_2 = models.ImageField('Сгенерированный код 2', upload_to='static/qrs')
    qr_3 = models.ImageField('Сгенерированный код 3', upload_to='static/qrs')
    qr_4 = models.ImageField('Сгенерированный код 4', upload_to='static/qrs')
    qr_5 = models.ImageField('Сгенерированный код 5', upload_to='static/qrs')
    qr_6 = models.ImageField('Сгенерированный код 6', upload_to='static/qrs')
    datetime = models.DateTimeField('Время создания кода', auto_created=True, default=timezone.now())

    class Meta:
        verbose_name = 'QR-код'
        verbose_name_plural = 'QR-коды'


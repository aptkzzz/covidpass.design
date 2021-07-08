from django.db import models


class QR(models.Model):
    link = models.URLField('Ссылка для QR-кода')
    qr = models.ImageField('Сгенерированный код', upload_to='static/qrs')
    datetime = models.DateTimeField('Время создания кода', auto_created=True)

    class Meta:
        verbose_name = 'QR-код'
        verbose_name_plural = 'QR-коды'


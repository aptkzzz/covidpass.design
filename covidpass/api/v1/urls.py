from django.urls import path
from api.v1.views import GenerateQRView


urlpatterns = [
    path('qr/', GenerateQRView.as_view()),  # Генерация QR-кода
    # path('template/', .as_view()),  # Сохранение шаблона
]

from django.contrib import admin
from api.models import QR


@admin.register(QR)
class CustomQRAdmin(admin.ModelAdmin):
    list_display = ('id', 'link', 'qr', 'datetime',)
    list_display_links = list_display

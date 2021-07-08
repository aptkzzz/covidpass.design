from rest_framework import serializers
from api.models import QR


class QRSerializer(serializers.ModelSerializer):
    class Meta:
        model = QR
        fields = ('id', 'name', 'short_name')

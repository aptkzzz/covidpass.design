from rest_framework.generics import RetrieveAPIView
from api.v1.serializers import QRSerializer


class GenerateQRView(RetrieveAPIView):
    serializer_class = QRSerializer

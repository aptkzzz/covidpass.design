from api.v1.serializers import QRSerializer
from api.models import QR
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer, GappedSquareModuleDrawer, CircleModuleDrawer, \
    VerticalBarsDrawer, HorizontalBarsDrawer
from qrcode.image.styles.colormasks import RadialGradiantColorMask, SolidFillColorMask
from PIL import Image, ImageOps


class GenerateQRView(CreateAPIView):
    """Генерация QR-кода"""
    serializer_class = QRSerializer

    def generate_qr(self, cert_id: str):
        GOSUSLUGI_PATH = 'https://www.gosuslugi.ru/vaccine/cert/verify/'

        GENERATOR_MAP = [
            (1, None, {}),
            (2, StyledPilImage, {"module_drawer": RoundedModuleDrawer()}),
            (3, StyledPilImage, {"module_drawer": GappedSquareModuleDrawer()}),
            (4, StyledPilImage, {"module_drawer": CircleModuleDrawer()}),
            (5, StyledPilImage, {"module_drawer": VerticalBarsDrawer()}),
            (6, StyledPilImage, {"module_drawer": HorizontalBarsDrawer()})
        ]

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(GOSUSLUGI_PATH + cert_id)
        # color_mask=SolidFillColorMask(back_color=back_color, front_color=front_color)

        for index, factory, kwargs in GENERATOR_MAP:
            img = qr.make_image(image_factory=factory, **kwargs)
            img.save(f"static/qrs/{cert_id}_{index}.png")

    def create(self, request, *args, **kwargs):
        GOSUSLUGI_PATH = 'https://www.gosuslugi.ru/vaccine/cert/verify/'

        link = request.data['link']
        if not link.startswith(GOSUSLUGI_PATH):
            return Response({
                'error': 'Сертификат зарегистрирован не на официальном сайте Госуслуг.',
            })
        cert_id = link.split("/")[-1]

        # Генерация QR-кода
        self.generate_qr(cert_id)

        kwargs = dict(zip(
            [f"qr_{n}" for n in range(1, 7)],
            [f"static/qrs/{cert_id}_{n}.png" for n in range(1, 7)]
        ))
        QR.objects.create(link=link, **kwargs)

        return Response(dict(zip(
            [f"image_{n}" for n in range(1, 7)],
            [kwargs[f"qr_{n}"] for n in range(1, 7) ]
        )))

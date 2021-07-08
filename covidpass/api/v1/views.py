from api.v1.serializers import QRSerializer
from api.models import QR
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer, GappedSquareModuleDrawer, CircleModuleDrawer, \
    VerticalBarsDrawer, HorizontalBarsDrawer
from qrcode.image.styles.colormasks import RadialGradiantColorMask, SolidFillColorMask


class GenerateQRView(CreateAPIView):
    """Генерация QR-кода"""
    serializer_class = QRSerializer

    def generate_qr(self, cert_id: str, back_color=(255, 255, 255), front_color=(0, 0, 1)):
        GOSUSLUGI_PATH = 'https://www.gosuslugi.ru/vaccine/cert/verify/'

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(GOSUSLUGI_PATH + cert_id)
        # color_mask=SolidFillColorMask(back_color=back_color, front_color=front_color)

        img_1 = qr.make_image()
        img_1.save(f"static/qrs/{cert_id}_1.png")

        img_2 = qr.make_image(image_factory=StyledPilImage, module_drawer=RoundedModuleDrawer())
        img_2.save(f"static/qrs/{cert_id}_2.png")

        img_2 = qr.make_image(image_factory=StyledPilImage, module_drawer=GappedSquareModuleDrawer())
        img_2.save(f"static/qrs/{cert_id}_3.png")

        img_2 = qr.make_image(image_factory=StyledPilImage, module_drawer=CircleModuleDrawer())
        img_2.save(f"static/qrs/{cert_id}_4.png")

        img_2 = qr.make_image(image_factory=StyledPilImage, module_drawer=VerticalBarsDrawer())
        img_2.save(f"static/qrs/{cert_id}_5.png")

        img_2 = qr.make_image(image_factory=StyledPilImage, module_drawer=HorizontalBarsDrawer())
        img_2.save(f"static/qrs/{cert_id}_6.png")

    def create(self, request, *args, **kwargs):
        GOSUSLUGI_PATH = 'https://www.gosuslugi.ru/vaccine/cert/verify/'

        link = request.data['link']
        if link[:45] != GOSUSLUGI_PATH:
            return Response({
                'error': 'Сертификат зарегистрирован не на официальном сайте Госуслуг.',
            })
        cert_id = link[45:]

        # Генерация QR-кода
        self.generate_qr(cert_id)

        qr_1_path = f'static/qrs/{cert_id}_1.png'
        qr_2_path = f'static/qrs/{cert_id}_2.png'
        qr_3_path = f'static/qrs/{cert_id}_3.png'
        qr_4_path = f'static/qrs/{cert_id}_4.png'
        qr_5_path = f'static/qrs/{cert_id}_5.png'
        qr_6_path = f'static/qrs/{cert_id}_6.png'
        QR.objects.create(link=link, qr_1=qr_1_path, qr_2=qr_2_path,  qr_3=qr_3_path, qr_4=qr_4_path,
                          qr_5=qr_5_path, qr_6=qr_6_path)

        return Response({
            'image_1': f'{qr_1_path}',
            'image_2': f'{qr_2_path}',
            'image_3': f'{qr_3_path}',
            'image_4': f'{qr_4_path}',
            'image_5': f'{qr_5_path}',
            'image_6': f'{qr_6_path}',
        })

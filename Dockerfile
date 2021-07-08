FROM python:3.9-slim as deps

RUN apt-get update && apt-get install -y gcc git
RUN python -m pip install --upgrade pip

COPY covidpass/requirements.txt requirements.txt
RUN pip install --user -r requirements.txt

RUN git clone -n https://github.com/lincolnloop/python-qrcode.git
RUN cd python-qrcode && git checkout cbb545c && python setup.py install --user && cd ..

FROM python:3.9-slim

COPY --from=deps /root/.local /root/.local
COPY covidpass /app

WORKDIR /app

RUN python manage.py migrate

ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
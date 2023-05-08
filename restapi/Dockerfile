FROM python:3.8.16-slim-buster
COPY requirements.txt requirements.txt
#RUN pip install -r requirements.txt
RUN pip install "fastapi[all]"
COPY  . .
CMD ["python", "api.py"]
FROM python:3.8.16-slim-buster

# Maintainer info
LABEL maintainer="UO270139@uniovi.es"

# Make working directories
RUN  mkdir -p  /car-segmentation-api
WORKDIR  /car-segmentation-api

# Upgrade pip with no cache
RUN pip install --no-cache-dir -U pip

# Copy application requirements file to the created working directory
COPY requirements.txt .

# Install application dependencies from the requirements file
RUN pip install -r requirements.txt

# Copy every file in the source folder to the created working directory
COPY  . .

# Run the python application
CMD ["python", "api.py"]
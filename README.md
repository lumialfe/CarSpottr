# CarSpottr

## Project Description

CarSpottr is a web application that allows users to upload images of vehicles and get 3 segmentations of the images,
corresponding to three different trained models.

This app is part of my final degree project, which aims to answer of whether it is possible to train a
model to segment images of vehicles by using images generated from 3D renders as a form of data augmentation.

I used DeepLabV3+ as the model for the segmentation, and trained it using the a combination of datastes: one soruced
online, and one generated from 3D renders.

## Preview

![image](https://github.com/lumialfe/CarSpottr/assets/60442261/035cc15f-793c-4fe8-a770-6e8a2a842f2a)

### Project Setup

1. Get Docker Images

  ```
  docker pull lumialfe/carspottr-webapp
  docker pull lumialfe/carspottr-restapi
  ```

2. Start the project

  ```
  docker compose up --build
  ```

3. Shut down the project

  ```
  docker compose down
  ```

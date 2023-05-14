
from fastapi import Body, FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
import numpy as np
import cv2
from glob import glob
from tqdm import tqdm
import tensorflow as tf
from tensorflow.keras.utils import CustomObjectScope
from metrics import dice_loss, dice_coef, iou
from uvicorn import run
from pydantic import BaseModel
import base64


# Global Parameters
HEIGHT = 256
WIDTH = 256

RANDOM_SEED = 69

origins = ["*"]
methods = ["*"]
headers = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = methods,
    allow_headers = headers    
)

@app.get("/")
async def root():
    return {"message": "Welcome to the CarSpottr API!"}

class Params(BaseModel):
    image: str

@app.post("/predict/")
async def predict(params: Params):
    if params.image == "":
        return {"message": "No image link provided"}
    
    # Load the model
    with CustomObjectScope({'iou': iou, 'dice_coef': dice_coef, 'dice_loss': dice_loss}):
        model = tf.keras.models.load_model("model/model.h5")
    
    # Decode image
    bytes = params.image.encode('utf-8')
    numpyArray = np.fromstring(bytes, np.uint8)
    image = base64.decodebytes(bytes)
        
    # Get the image
    image = cv2.imdecode(np.frombuffer(bytes, dtype=np.uint8), cv2.IMREAD_COLOR)
    h, w, _ = image.shape
    x = cv2.resize(image, (WIDTH, HEIGHT))
    x = x/255.0
    x = x.astype(np.float32)
    x = np.expand_dims(x, axis=0)

    # Make a prediction
    y = model.predict(x)[0]
    y = cv2.resize(y, (w, h))
    y = np.expand_dims(y, axis=-1)

    
    
    
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    run(app, host="0.0.0.0", port=port)

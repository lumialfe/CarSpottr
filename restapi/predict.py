
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
from fastapi.responses import Response


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

@app.post(
    "/predict/",
)
async def predict(params: Params):
    if params.image == "":
        return {"message": "No image link provided"}
    
    # Load the model
    with CustomObjectScope({'iou': iou, 'dice_coef': dice_coef, 'dice_loss': dice_loss}):
        model = tf.keras.models.load_model("model/model.h5")
    
    # Decode image
    bytes = params.image.encode('utf-8')
    image = base64.decodebytes(bytes)
    image = np.frombuffer(image, dtype=np.uint8)
        
    # Get the image
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    
    h, w, _ = image.shape
    x = cv2.resize(image, (WIDTH, HEIGHT))
    x = x/255.0
    x = x.astype(np.float32)
    x = np.expand_dims(x, axis=0)
    

    # Make a prediction
    y = model.predict(x)[0]
    y = cv2.resize(y, (w, h))
    y = np.expand_dims(y, axis=-1)
    
    x = cv2.resize(image, (w, h))
    res = cv2.cvtColor(x, cv2.COLOR_RGB2RGBA)
    
    for i in range(len(y)):
        for j in range(len(y[i])):
            if (y[i][j] > 0.9):
                y[i][j] = 255
            else:
                 y[i][j] = 0
                 res[i][j][3] = 0
                
    
    
    mask = cv2.imencode('.png', res)
    mask = mask[1]
    
    print(mask)
    
    mask = base64.b64encode(mask)
    #print(mask)
    return {"mask" : str(mask)}

    
    
    
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    run(app, host="0.0.0.0", port=port)

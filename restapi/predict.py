from fastapi import Body, FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
import numpy as np
import cv2
import tensorflow as tf
from tensorflow.keras.utils import CustomObjectScope
from metrics import dice_loss, dice_coef, iou
from uvicorn import run
from pydantic import BaseModel
import base64

RANDOM_SEED = 33

origins = ["*"]
methods = ["*"]
headers = ["*"]

# Create the FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware, 
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = methods,
    allow_headers = headers    
)

# Load the models
with CustomObjectScope({'iou': iou, 'dice_coef': dice_coef, 'dice_loss': dice_loss}):
    m_v1 = tf.keras.models.load_model("model/model.v1.h5")
    m_v2 = tf.keras.models.load_model("model/model.v2.h5")
    m_v3 = tf.keras.models.load_model("model/model.v3.h5")

# Encodes the image to base64
def encode(img):
    img = cv2.imencode('.png', img)
    img = img[1]
    img = base64.b64encode(img)
    return img

# Get the prediction
def getPrediction(image, width, height, model):
    # Resize the image
    h, w, _ = image.shape
    x = cv2.resize(image, (width, height))
    x = x/255.0
    x = x.astype(np.float32)
    x = np.expand_dims(x, axis=0)
    
    # Make a prediction
    y = model.predict(x)[0]
    y = cv2.resize(y, (w, h))
    y = np.expand_dims(y, axis=-1)

    # Resize back and add Alpha Channel
    x = cv2.resize(image, (w, h))
    res = cv2.cvtColor(x, cv2.COLOR_RGB2RGBA)

    # Crop
    for i in range(len(y)):
        for j in range(len(y[i])):
            if (y[i][j] > 0.9):
                y[i][j] = 255
            else:
                 y[i][j] = 0
                 res[i][j][3] = 0

    return res

# Define test endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the CarSpottr API!"}

# Define the parameters of the request
class Params(BaseModel):
    image: str

# Define the endpoint for the prediction
@app.post("/predict/")
async def predict(params: Params):
    if params.image == "":
        return {"message": "No image link provided"}
    
    # Decode image
    bytes = params.image.encode('utf-8')
    image = base64.decodebytes(bytes)
    image = np.frombuffer(image, dtype=np.uint8)
        
    # Get the image
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    # Make predictions
    res_v1 = encode(getPrediction(image=image, width=512, height=512, model=m_v1))
    res_v2 = encode(getPrediction(image=image, width=512, height=512, model=m_v2))
    res_v3 = encode(getPrediction(image=image, width=256, height=256, model=m_v3))

    # Return the results
    return {"v1" : str(res_v1),
            "v2" : str(res_v2),
            "v3" : str(res_v3)}
    
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    run(app, host="0.0.0.0", port=port)

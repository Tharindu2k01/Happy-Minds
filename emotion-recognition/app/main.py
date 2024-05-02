# Importing the libraries
import io # IO Stream
import base64 # To manage Base64 image URLs
import time 
import numpy as np
from tensorflow import keras
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load Tensorflow and Keras Model

print('Loading Model ...')
model_new = keras.models.load_model('app/model.h5')
print('Model Loaded')

# Enabling Cors
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:3000","http://localhost:3000"]}})

# Test Route
@app.route('/')
def index():
    return "<h1>Emotion Detection Flask API !!</h1>"

# Emotion Prediction Route
@app.route('/predict_emotion',methods=['POST'])
def predict_emotion():
    '''
    For direct API calls trought request
    '''
    data = request.get_json(force=True)
    start = time.time()
    
    # Seperating the img data URL and taking only the image part.
    dImage = data['img'].split(',')[1];
    
    # Decoding the encoded image
    imgdata = base64.b64decode(dImage)
    img = Image.open(io.BytesIO(imgdata))
    
    # Resizing the image into size 48x48
    img = img.convert('L').resize((48, 48), Image.ANTIALIAS)
    img = np.array(img)
    img = img.reshape(48,48,1).astype('float32')
    img = img/255
	
    # Getting the prediciton
    #prediction_new = model_new.predict_classes(img[None,:,:])
    #prediction_new = (model_new.predict(img[None,:,:]) > 0.5).astype("int32")
    prediction_new = np.argmax(model_new.predict(img[None,:,:]), axis=1)
    end = time.time()
    
    print('Prediction Time: ',end - start)

    emotion = "" 
    # Return the emotion according to the prediction
    if prediction_new[0] == 0:
        emotion = "happy"
    elif prediction_new[0] == 1:
        emotion = "sad"
    elif prediction_new[0] == 2:
        emotion = "neutral"
    
    return jsonify({"key":int(prediction_new[0]),"emotion":emotion})

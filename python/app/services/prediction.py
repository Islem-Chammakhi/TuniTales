from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
from tensorflow.keras.applications.efficientnet import preprocess_input
from io import BytesIO

# Load the model (on app launch)
model = load_model("app/models_ai/model_EfficientNetB0_1.h5",compile=False)

class_names = [
    "amphitheatre_carthage",
    "aqueduc_zagouane",
    "el_jem",
    "okba_mosque",
    "synagogue_ghriba",
    "theatre_romain_dougga",
    "zaytouna_mosque"
]

def preprocess_image(image_bytes):
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))
    img_array = np.array(image)
    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

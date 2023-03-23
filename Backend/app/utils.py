from django.conf import settings
import numpy as np
import pickle

class_names = ['Lying', 'Running 3 METs', 'Running 5 METs', 'Running 7 METs', 'Self Pace walk', 'Sitting']

# predicts current activity of the person 
def predict_activity(height, weight, steps, calories, distance, heart_rate):
    arr = np.array([[height, weight, steps, calories, distance, heart_rate]])
    ml_model_pl = pickle.load(open(f"{settings.BASE_DIR}/Health_Care_Model1.pickle", 'rb'))
    pred = ml_model_pl.predict(arr)
    return class_names[int(pred)]


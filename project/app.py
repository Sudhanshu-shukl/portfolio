from flask import Flask, render_template, request, redirect, url_for
import pickle
import os
import numpy as np
from pathlib import Path

app = Flask(__name__)

# Ensure the model directory exists
model_dir = Path("model")
model_dir.mkdir(exist_ok=True)

# Path to the model file
MODEL_PATH = "model/cancer_type_model.pkl"

# Load the model if it exists, otherwise it will be created by train_model.py
def load_model():
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        return model
    return None

# List of symptoms for the form
SYMPTOMS = [
    "Persistent cough", "Shortness of breath", "Chest pain", 
    "Hoarseness", "Weight loss", "Fatigue",
    "Loss of appetite", "Unexplained pain", "Lump or thickening", 
    "Skin changes", "Change in bowel habits", "Change in bladder function",
    "Fever", "Night sweats", "Bleeding or bruising"
]

# Cancer types that can be predicted
CANCER_TYPES = [
    "Lung Cancer", "Breast Cancer", "Colorectal Cancer",
    "Prostate Cancer", "Skin Cancer", "Lymphoma",
    "Leukemia", "Pancreatic Cancer", "Liver Cancer"
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/symptoms')
def symptoms():
    return render_template('symptoms.html', symptoms=SYMPTOMS)

@app.route('/predict', methods=['POST'])
def predict():
    # Get selected symptoms from form
    selected_symptoms = request.form.getlist('symptoms')
    
    # Create features array (1 for selected symptoms, 0 for unselected)
    features = np.zeros(len(SYMPTOMS))
    for symptom in selected_symptoms:
        if symptom in SYMPTOMS:
            idx = SYMPTOMS.index(symptom)
            features[idx] = 1
    
    # Load model
    model = load_model()
    
    # If model exists, make prediction
    if model:
        # Convert features to the format expected by the model
        features = features.reshape(1, -1)
        
        # Get prediction and confidence
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        confidence = round(max(probabilities) * 100, 2)
        
        # Get the predicted cancer type
        cancer_type = CANCER_TYPES[prediction]
        
        # Get top 3 highest probability cancer types and their probabilities
        indices = np.argsort(probabilities)[::-1][:3]
        top_predictions = [(CANCER_TYPES[i], round(probabilities[i] * 100, 2)) for i in indices]
        
        return render_template('result.html', 
                              cancer_type=cancer_type, 
                              confidence=confidence,
                              selected_symptoms=selected_symptoms,
                              top_predictions=top_predictions)
    else:
        # If model doesn't exist, train it first
        return render_template('result.html', 
                              error="Model not found. Please train the model first.",
                              selected_symptoms=selected_symptoms)

@app.route('/train_model')
def train_model_route():
    # Import and run the model training script
    import model.train_model
    model.train_model.train_and_save_model()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
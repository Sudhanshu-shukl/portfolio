import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier
from pathlib import Path
import os

# Ensure the model directory exists
model_dir = Path("model")
model_dir.mkdir(exist_ok=True)

# Path to save the model
MODEL_PATH = "model/cancer_type_model.pkl"

# List of symptoms (from app.py)
SYMPTOMS = [
    "Persistent cough", "Shortness of breath", "Chest pain", 
    "Hoarseness", "Weight loss", "Fatigue",
    "Loss of appetite", "Unexplained pain", "Lump or thickening", 
    "Skin changes", "Change in bowel habits", "Change in bladder function",
    "Fever", "Night sweats", "Bleeding or bruising"
]

# Cancer types
CANCER_TYPES = [
    "Lung Cancer", "Breast Cancer", "Colorectal Cancer",
    "Prostate Cancer", "Skin Cancer", "Lymphoma",
    "Leukemia", "Pancreatic Cancer", "Liver Cancer"
]

def generate_synthetic_data(n_samples=500):

    # Number of features (symptoms)
    n_features = len(SYMPTOMS)
    
    # Number of classes (cancer types)
    n_classes = len(CANCER_TYPES)
    
    # Generate random features (symptoms)
    X = np.random.randint(0, 2, size=(n_samples, n_features))
    
    # Generate synthetic relationships between symptoms and cancer types
    # This is highly simplified and for demonstration only
    y = np.zeros(n_samples, dtype=int)
    
    # Simple rules for demonstration:
    # - If symptoms 0, 1, 2 are present together, likely lung cancer (0)
    # - If symptoms 8, 9 are present together, likely breast cancer (1)
    # Etc.
    
    for i in range(n_samples):
        # Lung cancer indicators
        if X[i, 0] == 1 and X[i, 1] == 1 and X[i, 2] == 1:
            y[i] = 0
        # Breast cancer indicators
        elif X[i, 8] == 1 and X[i, 9] == 1:
            y[i] = 1
        # Colorectal cancer indicators
        elif X[i, 10] == 1 and X[i, 11] == 1:
            y[i] = 2
        # Prostate cancer indicators
        elif X[i, 11] == 1 and X[i, 7] == 1:
            y[i] = 3
        # Skin cancer indicators
        elif X[i, 9] == 1:
            y[i] = 4
        # Lymphoma indicators
        elif X[i, 12] == 1 and X[i, 13] == 1:
            y[i] = 5
        # Leukemia indicators
        elif X[i, 5] == 1 and X[i, 13] == 1 and X[i, 14] == 1:
            y[i] = 6
        # Pancreatic cancer indicators
        elif X[i, 4] == 1 and X[i, 5] == 1 and X[i, 6] == 1:
            y[i] = 7
        # Liver cancer indicators
        elif X[i, 4] == 1 and X[i, 7] == 1:
            y[i] = 8
        else:
            # Random assignment for remaining cases
            y[i] = np.random.randint(0, n_classes)
    
    return X, y

def train_and_save_model():
    """Train a model and save it to disk."""
    print("Generating synthetic data...")
    X, y = generate_synthetic_data()
    
    print("Training model...")
    # Train a random forest classifier
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    print(f"Saving model to {MODEL_PATH}...")
    # Save the model
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
    
    print("Model trained and saved successfully!")
    return model

if __name__ == "__main__":
    train_and_save_model()
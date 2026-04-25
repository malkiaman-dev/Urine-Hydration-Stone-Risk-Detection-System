import os
import cv2
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

from src.feature_extraction import extract_features
from src.model_utils import load_model
from src.result_mapping import RESULTS

# Flask App
app = Flask(__name__)
CORS(app)

# Model cache
_model_cache = None


def load_saved_model():
    global _model_cache
    if _model_cache is None:
        _model_cache = load_model()
    return _model_cache


# Home route
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "success",
        "message": "Urine Hydration & Stone Risk Detection Backend is running"
    })


# Predict route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Check image exists
        if "image" not in request.files:
            return jsonify({
                "status": "error",
                "message": "No image uploaded. Use key name 'image'."
            }), 400

        file = request.files["image"]

        if file.filename == "":
            return jsonify({
                "status": "error",
                "message": "No selected file."
            }), 400

        # Read image
        image = Image.open(file.stream).convert("RGB")
        image_np = np.array(image)
        image_bgr = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

        # Load model
        model, scaler, label_encoder = load_saved_model()

        # Extract features
        features = extract_features(image_bgr)
        features_scaled = scaler.transform([features])

        # Predict
        prediction = model.predict(features_scaled)[0]
        probabilities = model.predict_proba(features_scaled)[0]

        class_label = label_encoder.inverse_transform([prediction])[0]
        confidence = float(np.max(probabilities) * 100)

        # Result mapping
        result = RESULTS.get(class_label, {})

        # Class-wise probabilities
        probability_data = {}
        for label, prob in zip(label_encoder.classes_, probabilities):
            mapped = RESULTS.get(label, {"class_name": label})
            probability_data[label] = {
                "class_name": mapped.get("class_name", label),
                "probability": round(float(prob * 100), 2)
            }

        # Final response
        return jsonify({
            "status": "success",
            "prediction": {
                "class_label": class_label,
                "class_name": result.get("class_name", class_label),
                "hydration": result.get("hydration", "N/A"),
                "stone_risk": result.get("stone_risk", "N/A"),
                "urine_color": result.get("urine_color", "N/A"),
                "advice": result.get("advice", "N/A"),
                "confidence": round(confidence, 2),
                "probabilities": probability_data
            }
        })

    except FileNotFoundError:
        return jsonify({
            "status": "error",
            "message": "Model not found. Run train_model.py first."
        }), 500

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# Run server
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
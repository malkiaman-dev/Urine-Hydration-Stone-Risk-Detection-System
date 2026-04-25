import sys
import cv2
import numpy as np

from src.feature_extraction import extract_features
from src.model_utils import load_model
from src.result_mapping import RESULTS


def predict_image(image_path):
    model, scaler, label_encoder = load_model()

    image = cv2.imread(image_path)

    if image is None:
        raise ValueError("Could not read image.")

    features = extract_features(image)
    features_scaled = scaler.transform([features])

    prediction = model.predict(features_scaled)[0]
    probabilities = model.predict_proba(features_scaled)[0]

    class_label = label_encoder.inverse_transform([prediction])[0]
    confidence = np.max(probabilities) * 100

    result = RESULTS[class_label]

    print("\nPrediction Result")
    print("-----------------")
    print(f"Predicted Class: {result['class_name']}")
    print(f"Hydration Status: {result['hydration']}")
    print(f"Stone Risk: {result['stone_risk']}")
    print(f"Urine Color: {result['urine_color']}")
    print(f"Confidence: {confidence:.2f}%")
    print(f"Advice: {result['advice']}")

    if confidence < 70:
        print("\nWarning: Confidence is low. Upload a clearer image.")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python predict.py test_images/test.jpeg")
    else:
        predict_image(sys.argv[1])
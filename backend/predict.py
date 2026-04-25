import sys
import cv2
import numpy as np

from src.feature_extraction import extract_features
from src.model_utils import load_model
from src.result_mapping import RESULTS


def predict_image(image_path):
    try:
        # Load model
        model, scaler, label_encoder = load_model()

        # Read image
        image = cv2.imread(image_path)

        if image is None:
            raise ValueError("Could not read image. Please check the file path.")

        # Extract features
        features = extract_features(image)
        features_scaled = scaler.transform([features])

        # Predict
        prediction = model.predict(features_scaled)[0]
        probabilities = model.predict_proba(features_scaled)[0]

        class_label = label_encoder.inverse_transform([prediction])[0]
        confidence = float(np.max(probabilities) * 100)

        # Map result
        result = RESULTS.get(class_label)

        if result is None:
            raise ValueError(f"No mapping found for predicted class: {class_label}")

        # Print result
        print("\n==============================")
        print("      Prediction Result")
        print("==============================")
        print(f"Predicted Class   : {result['class_name']}")
        print(f"Hydration Status  : {result['hydration']}")
        print(f"Stone Risk        : {result['stone_risk']}")
        print(f"Urine Color       : {result['urine_color']}")
        print(f"Confidence        : {confidence:.2f}%")
        print(f"Advice            : {result['advice']}")
        print("==============================\n")

        # Print class-wise probabilities
        print("Class Probabilities:")
        print("------------------------------")
        for label, prob in zip(label_encoder.classes_, probabilities):
            mapped = RESULTS.get(label, {})
            class_name = mapped.get("class_name", label)
            print(f"{class_name}: {prob * 100:.2f}%")

        # Low confidence warning
        if confidence < 70:
            print("\n⚠ Warning: Confidence is low. Upload a clearer image.")

    except FileNotFoundError:
        print("❌ Model files not found. Run train_model.py first.")

    except Exception as e:
        print(f"❌ Error: {str(e)}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("python predict.py test_images/test.jpeg")
    else:
        predict_image(sys.argv[1])
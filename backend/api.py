from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np

from src.feature_extraction import extract_features
from src.model_utils import load_model
from src.result_mapping import RESULTS


app = FastAPI(
    title="Urine Hydration & Kidney Stone Risk Screening API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_MODEL_CACHE = None


def get_model_artifacts():
    global _MODEL_CACHE

    if _MODEL_CACHE is None:
        _MODEL_CACHE = load_model()

    return _MODEL_CACHE


def decode_image_bytes(image_bytes: bytes):
    np_data = np.frombuffer(image_bytes, dtype=np.uint8)
    image_bgr = cv2.imdecode(np_data, cv2.IMREAD_COLOR)

    if image_bgr is None:
        raise HTTPException(status_code=400, detail="Unable to decode image.")

    return image_bgr


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded image is empty.")

    image_bgr = decode_image_bytes(image_bytes)

    try:
        model, scaler, label_encoder = get_model_artifacts()
    except FileNotFoundError:
        raise HTTPException(
            status_code=500,
            detail="Model files not found. Run `python train_model.py` first.",
        )

    features = extract_features(image_bgr)
    features_scaled = scaler.transform([features])

    prediction = model.predict(features_scaled)[0]
    probabilities = model.predict_proba(features_scaled)[0]

    class_label = label_encoder.inverse_transform([prediction])[0]
    mapped_result = RESULTS.get(class_label)

    if mapped_result is None:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction label `{class_label}` is not configured in result mapping.",
        )

    class_probabilities = {}
    for label, probability in zip(label_encoder.classes_, probabilities):
        hydration_name = RESULTS.get(label, {}).get("hydration", label)
        class_probabilities[hydration_name] = round(float(probability * 100), 1)

    response = {
        "class_name": mapped_result["class_name"],
        "hydration": mapped_result["hydration"],
        "stone_risk": mapped_result["stone_risk"],
        "urine_color": mapped_result["urine_color"],
        "confidence": round(float(np.max(probabilities) * 100), 1),
        "advice": mapped_result["advice"],
        "probabilities": class_probabilities,
    }

    return response

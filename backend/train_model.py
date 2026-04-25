import os
import cv2
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

from src.feature_extraction import extract_features
from src.model_utils import save_model


DATASET_DIR = "dataset"
OUTPUT_DIR = "outputs"

CLASS_FOLDERS = [
    "class1_normal_hydration",
    "class2_dehydrated",
    "class3_high_stone_risk"
]


def load_dataset():
    X = []
    y = []
    image_paths = []

    for class_name in CLASS_FOLDERS:
        class_path = os.path.join(DATASET_DIR, class_name)

        if not os.path.exists(class_path):
            raise FileNotFoundError(f"Folder not found: {class_path}")

        for file_name in os.listdir(class_path):
            if file_name.lower().endswith((".jpg", ".jpeg", ".png")):
                image_path = os.path.join(class_path, file_name)

                image = cv2.imread(image_path)

                if image is None:
                    print(f"Skipped unreadable image: {image_path}")
                    continue

                features = extract_features(image)

                X.append(features)
                y.append(class_name)
                image_paths.append(image_path)

    return np.array(X), np.array(y), image_paths


def plot_confusion_matrix(cm, labels):
    plt.figure(figsize=(7, 5))
    plt.imshow(cm)
    plt.title("Confusion Matrix")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.xticks(range(len(labels)), labels, rotation=30, ha="right")
    plt.yticks(range(len(labels)), labels)

    for i in range(len(labels)):
        for j in range(len(labels)):
            plt.text(j, i, cm[i, j], ha="center", va="center")

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, "confusion_matrix.png"))
    plt.close()


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("Loading dataset...")
    X, y, image_paths = load_dataset()

    print(f"Total images loaded: {len(X)}")

    if len(X) == 0:
        raise ValueError("No images found in dataset folders.")

    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled,
        y_encoded,
        test_size=0.25,
        random_state=42,
        stratify=y_encoded
    )

    model = RandomForestClassifier(
        n_estimators=300,
        max_depth=None,
        random_state=42,
        class_weight="balanced"
    )

    print("Training model...")
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(
        y_test,
        y_pred,
        target_names=label_encoder.classes_
    )

    cm = confusion_matrix(y_test, y_pred)

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores = cross_val_score(model, X_scaled, y_encoded, cv=cv)

    save_model(model, scaler, label_encoder)

    plot_confusion_matrix(cm, label_encoder.classes_)

    report_text = f"""
Urine Hydration and Stone Risk Model Training Report

Total Images: {len(X)}
Classes: {list(label_encoder.classes_)}

Test Accuracy: {accuracy * 100:.2f}%

Cross Validation Accuracy:
Mean: {cv_scores.mean() * 100:.2f}%
Std: {cv_scores.std() * 100:.2f}%

Classification Report:

{report}
"""

    with open(os.path.join(OUTPUT_DIR, "training_report.txt"), "w") as f:
        f.write(report_text)

    accuracy_df = pd.DataFrame({
        "Metric": ["Test Accuracy", "CV Mean Accuracy", "CV Std"],
        "Value": [
            accuracy * 100,
            cv_scores.mean() * 100,
            cv_scores.std() * 100
        ]
    })

    accuracy_df.to_csv(os.path.join(OUTPUT_DIR, "accuracy_report.csv"), index=False)

    print(report_text)
    print("Model saved successfully in model/ folder.")


if __name__ == "__main__":
    main()
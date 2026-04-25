import cv2
import numpy as np
from src.image_preprocessing import preprocess_image, remove_dark_background


def extract_features(image):
    image = preprocess_image(image)
    pixels_bgr = remove_dark_background(image)

    pixels_bgr = pixels_bgr.astype(np.uint8)

    mean_bgr = np.mean(pixels_bgr, axis=0)
    std_bgr = np.std(pixels_bgr, axis=0)

    pixels_rgb = pixels_bgr[:, ::-1]
    mean_rgb = np.mean(pixels_rgb, axis=0)
    std_rgb = np.std(pixels_rgb, axis=0)

    pixels_hsv = cv2.cvtColor(pixels_bgr.reshape(-1, 1, 3), cv2.COLOR_BGR2HSV).reshape(-1, 3)
    mean_hsv = np.mean(pixels_hsv, axis=0)
    std_hsv = np.std(pixels_hsv, axis=0)

    pixels_lab = cv2.cvtColor(pixels_bgr.reshape(-1, 1, 3), cv2.COLOR_BGR2LAB).reshape(-1, 3)
    mean_lab = np.mean(pixels_lab, axis=0)
    std_lab = np.std(pixels_lab, axis=0)

    brightness = np.mean(pixels_hsv[:, 2])
    saturation = np.mean(pixels_hsv[:, 1])

    yellow_score = mean_rgb[0] + mean_rgb[1] - mean_rgb[2]
    brown_score = mean_rgb[0] - mean_rgb[2]
    cloudiness_score = np.mean(std_rgb)

    features = np.concatenate([
        mean_bgr,
        std_bgr,
        mean_rgb,
        std_rgb,
        mean_hsv,
        std_hsv,
        mean_lab,
        std_lab,
        [brightness, saturation, yellow_score, brown_score, cloudiness_score]
    ])

    return features
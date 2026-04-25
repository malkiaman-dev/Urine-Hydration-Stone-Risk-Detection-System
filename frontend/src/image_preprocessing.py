import cv2
import numpy as np


def read_image(image_path):
    image = cv2.imread(image_path)

    if image is None:
        raise ValueError(f"Could not read image: {image_path}")

    return image


def preprocess_image(image):
    image = cv2.resize(image, (300, 300))
    image = cv2.GaussianBlur(image, (5, 5), 0)
    return image


def remove_dark_background(image):
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    lower = np.array([0, 20, 30])
    upper = np.array([179, 255, 255])

    mask = cv2.inRange(hsv, lower, upper)

    result = cv2.bitwise_and(image, image, mask=mask)

    pixels = result[mask > 0]

    if len(pixels) == 0:
        pixels = image.reshape(-1, 3)

    return pixels
import cv2
import numpy as np


def is_urine_like(image_bgr):
    hsv = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2HSV)

    lower_yellow = np.array([15, 30, 40])
    upper_yellow = np.array([45, 255, 255])

    lower_amber = np.array([8, 40, 40])
    upper_amber = np.array([35, 255, 255])

    yellow_mask = cv2.inRange(hsv, lower_yellow, upper_yellow)
    amber_mask = cv2.inRange(hsv, lower_amber, upper_amber)

    urine_mask = cv2.bitwise_or(yellow_mask, amber_mask)

    urine_ratio = np.count_nonzero(urine_mask) / urine_mask.size

    return urine_ratio >= 0.08
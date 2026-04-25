import streamlit as st
import cv2
import numpy as np
from PIL import Image

from src.feature_extraction import extract_features
from src.model_utils import load_model
from src.result_mapping import RESULTS


st.set_page_config(
    page_title="Urine Hydration & Stone Risk Detection",
    page_icon="🧪",
    layout="wide",
    initial_sidebar_state="expanded",
)


RISK_THEME = {
    "class1_normal_hydration": {
        "badge": "🟢 Stable",
        "color": "#1f9d55",
        "accent": "rgba(31, 157, 85, 0.12)",
    },
    "class2_dehydrated": {
        "badge": "🟡 Attention",
        "color": "#d97706",
        "accent": "rgba(217, 119, 6, 0.12)",
    },
    "class3_high_stone_risk": {
        "badge": "🔴 High Priority",
        "color": "#dc2626",
        "accent": "rgba(220, 38, 38, 0.12)",
    },
}


def apply_custom_styles():
    st.markdown(
        """
        <style>
            .hero-card {
                border-radius: 18px;
                padding: 1.3rem 1.5rem;
                background: linear-gradient(130deg, #0f172a, #1e3a8a);
                color: #f8fafc;
                margin-bottom: 1rem;
                box-shadow: 0 8px 24px rgba(15, 23, 42, 0.25);
            }
            .hero-card h1 {
                font-size: 1.9rem;
                margin: 0 0 0.4rem 0;
            }
            .hero-card p {
                margin: 0;
                opacity: 0.95;
                line-height: 1.45;
            }
            .result-card {
                border-radius: 16px;
                padding: 1rem 1.2rem;
                margin-top: 0.35rem;
                margin-bottom: 0.8rem;
                border-left: 8px solid;
            }
            .result-card h3 {
                margin: 0;
                font-size: 1.3rem;
            }
            .result-card p {
                margin: 0.35rem 0 0 0;
                line-height: 1.4;
            }
            .muted {
                color: #64748b;
            }
            .sidebar-box {
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 0.8rem 0.9rem;
                background: #f8fafc;
            }
        </style>
        """,
        unsafe_allow_html=True,
    )


def risk_theme_for_label(class_label):
    return RISK_THEME.get(
        class_label,
        {
            "badge": "ℹ️ Review",
            "color": "#334155",
            "accent": "rgba(51, 65, 85, 0.12)",
        },
    )


apply_custom_styles()

st.markdown(
    """
    <div class='hero-card'>
        <h1>Urine Hydration & Kidney Stone Risk Detection</h1>
        <p>
            Upload a urine image to receive a fast, AI-powered screening summary with hydration status,
            potential stone-risk category, class confidence, and practical next-step guidance.
        </p>
    </div>
    """,
    unsafe_allow_html=True,
)

st.warning(
    "This tool is for educational screening only. It is not a medical diagnosis system."
)


@st.cache_resource
def load_saved_model():
    return load_model()


with st.sidebar:
    st.header("⚙️ Analysis Controls")
    confidence_threshold = st.slider(
        "Low-confidence alert threshold (%)",
        min_value=50,
        max_value=95,
        value=70,
        step=1,
    )
    show_technical_details = st.toggle("Show technical details", value=False)
    st.markdown(
        """
        <div class="sidebar-box">
            <strong>📸 Better Image = Better Prediction</strong>
            <ul style="margin-top:0.5rem; padding-left:1rem;">
                <li>Use natural or bright white light</li>
                <li>Avoid blur and shadow</li>
                <li>Capture urine area clearly</li>
            </ul>
        </div>
        """,
        unsafe_allow_html=True,
    )


left_col, right_col = st.columns([1.4, 1], gap="large")

with left_col:
    uploaded_file = st.file_uploader(
        "Upload urine image",
        type=["jpg", "jpeg", "png"],
        help="Supported formats: JPG, JPEG, PNG",
    )

with right_col:
    st.subheader("🧭 Workflow")
    st.markdown(
        """
        1. Upload urine image  
        2. AI extracts color features  
        3. Model predicts hydration class  
        4. Review confidence + advice
        """
    )
    st.caption("Tip: Results are intended for initial screening support, not diagnosis.")

if uploaded_file is not None:
    image = Image.open(uploaded_file).convert("RGB")

    st.image(image, caption="Uploaded Image", width="stretch")

    image_np = np.array(image)
    image_bgr = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

    try:
        with st.spinner("Analyzing image and generating report..."):
            model, scaler, label_encoder = load_saved_model()

            features = extract_features(image_bgr)
            features_scaled = scaler.transform([features])

            prediction = model.predict(features_scaled)[0]
            probabilities = model.predict_proba(features_scaled)[0]

            class_label = label_encoder.inverse_transform([prediction])[0]
            confidence = np.max(probabilities) * 100

        result = RESULTS[class_label]
        theme = risk_theme_for_label(class_label)

        st.subheader("Prediction Report")
        st.markdown(
            f"""
            <div class='result-card' style='border-left-color:{theme['color']}; background:{theme['accent']};'>
                <h3>{result['class_name']} • {theme['badge']}</h3>
                <p>
                    <strong>Hydration:</strong> {result['hydration']}<br>
                    <strong>Stone Risk:</strong> {result['stone_risk']}<br>
                    <strong>Detected Color:</strong> {result['urine_color']}
                </p>
            </div>
            """,
            unsafe_allow_html=True,
        )

        metric_1, metric_2, metric_3 = st.columns(3)
        metric_1.metric("Hydration Status", result["hydration"])
        metric_2.metric("Stone Risk", result["stone_risk"])
        metric_3.metric("Confidence", f"{confidence:.2f}%")

        st.progress(float(np.clip(confidence / 100, 0, 1)))
        st.caption("Confidence score indicates how strongly the model favors the predicted class.")

        tab_summary, tab_probabilities, tab_guidance = st.tabs(
            ["📌 Summary", "📊 Probabilities", "🩺 Guidance"]
        )

        with tab_summary:
            st.success(f"Predicted Class: {result['class_name']}")
            st.write(f"**Hydration Status:** {result['hydration']}")
            st.write(f"**Stone Risk:** {result['stone_risk']}")
            st.write(f"**Detected Urine Color:** {result['urine_color']}")
            st.write(f"**Confidence:** {confidence:.2f}%")

        with tab_probabilities:
            st.write("Class-wise confidence distribution")
            probability_data = {
                RESULTS.get(label, {"class_name": label})["class_name"]: round(prob * 100, 2)
                for label, prob in zip(label_encoder.classes_, probabilities)
            }
            st.bar_chart(probability_data)

            ranked_items = sorted(
                zip(label_encoder.classes_, probabilities),
                key=lambda item: item[1],
                reverse=True,
            )
            for label, prob in ranked_items:
                mapped = RESULTS.get(label, {"class_name": label, "hydration": "N/A"})
                st.write(f"**{mapped['class_name']} — {mapped['hydration']}**")
                st.progress(float(np.clip(prob, 0, 1)))
                st.caption(f"{prob * 100:.2f}%")

            selected_label = st.selectbox(
                "Inspect class details",
                options=[label for label, _ in ranked_items],
                format_func=lambda x: f"{RESULTS.get(x, {'class_name': x})['class_name']} ({x})",
            )
            selected_prob = next(prob for label, prob in ranked_items if label == selected_label)
            selected_result = RESULTS.get(selected_label, {})
            st.info(
                f"Selected class confidence: {selected_prob * 100:.2f}%\n\n"
                f"Hydration: {selected_result.get('hydration', 'N/A')}\n"
                f"Stone Risk: {selected_result.get('stone_risk', 'N/A')}"
            )

        with tab_guidance:
            st.info(f"**Advice:** {result['advice']}")
            if class_label == "class3_high_stone_risk":
                st.error(
                    "High-risk pattern detected. Please seek medical evaluation, especially if pain, fever, or blood in urine is present."
                )
            elif class_label == "class2_dehydrated":
                st.warning(
                    "Signs of dehydration detected. Increase water intake and continue monitoring hydration status."
                )
            else:
                st.success("Hydration pattern appears stable. Maintain consistent fluid intake.")

        if confidence < confidence_threshold:
            st.error(
                f"Low confidence result ({confidence:.2f}%). Please upload a clearer image with better lighting and visible urine area."
            )

        if show_technical_details:
            with st.expander("Technical Details", expanded=False):
                st.code(
                    f"""
Predicted Label ID: {class_label}
Feature Vector Length: {len(features)}
Probabilities: {[round(float(p), 4) for p in probabilities]}
Confidence Threshold: {confidence_threshold}%
                    """.strip(),
                    language="text",
                )

    except FileNotFoundError:
        st.error(
            "Model not found. Please train the model first by running: python train_model.py"
        )
    except Exception as e:
        st.error(f"Error: {e}")
else:
    st.info("Upload an image to begin analysis.")
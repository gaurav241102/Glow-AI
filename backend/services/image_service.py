from PIL import Image
import io
import numpy as np
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = os.getenv("HF_API_TOKEN")
VISION_ENDPOINT = os.getenv("INFERENCE_ENDPOINT")

headers = {"Authorization": f"Bearer {API_TOKEN}"}

def analyze_skin_image(image_bytes):
    # Convert bytes to image
    image = Image.open(io.BytesIO(image_bytes))
    
    # Prepare image for API
    buffer = io.BytesIO()
    image.save(buffer, format="JPEG")
    image_bytes = buffer.getvalue()
    
    # Create multimodal prompt for skin analysis
    prompt = "Analyze this skin image and provide details about: 1) Skin type, 2) Visible concerns, 3) Recommended ingredients"
    
    payload = {
        "inputs": {
            "messages": [
                {"role": "user", 
                 "content": [
                     {"type": "text", "text": prompt},
                     {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + image_bytes.hex()}}
                 ]
                }
            ]
        }
    }
    
    response = requests.post(VISION_ENDPOINT, headers=headers, json=payload)
    
    # Parse the response
    try:
        result = response.json()
        return parse_skin_analysis(result)
    except Exception as e:
        return {"error": str(e)}

def parse_skin_analysis(raw_result):
    # Extract relevant information from the model's response
    # This is a simplified version - you would parse the actual response format
    text_response = raw_result.get("generated_text", "")
    
    # Basic parsing (would need to be enhanced based on actual responses)
    skin_type = "Unknown"
    concerns = []
    recommendations = []
    
    # Simple parsing logic (improve based on actual model outputs)
    if "dry" in text_response.lower():
        skin_type = "Dry"
    elif "oily" in text_response.lower():
        skin_type = "Oily"
    elif "combination" in text_response.lower():
        skin_type = "Combination"
    
    # More parsing logic would go here
    
    return {
        "skin_type": skin_type,
        "concerns": concerns,
        "confidence": 0.85,  # Placeholder
        "recommendations": recommendations
    }

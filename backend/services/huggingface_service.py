import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()

API_TOKEN = os.getenv("HF_API_TOKEN")
INFERENCE_ENDPOINT = os.getenv("INFERENCE_ENDPOINT")

headers = {"Authorization": f"Bearer {API_TOKEN}"}

def chat_with_model(prompt):
    system_prompt = """You are a skincare expert assistant. Provide helpful, scientific advice about 
    skincare routines, products, and concerns. Be specific and detailed in your responses."""
    
    payload = {
        "inputs": {
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ]
        },
        "parameters": {
            "max_new_tokens": 500,
            "temperature": 0.7
        }
    }
    
    response = requests.post(INFERENCE_ENDPOINT, headers=headers, json=payload)
    return response.json()

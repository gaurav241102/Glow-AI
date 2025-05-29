from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from models import ChatMessage, SkinAnalysisResponse
from services.huggingface_service import chat_with_model
from services.image_service import analyze_skin_image

app = FastAPI(title="Skincare AI Assistant")

# CORS setup for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Skincare AI Assistant API is running"}

@app.post("/chat")
async def chat(message: ChatMessage):
    try:
        response = chat_with_model(message.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-skin")
async def analyze_skin(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        result = analyze_skin_image(contents)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

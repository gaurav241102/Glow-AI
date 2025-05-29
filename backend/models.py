from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    message: str

class SkinAnalysisResponse(BaseModel):
    skin_type: str
    concerns: List[str]
    confidence: float
    recommendations: List[str]

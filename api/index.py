from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from typing import List, Dict
import os
from mangum import Mangum

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key="AIzaSyD_C23ulpb4d7ra4UBA2xYEB8CGE4TgIvY")

# Store chat history on server
chat_history = []


class ChatPayload(BaseModel):
    history: List[Dict[str, str]] = []
    message: str

@app.get("/api/")
async def root():
    return {"status": "API is running"}

@app.post("/api/chat")
async def chat(payload: ChatPayload):
    # combine history into one prompt string
    try:
        prompt = ""
        for item in payload.history:
            role = "User" if item["role"].lower().startswith("user") else "Assistant"
            prompt += f"{role}: {item['content']}\n"
        prompt += f"User: {payload.message}\nAssistant:"

        response = client.models.generate_content(
            contents=prompt,
            model="gemini-2.5-flash",
        )
        return {"reply": response.text}
    except Exception as e:
        return {"error": str(e)}

handler = Mangum(app)
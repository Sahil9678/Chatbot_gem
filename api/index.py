from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from typing import List, Dict
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# client = genai.Client(api_key="AIzaSyD_C23ulpb4d7ra4UBA2xYEB8CGE4TgIvY")
# client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY"))

genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash')


# Store chat history on server
chat_history = []


class ChatPayload(BaseModel):
    history: List[Dict[str, str]] = []
    message: str

@app.get("/")
@app.get("/api/")
async def root():
    return {"status": "API is running"}

@app.post("/api/chat")
async def chat(payload: ChatPayload):
    # combine history into one prompt string
    try:
            # Build the conversation with history
        chat_session = model.start_chat(history=[])
        
        # Add previous messages to history
        for item in payload.history:
            if item["role"].lower().startswith("user"):
                chat_session.history.append({
                    "role": "user",
                    "parts": [item["content"]]
                })
            else:
                chat_session.history.append({
                    "role": "model",
                    "parts": [item["content"]]
                })
        
        # Send the new message
        response = chat_session.send_message(payload.message)
        return {"reply": response.text}
    except Exception as e:
        return {"error": str(e)}

app = app
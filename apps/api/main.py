from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="Epic Tech AI Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "api"}

@app.get("/api/generate")
async def generate(prompt: str = "hello"):
    return {"generated": f"Media for: {prompt}", "provider": "groq"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

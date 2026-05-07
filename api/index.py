import sys
from pathlib import Path
from fastapi import FastAPI

BACKEND_DIR = Path(__file__).resolve().parent.parent / "Backend"
sys.path.insert(0, str(BACKEND_DIR))

from main import app as backend_app

app = FastAPI()

app.mount("/api", backend_app)
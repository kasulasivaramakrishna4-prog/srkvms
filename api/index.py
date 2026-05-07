import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent / "Backend"
sys.path.insert(0, str(BACKEND_DIR))

from main import app
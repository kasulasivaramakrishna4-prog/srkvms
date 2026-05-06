from pathlib import Path
import sys


BACKEND_DIR = Path(__file__).resolve().parent / "Backend"
sys.path.insert(0, str(BACKEND_DIR))

from Backend.main import app  # noqa: E402

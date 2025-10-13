import sys
import os
from pathlib import Path


def resource_path(relative_path: str) -> str:
    """
    Resolve a resource path both in development and when bundled by PyInstaller.
    """
    # PyInstaller creates a temp folder and stores path in _MEIPASS
    base_path = getattr(sys, "_MEIPASS", None)
    if base_path:
        return os.path.join(base_path, relative_path)
    # fallback to project root
    return str(Path(__file__).resolve().parent.parent / relative_path)

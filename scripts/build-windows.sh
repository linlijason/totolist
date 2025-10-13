#!/usr/bin/env bash
set -euo pipefail

# Build Windows .exe using PyInstaller in onefile mode (PyQt)
# Usage (on Windows or via cross-compile with wine/pyinstaller):
#   bash scripts/build-windows.sh

HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/.." && pwd)

cd "$ROOT"

python3 -m pip install -r requirements.txt

pyinstaller \
  --noconfirm \
  --clean \
  --name UHFReader \
  --onefile \
  --windowed \
  --paths app \
  app/app_qt.py

echo "Build finished. Find the exe under dist/UHFReader.exe"

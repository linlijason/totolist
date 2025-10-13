import webview
from app.api import ReaderAPI
from app.utils import resource_path


WINDOW_TITLE = "UHF Reader"


def create_window() -> webview.Window:
    index_path = resource_path("web/index.html")
    api = ReaderAPI()
    window = webview.create_window(WINDOW_TITLE, url=index_path, js_api=api)
    return window


def main() -> None:
    window = create_window()
    webview.start(gui="qt")


if __name__ == "__main__":
    main()

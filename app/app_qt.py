import sys
from PyQt5 import QtWidgets

from app.gui import MainWindow


def main() -> None:
    app = QtWidgets.QApplication(sys.argv)
    w = MainWindow()
    w.resize(1000, 550)
    w.show()
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()

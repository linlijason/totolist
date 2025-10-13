from __future__ import annotations

import sys
import time
from typing import Optional

import requests
from PyQt5 import QtCore, QtWidgets

from app.api import ReaderAPI


def padding_zero(num_str: str, length: int) -> str:
    while len(num_str) < length:
        num_str = "0" + num_str
    return num_str


def get_epc_hex_write_data(epc_dec_number: int) -> str:
    epc_str = str(epc_dec_number)
    if epc_dec_number < 65536:
        return (padding_zero(format(epc_dec_number, "x"), 6) + "00").upper()
    part2 = epc_str[-5:]
    part1 = epc_str[:-5]
    part1 = part1.lstrip("0")
    part2 = part2.lstrip("0")
    part1_hex = format(int(part1 or "0"), "x")
    part2_hex = format(int(part2 or "0"), "x")
    part2_hex = padding_zero(part2_hex, 4)
    hex_data = (part1_hex + part2_hex + "00").upper()
    return padding_zero(hex_data, 8)


class WorkerFetch(QtCore.QThread):
    finished = QtCore.pyqtSignal(dict)
    failed = QtCore.pyqtSignal(str)

    def __init__(self, city_id: int, number: str, code: str, parent: Optional[QtCore.QObject] = None) -> None:
        super().__init__(parent)
        self.city_id = city_id
        self.number = number
        self.code = code

    def run(self) -> None:
        url = "http://mp.dianlvyizhan.com/api/card/getConsumableCard"
        try:
            resp = requests.get(url, params={"cityId": self.city_id, "number": self.number, "code": self.code}, timeout=10)
            resp.raise_for_status()
            data = resp.json().get("data") or {}
            epc_number = (data.get("epcNumber") or "").replace("BUH", "")
            epc_number = epc_number.lstrip("0")
            real_number = int(epc_number or 0)
            result = {
                "icCard": data.get("number") or "",
                "realNumber": real_number,
            }
            self.finished.emit(result)
        except Exception as e:  # noqa: BLE001
            self.failed.emit(str(e))


class MainWindow(QtWidgets.QMainWindow):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("UHF Reader (PyQt)")
        self.api = ReaderAPI()
        self.write_timer = QtCore.QTimer(self)
        self.write_timer.setInterval(500)
        self.write_timer.timeout.connect(self.on_write_tick)

        central = QtWidgets.QWidget(self)
        self.setCentralWidget(central)
        layout = QtWidgets.QGridLayout(central)

        # Row 0: Port/Baud/Connect/Close
        layout.addWidget(QtWidgets.QLabel("串口："), 0, 0)
        self.port_combo = QtWidgets.QComboBox()
        for i in range(1, 21):
            self.port_combo.addItem(f"COM{i}", i)
        self.port_combo.setCurrentIndex(2)  # COM3
        layout.addWidget(self.port_combo, 0, 1)

        layout.addWidget(QtWidgets.QLabel("波特率："), 0, 2)
        self.baud_combo = QtWidgets.QComboBox()
        # Store original indices as data to send to API
        self.baud_combo.addItem("9600bps", 0)
        self.baud_combo.addItem("19200bps", 1)
        self.baud_combo.addItem("38400bps", 2)
        self.baud_combo.addItem("57600bps", 5)
        self.baud_combo.addItem("115200bps", 6)
        self.baud_combo.setCurrentIndex(3)
        layout.addWidget(self.baud_combo, 0, 3)

        self.btn_connect = QtWidgets.QPushButton("连接")
        self.btn_close = QtWidgets.QPushButton("关闭")
        layout.addWidget(self.btn_connect, 0, 4)
        layout.addWidget(self.btn_close, 0, 5)

        # Row 1: Search
        self.btn_search = QtWidgets.QPushButton("查找标签")
        layout.addWidget(self.btn_search, 1, 0, 1, 2)

        # Row 2: QR area
        layout.addWidget(QtWidgets.QLabel("二维码编号(后面几位数字):CD"), 2, 0)
        self.iccardtext = QtWidgets.QLineEdit()
        font = self.iccardtext.font()
        font.setPointSize(28)
        self.iccardtext.setFont(font)
        layout.addWidget(self.iccardtext, 2, 1, 1, 3)
        self.iccardbtn = QtWidgets.QPushButton("1. 输入黑条编码后几位")
        layout.addWidget(self.iccardbtn, 2, 4)

        # Row 3: Card bag info
        layout.addWidget(QtWidgets.QLabel("电子标签号码:"), 3, 0)
        self.cardBagInfo = QtWidgets.QLabel()
        self.cardBagInfo.setMinimumHeight(32)
        layout.addWidget(self.cardBagInfo, 3, 1, 1, 4)

        # Row 4: EPC area
        layout.addWidget(QtWidgets.QLabel("待写入标签epc号码(16进制)"), 4, 0)
        self.nowEpcHexNumber = QtWidgets.QLineEdit()
        font2 = self.nowEpcHexNumber.font()
        font2.setPointSize(24)
        self.nowEpcHexNumber.setFont(font2)
        layout.addWidget(self.nowEpcHexNumber, 4, 1)

        layout.addWidget(QtWidgets.QLabel("待写入标签epc号码(10进制)"), 4, 2)
        self.nowEpcDecNumber = QtWidgets.QLineEdit()
        self.nowEpcDecNumber.setFont(font2)
        palette = self.nowEpcDecNumber.palette()
        layout.addWidget(self.nowEpcDecNumber, 4, 3)

        self.opMsg = QtWidgets.QLabel("写入状态")
        palette = self.opMsg.palette()
        layout.addWidget(self.opMsg, 4, 4)

        # Row 5: Start/Stop
        self.btn_start_write = QtWidgets.QPushButton("3.  开始写入epc号码")
        self.btn_stop_write = QtWidgets.QPushButton("4.  停止写入epc号码")
        layout.addWidget(self.btn_start_write, 5, 0, 1, 2)
        layout.addWidget(self.btn_stop_write, 5, 2, 1, 2)

        # Row 6: EPC id (hex)
        layout.addWidget(QtWidgets.QLabel("标签ID(16进制)"), 6, 0)
        self.SnEPC = QtWidgets.QLineEdit()
        self.SnEPC.setReadOnly(True)
        layout.addWidget(self.SnEPC, 6, 1, 1, 4)

        # Row 7: Params
        layout.addWidget(QtWidgets.QLabel("起始地址"), 7, 0)
        self.SnWpt = QtWidgets.QLineEdit("2")
        self.SnWpt.setReadOnly(True)
        layout.addWidget(self.SnWpt, 7, 1)
        layout.addWidget(QtWidgets.QLabel("字数"), 7, 2)
        self.SnNum = QtWidgets.QLineEdit("2")
        self.SnNum.setReadOnly(True)
        layout.addWidget(self.SnNum, 7, 3)

        # Row 8: data
        layout.addWidget(QtWidgets.QLabel("读写数据"), 8, 0)
        self.SnData = QtWidgets.QLineEdit()
        self.SnData.setReadOnly(True)
        layout.addWidget(self.SnData, 8, 1, 1, 4)

        # Row 9: info
        layout.addWidget(QtWidgets.QLabel("信息"), 9, 0)
        self.Snr = QtWidgets.QLineEdit()
        self.Snr.setReadOnly(True)
        layout.addWidget(self.Snr, 9, 1, 1, 4)

        # Connections
        self.btn_connect.clicked.connect(self.do_open)
        self.btn_close.clicked.connect(self.do_close)
        self.btn_search.clicked.connect(self.do_search)
        self.btn_start_write.clicked.connect(self.start_write_epc)
        self.btn_stop_write.clicked.connect(self.stop_write_epc)
        self.iccardbtn.clicked.connect(self.focus_iccard)
        self.iccardtext.returnPressed.connect(self.on_iccard_enter)

        # Startup info
        QtCore.QTimer.singleShot(0, self._show_startup_alert)

    # UI helpers
    def _show_startup_alert(self) -> None:
        QtWidgets.QMessageBox.information(self, "提示", "你正在开 CD 前缀的黑条!!!!!")

    def focus_iccard(self) -> None:
        self.iccardtext.setText("")
        self.iccardtext.setFocus()

    # Actions
    def do_open(self) -> None:
        port = int(self.port_combo.currentData())
        baud_index = int(self.baud_combo.currentData())
        res = self.api.open(port, baud_index)
        self.Snr.setText(res.message if res else "设备连接失败")

    def do_close(self) -> None:
        res = self.api.close()
        self.Snr.setText(res.message if res else "设备关闭失败")

    def do_query(self) -> None:
        sum_hex = self.api.inventory()
        if not sum_hex:
            self.Snr.setText("未询查到电子标签")
            self.SnEPC.setText("")
        else:
            self.Snr.setText("询查到电子标签")
            self.SnEPC.setText(sum_hex)

    def do_read(self) -> None:
        temp = self.SnEPC.text().strip()
        if not temp:
            return
        try:
            epc_len = int(temp[:2], 16)
            epc_hex = temp[2:2 + epc_len * 2]
        except Exception:
            return
        mem = 1
        data_hex = self.api.read(epc_hex, 2, 2, mem)
        if not data_hex:
            self.Snr.setText("读数据失败")
            self.SnData.setText("")
        else:
            self.Snr.setText("读数据成功")
            self.SnData.setText(data_hex)
            sub_sum = data_hex[:6]
            try:
                self.nowEpcDecNumber.setText(str(int(sub_sum, 16)))
            except Exception:
                pass

    def do_search(self) -> None:
        self.do_query()
        self.do_read()

    def on_iccard_enter(self) -> None:
        raw = self.iccardtext.text().strip()
        idx = raw.find("no=")
        if idx >= 0:
            raw = raw[idx + 3 :]
        if not raw:
            return
        self.iccardtext.setDisabled(True)
        worker = WorkerFetch(1, raw, "BIKE_UHF", self)
        worker.finished.connect(self.on_fetch_ok)
        worker.failed.connect(self.on_fetch_fail)
        worker.start()

    @QtCore.pyqtSlot(dict)
    def on_fetch_ok(self, payload: dict) -> None:
        real_number = int(payload.get("realNumber") or 0)
        ic_card = payload.get("icCard") or ""
        self.cardBagInfo.setText(f"ic卡号: {ic_card}   电子标签号码: {real_number}")
        hex_data = get_epc_hex_write_data(real_number)
        self.nowEpcHexNumber.setText(hex_data)
        self.nowEpcDecNumber.setText(str(real_number))
        QtCore.QTimer.singleShot(1000, self.start_write_epc)

    @QtCore.pyqtSlot(str)
    def on_fetch_fail(self, msg: str) -> None:
        QtWidgets.QMessageBox.warning(self, "错误", f"查询失败: {msg}")
        self.iccardtext.setDisabled(False)
        self.iccardtext.setFocus()

    def start_write_epc(self) -> None:
        try:
            dec_value = int(self.nowEpcDecNumber.text())
        except Exception:
            dec_value = 0
        if dec_value < 10000:
            QtWidgets.QMessageBox.warning(self, "错误", "出错,请重新打开本页面!!!!")
            self.stop_write_epc()
            return
        self.write_timer.start()

    def stop_write_epc(self) -> None:
        self.write_timer.stop()

    def on_write_tick(self) -> None:
        self.do_query()
        self.do_read()
        temp = self.SnEPC.text().strip()
        if not temp or len(temp) < 18:
            return
        epc_id = temp[2:18]
        mem = 1
        hex_data = self.nowEpcHexNumber.text().strip()
        if not hex_data:
            return
        result = self.api.write(epc_id, 2, mem, hex_data)
        if result != "00":
            self.opMsg.setText("写入失败,请继续尝试写入")
        else:
            self.opMsg.setText("写入成功,请刷下一张IC卡")
            self.iccardtext.setDisabled(False)
            self.iccardtext.setText("")
            self.iccardtext.setFocus()
            self.stop_write_epc()


if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    w = MainWindow()
    w.resize(1000, 550)
    w.show()
    sys.exit(app.exec_())

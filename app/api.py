from dataclasses import dataclass
from typing import Optional


@dataclass
class ReaderStatus:
    message: str
    ok: bool


class ReaderAPI:
    """Bridge exposed to the webview UI.

    Replace the dummy implementations with real serial/UHF reader code later.
    """

    def __init__(self) -> None:
        self.connected_port: Optional[int] = None
        self.baud_index: Optional[int] = None
        self.last_epc_hex: str = ""

    def open(self, port_index: int, baud_index: int) -> ReaderStatus:
        # TODO: implement real hardware connection (e.g., via pyserial)
        self.connected_port = port_index
        self.baud_index = baud_index
        return ReaderStatus(message="设备连接成功", ok=True)

    def close(self) -> ReaderStatus:
        self.connected_port = None
        self.baud_index = None
        return ReaderStatus(message="设备关闭成功", ok=True)

    def inventory(self) -> str:
        """Scan tags and return EPC hex string like original JS expected.
        Return empty string if no tag.
        """
        # Dummy EPC: 12-byte EPC length (0x08 = 8 bytes -> 16 hex chars) + payload
        # format: [len(1 byte)][epc hex]
        epc_payload = "0123456789ABCDEF"
        epc_len_hex = f"{len(epc_payload)//2:02X}"
        result = epc_len_hex + epc_payload
        self.last_epc_hex = result
        return result

    def read(self, epc_hex: str, word_ptr: int, word_num: int, mem: int) -> str:
        """Return hex string data or empty string on failure."""
        if not epc_hex:
            return ""
        # Dummy: return 4 bytes (2 words) of data derived from EPC
        return (epc_hex[-8:] + "00").upper()[:word_num * 4]

    def write(self, epc_hex: str, word_ptr: int, mem: int, hex_data: str) -> str:
        """Return "00" on success or error code otherwise."""
        if not epc_hex or not hex_data:
            return "FF"
        # Accept any data in this mock
        return "00"

import sys
from PyQt6.QtWidgets import (
    QApplication,
    QLabel, 
    QWidget
)

app = QApplication([])
window = QWidget()

window.setWindowTitle("Hello World Qt")
window.setGeometry(100, 100, 280, 80)

msg = QLabel("<h1>Hello from Qt6</h1>", parent=window)
msg.move(60, 15)

window.show()
sys.exit(app.exec())
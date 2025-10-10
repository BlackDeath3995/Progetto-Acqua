import sys
from PyQt5.QtWidgets import QApplication, QPushButton, QVBoxLayout, QWidget, QSizePolicy
from PyQt5.QtCore import Qt, QTimer, QSize
from PyQt5.QtGui import QPainter, QFont, QFontMetrics

class RotatedLabel(QWidget):

    def __init__(self, text, angle=0, parent=None):
        super().__init__(parent)
        self.text   = text
        self.angle  = angle
        self.font   = QFont('Arial', 48)

        self.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        self.updateSize()

    def setText(self, text):
        self.text = text
        self.updateSize()
        self.update()

    def setAngle(self, angle):
        self.angle = angle
        self.update()

    def updateSize(self):
        metrics         = QFontMetrics(self.font)
        textWidth      = metrics.horizontalAdvance(self.text)
        textHeight     = metrics.height()
        
        side = int(1.5 * max(textWidth, textHeight))
        self.setMinimumSize(side, side)

    def sizeHint(self):
        return self.minimumSize()

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)
        painter.setFont(self.font)
        rect = self.rect()
        painter.translate(rect.center())
        painter.rotate(self.angle)
        metrics = QFontMetrics(self.font)
        textWidth = metrics.horizontalAdvance(self.text)
        textHeight = metrics.height()
        painter.drawText(-textWidth // 2, textHeight // 4, self.text)

class MyApp(QWidget):

    def __init__(self):
        super().__init__()
        self.label = RotatedLabel('Hi Nigga!', angle=0)
        self.button = QPushButton('Ferma rotazione')
        self.button.clicked.connect(self.stopRotation)

        layout = QVBoxLayout()
        layout.addWidget(self.label, alignment=Qt.AlignCenter)
        layout.addWidget(self.button, alignment=Qt.AlignCenter)

        self.setLayout(layout)
        self.setWindowTitle('Esempio PyQt5')
        self.resize(800, 600)

        self.timer = QTimer()
        self.timer.timeout.connect(self.rotateLabel)
        self.timer.start(20)

    def rotateLabel(self):
        newAngle = (self.label.angle + 2) % 360
        self.label.setAngle(newAngle)

    def stopRotation(self):
        self.timer.stop()
        self.label.setText('Hai fermato la rotazione!')

if __name__ == '__main__':

    app = QApplication(sys.argv)
    finestra = MyApp()
    finestra.show()
    sys.exit(app.exec_())
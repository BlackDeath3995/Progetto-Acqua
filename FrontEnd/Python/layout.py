import sys

# --------------------------------------------------------------
# Vertical Layout -
# QVBoxLayout 
# --------------------------------------------------------------
def HorizontalLayout():
    from PyQt6.QtWidgets import (
        QApplication,
        QHBoxLayout,
        QPushButton,
        QWidget
    )

    app = QApplication([])
    window = QWidget()

    window.setWindowTitle("Layout Qt")

    layout = QHBoxLayout()
    layout.addWidget(QPushButton("Left"))
    layout.addWidget(QPushButton("Right"))
    layout.addWidget(QPushButton("Center"))
    window.setLayout(layout)

    window.show()
    sys.exit(app.exec())

# --------------------------------------------------------------
# Vertical Layout -
# QVBoxLayout 
# --------------------------------------------------------------
def VerticalLayout():
    from PyQt6.QtWidgets import (
        QApplication,
        QVBoxLayout,
        QPushButton,
        QWidget
    )

    app = QApplication([])
    window = QWidget()

    window.setWindowTitle("Layout Qt")

    layout = QVBoxLayout()
    layout.addWidget(QPushButton("Left"))
    layout.addWidget(QPushButton("Right"))
    layout.addWidget(QPushButton("Center"))
    window.setLayout(layout)

    window.show()
    sys.exit(app.exec())

# --------------------------------------------------------------
# Grid Layout -
# QGridLayout 
# --------------------------------------------------------------
def GridLayout():
    from PyQt6.QtWidgets import (
        QApplication,
        QGridLayout,
        QPushButton,
        QWidget
    )

    app = QApplication([])
    window = QWidget()

    window.setWindowTitle("Layout Qt")

    layout = QGridLayout()
    layout.addWidget(QPushButton("Button (0, 0)"), 0, 0)
    layout.addWidget(QPushButton("Button (0, 1)"), 0, 1)
    layout.addWidget(QPushButton("Button (0, 2)"), 0, 2)
    layout.addWidget(QPushButton("Button (1, 0)"), 1, 0)
    layout.addWidget(QPushButton("Button (1, 1)"), 1, 1)
    layout.addWidget(QPushButton("Button (1, 2)"), 1, 2)
    layout.addWidget(QPushButton("Button (2, 0)"), 2, 0)
    layout.addWidget(QPushButton("Button (2, 1) + 2 Columns Span"), 2, 1, 1, 2)
    window.setLayout(layout)

    window.show()
    sys.exit(app.exec())

# --------------------------------------------------------------
# Form Layout -
# QFormLayout 
# --------------------------------------------------------------
def FormLayout():
    from PyQt6.QtWidgets import (
        QApplication,
        QFormLayout,
        QLineEdit,
        QWidget
    )

    app = QApplication([])
    window = QWidget()

    window.setWindowTitle("Layout Qt")

    layout = QFormLayout()
    layout.addRow("Name:", QLineEdit())
    layout.addRow("Email:", QLineEdit())
    layout.addRow("Address:", QLineEdit())
    window.setLayout(layout)

    window.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    # HorizontalLayout()
    # VerticalLayout()
    GridLayout()
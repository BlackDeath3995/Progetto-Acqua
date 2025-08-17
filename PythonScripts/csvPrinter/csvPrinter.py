# ------------------------------------------------------------------------------- #
#                                                                                 #
# ------------------------------------------------------------------------------- #

import serial
import csv
import os
from datetime import datetime

def FormatoFloat(val): 
    return f"{val:.2f}"

def csvPrinter(directory, fileName, lastFlow, port, baudrate, timeout):
    filePath = os.path.join(directory, fileName)
    ser = serial.Serial(port=port, baudrate=baudrate, timeout=timeout)
    with open(filePath, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['timestamp', 'flowRateLmin', 'totalMilliLitres'])
        print(f"Inizio acquisizione dati su {filePath}...")
        try:
            while True:
                line = ser.readline().decode('utf-8').strip()
                if line:
                    print(line)
                    try:
                        parts = line.split()
                        if len(parts) == 2:
                            flowRateStr, totalMlStr = parts
                            flowRate = float(flowRateStr)
                            totalMl = float(totalMlStr)
                            if flowRate != lastFlow:
                                timeStamp = datetime.now().isoformat()
                                writer.writerow([timeStamp, FormatoFloat(flowRate), FormatoFloat(totalMl)])
                                file.flush()
                                os.fsync(file.fileno())
                                lastFlow = flowRate
                        else: print(f"Formato riga non valido: {line}")
                    except ValueError as e: print(f"Errore nel parsing della riga: {line} - {e}")
        except KeyboardInterrupt: print("Acquisizione terminata")
        finally: ser.close()

if __name__ == "__main__":

    """ -----------------------------------------------------------------------------------

       Parametri di configurazione
    
            directory           -->  Cartella dove salvare il file CSV
            fileName            -->  Nome del file CSV con timestamp
            lastFlow            -->  Valore iniziale del flusso
            COM_PORT            -->  Porta seriale da cui leggere i dati
            COM_PORT_BAUD_RATE  -->  Baud rate della porta seriale
            TIME_OUT_TIME       -->  Timeout per la lettura dalla porta seriale

    ---------------------------------------------------------------------------------- """
    
    directory = "G:\\Il mio Drive\\TeamWorking\\ProgettoAcqua\\Projects\\PythonScripts\\csvPrinter\\csvFile"
    fileName = f"datiFlusso_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    lastFlow = None

    COM_PORT = "COM7"
    COM_PORT_BAUD_RATE = 9600
    TIME_OUT_TIME = 10

    # ---------------------------------------------------------------------------------- #
    #                                                                                    #
    # ---------------------------------------------------------------------------------- #

    csvPrinter(directory, fileName, lastFlow, COM_PORT, COM_PORT_BAUD_RATE, TIME_OUT_TIME)

    # ---------------------------------------------------------------------------------- #
    #                                                                                    #
    # ---------------------------------------------------------------------------------- #
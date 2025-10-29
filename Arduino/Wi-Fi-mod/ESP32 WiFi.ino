

#include <WiFi.h>



const char* ssid = "Martin Router King";
const char* password = "ITS2025!";

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.print("Tentativo di connessione alla rete: ");
  Serial.println(ssid);

  // Connessione alla rete WiFi
  int status = WL_IDLE_STATUS;
  while (status != WL_CONNECTED) {
    status = WiFi.begin(ssid, password);
    delay(5000);
  }

  Serial.println("Connesso al WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Puoi aggiungere altro codice qui
}

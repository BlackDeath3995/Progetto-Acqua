

#include <ESP8266WiFi.h>

const char* ssid = "Ccmp";
const char* password = "1234vv633";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
 


  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nConnessione a ");
  Serial.println(ssid);
  Serial.println("\nConnesso!");
  Serial.print("IP assegnato: ");
  Serial.println(WiFi.localIP());
}

void loop() {
}

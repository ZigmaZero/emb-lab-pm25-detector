#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <SoftwareSerial.h>
#include <ArduinoJson.h>

//not used
// #define LED1 LED_BUILTIN

// change ssid to your wifi name
const char* ssid = "--Wifi name--";
// change password to your wifi password
const char* password = "--Wifi Password";
const char* mqtt_server = "broker.netpie.io";
const int mqtt_port = 1883;
// change to your config
const char* mqtt_Client = "mqtt client";
const char* mqtt_username = "mqtt username";
const char* mqtt_password = "mqtt password";
EspSoftwareSerial::UART stmPort;
StaticJsonDocument<200> doc;

WiFiClient espClient;
PubSubClient client(espClient);

char msg[150];
int i = 0;

void reconnect() {
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection…");
        if (client.connect(mqtt_Client, mqtt_username, mqtt_password)) {
            Serial.println("connected");
        } else {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println("try again in 5 seconds");
            delay(5000);
        }
    }
}

void updateData(float dustval, float latval, unsigned char latdir, float lonval, unsigned char londir) {
  doc["data"]["pm25"]["level"] = dustval;
  doc["data"]["position"]["latitude"]["degree"] = latval;
  doc["data"]["position"]["latitude"]["direction"] = latdir;
  doc["data"]["position"]["longitude"]["degree"] = lonval;
  doc["data"]["position"]["longitude"]["direction"] = londir;
  String datastr;
  serializeJson(doc,datastr);
  datastr.toCharArray(msg, datastr.length()+1);
  client.publish("@shadow/data/update",msg);
}

void processMessage(char *message) {
  // uncomment to debug (print data stored in message)
  // Serial.print("Received Message: ");
  // Serial.println(message);
  float dustval, latval, lonval;
  unsigned char latdir, londir;
  sscanf(message, "%f,%f,%c,%f,%c", &dustval, &latval, &latdir, &lonval, &londir);
  // uncomment to debug (print data from message after factoring into variables)
  // Serial.print("Received Numbers: ");
  // Serial.print(dustval);
  // Serial.print(", ");
  // Serial.print(latval);
  // Serial.print(", ");
  // Serial.print(latdir);
  // Serial.print(", ");
  // Serial.print(lonval);
  // Serial.print(", ");
  // Serial.println(londir);
  updateData(dustval, latval, latdir, lonval, londir);
}

void setup() {
  // setup
  // pinMode(LED1,OUTPUT);

  stmPort.begin(9600, EspSoftwareSerial::SWSERIAL_8N1, D7, D8, false, 95, 11);
  if (!stmPort) { // If the object did not initialize, then its configuration is invalid
    Serial.println("Invalid EspSoftwareSerial pin configuration, check config"); 
    while (1) { // Don't continue with invalid configuration
      delay (1000);
    }
  }

  Serial.begin(115200);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  WiFi.mode(WIFI_STA);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  client.setServer(mqtt_server, mqtt_port);
  delay(2000);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(!client.connected()) {
    reconnect();
  }
  client.loop();

  if(stmPort.available()) {
    while(stmPort.available()) {
      char c = (char)stmPort.read();
      //uncomment to debug (print data from stm32 board)
      // Serial.print(c);
      if(c > 'Z') {
        continue;
      }
      msg[i++] = c;
      if(i == 100) {
        i = 0;
        break;
      }
      if(c == '\n') {
        msg[i] = '\0';
        processMessage(msg);
        i = 0;
      }
    }
  }
}

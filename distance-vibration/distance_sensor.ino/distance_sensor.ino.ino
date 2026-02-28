#include <ArduinoBLE.h>
#include <ld2410.h>

#define RX_PIN D7          // Connected to TX of the sensor
#define TX_PIN D6          // Connected to RX of the sensor
#define RADAR_BAUD 256000 
#define DANGER_DIST 200    // Danger threshold distance in cm

// Bluetooth Configuration
const char* deviceName = "Smart_Badge"; 
const char* serviceUUID = "19B10000-E8F2-537E-4F6C-D104768A1214";
const char* charUUID    = "19B10001-E8F2-537E-4F6C-D104768A1214";

LD2410 radar;
BLEService radarService(serviceUUID);

// Characteristic to send 1 byte of data (0-255)
// We will send the distance in cm directly.
BLEByteCharacteristic distanceCharacteristic(charUUID, BLERead | BLENotify);

// Timer variables to control data sending rate
unsigned long lastSendTime = 0;
const int sendInterval = 100; // Send data every 100ms (0.1 seconds)

void setup() {
  Serial.begin(115200); // PC connection for debugging

  // Radar sensor setup
  Serial1.begin(RADAR_BAUD, SERIAL_8N1, RX_PIN, TX_PIN); 
  delay(500);

  Serial.print("Connecting to Radar...");
  if(radar.begin(Serial1)) {
    Serial.println("Successful (LD2410)");
  } else {
    Serial.println("Could not connect to Radar");
    // while(1); // Uncomment this if you want to stop execution on failure
  }

  // Bluetooth setup
  if (!BLE.begin()) {
    Serial.println("Not able to start Bluetooth");
    while (1);
  }

  // BLE Configuration
  BLE.setLocalName(deviceName);
  BLE.setAdvertisedService(radarService);
  radarService.addCharacteristic(distanceCharacteristic);
  BLE.addService(radarService);

  // Set initial value to 0 (Safe/No Vibration)
  distanceCharacteristic.writeValue(0);

  // Start advertising
  BLE.advertise();
  Serial.println("Bluetooth active. Waiting for phone connection...");
}

void loop() {
  // Read radar data
  radar.read(); 
  
  // Check if a Bluetooth device (Phone) is connected
  BLEDevice central = BLE.central();

  if (central) {
    if (central.connected()) {
      
      // Check if radar is working and detecting a person
      if(radar.isConnected() && radar.presenceDetected()) {
        
        // Get the moving target distance
        int distance = radar.movingTargetDistance(); 

        // Check time: Only send data every 100ms to prevent crashing the connection
        if (millis() - lastSendTime > sendInterval) {
          
          // [Logic: Dynamic Distance] 
          // 1. If distance is valid and within danger zone (e.g., < 200cm)
          if(distance > 0 && distance < DANGER_DIST) {
            
            // Send the ACTUAL distance value to the phone
            // The phone app must interpret this: Lower number = Faster vibration
            distanceCharacteristic.writeValue((byte)distance); 
            
            Serial.print("Danger! Distance: ");
            Serial.print(distance);
            Serial.println("cm (Sending value to phone)");

          } else {
            // 2. If safe (far away) or no target -> Send 0
            // The phone app must interpret 0 as "Stop Vibration"
            distanceCharacteristic.writeValue(0);
          }

          // Update the timer
          lastSendTime = millis(); 
        }
      }
    }
  }
}
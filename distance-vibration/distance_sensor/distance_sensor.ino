#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <ld2410.h>

#define RX_PIN D7
#define TX_PIN D6
#define RADAR_BAUD 256000
#define DANGER_DIST 200

#define SERVICE_UUID        "19B10000-E8F2-537E-4F6C-D104768A1214"
#define CHARACTERISTIC_UUID "19B10001-E8F2-537E-4F6C-D104768A1214"

ld2410 radar;
BLECharacteristic* pCharacteristic;
bool deviceConnected = false;

unsigned long lastSendTime = 0;
const int sendInterval = 100;

// Connection callbacks
class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
    Serial.println("Phone connected!");
  }
  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    Serial.println("Phone disconnected. Restarting advertising...");
    BLEDevice::startAdvertising();
  }
};

void setup() {
  Serial.begin(115200);
  delay(2000);

  // Radar setup
  Serial1.begin(RADAR_BAUD, SERIAL_8N1, RX_PIN, TX_PIN);
  delay(1000);
  radar.begin(Serial1);
  Serial.println("Radar started");

  // BLE setup
  BLEDevice::init("Smart_Badge");
  BLEServer* pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService* pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
  );
  pCharacteristic->addDescriptor(new BLE2902());

  uint8_t initial = 0;
  pCharacteristic->setValue(&initial, 1);

  pService->start();
  BLEAdvertising* pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  BLEDevice::startAdvertising();

  Serial.println("Bluetooth active. Waiting for phone connection...");
}

void loop() {
  radar.read();

  if (deviceConnected) {
    if (millis() - lastSendTime > sendInterval) {
      uint8_t value = 0;

      if (radar.presenceDetected()) {
        int distance = radar.movingTargetDistance();
        if (distance > 0 && distance < DANGER_DIST) {
          value = (uint8_t)distance;
          Serial.print("Distance: ");
          Serial.println(distance);
        }
      }

      pCharacteristic->setValue(&value, 1);
      pCharacteristic->notify();
      lastSendTime = millis();
    }
  }
}
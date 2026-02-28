// ── Config ─────────────────────────────────────────────
const SERVICE_UUID = '19b10000-e8f2-537e-4f6c-d104768a1214';
const CHAR_UUID    = '19b10001-e8f2-537e-4f6c-d104768a1214';
const VIB_PULSE_MS = 60; // how long each buzz lasts

let vibTimer = null;

// ── BLE Connect ────────────────────────────────────────
async function connectBLE() {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ name: 'Smart_Badge' }],
    optionalServices: [SERVICE_UUID]
  });

  device.addEventListener('gattserverdisconnected', () => stopVibration());

  const server  = await device.gatt.connect();
  const service = await server.getPrimaryService(SERVICE_UUID);
  const char    = await service.getCharacteristic(CHAR_UUID);

  await char.startNotifications();
  char.addEventListener('characteristicvaluechanged', (e) => {
    const distance = e.target.value.getUint8(0);
    handleDistance(distance);
  });
}

// ── Core Logic: Distance → Vibration ──────────────────
// distance == 0          → stop vibration (safe)
// 0 < distance < 200     → vibrate, closer = faster
//
// interval formula: distance × 5ms  (clamped 80ms – 1000ms)
//   20cm  →  100ms (fast)
//   100cm →  500ms (medium)
//   190cm →  950ms (slow)

function handleDistance(distance) {
  if (distance === 0) {
    stopVibration();
    return;
  }

  const interval = Math.max(80, Math.min(1000, distance * 5));
  startVibration(interval);
}

function startVibration(intervalMs) {
  // Skip if already running at the same interval
  if (vibTimer && vibTimer._interval === intervalMs) return;

  stopVibration();

  buzz(); // immediate first buzz
  vibTimer = setInterval(buzz, intervalMs);
  vibTimer._interval = intervalMs;
}

function stopVibration() {
  if (vibTimer) {
    clearInterval(vibTimer);
    vibTimer = null;
  }
  navigator.vibrate(0); // cancel any active vibration
}

function buzz() {
  navigator.vibrate(VIB_PULSE_MS);
}

// ── Start ──────────────────────────────────────────────
connectBLE();
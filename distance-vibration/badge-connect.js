// ── Config ─────────────────────────────────────────────
const SERVICE_UUID = '19b10000-e8f2-537e-4f6c-d104768a1214';
const CHAR_UUID    = '19b10001-e8f2-537e-4f6c-d104768a1214';
const VIB_PULSE_MS = 60;

let vibTimer = null;

// ── BLE Connect ────────────────────────────────────────
async function connectBLE() {
  if (!navigator.bluetooth) {
    alert('Web Bluetooth not supported');
    return;
  }

  try {
    alert('Scanning...');
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: 'Smart_Badge' }],
      optionalServices: [SERVICE_UUID]
    });

    alert('Found: ' + device.name);

    device.addEventListener('gattserverdisconnected', () => stopVibration());

    const server  = await device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    const char    = await service.getCharacteristic(CHAR_UUID);

    await char.startNotifications();
    char.addEventListener('characteristicvaluechanged', (e) => {
      const distance = e.target.value.getUint8(0);
      handleDistance(distance);
    });

    alert('Connected!');

  } catch (e) {
    alert('Error: ' + e.message);
  }
}

// ── Core Logic ─────────────────────────────────────────
function handleDistance(distance) {
  if (distance === 0) {
    stopVibration();
    return;
  }
  const interval = Math.max(80, Math.min(1000, distance * 5));
  startVibration(interval);
}

function startVibration(intervalMs) {
  if (vibTimer && vibTimer._interval === intervalMs) return;
  stopVibration();
  buzz();
  vibTimer = setInterval(buzz, intervalMs);
  vibTimer._interval = intervalMs;
}

function stopVibration() {
  if (vibTimer) {
    clearInterval(vibTimer);
    vibTimer = null;
  }
  navigator.vibrate(0);
}

function buzz() {
  navigator.vibrate(VIB_PULSE_MS);
}
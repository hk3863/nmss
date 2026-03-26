// ── Config ─────────────────────────────────────────────
const SERVICE_UUID = '19b10000-e8f2-537e-4f6c-d104768a1214';
const CHAR_UUID    = '19b10001-e8f2-537e-4f6c-d104768a1214';
const VIB_PULSE_MS = 60;

let vibTimer = null;

// Config for Decibel 

let DB_THRESHOLD = 70;       
const DB_CHECK_MS  = 200;      // checking every 200ms
const DB_VIB_MS    = 150;  

let audioContext = null;
let analyser = null;
let dbTimer = null;


// ── Mic Monitor ───────────────────────────────────────────
async function startMicMonitor() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    dbTimer = setInterval(checkDecibels, DB_CHECK_MS);
    console.log('Mic monitoring started');
  } catch (e) {
    alert('Mic access error: ' + e.message);
  }
}



// ── dB checking   ────────────────────────────────────────────
function checkDecibels() {
  if (!analyser) return;

  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);

  // Calculate average amplitude and convert to dB (roughly)
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const db = 20 * Math.log10(avg / 255) + 90; // rough calibration

  console.log('dB:', db.toFixed(1));

  document.getElementById('dbDisplay').textContent = db.toFixed(1);  

  if (db >= DB_THRESHOLD) {
    document.getElementById('status').textContent = '🔴 LOUD! Vibrating...';  
    buzz(); 
  } else {
    document.getElementById('status').textContent = '🟢 Quiet';  
  }
}

function stopMicMonitor() {
  if (dbTimer) { clearInterval(dbTimer); dbTimer = null; }
  if (audioContext) { audioContext.close(); audioContext = null; }
}
// ── BLE Connect ────────────────────────────────────────
async function connectBLE() {
  if (!navigator.bluetooth) {
    alert('Web Bluetooth not supported');
    return;
  }

  try {
    alert('Scanning...');
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: 'Aman Hiss' }],
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
  //navigator.vibrate(VIB_PULSE_MS); // 아이폰은 버즈 안돼서 오디오로 테스트 대체, 안드로이드 할때 이거 uncomment then comment out the audio code below 
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  osc.connect(ctx.destination);
  osc.frequency.value = 440;
  osc.start();
  osc.stop(ctx.currentTime + 0.1);

}

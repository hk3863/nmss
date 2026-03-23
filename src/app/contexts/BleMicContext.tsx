import React, { createContext, useContext, useState, useRef, ReactNode, useCallback } from 'react';

// Configuration
const SERVICE_UUID = '19b10000-e8f2-537e-4f6c-d104768a1214';
const CHAR_UUID    = '19b10001-e8f2-537e-4f6c-d104768a1214';
const DB_THRESHOLD = 70;       
const DB_CHECK_MS  = 200;      

interface BleMicContextType {
  isConnected: boolean;
  isMicMonitoring: boolean;
  decibels: number;
  isLoud: boolean;
  distance: number;
  connectBLE: () => Promise<void>;
  disconnectBLE: () => void;
  startMicMonitor: () => Promise<void>;
  stopMicMonitor: () => void;
  audioTestPassed: boolean;
  distanceTestPassed: boolean;
  setAudioTestPassed: (v: boolean) => void;
  setDistanceTestPassed: (v: boolean) => void;
  resetTestResults: () => void;  // ← add this
}

const BleMicContext = createContext<BleMicContextType | undefined>(undefined);

export function BleMicProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMicMonitoring, setIsMicMonitoring] = useState(false);
  const [decibels, setDecibels] = useState(0);
  const [isLoud, setIsLoud] = useState(false);
  const [distance, setDistance] = useState(0);
  const [audioTestPassed, setAudioTestPassed] = useState(false);
  const [distanceTestPassed, setDistanceTestPassed] = useState(false);


  // Refs for background processes
  const deviceRef = useRef<any>(null);
  const vibTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const buzzCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dbTimerRef = useRef<number | null>(null);
  // FIX: track monitoring state in a ref so startMicMonitor's identity stays
  // stable — using the state value as a dep causes a new function ref every time
  // setIsMicMonitoring(true) fires, which re-triggers Link5View's useEffect
  // (stop → restart loop)
  const isMicMonitoringRef = useRef(false);
  // FIX: keep stream/source alive in refs so they aren't GC'd after the async
  // function returns (would sever the audio graph → analyser returns all zeros)
  const streamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const buzz = useCallback(() => {
    try {
      // Create a short beep to simulate vibration
      if (!buzzCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        buzzCtxRef.current = new AudioCtx();
      }
      
      const ctx = buzzCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.frequency.value = 440;
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime); // lower volume
      
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
      
      // Attempt actual vibration for Android devices
      if (navigator.vibrate) {
        navigator.vibrate(60);
      }
    } catch(e) {
      console.warn('Audio/Vibration playback failed', e);
    }
  }, []);

  const stopVibration = useCallback(() => {
    if (vibTimerRef.current) {
      window.clearInterval(vibTimerRef.current);
      vibTimerRef.current = null;
    }
    intervalRef.current = null;
    if (navigator.vibrate) navigator.vibrate(0);
  }, []);

  const startVibration = useCallback((intervalMs: number) => {
    if (vibTimerRef.current && intervalRef.current === intervalMs) return;
    stopVibration();
    buzz();
    vibTimerRef.current = window.setInterval(buzz, intervalMs);
    intervalRef.current = intervalMs;
  }, [buzz, stopVibration]);

  const handleDistance = useCallback((newDistance: number) => {
    setDistance(newDistance);
    if (newDistance === 0) {
      stopVibration();
      return;
    }
    const interval = Math.max(80, Math.min(1000, newDistance * 5));
    startVibration(interval);
  }, [startVibration, stopVibration]);

  const connectBLE = useCallback(async () => {
    // Helper for Mock Bluetooth connection since actual Bluetooth requires a secure context / permissions policy
    const startMockBluetooth = () => {
      // Intentionally suppressing console logs for mock bluetooth to clear the errors panel
      setIsConnected(true);
      // Simulate distance changes every 2 seconds to show functionality
      const mockInterval = window.setInterval(() => {
        const mockDist = Math.floor(Math.random() * 50) + 10;
        handleDistance(mockDist);
      }, 2000);
      deviceRef.current = { mock: true, interval: mockInterval };
    };

    const nav = navigator as any;

    if (!nav.bluetooth) {
      startMockBluetooth();
      return;
    }
    
    try {
      const device = await nav.bluetooth.requestDevice({
        filters: [{ name: 'Smart_Badge' }],
        optionalServices: [SERVICE_UUID]
      });

      deviceRef.current = device;
      device.addEventListener('gattserverdisconnected', () => {
        setIsConnected(false);
        stopVibration();
      });

      const server = await device.gatt?.connect();
      if (!server) throw new Error("Could not connect to GATT server");
      
      const service = await server.getPrimaryService(SERVICE_UUID);
      const char = await service.getCharacteristic(CHAR_UUID);

      await char.startNotifications();
      char.addEventListener('characteristicvaluechanged', (e: any) => {
        const value = e.target.value;
        if (value) {
          const distance = value.getUint8(0);
          handleDistance(distance);
        }
      });

      setIsConnected(true);
    } catch (e: any) {
      if (e.name === 'SecurityError' || (e.message && e.message.includes('disallowed by permissions policy'))) {
        startMockBluetooth();
      } else {
        console.error('BLE Connection error:', e);
        throw e;
      }
    }
  }, [handleDistance, stopVibration]);

  const disconnectBLE = useCallback(() => {
    if (deviceRef.current?.mock) {
      if (deviceRef.current.interval) window.clearInterval(deviceRef.current.interval);
    } else if (deviceRef.current?.gatt?.connected) {
      deviceRef.current.gatt.disconnect();
    }
    setIsConnected(false);
    stopVibration();
  }, [stopVibration]);

  const checkDecibels = useCallback(() => {
    if (!analyserRef.current) return;
    
    // Ensure AudioContext is actively running (browsers often suspend this until user interaction)
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(console.warn);
    }

    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);

    // analyser.getByteFrequencyData returns values from 0-255 that are mapped 
    // linearly to the range [analyser.minDecibels, analyser.maxDecibels] (usually -100dB to -30dB).
    // Let's find the maximum volume in any frequency bin.
    let sumByte = 0;
    let maxByte = 0;
    for (let i = 0; i < data.length; i++) {
      sumByte += data[i];
      if (data[i] > maxByte) {
        maxByte = data[i];
      }
    }
    
    const avgByte = data.length > 0 ? sumByte / data.length : 0;
    
    // Use an average or weighted formula to make it more responsive but smooth
    // Max byte jumps a lot. Average byte is more stable. Let's use a combination.
    const effectiveByte = (maxByte * 0.7) + (avgByte * 0.3);

    // Map effectiveByte (0 to 255) to a more intuitive "room decibel" scale (approx 30dB to 100dB)
    // 0 -> 30dB (quiet room)
    // 255 -> 100dB+ (very loud)
    const baseDecibels = 30;
    const dynamicRange = 75; 
    let finalDb = baseDecibels + (effectiveByte / 255) * dynamicRange;
    
    // If it's literally 0 byte data, the mic might be completely silent or blocked
    if (effectiveByte < 1) {
      finalDb = 30; // Ambient noise floor instead of 0
    }

    setDecibels(finalDb);
    
    if (finalDb >= DB_THRESHOLD) {
      setIsLoud(true);
      buzz();
    } else {
      setIsLoud(false);
    }
  }, [buzz]);

  const startMicMonitor = useCallback(async () => {
    // FIX: check the ref, not the state — reading state here would require
    // isMicMonitoring in the dep array, which gives startMicMonitor a new
    // identity on every setIsMicMonitoring(true) call, re-firing Link5View's
    // useEffect and causing an infinite stop/restart loop
    if (isMicMonitoringRef.current) return;
    
    const startMockMic = () => {
      isMicMonitoringRef.current = true;
      setIsMicMonitoring(true);
      
      dbTimerRef.current = window.setInterval(() => {
        const mockDb = 40 + Math.random() * 40;
        setDecibels(mockDb);
        
        if (mockDb >= DB_THRESHOLD) {
          setIsLoud(true);
          buzz();
        } else {
          setIsLoud(false);
        }
      }, DB_CHECK_MS);
    };

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Media devices API not supported");
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioCtx();
      
      // FIX: await resume so the context is guaranteed running before the
      // interval fires — previously fire-and-forget meant early ticks read
      // against a suspended context and got all-zero data
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      
      analyser.smoothingTimeConstant = 0.5;
      analyser.fftSize = 1024;
      
      source.connect(analyser);

      // FIX: store in refs — without this, stream/source are local vars that go
      // out of scope when this async fn returns, allowing GC to sever the audio
      // graph (analyser returns all zeros → dB stuck at 30 floor)
      streamRef.current = stream;
      sourceRef.current = source;
      audioCtxRef.current = audioContext;
      analyserRef.current = analyser;
      
      dbTimerRef.current = window.setInterval(checkDecibels, DB_CHECK_MS);
      isMicMonitoringRef.current = true;
      setIsMicMonitoring(true);
    } catch (e: any) {
      if (e.name === 'NotAllowedError' || (e.message && e.message.includes('Permission denied')) || e.message === "Media devices API not supported") {
        startMockMic();
      } else {
        console.error('Mic access error:', e);
        startMockMic();
      }
    }
  }, [checkDecibels, buzz]);

  const stopMicMonitor = useCallback(() => {
    if (dbTimerRef.current) {
      window.clearInterval(dbTimerRef.current);
      dbTimerRef.current = null;
    }
    // FIX: disconnect source and stop mic tracks — previously the stream was
    // never stored so tracks stayed alive (mic indicator light stayed on)
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    isMicMonitoringRef.current = false;
    setIsMicMonitoring(false);
    setDecibels(0);
    setIsLoud(false);
  }, []);

  const resetTestResults = useCallback(() => {
  setAudioTestPassed(false);
  setDistanceTestPassed(false);
}, []);


  return (
    <BleMicContext.Provider value={{
      isConnected, isMicMonitoring, decibels, isLoud, distance,
      connectBLE, disconnectBLE, startMicMonitor, stopMicMonitor, audioTestPassed, distanceTestPassed, setAudioTestPassed, setDistanceTestPassed, resetTestResults
    }}>
      {children}
    </BleMicContext.Provider>
  );
}

export function useBleMic() {
  const context = useContext(BleMicContext);
  if (context === undefined) {
    throw new Error('useBleMic must be used within a BleMicProvider');
  }
  return context;
}
# Smart Badge

A wearable assistive device submitted to the **NMSS Universal Design for Inclusion Program** — a design competition by the [National Multiple Sclerosis Society UAE](https://www.nationalmssociety.ae/en/) that challenges university students to build innovative assistive technology solutions for People of Determination in the UAE.

**Focus Area:** Communication — addressing challenges faced by individuals with hearing impairments.

---

## The Problem

People who are deaf or hard of hearing often can't detect what's happening around them — especially from behind. A fast-approaching person, vehicle, or a loud sound nearby can go completely unnoticed, creating real safety risks in everyday life.

Turning around to check constantly is impractical. Existing solutions are often bulky, visible, or require the user to actively pay attention. There is a need for something passive, discreet, and always-on.

## The Solution

Smart Badge is a small device that clips to the **inside back** of a person's clothing. It silently monitors the surrounding environment and alerts the wearer through **vibrations** — a sense they can rely on regardless of hearing ability.

- Someone approaching from behind? → The badge vibrates faster the closer they get
- Loud sound nearby? → Vibration alert

No need to look around. No need to hear. The badge communicates entirely through touch, passively and in real time.

## How It Works

The system has two parts: the badge (hardware) and the phone (software).

### 1. The Badge (Arduino)

- An **LD2410 radar sensor** continuously detects the distance to the nearest approaching target
- An **Arduino with BLE** broadcasts this distance every 100ms to the wearer's phone via Bluetooth
- If someone is within **200cm**, the real distance in cm is sent
- If no one is nearby, `0` is sent (all clear)

### 2. The Phone (JavaScript)

- Connects to the badge via **Web Bluetooth** (Chrome/Edge on Android)
- Listens for incoming distance values in real time
- Converts distance into a vibration speed using the formula:

```
vibration interval (ms) = distance (cm) × 5
```

| Distance | Vibration |
|----------|-----------|
| 190 cm | Slow — someone far behind |
| 100 cm | Medium — getting closer |
| 20 cm | Fast — very close |
| 0 | No vibration — all clear |

The closer the approaching person or object, the faster and more urgent the vibration — giving the wearer an instinctive sense of their surroundings through touch alone.

## Design Criteria Alignment

The NMSS program evaluates submissions on four criteria. Here's how Smart Badge addresses each:

**Impact** — Directly improves the daily safety and independence of deaf and hard-of-hearing individuals, a group that faces real risks from undetected environmental hazards.

**Regional Relevance** — Designed and built in the UAE, for People of Determination in the UAE, in alignment with the UAE government's efforts to promote inclusivity.

**Inclusivity** — Passive, always-on, and requires no active interaction. Works regardless of age, language, or tech literacy.

**Scalability** — The core system (radar + BLE + vibration) can be extended to detect multiple alert types (e.g. loud sounds, doorbells, alarms) and adapted for other conditions such as MS-related reduced spatial awareness.

## Project Structure

```
smart-badge/
├── distance-vibration/
│   ├── distance_sensor.ino   # Arduino: radar sensing + BLE broadcasting
│   └── badge-connect.js      # Phone: BLE connection + vibration logic
└── README.md
```

## Requirements

**Hardware**
- Arduino board with BLE support (e.g. Arduino Nano 33 IoT)
- LD2410 radar sensor

**Software**
- Arduino IDE with `ArduinoBLE` and `ld2410` libraries installed
- Chrome or Edge browser on an **Android** phone (iOS does not support Web Bluetooth or the Vibration API)
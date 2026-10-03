# Ridingo — Personal Driver App (Your Car, Our Driver)

An Apple-grade, minimalist mobile web application built with **Swiss & Cupertino design principles**, tailored for personal vehicle owners seeking verified drivers for rent.

---

## 🎨 Design System & Philosophy

- **Theme Palette**: 
  - **Taxi Yellow Accent**: `#FFCC00` (Warm gold-yellow, authentic driver/taxi heritage)
  - **Pure White**: `#FFFFFF` (Ultra-clean modern surface cards)
  - **Obsidian Black**: `#0A0D12` (Sharp contrasting typographic anchors & badges)
  - **Hairline Dividers**: `1px solid rgba(0, 0, 0, 0.07)`
  - **Frosted Glass (iOS 27)**: `backdrop-filter: blur(28px) saturate(190%)`
- **Iconography over Images**: 
  - No photographic stock images.
  - 100% precision SVG glyphs, geometric radar graphics, and clean typographic monograms (`VS`, `AM`, `R`).
- **Device Frame / Fluid Switcher**:
  - Live interactive preview inside an **iPhone 17 Pro Minimal Frame** with active Dynamic Island simulation.
  - Desktop presentation controller allowing instant switching between **iOS Frame** and **Fluid Web View**, as well as instant screen jumping.

---

## 📱 Complete User Journey & Implemented Features

### 1. Onboarding Walkthrough (Minimal Apple Slides)
- **Slide 1**: *"Your vehicle. Our verified driver."* (Comfort of personal car + trained driver).
- **Slide 2**: *"Precision timing. Gate-to-gate assist."* (Live flight radar tracking, airport concierge).
- **Slide 3**: *"Zero surge rates. White-glove ethics."* (Background audited, defensive driving, top 1% drivers).
- Interactive step indicator, swipe logic, and Skip / Get Started flow.

### 2. Sign In & Sign Up Screen
- Apple-style sliding segmented picker (`Sign In` vs `Create Account`).
- **1-Tap Social Connect**: *Continue with Apple* (`#000000`) and *Continue with Google*.
- **Flexible Login Toggle**: Switch between **Mobile Phone with SMS OTP** (4-digit clean pin verification) and **Email / Password**.
- Quick **Guest Demo Pass** for instant reviewer access.

### 3. Home Screen
- **Top Greeting & Location**:
  - Personalized welcome: *"Good evening, Alexander"*
  - Current location pill: *📍 Koramangala, Bengaluru*
  - Notification pill with live status badge and profile avatar.
- **Service Categories (4 Pillars)**:
  1. `Hourly` (from ₹149/h with live hour slider)
  2. `Day Rental` (8h / 12h full-day packages)
  3. `Airport` (Concierge flight sync transfer)
  4. `Special` (Outstation / Night party / Events)
- **Dual Location Selection Bar**:
  - **From** (Pick-up location) with 1-tap GPS locator.
  - **To** (Destination / Return) with clear button.
  - Animated route connector with instant **Swap** button (`⇄`).
- **Dedicated Airport Module** (when Airport tab is selected):
  - Direction toggle: `Pick Up at Airport` vs `Drop to Airport`.
  - Flight number input with **live airline detection** (`6E` -> IndiGo, `AI` -> Air India, `EK` -> Emirates, `UK` -> Vistara).
  - Driver reaching time selector (15m / 30m / 45m before landing buffer standby).
- **Car Garage Selector**:
  - Choose customer's registered vehicle: *Mercedes C-Class (Automatic)*, *BMW 3 Series*, or *Toyota Fortuner (Manual 4x4)*.
- **Dynamic Fare Calculator**:
  - Live recalculation based on duration and service type with transparent zero-surge guarantee.

### 4. Previous Trip History & Instant Repeat UX
- Quick action cards of previous journeys (e.g. *Airport Drop T2*, *4-Hour City Rental*).
- **Instant "Repeat" Button (`⚡ Repeat`)**: 1-click rebooking that immediately reloads the route and initiates driver matching.

### 5. Best Drivers & Reviews Showcase
- Top-rated driver cards (`Vikram Singh ★ 4.99`, `Arun Murthy ★ 4.98`).
- Police verified seal, experience tags, and authentic client review bubbles.
- Badges: *Luxury & EV certified*, *Suited uniform*, *Defensive driving clear*.

### 6. Value Proposition / Key Features
- **Your Car, Your Sanctuary**: Clean, familiar personal comfort.
- **5-Step Vetted Drivers**: Multi-point background verified and skill audited.
- **Zero Surge Guarantee**: Flat transparent hourly rates.
- **24x7 Safety Command Center**: Telemetry, live trip sharing, speed compliance.

### 7. iOS 27 Liquid Dock Navigation
- Floating frosted glass capsule with fluid gliding bubble indicator.
- Tabs: `Home`, `Trips`, `Quick Rebook (Floating Yellow Core)`, `Drivers`, `Garage`.

### 8. Live Driver Assigned Simulation
- Radar search visual with glowing beacon and driver ETA blip.
- Driver details card with suit confirmation, 4-digit ride start OTP (`8412`), call & messaging shortcuts, and vehicle safety checklist.

---

## 🚀 Running Locally

The app runs on a zero-dependency Node static server:

```bash
# Start dev server
node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in any modern browser.

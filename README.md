# 🚦 Smart Traffic Intelligence System

> An AI-powered traffic forecasting and decision-support platform that helps authorities **predict congestion** caused by planned and unplanned events, **detect anomalies** before they escalate, and **auto-generate response plans** using Generative AI.

---

## 🧩 Problem Statement

Traffic authorities today react to congestion *after* it happens — relying on experience-based decisions, manual patrols, and no post-event learning. This system flips that model:

- **Planned events** (rallies, cricket matches, festivals) → predict impact in advance
- **Unplanned events** (breakdowns, accidents, waterlogging) → detect anomalies early
- **Every event** → auto-generate a ready-to-act response plan via GenAI

---

## ✨ Core Features

| Feature | Description |
|---|---|
| Event-based congestion prediction | Forecast traffic volume and risk score for any upcoming event |
| Multilingual incident understanding | Auto-classify Kannada/mixed-language incident reports using NLP |
| GenAI action planner | LLM-generated response plans — officers, barricades, diversions |
| Congestion heatmap | Visual hotspot map of historical and predicted congestion zones |
| Anomaly detection | Detect unexpected traffic surges before they become jams |
| Diversion route recommendations | Suggest alternate corridors based on event location and priority |
| Resource planning | Optimal manpower and barricade deployment per event type |
| Interactive dashboard | Real-time monitoring, alerts, and incident simulator |

---

## 🧠 Machine Learning

### Traffic Prediction
- **Models:** XGBoost / LightGBM
- **Predicts:** Traffic volume, congestion level, risk score, priority (High/Low), and estimated resolution time
- **Inputs:** Event type, location, corridor, time-of-day, zone, historical patterns

### Anomaly Detection
- **Models:** Isolation Forest / Statistical Thresholding
- **Detects:** Unexpected congestion surges, crowd spikes, and unplanned disruptions in real time
- **Output:** Alert severity score + affected junction list

---

## 🤖 GenAI Features

### 1. Multilingual NLP — Incident Understanding
Real-world incident descriptions in this dataset are written in Kannada, broken English, and mixed scripts (e.g. *"pipe vehicle off aagide saro"*). A standard rule-based system would discard this as noise.

**What it does:**
- Uses **IndicBERT** or an LLM (e.g. GPT / Gemini) to read free-text descriptions in any language
- Extracts: root cause, vehicle type, severity, and affected area
- Auto-classifies the event so it feeds cleanly into the ML pipeline
- Turns previously dead data into actionable signal

**Dataset fields used:** `description`, `event_cause`, `event_type`, `authenticated`

```
Input:  "ಬಿಎಂಟಿಸಿ ಬಸ್ ಕೆಟ್ಟು ನಿಂತಿದೆ ಸರ್"
Output: { cause: "vehicle_breakdown", vehicle: "bmtc_bus", severity: "high", action_needed: true }
```

---

### 2. GenAI Action Planner — Automated Response Generation
Once the ML model predicts priority and expected duration, a Large Language Model takes that output and generates a **complete, human-readable response plan** — no officer needs to figure out deployment from scratch.

**What it does:**
- Receives: predicted priority, event type, corridor, duration estimate, junction name
- Generates: number of officers to deploy, which junctions to barricade, diversion routes to activate, and escalation triggers
- Output is in plain language, ready to be acted on immediately

**Dataset fields used:** `junction`, `corridor`, `requires_road_closure`, `priority`, `police_station`, `zone`

```
Input:
  Event: vehicle_breakdown
  Location: Tumkur Road, Jalahalli Cross Junction
  Corridor: High priority
  Predicted duration: 2.5 hrs

GenAI Output:
  "Deploy 3 officers to Jalahalli Cross Junction immediately.
   Block the left lane approaching Peenya. Activate diversion
   via SM Circle inbound. Estimated clearance by 19:30.
   Escalate to Peenya station if not resolved in 90 mins."
```

---

## 🏗 System Architecture

```
Raw Incident Data (CSV / API)
        │
        ▼
┌─────────────────────────┐
│  Multilingual NLP Layer │  ← IndicBERT / LLM
│  (Kannada + mixed text) │
└────────────┬────────────┘
             │ cleaned + classified events
             ▼
┌─────────────────────────┐
│   Feature Engineering   │  ← duration, corridor score,
│                         │    time buckets, zone mapping
└────────────┬────────────┘
             │
      ┌──────┴──────┐
      ▼             ▼
┌──────────┐  ┌──────────────┐
│ XGBoost  │  │ Isolation    │
│Classifier│  │ Forest       │
│(priority,│  │(anomaly      │
│duration) │  │ detection)   │
└────┬─────┘  └──────┬───────┘
     │               │
     └──────┬────────┘
            ▼
┌─────────────────────────┐
│   GenAI Action Planner  │  ← LLM generates response plan
│   (LLM / GPT / Gemini)  │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│   Interactive Dashboard │  ← React + Leaflet + FastAPI
└─────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
- **React** — component-based UI
- **Tailwind CSS** — styling
- **Leaflet.js** — interactive map, heatmap, route visualization

### Backend
- **FastAPI** — REST API, prediction endpoints, GenAI integration

### Database
- **PostgreSQL** — event storage, historical incident data, resolution logs

### Machine Learning
- **Scikit-learn** — preprocessing, Isolation Forest
- **XGBoost / LightGBM** — classification and regression models
- **Pandas / NumPy** — data processing and feature engineering

### GenAI / NLP
- **IndicBERT** — multilingual NLP for Kannada/Hindi incident text
- **OpenAI GPT / Google Gemini API** — action plan generation
- **LangChain** *(optional)* — prompt chaining for multi-step GenAI flows

---

## 📊 Dashboard Modules

| Module | What it shows |
|---|---|
| Event Planner | Input upcoming events, get predicted congestion score |
| Incident Simulator | Simulate any event type + location → instant response plan |
| Prediction Dashboard | Risk scores, priority levels, estimated durations |
| Congestion Heatmap | Historical + predicted hotspots across the city |
| Resource Planning | Officer count, barricade locations, diversion routes |
| Alerts & Anomaly Monitor | Live feed of detected surges with severity scores |

---

## 🚀 MVP Scope

- [x] Event input form (type, location, time, corridor)
- [x] Traffic prediction engine (priority + duration)
- [x] Multilingual NLP for incident description classification
- [x] GenAI action plan generator
- [x] Congestion heatmap (Leaflet.js)
- [x] Diversion route suggestions
- [x] Resource recommendation output
- [ ] Real-time anomaly alert feed *(post-MVP)*
- [ ] Post-event learning report generation *(post-MVP)*

---

## 📂 Dataset

Built on real Bengaluru traffic incident data containing:

- **Parking violations dataset** — GPS coordinates, violation types, junction names, police station, timestamps
- **Event & incident dataset** — planned/unplanned events, event cause, corridor classification, resolution times, multilingual descriptions, zone and junction metadata

---

## 🎯 Goal

Enable traffic authorities to shift from **reactive** to **proactive** congestion management — using ML to forecast impact, NLP to understand incidents in any language, and GenAI to instantly generate deployment-ready response plans.

---

## 👥 Team

Built for **Smart City Hackathon** — Theme 2: Event-Driven + Anomaly-Based Traffic Congestion Prediction System

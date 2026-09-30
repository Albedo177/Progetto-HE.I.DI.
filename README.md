# HEIDI - Healthy Interactive Diet

**HEIDI** è un'applicazione full-stack (Web & Mobile) progettata per la gestione e il tracciamento personalizzato di piani alimentari e schede di allenamento, integrata con funzionalità di community e interazione con figure specializzate (*Food* e *Workout Specialist*).

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Angular & Ionic Framework
- **Cross-Platform Runtime:** Capacitor (Android / Web)
- **State & HTTP:** RxJS, HttpClient, Angular Router

### Backend
- **Runtime & Server:** Node.js, Express.js
- **Database:** SQLite (tramite `sqlite3` driver)
- **Authentication & Security:** JSON Web Tokens (JWT), bcrypt

---

## 🏛 Architettura del Sistema

L'applicazione segue un'architettura **Client-Server tre livelli** fortemente disaccoppiata.

[ Ionic / Angular Client ]
│  ▲
HTTP  │  │ JSON (JWT Auth)
▼  │
[ Express API Layer ] ── (Middlewares: Auth, Validation)
│
[ Controller ] ──► [ Service Layer ] ──► [ Model / SQLite DB ]

### Pattern e Scelte di Design
1. **Stratificazione Backend (Controller - Service - Model):**
   - **Routes:** Definizione degli endpoint REST e associazione dei middleware.
   - **Controllers:** Gestione del ciclo di richiesta/risposta HTTP e orchestrazione dei servizi.
   - **Services:** Business logic isolata e riutilizzabile, indipendente dall'infrastruttura HTTP.
   - **Models / Database:** Accesso diretto alla persistenza dei dati.

2. **Sicurezza basata su Token (JWT):**
   - Autenticazione stateless tramite middleware d'ispezione `Authorization: Bearer <token>`.
   - Controllo degli accessi basato sui ruoli (*User*, *Food Specialist*, *Workout Specialist*).

---

## 🚀 Guida all'Installazione e Avvio

### Prerequisiti
- Node.js (v18+ consigliata)
- npm o yarn
- Angular CLI & Ionic CLI (`npm install -g @angular/cli @ionic/cli`)

### 1. Avvio del Backend API
```bash
cd Express_Backend
npm install
npm start
# Il server sarà in ascolto su http://localhost:3000
2. Avvio del Frontend Angular/Ionic
Bash
cd HEIDI
npm install
ionic serve
# L'applicazione sarà accessibile su http://localhost:8100
```

Nota per il testing su Dispositivo/Emulatore Android:
Modificare apiUrl nel file src/environments/environment.ts inserendo l'indirizzo IP della propria rete locale invece di localhost (es. http://192.168.X.X:3000).`

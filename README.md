# HEIDI (Healthy Interactive Diet) - API Engine & Client

**HEIDI** è una piattaforma full-stack per il tracciamento e la gestione di piani alimentari e schede d'allenamento. Il sistema è progettato secondo i principi dell'architettura a servizi disaccoppiati, esponendo un'interfaccia **RESTful API** consumata da una client app **Angular / Ionic**.

---

## 🏗 Architettura e Modelli di Design

L'applicazione adotta una struttura **Modular Monolith**, predisposta per un'eventuale scomposizione in **Microservizi**:
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
│
(HTTP / REST + JWT via AuthInterceptor)
│
▼
[ Express API Layer (API Engine) ]
├── Router & Middlewares (Auth, Validation, Global Error Handler)
├── Modular Controllers (Auth, Pasti, Allenamenti, Bacheca, Utenti)
├── Business Logic / Service Layer
└── Observability Endpoint (/healthz)
│
▼
[ Persistence Layer (SQLite / Relational DB) ]

### Pattern e Scelte di Design
1. **Stratificazione Backend (Controller - Service - Model):**
   - **Routes:** Definizione degli endpoint REST e associazione dei middleware.
   - **Controllers:** Gestione del ciclo di richiesta/risposta HTTP e orchestrazione dei servizi.
   - **Services:** Business logic isolata e riutilizzabile, indipendente dall'infrastruttura HTTP.
   - **Models / Database:** Accesso diretto alla persistenza dei dati.

2. **Sicurezza basata su Token (JWT):**
   - Autenticazione stateless tramite middleware d'ispezione `Authorization: Bearer <token>`.
   - Controllo degli accessi basato sui ruoli (*User*, *Food Specialist*, *Workout Specialist*).

### Key Technical Features:
* **API Standardization:** Ingressi ed uscite normalizzati con codice di stato HTTP semanticamente corretti (200, 201, 400, 401, 403, 404, 500).
* **Stateless Auth:** Autenticazione basata su JWT scambiato via header HTTP `Authorization: Bearer <token>`.
* **Centralized Error Handling:** Pipeline middleware per intercettare gli errori applicativi senza arrestare il processo e garantendo risposte uniformi.
* **Observability:** Endpoint `/healthz` per l'ispezione dello stato del servizio e delle sue dipendenze (liveness/readiness check).
* **Cross-Platform Client:** Angular / Ionic con gestione reattiva delle chiamate via `RxJS` e `HttpInterceptor`.

---

## 🐳 Containerizzazione (Docker)

Il backend è predisposto per l'esecuzione containerizzata:

```dockerfile
# Express_Backend/Dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
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
# Healthcheck: http://localhost:3000/healthz
2. Avvio del Frontend Angular/Ionic
Bash
cd HEIDI
npm install
ionic serve
# L'applicazione sarà accessibile su http://localhost:8100
```

Nota per il testing su Dispositivo/Emulatore Android:
Modificare apiUrl nel file src/environments/environment.ts inserendo l'indirizzo IP della propria rete locale invece di localhost (es. http://192.168.X.X:3000).`

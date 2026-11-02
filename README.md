# 🌤️ Weather Forecast Web App
![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![REST API](https://img.shields.io/badge/API-REST_Integration-0052CC?style=for-the-badge&logo=fastapi&logoColor=white)
![Open-Meteo](https://img.shields.io/badge/API-Open--Meteo-FF6F00?style=for-the-badge)
![Geocode Maps](https://img.shields.io/badge/API-Geocode_Maps-4CAF50?style=for-the-badge)
![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=for-the-badge&logo=creative-commons&logoColor=black)
![Development Period](https://img.shields.io/badge/Sviluppo-01%2F10%2F2023%20--%2030%2F10%2F2023-blue?style=for-the-badge)

---

> **Periodo di Sviluppo:** 1/10/2023 - 30/10/2023

Prima web app personalizzata per la consultazione delle previsioni meteo orarie (temperatura e precipitazioni). L'applicazione permette di selezionare le previsioni per il giorno corrente o per il giorno successivo, offrendo sia il rilevamento automatico della posizione tramite geolocalizzazione, sia la ricerca manuale di una specifica località.

<br></br>
---

## 📐 Architettura Web

Il diagramma sottostante illustra il flusso dei dati e l'interazione tra i componenti dell'applicazione e i servizi API esterni:

```text
+-----------------------------------------------------------------------+
|                            Utente (UI/UX)                             |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                        Componente React (Home)                        |
|   - Gestione dello Stato (Class-based State)                          |
|   - Gestione Form e Input Reference (React.createRef)                 |
|   - Rendering Condizionale Interfaccia Ionic                          |
+-----------------------------------------------------------------------+
        |                                                 |
        | (Rilevamento Posizione)                         | (Selezione Manuale)
        v                                                 v
+-----------------------------+                 +-----------------------+
|  Geolocalizzazione Utente   |                 | Input Manuale Città   |
|  - Capacitor Geolocation    |                 | (Form Input)          |
|    (Mobile)                 |                 +-----------------------+
|  - Navigator Geolocation    |                             |
|    (Browser)                |                             |
+-----------------------------+                             |
        |                                                   |
        +-------------------------+-------------------------+
                                  |
                                  v
+-----------------------------------------------------------------------+
|                   Geocode Maps API (Reverse / Search)                 |
|   - Conversione Coordinate <-> Nome della Località                    |
+-----------------------------------------------------------------------+
                                  |
                                  v
+-----------------------------------------------------------------------+
|                        Open-Meteo GFS API                             |
|   - Fetch dati orari (Temperatura 2m & Precipitazioni)               |
+-----------------------------------------------------------------------+
                                  |
                                  v
+-----------------------------------------------------------------------+
|                 Componente Child (<Forecast/>)                       |
|   - Output visivo e mappatura dei dati meteo per fascia oraria        |
+-----------------------------------------------------------------------+
```
<br></br>
---
## 🧠 Competenze Acquisite e Sviluppate
Il progetto è stato sviluppato focalizzandosi sulle seguenti aree fondamentali:

### 1. React & TypeScript (Class Components)
Class Components & State Management: Strutturazione dell'architettura software basata su componenti a classe (React.Component<Props, State>), gestendo in modo puntuale lo stato locale per caricamento, selezione dei giorni e dati delle previsioni.

Refs & Interazione DOM: Utilizzo di React.createRef() per accedere direttamente ai valori dei componenti di input senza causare re-render non necessari.

Tipizzazione Statica: Definizione rigorosa delle interfacce per Props e State al fine di garantire un codice manutenibile e privo di errori a runtime.

### 2. Gestione API REST & Asincronia
Fetch API & Async/Await: Integrazione e orchestrazione di chiamate asincrone concatenate per il recupero delle coordinate geografiche e dei relativi dati meteo.

Integrazione Multi-API: Collegamento sinergico di due differenti provider di servizi (Geocode Maps API per la geocodifica e Open-Meteo API per le misurazioni meteorologiche).

Elaborazione Dati: Manipolazione e filtraggio dei dati grezzi restituiti dalle API (es. estrazione e slicing delle fasce orarie di interesse 07:00 - 19:00).

### 3. Gestione UI & Cross-Platform
Ionic Framework UI: Impiego di componenti UI native-like (IonPage, IonHeader, IonCard, IonGrid, IonSpinner, ecc.) per offrire un'esperienza utente coerente e responsiva.

Geolocalizzazione Ibrida: Implementazione di una strategia di rilevamento della posizione che commuta dinamica tra @capacitor/geolocation per ambienti mobile e la Native Geolocation API per il web browser.

<br></br>
---

## 🛠️ Stack Tecnologico
* Framework UI: Ionic React
* Linguaggio: TypeScript
* State Management: React Class State
* Integrazioni Native: Capacitor (Geolocation)
* API Web:
    * Open-Meteo GFS API
    * Geocode Maps API

<br></br>
---

## 📄 Licenza
This work is licensed under a
[Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc].

[![CC BY-NC 4.0][cc-by-nc-image]][cc-by-nc]

[cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
[cc-by-nc-image]: https://licensebuttons.net/l/by-nc/4.0/88x31.png
[cc-by-nc-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg
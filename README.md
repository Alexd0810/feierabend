# Feierabend Timer

Ein Countdown-Timer für Schüler und Arbeitnehmer – zeigt dir live, wie lange es noch bis zum Feierabend dauert.

**Live:** [alexd0810.github.io/feierabend](https://alexd0810.github.io/feierabend/)

## Features

- Echtzeit-Countdown bis zum Feierabend / Schulschluss
- Automatische Erkennung von Schul- und Arbeitstagen (gerade/ungerade Woche)
- Stundenplan-Integration via API (Untis)
- Anzeige der aktuellen & nächsten Stunde, ausgefallene Stunden & Vertretungen
- Meilenstein-Benachrichtigungen & Feier-Overlay bei Feierabend
- Zufällige Motivationszitate & Ausreden-Generator
- Sound-Effekte (ein/aus)
- Debug-Modus via URL-Parameter (`?mode=school|work|weekend&week=even|odd`)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** als Build-Tool
- **GitHub Actions** für automatisches Deployment auf GitHub Pages

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Deployment

Jeder Push auf `main` löst automatisch den GitHub Actions Workflow aus und deployt die App auf GitHub Pages.


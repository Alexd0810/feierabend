# Feierabend Timer

Ein Countdown-Timer für Schüler und Arbeitnehmer – zeigt dir live, wie lange es noch bis zum Feierabend dauert.

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
corepack enable
pnpm install
pnpm dev
```

## Tests

```bash
npm run test
npm run test:e2e
```

Einzelne Playwright-Datei:

```bash
npm run test:e2e -- e2e/app.spec.ts
```

Für die lokale Erstinstallation von Playwright-Browsern:

```bash
npx playwright install chromium
```

## MCP Server

Für VS Code liegt eine Repository-Konfiguration unter `.vscode/mcp.json`, die den offiziellen Playwright-MCP-Server (`@playwright/mcp`) bereitstellt. Nach dem Öffnen des Projekts in VS Code kann der Server über die MCP-Ansicht gestartet werden.

## Deployment

Jeder Push auf `main` löst automatisch den GitHub Actions Workflow aus und deployt die App auf GitHub Pages.

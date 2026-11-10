# Marketplace — Stack Ranking

Drag-and-drop stack ranking exercise for Marketplace friction prioritization research.

**Rank 1** = most important · **Rank 11** = least important

## Live demo

Live URL (once GitHub Pages is on):  
`https://virgleynes.github.io/MKP2-stack-ranking/`

Responses sheet:  
https://docs.google.com/spreadsheets/d/1gGJ6sAOiMk6d9bRsx8TZt-PCzBsAXJriMLk_blvB5DU/edit

Submissions post to the Apps Script webhook and append a row to the Responses sheet.

## Setup

See **[SETUP.md](SETUP.md)** for Google Sheet + Apps Script + Pages configuration.

## How it works

- Participants drag friction items into their preferred rank order
- Submissions append a row to your Google Sheet (once connected)
- Design matches the Marketplace E2E Figma stack-ranking frame

## Files

- `index.html` — Self-contained ranking page (HTML, CSS, JS)
- `apps-script/Code.gs` — Webhook that writes Rank 1–11 to Google Sheets
- `google-apps-script/stack-rank-webhook.gs` — Pasteable copy of the same webhook
- `assets/celebration.svg` — Success screen illustration
- `scripts/deploy-apps-script.sh` — Optional clasp push/redeploy helper

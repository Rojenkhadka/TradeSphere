# TradeSphere

A gamified stock trading simulator built around Nepal's Stock Exchange (NEPSE). Practice trading 20 real NEPSE-listed stocks with virtual money — no signup, no risk, no framework, just a static site that runs in the browser.

## Features

- **Onboarding** — pick a trader name, a linked bank, and a NEPSE-registered broker, and get credited with a virtual starting balance.
- **Home dashboard** — live NEPSE index chart, market status (open/closed, NEPSE trading hours), top movers, market news.
- **Markets** — browse and filter all 20 tracked NEPSE stocks by sector (Banking, Hydropower, Insurance, Others).
- **Trade**
  - **Paper Trade** — a 90-second gamified challenge: start with NPR 1,00,000, trade 6 stocks, and aim for NPR 2,00,000 before the timer runs out. Includes XP, missions, and a performance tier at the end (Wiped Out → Legend).
  - **Live Trade** — a slower-paced virtual account (NPR 5,00,000) with market, limit, and stop-loss orders, gated to NEPSE's real trading hours (Sun–Thu, 11:00–15:00 NPT).
- **Portfolio** — separate Quick Trade and Live Trade balances, combined portfolio value, holdings, trade history, and a leaderboard.
- **Profile** — persistent level/XP progression, achievements, daily login streak, and session history.
- **Live NEPSE prices** — real prices for all 20 tracked stocks, fetched from a community-run NEPSE data mirror (NEPSE has no official public API). The chart is grounded in real prices, with a small simulated drift between refreshes so it doesn't sit flat between the ~60-second live polls. If the live source is ever unreachable, the app falls back to a simulated market automatically (shown via the Live/Sim badge).

## Tech stack

Plain HTML, CSS, and vanilla JavaScript (ES6) — no build step, no framework, no backend. [Chart.js](https://www.chartjs.org/) is loaded from a CDN for the price charts. All player progress (balance, holdings, XP, achievements, etc.) is stored in the browser via `localStorage`.

## Running it

Just open `index.html` in a browser, or serve the folder with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Disclaimer

TradeSphere is an educational simulator. All balances and trades are virtual — no real money or brokerage account is involved. Live prices are sourced from an unofficial, community-run mirror and may occasionally be delayed or unavailable.

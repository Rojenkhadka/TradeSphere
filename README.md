# TradeSphere - Quick Start Guide

## What You Have

A complete, production-ready stock trading simulation game with:
- **3 HTML/CSS/JavaScript files** (no build tools needed)
- **3 interactive screens** (Start, Game, Game Over)
- **Real-time price simulation** (800ms updates)
- **Market events system** (42% trigger chance every 7.5s)
- **XP & leveling** (6 levels max)
- **6 missions** with real-time tracking
- **Interactive price charts** (Chart.js)
- **Professional dark UI** with responsive design

## Files Location

```
/Users/rojenkhadka/tradesphere/
├── index.html       (11 KB)  - Main game structure
├── style.css        (15 KB)  - Complete styling
└── script.js        (17 KB)  - All game logic
```

## How to Run

### Option 1: Open in Browser (Easiest)
```bash
open /Users/rojenkhadka/tradesphere/index.html
```

### Option 2: Start a Local Server
```bash
cd /Users/rojenkhadka/tradesphere/
python3 -m http.server 8000
```
Then open: `http://localhost:8000`

### Option 3: Use VS Code
1. Open the `tradesphere` folder in VS Code
2. Right-click `index.html` → "Open with Live Server"

## What Works

✅ **Complete Game Flow**
- Click "Enter the Market" to start
- 90-second session countdown
- Buy/sell stocks with real prices
- Watch prices update every 800ms
- Random market events every 7-8 seconds
- Earn XP (+5 per trade, +20-80 for missions)
- Level up (triggers overlay when threshold reached)
- Complete missions in real-time
- Session ends at 90s → see final result

✅ **All Features Implemented**
- Price simulation with drift bias (-0.48)
- Independent stock volatility
- Market event system (16 events)
- XP thresholds & leveling
- 6 mission conditions
- Result tiers (5 levels from WIPED OUT to LEGEND)
- Toast notifications
- Real-time HUD updates
- Chart.js price visualization
- Timer with color warnings

## Game Mechanics

**Starting Capital:** $1,000
**Target:** $10,000  
**Time Limit:** 90 seconds

**4 Stocks:**
- APEX ($120) - 4.5% volatility
- GVLT ($85) - 4.5% volatility
- NXBK ($200) - 4.5% volatility
- VOLX ($50) - 9.0% volatility (most volatile)

**XP Levels:**
```
Level 1: 0 XP (start)
Level 2: 100 XP
Level 3: 250 XP
Level 4: 450 XP
Level 5: 700 XP
Level 6: 1,000 XP (max)
```

**Result Tiers:**
```
$0-999      💸 WIPED OUT
$1,000-1,999 🤝 BREAK EVEN
$2,000-4,999 📈 TRADER
$5,000-9,999 💎 INVESTOR
$10,000+    🏆 LEGEND
```

## Browser Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- No plugins or installations needed
- Works on desktop and tablet
- Mobile responsive at 480px breakpoint

## Code Structure

### HTML (index.html)
- 3 main screens with proper semantics
- HUD with sticky positioning
- Trade cards grid
- Chart container with tabs
- Market events panel
- Missions panel
- Level Up overlay
- Toast container

### CSS (style.css)
- CSS variables for theming
- Grid/Flexbox layouts
- Smooth animations
- Responsive breakpoints
- Custom scrollbar styling
- No frameworks required

### JavaScript (script.js)
- Game state management (G object)
- Price simulation engine
- Trading system
- Event triggering
- Mission checking
- Level progression
- Chart integration
- Timer management
- UI updates

## Key Implementation Details

### Price Update Formula
```javascript
newPrice = currentPrice × (1 + randomDrift)
randomDrift = (Math.random() - 0.48) × volatility
```

### Event System
- Fires every 7,500 milliseconds
- 42% probability per check
- 16 unique events
- Single-stock & market-wide events
- Price multipliers: 0.55x to 1.65x

### Mission Checking
- Runs continuously
- Checks all 6 conditions every price tick
- Each mission completes once
- Awards XP on completion
- Shows toast notification

### XP System
- +5 XP per buy
- +5 XP per sell
- +20-80 XP per mission
- Automatic level up check
- Max level 6

## Customization

Want to modify the game? Easy edits in `script.js`:

**Change session length:**
```javascript
limit: 90,  // Change to 60, 120, etc.
```

**Add/modify events:**
```javascript
const MARKET_EVENTS = [
  { text: "Your event text", affected: ["APEX"], multiplier: 1.5, good: true },
  // Add more...
];
```

**Adjust starting capital:**
```javascript
cash: 1000,  // Change to any amount
```

**Modify mission conditions:**
```javascript
{ check: (g) => g.netWorth() >= 2000, xp: 100 },  // Edit thresholds
```

## Performance

- Lightweight: ~43 KB total code
- 3 interval timers max (efficient)
- Chart.js updates every 800ms
- Smooth animations with CSS transitions
- No lag even on older devices

## Support

All files use vanilla JavaScript (ES6+) with no dependencies except:
- Chart.js 4.4.1 (from CDN)
- Google Fonts (from CDN)

Both are loaded from CDNs, so no npm install needed!

Enjoy TradeSphere! 🚀📈

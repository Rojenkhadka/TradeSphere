// ===== Game State Object =====
let G = {
  cash: 1000,
  owned: { APEX: 0, GVLT: 0, NXBK: 0, VOLX: 0 },
  prices: { APEX: 120, GVLT: 85, NXBK: 200, VOLX: 50 },
  prevPrices: { APEX: 120, GVLT: 85, NXBK: 200, VOLX: 50 },
  hist: { APEX: [120], GVLT: [85], NXBK: [200], VOLX: [50] },
  level: 1,
  xp: 0,
  elapsed: 0,
  limit: 90,
  events: [],
  missions: [
    { id: 0, text: "Make your first trade", done: false, check: (g) => g.trades >= 1, xp: 20 },
    { id: 1, text: "Own 5+ shares total", done: false, check: (g) => g.totalShares() >= 5, xp: 30 },
    { id: 2, text: "Reach $1,500 net worth", done: false, check: (g) => g.netWorth() >= 1500, xp: 50 },
    { id: 3, text: "Trade all 4 stocks", done: false, check: (g) => g.tradedSet.size >= 4, xp: 40 },
    { id: 4, text: "Reach $3,000 net worth", done: false, check: (g) => g.netWorth() >= 3000, xp: 80 },
    { id: 5, text: "Survive 60 seconds", done: false, check: (g) => g.elapsed >= 60, xp: 60 }
  ],
  trades: 0,
  tradedSet: new Set(),
  
  netWorth() {
    let portfolio = 0;
    for (let ticker in this.owned) {
      portfolio += this.owned[ticker] * this.prices[ticker];
    }
    return this.cash + portfolio;
  },
  
  totalShares() {
    let total = 0;
    for (let ticker in this.owned) {
      total += this.owned[ticker];
    }
    return total;
  }
};

// ===== Stock Data =====
const STOCKS = {
  APEX: { name: "ApexTech", color: "#00D4FF", volatility: 0.045, startPrice: 120 },
  GVLT: { name: "GreenVolt", color: "#2ECC71", volatility: 0.045, startPrice: 85 },
  NXBK: { name: "NexBank", color: "#FF6B9D", volatility: 0.045, startPrice: 200 },
  VOLX: { name: "VolatileX", color: "#FFB547", volatility: 0.090, startPrice: 50 }
};

// ===== Market Events =====
const MARKET_EVENTS = [
  { text: "ApexTech launches new AI chip!", affected: ["APEX"], multiplier: 1.18, good: true },
  { text: "GreenVolt wins solar contract", affected: ["GVLT"], multiplier: 1.14, good: true },
  { text: "NexBank beats earnings forecast", affected: ["NXBK"], multiplier: 1.15, good: true },
  { text: "VolatileX: crypto market collapse!", affected: ["VOLX"], multiplier: 0.55, good: false },
  { text: "Market-wide correction incoming", affected: ["APEX", "GVLT", "NXBK", "VOLX"], multiplier: 0.88, good: false },
  { text: "ApexTech CEO resignation scandal", affected: ["APEX"], multiplier: 0.70, good: false },
  { text: "Bull run — all stocks surge!", affected: ["APEX", "GVLT", "NXBK", "VOLX"], multiplier: 1.12, good: true },
  { text: "Global recession fears spread", affected: ["APEX", "GVLT", "NXBK", "VOLX"], multiplier: 0.86, good: false },
  { text: "VolatileX meme stock pump!", affected: ["VOLX"], multiplier: 1.65, good: true },
  { text: "NexBank fraud investigation opens", affected: ["NXBK"], multiplier: 0.68, good: false },
  { text: "Tech sector hits record high", affected: ["APEX"], multiplier: 1.20, good: true },
  { text: "Green energy subsidy bill passed", affected: ["GVLT"], multiplier: 1.24, good: true },
  { text: "Inflation data shocks markets", affected: ["APEX", "GVLT", "NXBK", "VOLX"], multiplier: 0.91, good: false },
  { text: "Fed announces surprise rate cut", affected: ["APEX", "GVLT", "NXBK", "VOLX"], multiplier: 1.10, good: true },
  { text: "GreenVolt factory fire reported", affected: ["GVLT"], multiplier: 0.74, good: false },
  { text: "APEX acquires major competitor", affected: ["APEX"], multiplier: 1.22, good: true }
];

// ===== XP System =====
const XP_LEVELS = [0, 100, 250, 450, 700, 1000];

// ===== Result Tiers =====
const RESULT_TIERS = [
  { minWorth: 0, icon: "💸", title: "WIPED OUT", message: "You didn't manage to grow your capital." },
  { minWorth: 1000, icon: "🤝", title: "BREAK EVEN", message: "You held steady but didn't grow." },
  { minWorth: 2000, icon: "📈", title: "TRADER", message: "Not bad! You're learning the market." },
  { minWorth: 5000, icon: "💎", title: "INVESTOR", message: "Impressive! You've got skill." },
  { minWorth: 10000, icon: "🏆", title: "LEGEND", message: "Outstanding! You've mastered the market!" }
];

// ===== Timers =====
let gameTimer, priceTimer, eventTimer, chartInstance;

// ===== Initialize =====
function initGame() {
  G = {
    cash: 1000,
    owned: { APEX: 0, GVLT: 0, NXBK: 0, VOLX: 0 },
    prices: { APEX: 120, GVLT: 85, NXBK: 200, VOLX: 50 },
    prevPrices: { APEX: 120, GVLT: 85, NXBK: 200, VOLX: 50 },
    hist: { APEX: [120], GVLT: [85], NXBK: [200], VOLX: [50] },
    level: 1,
    xp: 0,
    elapsed: 0,
    limit: 90,
    events: [],
    missions: [
      { id: 0, text: "Make your first trade", done: false, check: (g) => g.trades >= 1, xp: 20 },
      { id: 1, text: "Own 5+ shares total", done: false, check: (g) => g.totalShares() >= 5, xp: 30 },
      { id: 2, text: "Reach $1,500 net worth", done: false, check: (g) => g.netWorth() >= 1500, xp: 50 },
      { id: 3, text: "Trade all 4 stocks", done: false, check: (g) => g.tradedSet.size >= 4, xp: 40 },
      { id: 4, text: "Reach $3,000 net worth", done: false, check: (g) => g.netWorth() >= 3000, xp: 80 },
      { id: 5, text: "Survive 60 seconds", done: false, check: (g) => g.elapsed >= 60, xp: 60 }
    ],
    trades: 0,
    tradedSet: new Set(),
    netWorth() {
      let portfolio = 0;
      for (let ticker in this.owned) {
        portfolio += this.owned[ticker] * this.prices[ticker];
      }
      return this.cash + portfolio;
    },
    totalShares() {
      let total = 0;
      for (let ticker in this.owned) {
        total += this.owned[ticker];
      }
      return total;
    }
  };
}

// ===== Start Game =====
function startGame() {
  initGame();
  showScreen("game");
  buildChart();
  updateHUD();
  updateAllCards();
  updateMissionsUI();
  
  // Start timers
  gameTimer = setInterval(() => {
    G.elapsed += 1;
    updateHUD();
    if (G.elapsed >= G.limit) {
      endGame();
    }
  }, 1000);
  
  priceTimer = setInterval(() => {
    updatePrices();
    updateChart();
    updateAllCards();
    checkMissions();
  }, 800);
  
  eventTimer = setInterval(() => {
    if (Math.random() < 0.42) {
      fireEvent();
    }
  }, 7500);
}

// ===== Update Prices =====
function updatePrices() {
  for (let ticker in G.prices) {
    const volatility = STOCKS[ticker].volatility;
    const randomDrift = (Math.random() - 0.48) * volatility;
    let newPrice = G.prices[ticker] * (1 + randomDrift);
    newPrice = Math.max(1, newPrice);
    G.prevPrices[ticker] = G.prices[ticker];
    G.prices[ticker] = Math.round(newPrice * 100) / 100;
    
    // Store in history (max 45)
    G.hist[ticker].push(G.prices[ticker]);
    if (G.hist[ticker].length > 45) {
      G.hist[ticker].shift();
    }
  }
}

// ===== Fire Market Event =====
function fireEvent() {
  const event = MARKET_EVENTS[Math.floor(Math.random() * MARKET_EVENTS.length)];
  
  for (let ticker of event.affected) {
    G.prices[ticker] = Math.max(1, Math.round(G.prices[ticker] * event.multiplier * 100) / 100);
  }
  
  G.events.push(event);
  if (G.events.length > 3) {
    G.events.shift();
  }
  
  updateEventsUI();
  
  const toastClass = event.good ? "green" : "red";
  toast(event.text, toastClass);
}

// ===== Trade =====
function trade(ticker, action) {
  const price = G.prices[ticker];
  
  if (action === "BUY") {
    if (G.cash < price) {
      toast("Insufficient cash!", "error");
      return;
    }
    G.cash -= price;
    G.owned[ticker] += 1;
    G.trades += 1;
    G.tradedSet.add(ticker);
    G.xp += 5;
    checkLevelUp();
    toast(`Bought 1 ${ticker}`, "green");
  } else if (action === "SELL") {
    if (G.owned[ticker] < 1) {
      toast("No shares to sell!", "error");
      return;
    }
    G.cash += price;
    G.owned[ticker] -= 1;
    G.trades += 1;
    G.tradedSet.add(ticker);
    G.xp += 5;
    checkLevelUp();
    toast(`Sold 1 ${ticker}`, "green");
  }
  
  updateHUD();
  updateAllCards();
  checkMissions();
}

// ===== Check Missions =====
function checkMissions() {
  for (let mission of G.missions) {
    if (!mission.done && mission.check(G)) {
      mission.done = true;
      G.xp += mission.xp;
      checkLevelUp();
      toast(`Mission Complete: +${mission.xp} XP`, "warning");
      updateMissionsUI();
    }
  }
}

// ===== Check Level Up =====
function checkLevelUp() {
  while (G.level < 6 && G.xp >= XP_LEVELS[G.level]) {
    G.level += 1;
    showLevelUp();
  }
}

// ===== Update HUD =====
function updateHUD() {
  const portfolio = G.netWorth() - G.cash;
  
  document.getElementById("hudCash").textContent = "$" + G.cash.toFixed(2);
  document.getElementById("hudPortfolio").textContent = "$" + portfolio.toFixed(2);
  document.getElementById("hudNetWorth").textContent = "$" + G.netWorth().toFixed(2);
  document.getElementById("hudLevel").textContent = G.level;
  
  // XP Bar
  const xpMax = XP_LEVELS[G.level] || 1000;
  const xpPrev = XP_LEVELS[G.level - 1] || 0;
  const xpInLevel = G.xp - xpPrev;
  const xpNeeded = xpMax - xpPrev;
  const xpPercent = (xpInLevel / xpNeeded) * 100;
  
  const xpBarFill = document.getElementById("xpBarFill");
  xpBarFill.style.setProperty("--fill-percent", xpPercent + "%");
  
  // Update fill element directly
  const fillAfter = xpBarFill.style.cssText;
  xpBarFill.style.cssText = fillAfter;
  const sheet = document.styleSheets[0];
  for (let i = 0; i < sheet.cssRules.length; i++) {
    if (sheet.cssRules[i].selectorText === ".xp-bar-fill::after") {
      sheet.cssRules[i].style.width = xpPercent + "%";
      break;
    }
  }
  
  document.getElementById("xpText").textContent = Math.floor(xpInLevel) + "/" + xpNeeded;
  
  // Timer color
  const timerEl = document.getElementById("hudTimer");
  const remaining = G.limit - G.elapsed;
  timerEl.textContent = remaining;
  timerEl.parentElement.classList.remove("amber", "red");
  if (remaining <= 20) timerEl.parentElement.classList.add("red");
  else if (remaining <= 40) timerEl.parentElement.classList.add("amber");
}

// ===== Update All Cards =====
function updateAllCards() {
  for (let ticker in G.prices) {
    updateCard(ticker);
  }
}

// ===== Update Single Card =====
function updateCard(ticker) {
  const price = G.prices[ticker];
  const prevPrice = G.prevPrices[ticker];
  const change = ((price - prevPrice) / prevPrice) * 100;
  
  document.getElementById(`price-${ticker}`).textContent = "$" + price.toFixed(2);
  
  const changeEl = document.getElementById(`change-${ticker}`);
  changeEl.textContent = (change >= 0 ? "+" : "") + change.toFixed(2) + "%";
  changeEl.classList.remove("up", "down");
  changeEl.classList.add(change >= 0 ? "up" : "down");
  
  const totalValue = G.owned[ticker] * price;
  document.getElementById(`shares-${ticker}`).textContent = G.owned[ticker] + " shares";
  document.getElementById(`value-${ticker}`).textContent = "$" + totalValue.toFixed(2);
}

// ===== Build Chart =====
function buildChart() {
  const ctx = document.getElementById("priceChart").getContext("2d");
  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from({ length: 45 }, (_, i) => i),
      datasets: [
        {
          label: "APEX",
          data: G.hist.APEX,
          borderColor: "#00D4FF",
          backgroundColor: "rgba(0, 212, 255, 0.1)",
          borderWidth: 2,
          fill: true,
          pointRadius: 0,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { display: false },
        y: {
          ticks: { color: "#5A7090", font: { family: "'IBM Plex Mono'" } },
          grid: { color: "#1E2D4A" }
        }
      },
      animation: { duration: 150 }
    }
  });
}

// ===== Update Chart =====
function updateChart() {
  const currentTab = document.querySelector(".chart-tab.active");
  const stock = currentTab ? currentTab.dataset.stock : "APEX";
  
  if (chartInstance) {
    chartInstance.data.labels = Array.from({ length: G.hist[stock].length }, (_, i) => i);
    chartInstance.data.datasets[0].data = G.hist[stock];
    chartInstance.data.datasets[0].label = stock;
    
    // Update chart colors based on stock
    const colors = {
      APEX: { border: "#00D4FF", bg: "rgba(0, 212, 255, 0.1)" },
      GVLT: { border: "#2ECC71", bg: "rgba(46, 204, 113, 0.1)" },
      NXBK: { border: "#FF6B9D", bg: "rgba(255, 107, 157, 0.1)" },
      VOLX: { border: "#FFB547", bg: "rgba(255, 181, 71, 0.1)" }
    };
    
    chartInstance.data.datasets[0].borderColor = colors[stock].border;
    chartInstance.data.datasets[0].backgroundColor = colors[stock].bg;
    chartInstance.update("none");
  }
}

// ===== Update Events UI =====
function updateEventsUI() {
  const eventsList = document.getElementById("eventsList");
  eventsList.innerHTML = "";
  
  if (G.events.length === 0) {
    eventsList.innerHTML = "<div class='empty-state'>Waiting for events...</div>";
    return;
  }
  
  for (let event of G.events) {
    const div = document.createElement("div");
    div.className = "event-item " + (event.good ? "" : "bad");
    div.textContent = event.text;
    eventsList.appendChild(div);
  }
}

// ===== Update Missions UI =====
function updateMissionsUI() {
  for (let mission of G.missions) {
    const el = document.querySelector(`.mission-item[data-mission="${mission.id}"]`);
    if (mission.done) {
      el.classList.add("done");
    } else {
      el.classList.remove("done");
    }
  }
}

// ===== End Game =====
function endGame() {
  clearInterval(gameTimer);
  clearInterval(priceTimer);
  clearInterval(eventTimer);
  
  const netWorth = G.netWorth();
  const profitLoss = netWorth - 1000;
  
  const tier = RESULT_TIERS.reduce((best, current) => 
    netWorth >= current.minWorth ? current : best
  );
  
  document.getElementById("resultIcon").textContent = tier.icon;
  document.getElementById("resultTitle").textContent = tier.title;
  document.getElementById("resultMessage").textContent = tier.message;
  document.getElementById("statNetWorth").textContent = "$" + netWorth.toFixed(2);
  document.getElementById("statProfitLoss").textContent = (profitLoss >= 0 ? "+" : "") + "$" + profitLoss.toFixed(2);
  document.getElementById("statLevel").textContent = G.level;
  document.getElementById("statXP").textContent = G.xp;
  
  showScreen("gameOver");
}

// ===== Show Screen =====
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(name + "Screen").classList.add("active");
}

// ===== Show Level Up =====
function showLevelUp() {
  const overlay = document.getElementById("levelUpOverlay");
  document.getElementById("levelUpNumber").textContent = G.level;
  overlay.classList.remove("hidden");
}

// ===== Toast Notification =====
function toast(msg, cls = "green") {
  const container = document.getElementById("toastContainer");
  const div = document.createElement("div");
  div.className = "toast " + cls;
  div.textContent = msg;
  container.appendChild(div);
  
  setTimeout(() => {
    div.remove();
  }, 2400);
}

// ===== Event Listeners =====
document.addEventListener("DOMContentLoaded", () => {
  // Start button
  document.getElementById("startBtn").addEventListener("click", startGame);
  
  // New session button
  document.getElementById("newSessionBtn").addEventListener("click", () => {
    showScreen("start");
  });
  
  // Continue button (Level Up)
  document.getElementById("continueBtn").addEventListener("click", () => {
    document.getElementById("levelUpOverlay").classList.add("hidden");
  });
  
  // Chart tabs
  document.querySelectorAll(".chart-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".chart-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      updateChart();
    });
  });
  
  // Buy buttons
  document.querySelectorAll(".btn-buy").forEach(btn => {
    btn.addEventListener("click", () => {
      const ticker = btn.dataset.stock;
      trade(ticker, "BUY");
    });
  });
  
  // Sell buttons
  document.querySelectorAll(".btn-sell").forEach(btn => {
    btn.addEventListener("click", () => {
      const ticker = btn.dataset.stock;
      trade(ticker, "SELL");
    });
  });
});

// ===== Add dynamic XP bar fill width =====
function updateXPBarWidth() {
  const xpMax = XP_LEVELS[G.level] || 1000;
  const xpPrev = XP_LEVELS[G.level - 1] || 0;
  const xpInLevel = G.xp - xpPrev;
  const xpNeeded = xpMax - xpPrev;
  const xpPercent = Math.min(100, (xpInLevel / xpNeeded) * 100);
  
  const xpBarFill = document.querySelector(".xp-bar-fill::after");
  if (xpBarFill) {
    xpBarFill.style.width = xpPercent + "%";
  }
  
  // Add inline style approach
  const fillDiv = document.getElementById("xpBarFill");
  if (fillDiv && fillDiv.nextElementSibling === null) {
    const style = fillDiv.getAttribute("style") || "";
    fillDiv.setAttribute("style", style + "; --fill-width: " + xpPercent + "%;");
  }
}

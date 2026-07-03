const STOCKS={NABIL:{name:"Nabil Bank",sector:"Banking",price:1024.50,vol:.025,color:"#4AFFCE"},NICA:{name:"NIC Asia Bank",sector:"Banking",price:852.30,vol:.028,color:"#00D4FF"},GBIME:{name:"Global IME Bank",sector:"Banking",price:245.60,vol:.032,color:"#FF6B9D"},SCB:{name:"Standard Chartered",sector:"Banking",price:5240.00,vol:.018,color:"#FFB547"},CBL:{name:"Civil Bank",sector:"Banking",price:198.40,vol:.035,color:"#7C3AED"},KBL:{name:"Kumari Bank",sector:"Banking",price:212.80,vol:.030,color:"#06B6D4"},SBL:{name:"Sunrise Bank",sector:"Banking",price:187.50,vol:.033,color:"#F59E0B"},ADBL:{name:"Agri Dev Bank",sector:"Banking",price:345.20,vol:.027,color:"#10B981"},UPPER:{name:"Upper Tamakoshi",sector:"Hydropower",price:304.50,vol:.040,color:"#3B82F6"},CHCL:{name:"Chilime Hydro",sector:"Hydropower",price:612.30,vol:.035,color:"#06D6A0"},NHPC:{name:"National Hydro",sector:"Hydropower",price:98.60,vol:.045,color:"#60A5FA"},HPPL:{name:"Himalayan Power",sector:"Hydropower",price:143.20,vol:.042,color:"#34D399"},UMHL:{name:"United Modi Hydro",sector:"Hydropower",price:245.80,vol:.038,color:"#4ADE80"},LICN:{name:"Life Insurance Nepal",sector:"Insurance",price:8540.00,vol:.020,color:"#A78BFA"},PRIN:{name:"Prudential Insurance",sector:"Insurance",price:1230.50,vol:.025,color:"#F472B6"},NLIC:{name:"Nepal Life Insurance",sector:"Insurance",price:2450.00,vol:.022,color:"#FB7185"},NTC:{name:"Nepal Telecom",sector:"Others",price:782.40,vol:.022,color:"#FCD34D"},NRIC:{name:"Nepal Reinsurance",sector:"Others",price:1562.80,vol:.024,color:"#A3E635"},SHL:{name:"Soaltee Hotel",sector:"Others",price:115.20,vol:.038,color:"#FB923C"},BNL:{name:"Bottlers Nepal",sector:"Others",price:9450.00,vol:.015,color:"#38BDF8"}};
const GAME_TICKERS=["NABIL","NICA","UPPER","CHCL","NTC","GBIME"];
const XP_THRESH=[0,100,250,450,700,1000,1400,2000];
const LVL_TITLES=["Beginner","Learner","Trader","Senior Trader","Expert Trader","Master Trader","Legend","GOAT"];
const NEWS=["NEPSE closes above 2,400 for first time this quarter.","NRB to review monetary policy next week.","Hydropower stocks surge on India power export deal.","Banking sector sees rise in Q4 net interest margins.","NABIL opens new branches across 10 provinces.","Nepal GDP growth projected at 5.8% for fiscal year.","SEBON tightens margin trading regulations.","NTC dividend yield attracts institutional investors.","FPO of Upper Tamakoshi oversubscribed by 4x.","NEPSE introduces T+2 settlement for equity trades."];
const NEPAL_BANKS=[{code:"NABIL",name:"Nabil Bank Ltd."},{code:"NICA",name:"NIC Asia Bank Ltd."},{code:"GBIME",name:"Global IME Bank Ltd."},{code:"HBL",name:"Himalayan Bank Ltd."},{code:"EBL",name:"Everest Bank Ltd."},{code:"SCB",name:"Standard Chartered"},{code:"SBL",name:"Siddhartha Bank Ltd."},{code:"BOK",name:"Bank of Kathmandu"},{code:"MBL",name:"Machhapuchchhre Bank"},{code:"ADBL",name:"Agri. Dev. Bank"},{code:"SBI",name:"Nepal SBI Bank Ltd."},{code:"SANIMA",name:"Sanima Bank Ltd."},{code:"PRVU",name:"Prabhu Bank Ltd."},{code:"PCBL",name:"Prime Commercial Bank"},{code:"SRBL",name:"Sunrise Bank Ltd."},{code:"KBL",name:"Kumari Bank Ltd."},{code:"CBL",name:"Citizen Bank Intl."},{code:"LSL",name:"Laxmi Sunrise Bank"},{code:"NMB",name:"NMB Bank Ltd."},{code:"RBB",name:"Rastriya Banijya Bank"}];
const NEPAL_BROKERS=[{no:"01",name:"Malla Stock Broking Co."},{no:"02",name:"Shanker Securities Pvt. Ltd."},{no:"03",name:"Bhrikuti Stock Broking"},{no:"04",name:"Sarbottam Securities Pvt. Ltd."},{no:"05",name:"Agrawal Securities Pvt. Ltd."},{no:"06",name:"Nepal Share Markets Pvt. Ltd."},{no:"07",name:"Capital Securities Pvt. Ltd."},{no:"08",name:"Himalayan Securities Pvt. Ltd."},{no:"09",name:"Heritage Securities Pvt. Ltd."},{no:"10",name:"Asia Pacific Securities"},{no:"11",name:"Apex Securities Pvt. Ltd."},{no:"12",name:"Sunrise Capital Pvt. Ltd."},{no:"13",name:"Kumari Securities Pvt. Ltd."},{no:"14",name:"Civil Capital Market Pvt. Ltd."},{no:"15",name:"Prabhu Capital Ltd."},{no:"16",name:"Prime Securities Ltd."},{no:"17",name:"Vision Securities Pvt. Ltd."},{no:"18",name:"Pragyan Securities Pvt. Ltd."},{no:"19",name:"Mountain Securities Pvt. Ltd."},{no:"20",name:"Sweta Securities Pvt. Ltd."}];

let playerName=localStorage.getItem("ts_name")||"";
let appLevel=parseInt(localStorage.getItem("ts_level")||"1");
let appXP=parseInt(localStorage.getItem("ts_xp")||"0");
let totalTrades=parseInt(localStorage.getItem("ts_trades")||"0");
let bestSession=parseFloat(localStorage.getItem("ts_best")||"0");
let streak=parseInt(localStorage.getItem("ts_streak")||"0");
let leaderboard=JSON.parse(localStorage.getItem("ts_lb")||"[]");
let sessionHistory=JSON.parse(localStorage.getItem("ts_sessions")||"[]");
let QT_CASH=parseFloat(localStorage.getItem("qt_cash")||"100000");
let QT_HOLDINGS=JSON.parse(localStorage.getItem("qt_holdings")||"{}");
let QT_AVG=JSON.parse(localStorage.getItem("qt_avg")||"{}");
let QT_HISTORY=JSON.parse(localStorage.getItem("qt_history")||"[]");
let QT_PF_HIST=JSON.parse(localStorage.getItem("qt_pf_hist")||"[]");
let LT_CASH=parseFloat(localStorage.getItem("lt_cash")||"500000");
let LT_HOLDINGS=JSON.parse(localStorage.getItem("lt_holdings")||"{}");
let LT_AVG=JSON.parse(localStorage.getItem("lt_avg")||"{}");
let LT_ORDERS=JSON.parse(localStorage.getItem("lt_orders")||"[]");
let LT_HISTORY=JSON.parse(localStorage.getItem("lt_hist")||"[]");
let ltOrderType="market",currentTradeTab="paper";
let prices={},prevPrices={},priceHist={};
let nepseVal=2387.45,nepseHist=[];
let activeSector="all",currentTab="home";
let modalTicker=null,mktTimer=null;
let PG=null,gameTimer=null,pgChartActive="NABIL",gameEnded=false;
let nepseChartInst=null,miniPfChartInst=null,pfChartInst=null,gameChart=null;
let isLiveData=false,liveDataTimer=null;
let obBank=null,obBroker=null;

// ===== SOUND SYSTEM =====
let _actx=null;
function _ac(){if(!_actx)_actx=new(window.AudioContext||window.webkitAudioContext)();return _actx;}
function playSound(type){
  try{
    const ctx=_ac(),now=ctx.currentTime;
    const beep=(f,t,d,vol=0.25,wave='sine')=>{
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.type=wave;o.frequency.value=f;
      g.gain.setValueAtTime(vol,now+t);
      g.gain.exponentialRampToValueAtTime(0.001,now+t+d);
      o.connect(g);g.connect(ctx.destination);
      o.start(now+t);o.stop(now+t+d);
    };
    if(type==='buy'){beep(523,.0,.12);beep(659,.1,.15);beep(784,.2,.2);}
    else if(type==='sell'){beep(784,.0,.12);beep(659,.1,.12);beep(523,.2,.2);}
    else if(type==='levelup'){[523,659,784,1047].forEach((f,i)=>beep(f,i*.12,.18,.3));}
    else if(type==='error'){beep(220,.0,.2,.2,'sawtooth');}
    else if(type==='win'){[523,659,784,659,784,1047].forEach((f,i)=>beep(f,i*.1,.15,.25));}
    else if(type==='lose'){[392,349,330,294].forEach((f,i)=>beep(f,i*.15,.2,.2,'triangle'));}
    else if(type==='mission'){beep(784,.0,.12);beep(1047,.15,.25,.3);}
    else if(type==='open'){beep(660,.0,.3,.2);beep(880,.2,.4,.25);}
  }catch(_){}
}

const CORS_PROXY="https://api.allorigins.win/get?url=";
const NEPSE_SEC="https://nepalstock.com/api/nots/security";
const NEPSE_IDX="https://nepalstock.com/api/nots/nepse-data/today";

async function fetchLiveNEPSE(){
  try{
    const res=await fetch(CORS_PROXY+encodeURIComponent(NEPSE_SEC),{signal:AbortSignal.timeout(10000)});
    if(!res.ok)throw new Error("HTTP "+res.status);
    const wrap=await res.json();
    const list=JSON.parse(wrap.contents);
    if(!Array.isArray(list)||!list.length)throw new Error("Empty");
    let hit=0;
    list.forEach(s=>{
      const sym=(s.symbol||s.stockSymbol||"").trim();
      const ltp=parseFloat(s.lastTradedPrice||s.ltp||s.closingPrice||0);
      if(STOCKS[sym]&&ltp>0){prevPrices[sym]=prices[sym];prices[sym]=ltp;priceHist[sym].push(ltp);if(priceHist[sym].length>60)priceHist[sym].shift();hit++;}
    });
    if(hit===0)throw new Error("No match");
    try{
      const ir=await fetch(CORS_PROXY+encodeURIComponent(NEPSE_IDX),{signal:AbortSignal.timeout(6000)});
      const iw=await ir.json();const id=JSON.parse(iw.contents);
      const arr=Array.isArray(id)?id:(id.nepseIndex||id.indices||[id]);
      const ni=arr.find(x=>(x.index||x.indexName||"").toLowerCase().includes("nepse"));
      if(ni&&ni.currentValue){nepseVal=parseFloat(ni.currentValue);nepseHist.push(nepseVal);if(nepseHist.length>60)nepseHist.shift();}
    }catch(_){}
    isLiveData=true;updateDataBadge(true);
  }catch(e){console.warn("Live NEPSE:",e.message);isLiveData=false;updateDataBadge(false);}
}
function updateDataBadge(live){const b=document.getElementById("dataBadge");if(!b)return;b.textContent=live?"Live":"Sim";b.className="data-badge "+(live?"live":"sim");}

// ===== NEPAL MARKET HOURS =====
function getNepalTime(){
  // Nepal is UTC+5:45 = 345 minutes ahead
  return new Date(Date.now()+345*60*1000);
}
function isMarketOpen(){
  const nt=getNepalTime();
  const day=nt.getUTCDay(); // 0=Sun,1=Mon,...,4=Thu,5=Fri,6=Sat
  if(day===5||day===6)return false; // Fri/Sat = weekend in Nepal
  const m=nt.getUTCHours()*60+nt.getUTCMinutes();
  return m>=660&&m<900; // 11:00AM-3:00PM
}
function getMarketStatus(){
  const nt=getNepalTime();
  const day=nt.getUTCDay();
  const m=nt.getUTCHours()*60+nt.getUTCMinutes();
  const h=nt.getUTCHours(),mn=String(nt.getUTCMinutes()).padStart(2,'0');
  const timeStr=h+':'+mn+' NPT';
  if(day===5||day===6)return{cls:'closed',label:'Closed',sub:'Opens Sunday 11:00 AM',time:timeStr};
  if(m<645)return{cls:'closed',label:'Closed',sub:'Pre-open at 10:45 AM NPT',time:timeStr};
  if(m>=645&&m<660)return{cls:'preopen',label:'Pre-Open',sub:'Regular session starts 11:00 AM',time:timeStr};
  if(m>=660&&m<900)return{cls:'open',label:'Market Open',sub:'Closes at 3:00 PM NPT',time:timeStr};
  return{cls:'closed',label:'Closed',sub:'Opens next trading day 11:00 AM',time:timeStr};
}
function updateMarketStatus(){
  const s=getMarketStatus();
  const bar=document.getElementById('mktStatusBar');
  if(bar){bar.className='mkt-status-bar '+s.cls;}
  const txt=document.getElementById('mktStatusText'); if(txt)txt.textContent=s.label;
  const sub=document.getElementById('mktStatusSub'); if(sub)sub.textContent=s.sub;
  const nt=document.getElementById('nepalTime'); if(nt)nt.textContent=s.time;
  const badge=document.getElementById('mktStatusBadge');
  if(badge){badge.textContent=s.label;badge.className='mkt-badge '+s.cls;}
}

function initPrices(){
  for(const t in STOCKS){prices[t]=STOCKS[t].price+(Math.random()-.5)*STOCKS[t].price*.02;prevPrices[t]=prices[t];priceHist[t]=[prices[t]];}
  nepseVal=2387.45+(Math.random()-.5)*50;
  for(let i=0;i<20;i++)nepseHist.push(nepseVal+(Math.random()-.5)*30);
  nepseHist.push(nepseVal);
}
function saveState(){
  localStorage.setItem("ts_name",playerName);localStorage.setItem("ts_level",appLevel);localStorage.setItem("ts_xp",appXP);localStorage.setItem("ts_trades",totalTrades);localStorage.setItem("ts_best",bestSession);localStorage.setItem("ts_streak",streak);localStorage.setItem("ts_lb",JSON.stringify(leaderboard));localStorage.setItem("ts_sessions",JSON.stringify(sessionHistory));
  localStorage.setItem("qt_cash",QT_CASH);localStorage.setItem("qt_holdings",JSON.stringify(QT_HOLDINGS));localStorage.setItem("qt_avg",JSON.stringify(QT_AVG));localStorage.setItem("qt_history",JSON.stringify(QT_HISTORY));localStorage.setItem("qt_pf_hist",JSON.stringify(QT_PF_HIST));
  localStorage.setItem("lt_cash",LT_CASH);localStorage.setItem("lt_holdings",JSON.stringify(LT_HOLDINGS));localStorage.setItem("lt_avg",JSON.stringify(LT_AVG));localStorage.setItem("lt_orders",JSON.stringify(LT_ORDERS));localStorage.setItem("lt_hist",JSON.stringify(LT_HISTORY));
}
function fmtNPR(n){if(n>=10000000)return(n/10000000).toFixed(2)+"Cr";if(n>=100000)return(n/100000).toFixed(2)+"L";return n.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2});}
function getQTTotal(){let t=QT_CASH;for(const k in QT_HOLDINGS)t+=(QT_HOLDINGS[k]||0)*(prices[k]||STOCKS[k].price||0);return t;}
function getLTTotal(){let t=LT_CASH;for(const k in LT_HOLDINGS)t+=(LT_HOLDINGS[k]||0)*(prices[k]||STOCKS[k].price||0);return t;}

function startMarket(){
  mktTimer=setInterval(()=>{
    if(!isLiveData&&isMarketOpen()){
      for(const t in STOCKS){prevPrices[t]=prices[t];const d=(Math.random()-.48)*STOCKS[t].vol;prices[t]=Math.max(1,Math.round(prices[t]*(1+d)*100)/100);priceHist[t].push(prices[t]);if(priceHist[t].length>60)priceHist[t].shift();}
      const avgD=Object.keys(STOCKS).reduce((s,t)=>s+(prices[t]-prevPrices[t])/prevPrices[t],0)/Object.keys(STOCKS).length;
      nepseVal=Math.max(1000,Math.round(nepseVal*(1+avgD*.8)*100)/100);nepseHist.push(nepseVal);if(nepseHist.length>60)nepseHist.shift();
    }
    QT_PF_HIST.push(getQTTotal());if(QT_PF_HIST.length>60)QT_PF_HIST.shift();
    if(currentTab==="home")updateHomeData();
    else if(currentTab==="markets")renderStocksList();
    else if(currentTab==="portfolio"){updatePortfolioData();updateQTDisplay();}
    else if(currentTab==="trade"&&currentTradeTab==="live"){updateLTDisplay();updateLTHoldings();}
    processLimitOrders();updateHeader();saveState();
  },1500);
}

// ONBOARDING
function obSetStep(n){
  ["ob1","ob2","ob3","ob4"].forEach((id,i)=>{const e=document.getElementById(id);if(e)e.classList.toggle("hidden",i+1!==n);});
  [1,2,3].forEach(i=>{const d=document.getElementById("dot"+i);if(d)d.classList.remove("active","done");});
  if(n===4){[1,2,3].forEach(i=>{document.getElementById("dot"+i).classList.add("done");});document.getElementById("line1").classList.add("done");document.getElementById("line2").classList.add("done");return;}
  for(let i=1;i<n;i++){document.getElementById("dot"+i).classList.add("done");const ln=document.getElementById("line"+i);if(ln)ln.classList.add("done");}
  document.getElementById("dot"+n).classList.add("active");
}
function buildBankGrid(){document.getElementById("bankGrid").innerHTML=NEPAL_BANKS.map(b=>`<div class="ob-item" onclick="selectBank('${b.code}',this)"><strong>${b.code}</strong><span>${b.name}</span></div>`).join("");}
function selectBank(code,el){document.querySelectorAll("#bankGrid .ob-item").forEach(x=>x.classList.remove("selected"));el.classList.add("selected");obBank=code;document.getElementById("bankNextBtn").disabled=false;}
function buildBrokerGrid(){document.getElementById("brokerGrid").innerHTML=NEPAL_BROKERS.map(b=>`<div class="ob-item" onclick="selectBroker('${b.no}',this)"><strong>Broker #${b.no}</strong><span>${b.name}</span></div>`).join("");}
function selectBroker(no,el){document.querySelectorAll("#brokerGrid .ob-item").forEach(x=>x.classList.remove("selected"));el.classList.add("selected");obBroker=no;document.getElementById("brokerNextBtn").disabled=false;}

document.addEventListener("DOMContentLoaded",()=>{
  initPrices();
  if(localStorage.getItem("ts_name")&&localStorage.getItem("ts_bank")){playerName=localStorage.getItem("ts_name");launchApp();return;}
  buildBankGrid();buildBrokerGrid();
  document.getElementById("loginBtn").addEventListener("click",()=>{const v=document.getElementById("loginName").value.trim();if(!v){toast("Enter your name!","red");return;}playerName=v;obSetStep(2);});
  document.getElementById("loginName").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("loginBtn").click();});
  document.getElementById("bankNextBtn").addEventListener("click",()=>{if(!obBank){toast("Select a bank!","red");return;}obSetStep(3);});
  document.getElementById("brokerNextBtn").addEventListener("click",()=>{
    if(!obBroker){toast("Select a broker!","red");return;}
    const bank=NEPAL_BANKS.find(b=>b.code===obBank),broker=NEPAL_BROKERS.find(b=>b.no===obBroker);
    localStorage.setItem("ts_bank",obBank);localStorage.setItem("ts_broker",obBroker);
    document.getElementById("obSummary").innerHTML=`Name: <b>${playerName}</b><br>Bank: ${bank.name} (${bank.code})<br>Broker: ${broker.name} #${broker.no}`;
    obSetStep(4);checkDailyStreak();
  });
  document.getElementById("enterMarketBtn").addEventListener("click",()=>launchApp());
  document.getElementById("lvlContinue").addEventListener("click",()=>document.getElementById("lvlOverlay").classList.add("hidden"));
});

function launchApp(){
  saveState();
  document.getElementById("loginModal").style.display="none";
  document.getElementById("app").classList.remove("hidden");
  updateHeader();switchTab("home");startMarket();
  buildQTSelect();updateQTDisplay();updatePortfolioData();
  buildLTSelect();updateLTDisplay();updateLTHoldings();
  updateProfileData();renderLeaderboardList();renderFullHistory();
  setTimeout(()=>{buildNepseChart();buildMiniPfChart();buildPfChart();},100);
  fetchLiveNEPSE();
  if(liveDataTimer)clearInterval(liveDataTimer);
  liveDataTimer=setInterval(fetchLiveNEPSE,60000);
}
function checkDailyStreak(){const today=new Date().toDateString(),last=localStorage.getItem("ts_last_login"),yesterday=new Date(Date.now()-86400000).toDateString();if(last===today)return;if(last===yesterday)streak++;else streak=1;localStorage.setItem("ts_last_login",today);if(streak>1)setTimeout(()=>toast(streak+"-day streak!","warning"),800);}
function updateHeader(){document.getElementById("hName").textContent=playerName||"Trader";document.getElementById("hLevel").textContent="L"+appLevel;const ni=nepseVal.toFixed(2),base=2387.45,chg=((nepseVal-base)/base*100).toFixed(2);document.getElementById("hNepse").textContent=Math.round(nepseVal).toLocaleString();const hc=document.getElementById("hNepseChg");hc.textContent=(chg>=0?"+":"")+chg+"%";hc.className="nepse-chg "+(chg>=0?"up":"down");updateMarketStatus();}

function switchTab(tab){
  currentTab=tab;
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.querySelectorAll(".bnav,.bnav-ctr").forEach(b=>b.classList.remove("active"));
  const map={home:"homeScreen",markets:"marketsScreen",trade:"tradeScreen",portfolio:"portfolioScreen",profile:"profileScreen"};
  const sc=document.getElementById(map[tab]);if(sc)sc.classList.add("active");
  const bn=document.getElementById("bnav-"+tab);if(bn)bn.classList.add("active");
  if(tab==="home")updateHomeData();
  else if(tab==="markets")renderStocksList();
  else if(tab==="portfolio"){updatePortfolioData();updateQTDisplay();setTimeout(buildPfChart,50);}
  else if(tab==="trade"&&currentTradeTab==="live"){updateLTDisplay();updateOpenOrders();updateLTHoldings();}
  else if(tab==="profile")updateProfileData();
}
function showPfTab(tab,btn){document.querySelectorAll(".pf-panel").forEach(p=>p.classList.add("hidden"));document.querySelectorAll(".pft").forEach(b=>b.classList.remove("active"));const id="pf"+tab.charAt(0).toUpperCase()+tab.slice(1);const el=document.getElementById(id);if(el)el.classList.remove("hidden");if(btn)btn.classList.add("active");if(tab==="history")renderFullHistory();if(tab==="leaderboard")renderLeaderboardList();}

function updateHomeData(){
  const base=2387.45,chg=((nepseVal-base)/base*100).toFixed(2);
  document.getElementById("ncVal").textContent=nepseVal.toFixed(2);
  const cc=document.getElementById("ncChg");cc.textContent=(chg>=0?"+":"")+chg+"% ("+Math.abs(nepseVal-base).toFixed(2)+")";cc.className="nc-chg "+(chg>=0?"up":"down");
  document.getElementById("miniLT").textContent="NPR "+fmtNPR(getLTTotal());
  document.getElementById("miniQT").textContent="NPR "+fmtNPR(getQTTotal());
  const sorted=Object.keys(STOCKS).map(t=>({t,chg:(prices[t]-prevPrices[t])/prevPrices[t]*100})).sort((a,b)=>Math.abs(b.chg)-Math.abs(a.chg)).slice(0,5);
  document.getElementById("topMovers").innerHTML=sorted.map(({t,chg})=>{const s=STOCKS[t];return `<div class="mover-row"><div class="mr-l"><div class="mr-ico" style="color:${s.color};border-color:${s.color}">${t[0]}</div><div><div class="mr-sym">${t}</div><div class="mr-name">${s.name}</div></div></div><div class="mr-r"><div class="mr-pr">NPR ${fmtNPR(prices[t])}</div><div class="mr-chg ${chg>=0?"up":"down"}">${chg>=0?"+":""}${chg.toFixed(2)}%</div></div></div>`;}).join("");
  document.getElementById("newsList").innerHTML=NEWS.slice(0,4).map(n=>`<div class="news-card"><div class="ni-text"><span class="ni-dot"></span>${n}</div></div>`).join("");
  updateNepseChart();updateMiniPfChart();
}

function renderStocksList(){
  const q=(document.getElementById("mktSearch")?.value||"").toLowerCase();
  const list=Object.keys(STOCKS).filter(t=>(!q||t.toLowerCase().includes(q)||STOCKS[t].name.toLowerCase().includes(q))&&(activeSector==="all"||STOCKS[t].sector===activeSector));
  document.getElementById("stocksList").innerHTML=list.map(t=>{const s=STOCKS[t],p=prices[t],chg=((p-prevPrices[t])/prevPrices[t]*100).toFixed(2);return `<div class="stock-row" onclick="openStockModal('${t}')"><div class="sr-l"><div class="sr-ico" style="color:${s.color};border-color:${s.color}">${t[0]}</div><div><div class="sr-sym">${t}</div><div class="sr-name">${s.name}</div></div></div><span class="sr-pr">NPR ${fmtNPR(p)}</span><span class="sr-chg ${chg>=0?"up":"down"}">${chg>=0?"+":""}${chg}%</span></div>`;}).join("")||"<div class='empty-s'>No stocks found</div>";}
function filterStocks(){renderStocksList();}
function filterBySector(sec,btn){activeSector=sec;document.querySelectorAll(".stab").forEach(b=>b.classList.remove("active"));if(btn)btn.classList.add("active");renderStocksList();}

function openStockModal(t){modalTicker=t;const s=STOCKS[t],p=prices[t],chg=((p-prevPrices[t])/prevPrices[t]*100).toFixed(2);document.getElementById("smodContent").innerHTML=`<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px"><div><div style="font-size:18px;font-weight:800;color:${s.color}">${t}</div><div style="font-size:12px;color:var(--text2)">${s.name} - ${s.sector}</div></div><div style="text-align:right"><div style="font-family:var(--fm);font-size:22px;font-weight:800">NPR ${fmtNPR(p)}</div><div class="${chg>=0?"up":"down"}" style="font-family:var(--fm);font-size:12px">${chg>=0?"+":""}${chg}%</div></div></div>`;document.getElementById("stockModal").classList.remove("hidden");}
function closeStockModal(){document.getElementById("stockModal").classList.add("hidden");}
function openQTFromModal(side){closeStockModal();switchTab("portfolio");if(modalTicker){document.getElementById("qtSelect").value=modalTicker;updateQTDisplay();}if(side==="BUY")doQuickTrade("BUY");else doQuickTrade("SELL");}

function buildQTSelect(){document.getElementById("qtSelect").innerHTML=Object.keys(STOCKS).map(t=>`<option value="${t}">${t} - ${STOCKS[t].name}</option>`).join("");}
function updateQTDisplay(){const t=document.getElementById("qtSelect")?.value||Object.keys(STOCKS)[0];const s=STOCKS[t],p=prices[t],chg=((p-prevPrices[t])/prevPrices[t]*100).toFixed(2),held=QT_HOLDINGS[t]||0,avg=QT_AVG[t]||0,pnl=held>0&&avg>0?(p-avg)*held:0,pct=held>0&&avg>0?((p-avg)/avg*100).toFixed(2):0;document.getElementById("qtCard").innerHTML=`<div class="qpc-top"><div><span class="qpc-sym" style="color:${s.color}">${t}</span><span class="qpc-sec">${s.name}</span></div><div><span class="qpc-pr">NPR ${fmtNPR(p)}</span><span class="qpc-chg ${chg>=0?"up":"down"}">${chg>=0?"+":""}${chg}%</span></div></div>${held>0?`<div class="qpc-hold"><span>${held} sh Avg NPR ${fmtNPR(avg)}</span><span class="${pnl>=0?"up":"down"}">${pnl>=0?"+":"-"}NPR ${fmtNPR(Math.abs(pnl))}</span></div>`:""}`;document.getElementById("qtCashShow").textContent="NPR "+fmtNPR(QT_CASH);}
function adjQTQty(d){const i=document.getElementById("qtQtyInput");i.value=Math.max(1,parseInt(i.value||1)+d);}
function doQuickTrade(side){
  if(!isMarketOpen()){playSound('error');toast("Market closed! Quick Trade: Sun\u2013Thu 11AM\u20133PM NPT","red");return;}
  const t=document.getElementById("qtSelect").value,qty=parseInt(document.getElementById("qtQtyInput").value)||1,p=prices[t];
  if(side==="BUY"){const cost=p*qty;if(QT_CASH<cost){toast("Insufficient cash!","red");return;}const prev=(QT_AVG[t]||0)*(QT_HOLDINGS[t]||0);QT_CASH-=cost;QT_HOLDINGS[t]=(QT_HOLDINGS[t]||0)+qty;QT_AVG[t]=QT_HOLDINGS[t]>0?(prev+cost)/QT_HOLDINGS[t]:0;QT_HISTORY.unshift({t,side,qty,p,time:new Date().toLocaleTimeString()});playSound('buy');toast("Bought "+qty+"x "+t+" @ NPR "+fmtNPR(p),"green");}
  else{const held=QT_HOLDINGS[t]||0,aq=Math.min(qty,held);if(aq<1){toast("No shares to sell!","red");return;}QT_CASH+=p*aq;QT_HOLDINGS[t]-=aq;if(QT_HOLDINGS[t]===0){delete QT_HOLDINGS[t];delete QT_AVG[t];}QT_HISTORY.unshift({t,side,qty:aq,p,time:new Date().toLocaleTimeString()});playSound('sell');toast("Sold "+aq+"x "+t+" @ NPR "+fmtNPR(p),"green");}
  totalTrades++;appXP+=5;checkAppLevelUp();updateQTDisplay();updatePortfolioData();saveState();
}
function quickSell(t){document.getElementById("qtSelect").value=t;updateQTDisplay();doQuickTrade("SELL");}

function updatePortfolioData(){
  const qtT=getQTTotal(),qtD=qtT-100000,qtP=(qtD/100000*100).toFixed(2);
  const ltT=getLTTotal(),ltD=ltT-500000,ltP=(ltD/500000*100).toFixed(2);
  const comb=qtT+ltT,combD=comb-600000,combP=(combD/600000*100).toFixed(2);
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  set("qtAccVal","NPR "+fmtNPR(qtT));set("qtAccCash","NPR "+fmtNPR(QT_CASH));
  set("ltAccVal","NPR "+fmtNPR(ltT));set("ltAccCash","NPR "+fmtNPR(LT_CASH));
  set("pfTotalVal","NPR "+fmtNPR(comb));set("qtCashShow","NPR "+fmtNPR(QT_CASH));
  const setpnl=(id,d,base)=>{const e=document.getElementById(id);if(!e)return;const p=(d/base*100).toFixed(2);e.textContent=(d>=0?"+":"-")+"NPR "+fmtNPR(Math.abs(d))+" ("+p+"%)";e.className="acc-pnl "+(d>0?"up":d<0?"down":"neutral");};
  setpnl("qtAccPnl",qtD,100000);setpnl("ltAccPnl",ltD,500000);
  const pp=document.getElementById("pfTotalPnl");if(pp){pp.textContent=(combD>=0?"+":"-")+"NPR "+fmtNPR(Math.abs(combD))+" ("+combP+"%)";pp.className="pfh-pnl "+(combD>0?"up":combD<0?"down":"neutral");}
  updateHoldingsList();
}
function updateHoldingsList(){const held=Object.keys(QT_HOLDINGS).filter(t=>QT_HOLDINGS[t]>0);const el=document.getElementById("holdingsList");if(!el)return;if(!held.length){el.innerHTML="<div class='empty-s'>No holdings. Start trading!</div>";return;}el.innerHTML=held.map(t=>{const s=STOCKS[t],p=prices[t],sh=QT_HOLDINGS[t],avg=QT_AVG[t]||p,val=sh*p,pnl=(p-avg)*sh,pc=((p-avg)/avg*100).toFixed(2);return `<div class="holding-item"><div class="hi-l"><div class="hi-ico" style="color:${s.color};border-color:${s.color}">${t[0]}</div><div><div class="hi-sym">${t}</div><div class="hi-sub">${sh} shares Avg NPR ${fmtNPR(avg)}</div><div class="hi-pnl ${pnl>=0?"up":"down"}">${pnl>=0?"+":"-"}NPR ${fmtNPR(Math.abs(pnl))} (${pnl>=0?"+":""}${pc}%)</div></div></div><div class="hi-r"><div class="hi-val">NPR ${fmtNPR(val)}</div><button class="sell-btn" onclick="quickSell('${t}')">SELL</button></div></div>`;}).join("");}
function renderFullHistory(){const el=document.getElementById("fullHistory");if(!el)return;const all=[...QT_HISTORY,...LT_HISTORY].slice(0,30);if(!all.length){el.innerHTML="<div class='empty-s'>No trade history yet</div>";return;}el.innerHTML=all.map(h=>`<div class="hist-row"><span class="${h.side==="BUY"?"ha-buy":"ha-sell"}">${h.side}</span><span style="font-weight:700">${h.t||h.ticker}</span><span>${h.qty}x</span><span>NPR ${fmtNPR(h.p||h.price)}</span><span style="font-size:10px;color:var(--muted)">${h.time}</span></div>`).join("");}
function renderLeaderboardList(){const el=document.getElementById("lbList");if(!el)return;if(!leaderboard.length){el.innerHTML="<div class='empty-s'>Play Paper Trade to appear here!</div>";return;}[...leaderboard].sort((a,b)=>b.worth-a.worth).slice(0,10).forEach((e,i)=>{el.innerHTML+= `<div class="lb-row"><span class="lb-rank">${i===0?"#1":i===1?"#2":i===2?"#3":"#"+(i+1)}</span><span class="lb-name">${e.name}</span><span class="lb-score">NPR ${fmtNPR(e.worth)}</span></div>`;});}

// LIVE TRADE
function setTradeTab(tab){
  currentTradeTab=tab;
  document.getElementById("paperMode").classList.toggle("hidden",tab!=="paper");
  document.getElementById("liveMode").classList.toggle("hidden",tab!=="live");
  document.getElementById("tab-paper").classList.toggle("active",tab==="paper");
  document.getElementById("tab-live").classList.toggle("active",tab==="live");
  if(tab==="live"){
    buildLTSelect();updateLTDisplay();updateOpenOrders();updateLTHoldings();
    // Show market closed banner inside live mode if market is closed
    const lm=document.getElementById("liveMode");
    const existing=document.getElementById("tradeClosedBanner");
    if(existing)existing.remove();
    if(!isMarketOpen()){
      const s=getMarketStatus();
      const banner=document.createElement("div");
      banner.id="tradeClosedBanner";
      banner.className="trade-closed-banner";
      banner.innerHTML=`<div class="tcb-ico">🔒</div><div class="tcb-title">Market is ${s.label}</div><div class="tcb-sub">${s.sub}<br>Live trading is only available during market hours.</div><div class="tcb-hours"><div class="tcb-hour"><strong>Sun–Thu</strong>Trading Days</div><div class="tcb-hour"><strong>11:00–15:00</strong>Market Hours NPT</div></div>`;
      lm.insertBefore(banner,lm.firstChild);
    }
  }
}
function setOrderType(type,btn){ltOrderType=type;document.querySelectorAll(".ot-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");document.getElementById("ltMarketForm").classList.toggle("hidden",type!=="market");document.getElementById("ltLimitForm").classList.toggle("hidden",type!=="limit");document.getElementById("ltStopForm").classList.toggle("hidden",type!=="stoploss");}
function buildLTSelect(){const s=document.getElementById("ltSelect");if(!s)return;s.innerHTML=Object.keys(STOCKS).map(t=>`<option value="${t}">${t} - ${STOCKS[t].name}</option>`).join("");}
function updateLTDisplay(){const sel=document.getElementById("ltSelect");if(!sel)return;const t=sel.value||Object.keys(STOCKS)[0];const s=STOCKS[t],p=prices[t],chg=((p-prevPrices[t])/prevPrices[t]*100).toFixed(2),held=LT_HOLDINGS[t]||0,avg=LT_AVG[t]||0,pnl=held>0&&avg>0?(p-avg)*held:0,pct=held>0&&avg>0?((p-avg)/avg*100).toFixed(2):0;const card=document.getElementById("ltPriceCard");if(card)card.innerHTML=`<div class="qpc-top"><div><span class="qpc-sym" style="color:${s.color}">${t}</span><span class="qpc-sec">${s.name}</span></div><div><span class="qpc-pr">NPR ${fmtNPR(p)}</span><span class="qpc-chg ${chg>=0?"up":"down"}">${chg>=0?"+":""}${chg}%</span></div></div>${held>0?`<div class="qpc-hold"><span>${held} sh Avg NPR ${fmtNPR(avg)}</span><span class="${pnl>=0?"up":"down"}">${pnl>=0?"+":"-"}NPR ${fmtNPR(Math.abs(pnl))}</span></div>`:""}`;const total=getLTTotal(),diff=total-500000,pct2=(diff/500000*100).toFixed(2);const tv=document.getElementById("ltTotalVal");if(tv)tv.textContent="NPR "+fmtNPR(total);const tp=document.getElementById("ltTotalPnl");if(tp){tp.textContent=(diff>=0?"+":"-")+"NPR "+fmtNPR(Math.abs(diff))+" ("+pct2+"%)";tp.className="lt-bal-pnl "+(diff>0?"up":diff<0?"down":"neutral");}const lc=document.getElementById("ltCash");if(lc)lc.textContent="NPR "+fmtNPR(LT_CASH);const li=document.getElementById("ltInvested");if(li)li.textContent="NPR "+fmtNPR(Math.max(0,total-LT_CASH));}
function adjLTQty(d,f){const id=f==="M"?"ltQtyM":f==="L"?"ltQtyL":"ltQtyS";const i=document.getElementById(id);if(i)i.value=Math.max(1,parseInt(i.value||1)+d);}
function placeLTOrder(side){const t=document.getElementById("ltSelect").value,p=prices[t];if(ltOrderType==="market"){executeLTTrade(t,side,parseInt(document.getElementById("ltQtyM").value)||1,p);}else if(ltOrderType==="limit"){const qty=parseInt(document.getElementById("ltQtyL").value)||1,tp=parseFloat(document.getElementById("ltLimitPrice").value);if(!tp||tp<=0){toast("Enter target price!","red");return;}LT_ORDERS.push({id:Date.now(),ticker:t,type:"LIMIT",side,qty,targetPrice:tp,status:"OPEN",createdAt:new Date().toLocaleTimeString()});updateOpenOrders();toast("Limit "+side+" queued: "+qty+"x "+t+" @ NPR "+fmtNPR(tp),"warning");}else{const qty=parseInt(document.getElementById("ltQtyS").value)||1,sp=parseFloat(document.getElementById("ltStopPrice").value);if(!sp||sp<=0){toast("Enter stop price!","red");return;}const held=LT_HOLDINGS[t]||0;if(held<1){toast("No shares to protect!","red");return;}LT_ORDERS.push({id:Date.now(),ticker:t,type:"STOP",side:"SELL",qty:Math.min(qty,held),targetPrice:sp,status:"OPEN",createdAt:new Date().toLocaleTimeString()});updateOpenOrders();toast("Stop Loss set: "+Math.min(qty,held)+"x "+t+" @ NPR "+fmtNPR(sp),"warning");}saveState();}
function executeLTTrade(ticker,side,qty,price){
  if(!isMarketOpen()){const s=getMarketStatus();playSound('error');toast("Market "+s.label+"! Live trading: Sun-Thu 11AM-3PM NPT","red");return;}
  if(side==="BUY"){const cost=price*qty;if(LT_CASH<cost){toast("Insufficient balance!","red");return;}const prev=(LT_AVG[ticker]||0)*(LT_HOLDINGS[ticker]||0);LT_CASH-=cost;LT_HOLDINGS[ticker]=(LT_HOLDINGS[ticker]||0)+qty;LT_AVG[ticker]=LT_HOLDINGS[ticker]>0?(prev+cost)/LT_HOLDINGS[ticker]:0;LT_HISTORY.unshift({ticker,side,qty,price,time:new Date().toLocaleTimeString()});if(LT_HISTORY.length>50)LT_HISTORY.pop();playSound('buy');toast("Bought "+qty+"x "+ticker+" @ NPR "+fmtNPR(price),"green");}else{const held=LT_HOLDINGS[ticker]||0,aq=Math.min(qty,held);if(aq<1){toast("No shares!","red");return;}LT_CASH+=price*aq;LT_HOLDINGS[ticker]-=aq;if(LT_HOLDINGS[ticker]===0){delete LT_HOLDINGS[ticker];delete LT_AVG[ticker];}LT_HISTORY.unshift({ticker,side,qty:aq,price,time:new Date().toLocaleTimeString()});if(LT_HISTORY.length>50)LT_HISTORY.pop();playSound('sell');toast("Sold "+aq+"x "+ticker+" @ NPR "+fmtNPR(price),"green");}
  totalTrades++;appXP+=5;checkAppLevelUp();updateLTDisplay();updateLTHoldings();updatePortfolioData();saveState();
}
function processLimitOrders(){let filled=false;LT_ORDERS.forEach(o=>{if(o.status!=="OPEN")return;const cp=prices[o.ticker];let hit=false;if(o.type==="LIMIT"&&o.side==="BUY"&&cp<=o.targetPrice)hit=true;if(o.type==="LIMIT"&&o.side==="SELL"&&cp>=o.targetPrice)hit=true;if(o.type==="STOP"&&cp<=o.targetPrice)hit=true;if(hit){o.status="FILLED";executeLTTrade(o.ticker,o.side,o.qty,cp);filled=true;toast("Filled: "+o.side+" "+o.qty+"x "+o.ticker+" @ NPR "+fmtNPR(cp),"green");}});if(filled&&currentTab==="trade"&&currentTradeTab==="live")updateOpenOrders();}
function cancelLTOrder(id){const o=LT_ORDERS.find(x=>x.id===id);if(o)o.status="CANCELLED";updateOpenOrders();toast("Order cancelled","warning");saveState();}
function updateOpenOrders(){const open=LT_ORDERS.filter(o=>o.status==="OPEN");const el=document.getElementById("openOrdersList");if(!el)return;const cnt=document.getElementById("openOrderCount");if(cnt){cnt.textContent=open.length>0?open.length:"";cnt.style.display=open.length?"":"none";}if(!open.length){el.innerHTML="<div class='empty-s'>No pending orders</div>";return;}el.innerHTML=open.map(o=>{const bc=o.type==="STOP"?"oi-stop":o.side==="BUY"?"oi-buy":"oi-sell";const lbl=o.type==="STOP"?"STOP LOSS":o.side+(o.type==="LIMIT"?" LIMIT":"");return `<div class="order-item"><div class="oi-l"><span class="${bc}">${lbl}</span><span style="font-weight:700">${o.qty}x ${o.ticker}</span><span class="oi-target">@ NPR ${fmtNPR(o.targetPrice)}</span></div><div class="oi-r"><span class="oi-time">${o.createdAt}</span><button class="cancel-ord" onclick="cancelLTOrder(${o.id})">X</button></div></div>`;}).join("");}
function updateLTHoldings(){const held=Object.keys(LT_HOLDINGS).filter(t=>LT_HOLDINGS[t]>0);const el=document.getElementById("ltHoldings");if(!el)return;if(!held.length){el.innerHTML="<div class='empty-s'>No holdings yet</div>";return;}el.innerHTML=held.map(t=>{const s=STOCKS[t],p=prices[t],sh=LT_HOLDINGS[t],avg=LT_AVG[t]||p,val=sh*p,pnl=(p-avg)*sh,pc=((p-avg)/avg*100).toFixed(2);return `<div class="holding-item"><div class="hi-l"><div class="hi-ico" style="color:${s.color};border-color:${s.color}">${t[0]}</div><div><div class="hi-sym">${t}</div><div class="hi-sub">${sh} sh Avg NPR ${fmtNPR(avg)}</div><div class="hi-pnl ${pnl>=0?"up":"down"}">${pnl>=0?"+":"-"}NPR ${fmtNPR(Math.abs(pnl))} (${pnl>=0?"+":""}${pc}%)</div></div></div><div class="hi-r"><div class="hi-val">NPR ${fmtNPR(val)}</div><button class="sell-btn" onclick="executeLTTrade('${t}','SELL',1,prices['${t}'])">SELL</button></div></div>`;}).join("");}

// PAPER GAME
function resetPaperGame(){document.getElementById("paperGame").classList.add("hidden");document.getElementById("paperResult").classList.add("hidden");document.getElementById("paperStart").classList.remove("hidden");gameEnded=false;}
function startPaperGame(){
  if(gameTimer)clearInterval(gameTimer);
  pgChartActive="NABIL";
  document.getElementById("paperStart").classList.add("hidden");
  document.getElementById("paperResult").classList.add("hidden");
  document.getElementById("paperGame").classList.remove("hidden");
  gameEnded=false;
  // Seed priceHist for game tickers with at least 2 points so chart renders
  GAME_TICKERS.forEach(tk=>{ if(priceHist[tk].length<2) priceHist[tk].push(prices[tk]); });
  PG={cash:100000,holdings:{},avg:{},trades:0,xp:0,history:[],missions:[{id:"first",text:"First Trade",done:false,req:1,curr:0},{id:"five",text:"5 Trades",done:false,req:5,curr:0},{id:"profit",text:"Reach 1.1L",done:false,req:110000,curr:0}]};
  let t=90;
  buildGameCards();buildMissions();
  gameTimer=setInterval(()=>{
    t--;
    const m=Math.floor(t/60),s=t%60;
    document.getElementById("pgTimer").textContent=m+":"+(s<10?"0":"")+s;
    if(t<=10)document.getElementById("pgTimer").style.color="var(--red)";
    if(t<=0){clearInterval(gameTimer);endPaperGame();return;}
    GAME_TICKERS.forEach(tk=>{
      const d=(Math.random()-.48)*.04;
      prevPrices[tk]=prices[tk];
      prices[tk]=Math.max(1,Math.round(prices[tk]*(1+d)*100)/100);
      priceHist[tk].push(prices[tk]);
      if(priceHist[tk].length>60)priceHist[tk].shift();
    });
    updateGameCards();updateGameHUD();updateGameChart();
  },1000);
}
function pgNW(){let w=PG.cash;for(const k in PG.holdings)w+=(PG.holdings[k]||0)*(prices[k]||STOCKS[k].price);return w;}
function buildGameCards(){const ct=document.getElementById("pgChartTabs");if(ct)ct.innerHTML=GAME_TICKERS.map(t=>`<button class="ctab${t===pgChartActive?" active":""}" onclick="pgSetChart('${t}')">${t}</button>`).join("");document.getElementById("pgCards").innerHTML=GAME_TICKERS.map(t=>{const s=STOCKS[t],p=prices[t],chg=((p-prevPrices[t])/prevPrices[t]*100).toFixed(2),owned=PG.holdings[t]||0;return `<div class="game-card" id="gc-${t}"><div class="gc-head"><span class="gc-sym" style="color:${s.color}">${t}</span><span class="gc-chg ${chg>=0?"up":"down"}">${chg>=0?"+":""}${chg}%</span></div><div class="gc-pr">NPR ${fmtNPR(p)}</div><div class="gc-owned">${owned>0?"Owned: "+owned:"-"}</div><div class="gc-qty"><button class="gc-qty-btn" onclick="setPGQty('${t}',-1)">-</button><input id="gq-${t}" type="number" value="1" min="1" class="gc-qty-inp"><button class="gc-qty-btn" onclick="setPGQty('${t}',1)">+</button></div><div class="gc-btns"><button class="tbuy" style="flex:1;padding:7px;font-size:12px" onclick="pgTrade('${t}','BUY')">BUY</button><button class="tsell" style="flex:1;padding:7px;font-size:12px" onclick="pgTrade('${t}','SELL')">SELL</button></div></div>`;}).join("");buildGameChart();}
function pgSetChart(t){
  pgChartActive=t;
  document.querySelectorAll(".ctab").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll(".ctab").forEach(b=>{ if(b.getAttribute("onclick")?.includes("'"+t+"'")) b.classList.add("active"); });
  buildGameChart();
}
function setPGQty(t,d){const i=document.getElementById("gq-"+t);if(i)i.value=Math.max(1,parseInt(i.value||1)+d);}
function updateGameCards(){GAME_TICKERS.forEach(t=>{const card=document.getElementById("gc-"+t);if(!card)return;const p=prices[t],chg=((p-prevPrices[t])/prevPrices[t]*100).toFixed(2);const pr=card.querySelector(".gc-pr");if(pr)pr.textContent="NPR "+fmtNPR(p);const ch=card.querySelector(".gc-chg");if(ch){ch.textContent=(chg>=0?"+":"")+chg+"%";ch.className="gc-chg "+(chg>=0?"up":"down");}const ow=card.querySelector(".gc-owned");if(ow)ow.textContent=(PG.holdings[t]||0)>0?"Owned: "+(PG.holdings[t]):"-";});}
function pgTrade(t,side){if(gameEnded)return;const qty=parseInt(document.getElementById("gq-"+t)?.value||1)||1,p=prices[t];if(side==="BUY"){const cost=p*qty;if(PG.cash<cost){toast("Not enough cash!","red");return;}const prev=(PG.avg[t]||0)*(PG.holdings[t]||0);PG.cash-=cost;PG.holdings[t]=(PG.holdings[t]||0)+qty;PG.avg[t]=PG.holdings[t]>0?(prev+cost)/PG.holdings[t]:0;}else{const held=PG.holdings[t]||0,aq=Math.min(qty,held);if(aq<1){toast("No shares!","red");return;}PG.cash+=p*aq;PG.holdings[t]-=aq;if(PG.holdings[t]===0){delete PG.holdings[t];delete PG.avg[t];}}PG.trades++;PG.xp+=3;appXP+=3;checkAppLevelUp();PG.history.unshift({t,side,qty,p});playSound(side==="BUY"?'buy':'sell');const tl=document.getElementById("pgTradeLog");if(tl)tl.innerHTML=PG.history.slice(0,8).map(h=>`<div class="tli ${h.side.toLowerCase()}">${h.side} ${h.t} ${h.qty}x @ ${fmtNPR(h.p)}</div>`).join("");updateGameHUD();updateMissionProgress();toast((side==="BUY"?"Bought ":"Sold ")+qty+"x "+t,(side==="BUY"?"green":"warning"));}
function updateGameHUD(){const nw=pgNW(),pct=((nw-100000)/100000*100).toFixed(1);document.getElementById("pgNW").textContent="NPR "+fmtNPR(nw);const pp=document.getElementById("pgPnl");pp.textContent=(pct>=0?"+":"")+pct+"%";pp.className="hud-val "+(pct>=0?"up":"down");const lvl=appLevel-1,xpMin=XP_THRESH[lvl]||0,xpMax=XP_THRESH[lvl+1]||xpMin+100,xpPct=Math.min(100,((appXP-xpMin)/(xpMax-xpMin))*100);document.getElementById("pgXpFill").style.width=xpPct+"%";document.getElementById("pgXpText").textContent=appXP+" XP";document.getElementById("pgSentBadge").textContent=pct>3?"BULL":pct<-3?"BEAR":"NEUTRAL";}
function buildMissions(){const el=document.getElementById("pgMissions");if(el)el.innerHTML=PG.missions.map(m=>`<div class="mi-item">${m.done?"[x]":"[ ]"} ${m.text}</div>`).join("");}
function updateMissionProgress(){PG.missions.forEach(m=>{if(m.done)return;if(m.id==="first"||m.id==="five")m.curr=PG.trades;if(m.id==="profit")m.curr=pgNW();if(m.curr>=m.req){m.done=true;PG.xp+=20;appXP+=20;playSound('mission');toast("Mission done: "+m.text,"warning");}});buildMissions();}
function endPaperGame(){gameEnded=true;const nw=pgNW(),pnl=nw-100000,pct=((pnl/100000)*100).toFixed(1);
  document.getElementById("paperGame").classList.add("hidden");
  document.getElementById("paperResult").classList.remove("hidden");
  const tiers=[{min:200000,ico:"Trophy",title:"LEGEND"},{min:150000,ico:"Diamond",title:"INVESTOR"},{min:120000,ico:"Chart",title:"TRADER"},{min:100000,ico:"Ok",title:"BREAK EVEN"},{min:0,ico:"Cash",title:"WIPED OUT"}];
  const tier=tiers.find(t=>nw>=t.min)||tiers[4];
  const profitable=nw>=100000;
  playSound(nw>=120000?'win':'lose');
  document.getElementById("prIco").textContent=nw>=200000?"🏆":nw>=150000?"💎":nw>=120000?"📈":nw>=100000?"🤝":"💸";
  document.getElementById("prTitle").textContent=tier.title;
  document.getElementById("prMsg").textContent=pct>0?"You made NPR "+fmtNPR(pnl)+" profit!":"Better luck next time!";
  document.getElementById("prFinal").textContent="NPR "+fmtNPR(nw);
  const pp=document.getElementById("prPnl");pp.textContent=(pct>=0?"+":"")+pct+"%";pp.className=pct>=0?"up":"down";
  document.getElementById("prTrades").textContent=PG.trades;
  document.getElementById("prXp").textContent=PG.xp+" XP";
  if(nw>bestSession){bestSession=nw;leaderboard.push({name:playerName,worth:nw,date:new Date().toLocaleDateString()});if(leaderboard.length>20)leaderboard.sort((a,b)=>b.worth-a.worth).splice(20);}
  sessionHistory.unshift({worth:nw,pct:parseFloat(pct),trades:PG.trades,date:new Date().toLocaleDateString()});
  if(sessionHistory.length>20)sessionHistory.pop();
  saveState();
}

// PROFILE
function updateProfileData(){document.getElementById("profileAvatar").textContent=(playerName||"T")[0].toUpperCase();document.getElementById("profileName").textContent=playerName||"Trader";document.getElementById("profileBadge").textContent="Level "+appLevel+" - "+(LVL_TITLES[appLevel-1]||"Trader");const lvl=appLevel-1,xpMin=XP_THRESH[lvl]||0,xpMax=XP_THRESH[lvl+1]||xpMin+100,xpPct=Math.min(100,((appXP-xpMin)/(xpMax-xpMin))*100);document.getElementById("profileXpFill").style.width=xpPct+"%";document.getElementById("profileXpText").textContent=appXP+" / "+xpMax+" XP";document.getElementById("psTrades").textContent=totalTrades;document.getElementById("psBest").textContent=bestSession>0?"NPR "+fmtNPR(bestSession):"--";document.getElementById("psStreak").textContent=streak+" days";document.getElementById("psLevel").textContent=appLevel;renderAchievements();renderSessionHistory();}
const ACHIEVEMENTS=[{id:"first",ico:"Medal",name:"First Trade",desc:"Make your first trade",check:()=>totalTrades>=1},{id:"ten",ico:"10",name:"10 Trades",desc:"Complete 10 trades",check:()=>totalTrades>=10},{id:"lv2",ico:"Star",name:"Level Up",desc:"Reach Level 2",check:()=>appLevel>=2},{id:"profit",ico:"Money",name:"Profitable",desc:"End session in profit",check:()=>bestSession>100000},{id:"streak",ico:"Fire",name:"3-Day Streak",desc:"Login 3 days in a row",check:()=>streak>=3},{id:"lt5",ico:"Radar",name:"Live Trader",desc:"Make 5 live trades",check:()=>LT_HISTORY.length>=5}];
function renderAchievements(){document.getElementById("achieveGrid").innerHTML=ACHIEVEMENTS.map(a=>{const u=a.check();return `<div class="ach-card ${u?"unlocked":""}"><span class="ach-ico">${u?"✅":"🔒"}</span><div><div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div></div>`;}).join("");}
function renderSessionHistory(){const el=document.getElementById("sessionList");if(!el)return;if(!sessionHistory.length){el.innerHTML="<div class='empty-s'>No sessions yet</div>";return;}el.innerHTML=sessionHistory.slice(0,10).map(s=>`<div class="si"><div><div class="si-val ${s.pct>=0?"up":"down"}">${s.pct>=0?"+":""}${s.pct}%</div><div style="font-size:11px;color:var(--muted)">${s.trades} trades</div></div><div style="text-align:right"><div style="font-family:var(--fm);font-size:13px">NPR ${fmtNPR(s.worth)}</div><div class="si-date">${s.date}</div></div></div>`).join("");}
function checkAppLevelUp(){const next=XP_THRESH[appLevel];if(!next||appXP<next)return;appLevel++;playSound('levelup');const ol=document.getElementById("lvlOverlay");if(ol)ol.classList.remove("hidden");document.getElementById("lvlNum").textContent=appLevel;document.getElementById("lvlTitle").textContent=LVL_TITLES[appLevel-1]||"";toast("Level Up! Now Level "+appLevel,"warning");}

// CHARTS
function buildNepseChart(){const c=document.getElementById("nepseChart");if(!c)return;if(nepseChartInst)nepseChartInst.destroy();nepseChartInst=new Chart(c,{type:"line",data:{labels:nepseHist.map((_,i)=>i),datasets:[{data:nepseHist,borderColor:"#4AFFCE",borderWidth:2,fill:true,backgroundColor:"rgba(74,255,206,0.06)",tension:.4,pointRadius:0}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}},animation:{duration:0}}});}
function updateNepseChart(){if(nepseChartInst){nepseChartInst.data.labels=nepseHist.map((_,i)=>i);nepseChartInst.data.datasets[0].data=nepseHist;nepseChartInst.update("none");}}
function buildMiniPfChart(){const c=document.getElementById("miniPfChart");if(!c)return;if(miniPfChartInst)miniPfChartInst.destroy();miniPfChartInst=new Chart(c,{type:"line",data:{labels:QT_PF_HIST.map((_,i)=>i),datasets:[{data:QT_PF_HIST,borderColor:"#FFB547",borderWidth:2,fill:true,backgroundColor:"rgba(255,181,71,0.06)",tension:.4,pointRadius:0}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}},animation:{duration:0}}});}
function updateMiniPfChart(){if(miniPfChartInst){miniPfChartInst.data.labels=QT_PF_HIST.map((_,i)=>i);miniPfChartInst.data.datasets[0].data=QT_PF_HIST;miniPfChartInst.update("none");}}
function buildPfChart(){const c=document.getElementById("pfChart");if(!c)return;if(pfChartInst)pfChartInst.destroy();pfChartInst=new Chart(c,{type:"line",data:{labels:QT_PF_HIST.map((_,i)=>i),datasets:[{data:QT_PF_HIST,borderColor:"#4AFFCE",borderWidth:2,fill:true,backgroundColor:"rgba(74,255,206,0.06)",tension:.4,pointRadius:0}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}},animation:{duration:0}}});}
function updatePfChart(){if(pfChartInst){pfChartInst.data.labels=QT_PF_HIST.map((_,i)=>i);pfChartInst.data.datasets[0].data=QT_PF_HIST;pfChartInst.update("none");}}
function buildGameChart(){const c=document.getElementById("gameCanvas");if(!c)return;if(gameChart)gameChart.destroy();const h=priceHist[pgChartActive]||[];gameChart=new Chart(c,{type:"line",data:{labels:h.map((_,i)=>i),datasets:[{data:h,borderColor:STOCKS[pgChartActive]?.color||"#4AFFCE",borderWidth:2,fill:true,backgroundColor:"rgba(74,255,206,0.06)",tension:.4,pointRadius:0}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}},animation:{duration:0}}});}
function updateGameChart(){if(gameChart){const h=priceHist[pgChartActive]||[];gameChart.data.labels=h.map((_,i)=>i);gameChart.data.datasets[0].data=h;gameChart.update("none");}}

function toast(msg,cls="green"){const w=document.getElementById("toastWrap");if(!w)return;const el=document.createElement("div");el.className="toast "+cls;el.textContent=msg;w.appendChild(el);setTimeout(()=>el.remove(),2800);}

// ===== DELETE ACCOUNT =====
function deleteAccount(){
  const confirmed=confirm("Are you sure you want to delete your account?\nAll your data, balance, trades, and progress will be permanently erased.");
  if(!confirmed)return;
  const confirmed2=confirm("This cannot be undone. Delete account?");
  if(!confirmed2)return;
  localStorage.clear();
  toast("Account deleted. Restarting...","warning");
  setTimeout(()=>location.reload(),1200);
}

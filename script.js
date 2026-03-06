/**
 * ============================================================
 *  PIXEL ART BIRTHDAY WEBSITE — script.js
 *  Interactive story: 5 scenes
 *  Scene 1: Card  →  2: Café Arrive  →  3: Cake  →  4: Gift  →  5: Cheers
 * ============================================================
 */

// ── State ──────────────────────────────────────────────────
let currentScene = 1;
let cardOpened = false;
let candleLit  = true;
let giftOpened = false;
let cheersTriggered = false;

// ── DOM References ─────────────────────────────────────────
const sceneCard   = document.getElementById('scene-card');
const sceneCafe   = document.getElementById('scene-cafe');

const envelope      = document.getElementById('envelope');
const envelopeFlap  = document.getElementById('envelope-flap');
const envelopeLetter= document.getElementById('envelope-letter');
const letterContent = document.getElementById('letter-content');
const btnOpenCard   = document.getElementById('btn-open-card');
const confettiCont  = document.getElementById('confetti-container');

const bfChar    = document.getElementById('bf-char');
const girlChar  = document.getElementById('girl-char');
const bfImg     = document.getElementById('bf-img');
const girlImg   = document.getElementById('girl-img');

const cakeWrapper  = document.getElementById('cake-wrapper');
const candleWrapper= document.getElementById('candle-wrapper');
const candleFlame  = document.getElementById('candle-flame');
const smokePuff    = document.getElementById('smoke-puff');
const giftWrapper  = document.getElementById('gift-wrapper');
const giftImg      = document.getElementById('gift-img');
const giftChocolate= document.getElementById('gift-item-chocolate');
const giftMouse    = document.getElementById('gift-item-mouse');
const giftFlowers  = document.getElementById('gift-item-flowers');
const giftStand    = document.getElementById('gift-item-stand');
const coffeeCup    = document.getElementById('coffee-cup');
const chaiCup      = document.getElementById('chai-cup');
const coffeeSteam  = document.getElementById('coffee-steam');
const chaiSteam    = document.getElementById('chai-steam');
const effectsLayer = document.getElementById('effects-layer');

const scenHud    = document.getElementById('scene-hud');
const hudText    = document.getElementById('hud-text');
const btnContinue= document.getElementById('btn-continue');

// ============================================================
//  RESPONSIVE SCALING
//  Scales the 800×560 café scene to fit any screen size.
//  The CSS custom property --scene-scale drives
//  transform: scale(...) on .scene-container.
// ============================================================

function setSceneScale() {
  // 800 × 560 is the fixed design size of the café scene
  const DESIGN_W = 800;
  const DESIGN_H = 560;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Scale to fit both dimensions; never scale above 1 (no upscaling on large screens)
  const scale = Math.min(vw / DESIGN_W, vh / DESIGN_H, 1);

  document.documentElement.style.setProperty('--scene-scale', scale);
}

// Run on load and whenever the window is resized (handles orientation change too)
setSceneScale();
window.addEventListener('resize', setSceneScale);

// ============================================================
//  SCENE TRANSITIONS
// ============================================================

function showScene(el) {
  [sceneCard, sceneCafe].forEach(s => { s.classList.remove('active'); });
  el.classList.add('active');
}

// ============================================================
//  SCENE 1 — Open Card
// ============================================================

btnOpenCard.addEventListener('click', openCard);

function openCard() {
  if (cardOpened) return;
  cardOpened = true;

  btnOpenCard.style.display = 'none';

  envelopeFlap.classList.add('open');

  setTimeout(() => {
    envelopeLetter.classList.add('open');
  }, 300);

  setTimeout(() => {
    letterContent.classList.add('visible');
  }, 700);

  setTimeout(() => {
    launchConfetti();
  }, 400);

  setTimeout(() => {
    const goBtn = document.createElement('button');
    goBtn.textContent = 'Enter the Café for a Surprise';
    goBtn.className = 'pastel-btn';
    goBtn.style.cssText = 'margin-top:20px;';
    goBtn.addEventListener('click', goToCafeScene);
    document.querySelector('.card-instruction').appendChild(goBtn);
    document.querySelector('.card-instruction').style.display = 'flex';
  }, 2200);
}

// ============================================================
//  CONFETTI GENERATOR
// ============================================================

const CONFETTI_COLORS = ['#f5a623','#e74c3c','#f39c12','#2ecc71','#3498db','#9b59b6','#e91e63','#ff5722','#fff8e7'];

function launchConfetti(count = 60) {
  confettiCont.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left:    ${Math.random() * 100}vw;
      top:     -14px;
      width:   ${6 + Math.random() * 8}px;
      height:  ${6 + Math.random() * 8}px;
      background: ${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      animation-delay: ${Math.random() * 1.2}s;
      animation-duration: ${1.8 + Math.random() * 1.5}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    `;
    confettiCont.appendChild(piece);
  }
  setTimeout(() => { confettiCont.innerHTML = ''; }, 4000);
}

// ============================================================
//  SCENE 2 — Café Arrive
// ============================================================

function goToCafeScene() {
  currentScene = 2;
  showScene(sceneCafe);
  confettiCont.innerHTML = '';
  hudText.textContent = 'The café smells like warm coffee... ☕';
  setHudButton('cake', 'Click to bring out the cake!');
}

function setHudButton(nextAction, text) {
  hudText.textContent = text;
  const currentBtn = window._activeBtn || btnContinue;
  const newBtn = currentBtn.cloneNode(true);
  currentBtn.parentNode.replaceChild(newBtn, currentBtn);
  window._activeBtn = newBtn;
  newBtn.style.display = '';

  if (nextAction === 'cake') {
    newBtn.addEventListener('click', () => triggerCakeScene());
  } else if (nextAction === 'candle') {
    newBtn.style.display = 'none';
    hudText.textContent = '🕯️ Click the candle to blow it out!';
    candleWrapper.addEventListener('click', blowCandle, { once: true });
  } else if (nextAction === 'gift') {
    newBtn.addEventListener('click', () => triggerGiftScene());
  } else if (nextAction === 'cheers') {
    newBtn.style.display = 'none';
    hudText.textContent = '🎁 Click the gift to open it!';
    giftWrapper.addEventListener('click', openGift, { once: true });
  } else if (nextAction === 'final') {
    newBtn.addEventListener('click', () => triggerCheers());
    hudText.textContent = 'Time to celebrate together! 🥂';
  }
}

// ============================================================
//  SCENE 3 — Cake Surprise
// ============================================================

function triggerCakeScene() {
  currentScene = 3;
  cakeWrapper.classList.add('visible');
  spawnSparkles(400, 260, 4);
  setHudButton('candle', '🕯️ Click the candle to blow it out!');
}

function blowCandle() {
  if (!candleLit) return;
  candleLit = false;

  candleFlame.classList.add('out');

  smokePuff.classList.remove('hidden');
  setTimeout(() => { smokePuff.classList.add('hidden'); }, 1600);

  setTimeout(() => {
    setHudButton('gift', 'She has a surprise gift for you! 🎁');
    giftWrapper.classList.remove('hidden');
  }, 1800);
}

// ============================================================
//  SCENE 4 — Gift
// ============================================================

function triggerGiftScene() {
  currentScene = 4;
  hudText.textContent = '🎁 Click the gift to open it!';
  if (window._activeBtn) window._activeBtn.style.display = 'none';
  giftWrapper.addEventListener('click', openGift, { once: true });
}

function openGift() {
  if (giftOpened) return;
  giftOpened = true;

  giftWrapper.classList.add('center');

  setTimeout(() => {
    giftImg.src = 'assets/props/gift_open.png';

    giftChocolate.classList.add('pop-out-1');
    giftMouse.classList.add('pop-out-2');
    giftFlowers.classList.add('pop-out-3');
    giftStand.classList.add('pop-out-4');

    spawnSparkles(400, 260, 10);

    setTimeout(() => {
      bfChar.style.animation = 'char-bob 0.4s ease-in-out 3';
      setTimeout(() => { bfChar.style.animation = ''; }, 1200);
    }, 300);

    setTimeout(() => {
      setHudButton('final', 'Time to celebrate together! 🥂');
      if (window._activeBtn) window._activeBtn.style.display = 'block';
    }, 1500);
  }, 600);
}

// ============================================================
//  SCENE 5 — Cheers!
// ============================================================

function triggerCheers() {
  currentScene = 5;
  cheersTriggered = true;

  giftWrapper.classList.add('hidden');
  cakeWrapper.classList.add('hidden');

  bfChar.classList.add('cheering');
  girlChar.classList.add('cheering');

  coffeeCup.classList.add('clinking');
  chaiCup.classList.add('clinking');
  coffeeSteam.classList.add('clinking-steam');
  chaiSteam.classList.add('clinking-steam');

  launchConfetti(80);
  setTimeout(() => spawnHearts(), 400);
  setTimeout(() => spawnSparkles(400, 280, 14), 600);
  setTimeout(() => spawnHearts(), 1000);
  setTimeout(() => spawnSparkles(400, 280, 10), 1400);

  hudText.textContent = 'Cheers! 🥂❤️';
  if (window._activeBtn) window._activeBtn.style.display = 'none';

  setTimeout(() => showFinalMessage(), 2800);
}

// ============================================================
//  FINAL MESSAGE
// ============================================================

function showFinalMessage() {
  const overlay = document.createElement('div');
  overlay.className = 'final-message';
  overlay.innerHTML = `
    <div class="final-banner-wrapper">
      <img src="assets/ui/banner_empty.png" class="pixel final-banner-img" />
      <div class="final-banner-text">Happy Birthday Dhrisit(Kuku) <span class="heart">❤️</span></div>
    </div>
    <p class="final-sub">
      Happy Birthday, my love 🎂<br>
      May every day feel as warm<br>
      as this little café corner.<br>
      <small style="opacity: 0.8; font-size: 0.8em; margin-top: 10px; display: block;">by Ashlesha (Kuki)</small>
    </p>
    <div class="final-restart" id="btn-restart">↺  Play Again</div>
  `;
  sceneCafe.querySelector('.scene-container').appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visible'));
  document.getElementById('btn-restart').addEventListener('click', restartAll);
}

// ============================================================
//  RESTART
// ============================================================

function restartAll() {
  location.reload();
}

// ============================================================
//  EFFECT HELPERS
//  Note: coordinates are in the scene-container's 800×560 space.
//  JS transform scale handles visual sizing — no adjustments needed here.
// ============================================================

function spawnSparkles(cx, cy, count) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'float-sparkle';
    el.textContent = ['✦','✧','⭐','✨'][Math.floor(Math.random()*4)];
    el.style.cssText = `
      left: ${cx + (Math.random()-0.5)*140}px;
      top:  ${cy + (Math.random()-0.5)*100}px;
      animation-delay: ${Math.random()*0.6}s;
    `;
    effectsLayer.appendChild(el);
    setTimeout(() => el.remove(), 2200);
  }
}

function spawnHearts() {
  // Spread hearts across the 800px wide scene
  const positions = [120, 260, 400, 540, 680];
  positions.forEach((x, i) => {
    const el = document.createElement('div');
    el.className = 'big-heart';
    el.textContent = ['❤️','💕','💖','💗'][i % 4];
    el.style.cssText = `
      left: ${x}px;
      top:  ${300 + Math.random()*80}px;
      animation-delay: ${i*0.15}s;
      font-size: ${20 + Math.random()*16}px;
    `;
    effectsLayer.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  });
}

// ============================================================
//  KEYBOARD SHORTCUT (Enter/Space advances scene)
// ============================================================
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (currentScene === 1 && !cardOpened) { openCard(); return; }
    if (window._activeBtn) window._activeBtn.click();
  }
});
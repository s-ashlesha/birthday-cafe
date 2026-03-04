/**
 * ============================================================
 *  PIXEL ART BIRTHDAY WEBSITE — script.js
 *  Interactive story: 5 scenes
 *  Scene 1: Card  →  2: Café Arrive  →  3: Cake  →  4: Gift  →  5: Cheers
 * ============================================================
 */

// ── State ──────────────────────────────────────────────────
let currentScene = 1;   // 1=card  2=café  3=cake  4=gift  5=cheers
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
//  SCENE TRANSITIONS
// ============================================================

/** Fade scene in/out */
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

  // Open flap
  envelopeFlap.classList.add('open');

  // Slide letter out
  setTimeout(() => {
    envelopeLetter.classList.add('open');
  }, 300);

  // Show letter text
  setTimeout(() => {
    letterContent.classList.add('visible');
  }, 700);

  // Confetti burst
  setTimeout(() => {
    launchConfetti();
  }, 400);

  // After reading, show "transition to cafe" button
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
  // Clear after animation
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

// ── HUD helper ──
function setHudButton(nextAction, text) {
  hudText.textContent = text;
  // Remove old click listener by replacing node
  const currentBtn = window._activeBtn || btnContinue;
  const newBtn = currentBtn.cloneNode(true);
  currentBtn.parentNode.replaceChild(newBtn, currentBtn);
  // Re-assign reference (important!)
  window._activeBtn = newBtn;
  // Reset display in case it was hidden
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
  // Girl presents cake — swap sprite (use same img with scale trick)
  // removed glow

  // Cake pops up
  cakeWrapper.classList.add('visible');

  // Small pop effect
  spawnSparkles(400, 260, 4);

  // Update HUD
  setHudButton('candle', '🕯️ Click the candle to blow it out!');
}

function blowCandle() {
  if (!candleLit) return;
  candleLit = false;

  // Hide flame
  candleFlame.classList.add('out');

  // Show smoke
  smokePuff.classList.remove('hidden');
  setTimeout(() => { smokePuff.classList.add('hidden'); }, 1600);

  // Proceed after short delay
  setTimeout(() => {
    setHudButton('gift', 'She has a surprise gift for you! 🎁');
    // Make gift appear
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

  // Move gift to center first
  giftWrapper.classList.add('center');

  // Wait for move to finish before opening
  setTimeout(() => {
    // Swap gift image
    giftImg.src = 'assets/props/gift_open.png';
    // removed glow

    // Pop out items
    giftChocolate.classList.add('pop-out-1');
    giftMouse.classList.add('pop-out-2');
    giftFlowers.classList.add('pop-out-3');
    giftStand.classList.add('pop-out-4');

    // Sparkle burst
    spawnSparkles(400, 260, 10);

    // BF happy reaction
    setTimeout(() => {
      // removed glow
      // Bounce BF character
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

  // Hide the gift and its contents
  giftWrapper.classList.add('hidden');
  
  // Hide the cake
  cakeWrapper.classList.add('hidden');

  // Characters cheer
  bfChar.classList.add('cheering');
  girlChar.classList.add('cheering');

  // Move cups together
  coffeeCup.classList.add('clinking');
  chaiCup.classList.add('clinking');
  coffeeSteam.classList.add('clinking-steam');
  chaiSteam.classList.add('clinking-steam');

  // Launch celebration effects
  launchConfetti(80);
  setTimeout(() => spawnHearts(), 400);
  setTimeout(() => spawnSparkles(400, 280, 14), 600);
  setTimeout(() => spawnHearts(), 1000);
  setTimeout(() => spawnSparkles(400, 280, 10), 1400);

  hudText.textContent = 'Cheers! 🥂❤️';
  if (window._activeBtn) window._activeBtn.style.display = 'none';

  // Show final message banner after celebration
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
// ============================================================

/** Spawn floating sparkle emojis */
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

/** Spawn floating hearts */
function spawnHearts() {
  const positions = [200, 320, 400, 480, 580];
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
//  KEYBOARD SHORTCUT (Enter advances scene)
// ============================================================
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (currentScene === 1 && !cardOpened) { openCard(); return; }
    if (window._activeBtn) window._activeBtn.click();
  }
});

/* =============================================
   SURPRISE WEBSITE — script.js
   =============================================
   ✏️  CUSTOMIZE: Change the values below!
   ============================================= */

const HER_NAME   = "Sandhiya";          // ← Her name
const YOUR_NAME  = "Your Person";        // ← Your name / nickname
const LOVE_LETTER = `Sandhiya, there are some things I never say enough — so I made this just for you.

Every day with you feels like a quiet kind of magic. The way you smile, the way you laugh at the smallest things, the way you make even ordinary moments feel like they matter — that's all you.

I don't need a special occasion to tell you this. I just want you to know, right now, on a perfectly normal day — that you are one of the most beautiful things that has ever happened to me.

You deserve every kind word, every gentle moment, every little surprise. You deserve to be loved loudly and softly all at once.

So here it is, Sandhiya — this whole page, just for you. Because you are worth every effort, every word, and so much more.`;

const REASONS = [
  { icon: "😄", text: "Your laugh that makes everything better" },
  { icon: "💪", text: "How strong and resilient you are" },
  { icon: "🌙", text: "The way you make even quiet nights magical" },
  { icon: "🤗", text: "Your warm hugs that feel like home" },
  { icon: "✨", text: "The way you see beauty in little things" },
  { icon: "🎵", text: "Your taste in music and how you share it" },
  { icon: "🍕", text: "Food adventures we go on together" },
  { icon: "💡", text: "How clever and curious your mind is" },
  { icon: "🌸", text: "The kindness you show to everyone" },
  { icon: "🔥", text: "The passion you put into everything" },
  { icon: "🌈", text: "You make my world so much more colourful" },
  { icon: "💕", text: "Simply being you — perfectly, wonderfully you" },
];


/* =============================================
   SCREEN NAVIGATION
   ============================================= */
function goToPage(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  target.classList.add('active');

  if (id === 'letter-screen')  initLetterScreen();
  if (id === 'gallery-screen') initGalleryScreen();
  if (id === 'final-screen')   initFinalScreen();
}

function replay() {
  goToPage('intro-screen');
}


/* =============================================
   INTRO SCREEN — stars & floating hearts
   ============================================= */
function initIntroScreen() {
  // Stars
  const starsEl = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${(Math.random()*3+2).toFixed(1)}s;
      --delay:${(Math.random()*4).toFixed(1)}s;
    `;
    starsEl.appendChild(s);
  }

  // Update name
  document.querySelector('.name-highlight').textContent = "Sandhiya";

  // Floating hearts
  const fh = document.getElementById('floatingHearts');
  const emojis = ['💕','💗','💖','💝','🌸','✨','💫','🌹'];
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('div');
    h.className = 'fheart';
    h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    h.style.cssText = `
      left:${Math.random()*100}%;
      --fs:${(Math.random()*1.2+0.8).toFixed(1)}rem;
      --dur:${(Math.random()*5+5).toFixed(1)}s;
      --delay:${(Math.random()*6).toFixed(1)}s;
    `;
    fh.appendChild(h);
  }
}


/* =============================================
   ENVELOPE SCREEN
   ============================================= */
function openEnvelope() {
  const env = document.getElementById('envelope');
  if (env.classList.contains('opened')) return;
  env.classList.add('opened');
  document.getElementById('envHint').textContent = "Opening with love... 💌";
  setTimeout(() => goToPage('letter-screen'), 1200);
}


/* =============================================
   LETTER SCREEN — typewriter
   ============================================= */
function initLetterScreen() {
  spawnPetals();
  const body = document.getElementById('letterBody');
  body.innerHTML = '';

  // Split letter into paragraphs
  const paragraphs = LOVE_LETTER.trim().split('\n\n');
  let paraIndex  = 0;
  let charIndex  = 0;
  let currentPEl = null;
  let cursor     = null;

  function type() {
    if (paraIndex >= paragraphs.length) {
      if (cursor) cursor.remove();
      return;
    }

    const para = paragraphs[paraIndex];

    if (charIndex === 0) {
      currentPEl = document.createElement('p');
      currentPEl.style.cssText = 'margin-bottom:1rem;';
      body.appendChild(currentPEl);
      if (cursor) currentPEl.appendChild(cursor);
    }

    if (!cursor) {
      cursor = document.createElement('span');
      cursor.className = 'cursor';
    }

    if (charIndex < para.length) {
      currentPEl.insertBefore(document.createTextNode(para[charIndex]), cursor);
      charIndex++;
      setTimeout(type, 22);
    } else {
      paraIndex++;
      charIndex = 0;
      setTimeout(type, 350);
    }
  }

  cursor = document.createElement('span');
  cursor.className = 'cursor';
  body.appendChild(cursor);
  setTimeout(type, 600);
}

function spawnPetals() {
  const container = document.getElementById('petals');
  container.innerHTML = '';
  const items = ['🌸','🌹','🌷','💐','✿','❀'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = items[Math.floor(Math.random()*items.length)];
    p.style.cssText = `
      left:${Math.random()*100}%;
      --fs:${(Math.random()*0.8+0.7).toFixed(1)}rem;
      --dur:${(Math.random()*4+4).toFixed(1)}s;
      --delay:${(Math.random()*6).toFixed(1)}s;
      --drift:${(Math.random()*80-40).toFixed(0)}px;
    `;
    container.appendChild(p);
  }
}


/* =============================================
   GALLERY SCREEN — reason cards
   ============================================= */
function initGalleryScreen() {
  const grid = document.getElementById('reasonsGrid');
  grid.innerHTML = '';
  REASONS.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="reason-icon">${r.icon}</div>
      <p class="reason-text">${r.text}</p>
    `;
    grid.appendChild(card);
  });
}


/* =============================================
   FINAL SCREEN — fireworks
   ============================================= */
function initFinalScreen() {
  launchFireworks();
  setInterval(launchFireworks, 2200);
}

function launchFireworks() {
  const fw = document.getElementById('fireworks');
  const colors = ['#e8607a','#f9a8b8','#d4a847','#f5e4a8','#fff0f5','#ff9eb5'];
  const bursts = 3;

  for (let b = 0; b < bursts; b++) {
    const cx = 15 + Math.random() * 70; // % from left
    const cy = 10 + Math.random() * 60; // % from top

    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        const angle  = (i / 20) * Math.PI * 2;
        const dist   = 40 + Math.random() * 80;
        const tx     = Math.cos(angle) * dist;
        const ty     = Math.sin(angle) * dist - 30;
        spark.style.cssText = `
          left:calc(${cx}% - 3px);
          top:calc(${cy}% - 3px);
          background:${colors[Math.floor(Math.random()*colors.length)]};
          --tx:${tx.toFixed(0)}px;
          --ty:${ty.toFixed(0)}px;
          --dur:${(0.8+Math.random()*0.7).toFixed(2)}s;
          --delay:${(Math.random()*0.2).toFixed(2)}s;
        `;
        fw.appendChild(spark);
        setTimeout(() => spark.remove(), 1800);
      }
    }, b * 300);
  }
}


/* =============================================
   BOOT
   ============================================= */
window.addEventListener('DOMContentLoaded', () => {
  initIntroScreen();
});

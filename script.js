const arena = document.getElementById("arena");
const xButton = document.getElementById("xButton");
const taunt = document.getElementById("taunt");
const missCounter = document.getElementById("missCounter");
const flash = document.getElementById("flash");
const boingSound = document.getElementById("boingSound");
const laughSound = document.getElementById("laughSound");

const standardTaunts = [
  "Too slow!",
  "Nice try 😏",
  "You'll never catch me!",
  "This is getting embarrassing…",
  "Not even close!",
  "Keep dreaming!",
];

const dramaticTaunts = [
  "The X grows unstoppable!",
  "You thought it would slow down?",
  "Chaos level: MAXIMUM!",
  "Still chasing? Adorable.",
  "The legend cannot be caught!",
];

let misses = 0;
let baseSize = 96;
let speed = 320;
let victoryMode = false;
let moveLock = false;

const updateStats = () => {
  missCounter.textContent = `Misses: ${misses}`;
};

const pickTaunt = () => {
  const pool = misses >= 5 ? dramaticTaunts : standardTaunts;
  taunt.textContent = pool[Math.floor(Math.random() * pool.length)];
};

const playSound = (audio, volume = 1) => {
  audio.pause();
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play().catch(() => null);
};

const triggerGlitch = () => {
  flash.classList.add("active");
  arena.classList.add("glitch");
  setTimeout(() => {
    flash.classList.remove("active");
    arena.classList.remove("glitch");
  }, 320);
};

const updateDifficulty = () => {
  if (misses === 0) {
    baseSize = 96;
    speed = 320;
  }

  if (misses > 0 && misses % 5 === 0) {
    baseSize = Math.max(60, baseSize - 6);
    speed = Math.max(140, speed - 30);
  }

  xButton.style.width = `${baseSize}px`;
  xButton.style.height = `${baseSize}px`;
};

const randomPosition = () => {
  const arenaRect = arena.getBoundingClientRect();
  const buttonRect = xButton.getBoundingClientRect();
  const padding = 12;
  const maxX = arenaRect.width - buttonRect.width - padding * 2;
  const maxY = arenaRect.height - buttonRect.height - padding * 2;
  const x = Math.random() * Math.max(0, maxX) + padding;
  const y = Math.random() * Math.max(0, maxY) + padding;

  return {
    left: arenaRect.left + x,
    top: arenaRect.top + y,
  };
};

const moveButton = () => {
  if (victoryMode || moveLock) {
    return;
  }

  moveLock = true;
  misses += 1;
  updateStats();
  updateDifficulty();
  pickTaunt();

  playSound(boingSound, 0.8);
  if (misses >= 10 && Math.random() < 0.25) {
    playSound(laughSound, 0.6);
  }

  const { left, top } = randomPosition();
  const arenaRect = arena.getBoundingClientRect();
  const localLeft = left - arenaRect.left;
  const localTop = top - arenaRect.top;

  xButton.style.transition = `left ${speed}ms ease, top ${speed}ms ease, transform 0.3s ease, background 0.3s ease`;
  xButton.classList.add("escape");
  xButton.style.left = `${localLeft}px`;
  xButton.style.top = `${localTop}px`;

  if (misses >= 15) {
    activateVictoryMode();
  }

  setTimeout(() => {
    xButton.classList.remove("escape");
    moveLock = false;
  }, Math.max(speed, 260));
};

const activateVictoryMode = () => {
  victoryMode = true;
  xButton.classList.add("victory");
  xButton.textContent = "✔";
  taunt.textContent = "Wait… you actually did it?!";
  triggerGlitch();
};

const exitVictoryMode = () => {
  victoryMode = false;
  misses = 0;
  updateStats();
  updateDifficulty();
  taunt.textContent = "HAHA! GOTCHA 😈";
  xButton.classList.remove("victory");
  xButton.textContent = "X";

  playSound(laughSound, 0.9);
  triggerGlitch();

  setTimeout(() => {
    pickTaunt();
  }, 800);

  setTimeout(() => {
    const { left, top } = randomPosition();
    const arenaRect = arena.getBoundingClientRect();
    xButton.style.left = `${left - arenaRect.left}px`;
    xButton.style.top = `${top - arenaRect.top}px`;
  }, 120);
};

xButton.addEventListener("mouseenter", moveButton);

xButton.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();
    moveButton();
  },
  { passive: false }
);

xButton.addEventListener("click", () => {
  if (victoryMode) {
    exitVictoryMode();
  }
});

window.addEventListener("resize", () => {
  const { left, top } = randomPosition();
  const arenaRect = arena.getBoundingClientRect();
  xButton.style.left = `${left - arenaRect.left}px`;
  xButton.style.top = `${top - arenaRect.top}px`;
});

updateStats();

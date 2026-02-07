const button = document.getElementById("closeBtn");
const taunt = document.getElementById("taunt");
const counter = document.getElementById("counter");
const container = document.querySelector(".main-container");

let misses = 0;
const taunts = [
  "What was that! 😆",
  "Come on!",
  "Mate, dont give up!",
  "Try again",
  "Missed again",
  "Fail"
];

// Ensure transform doesn't block movement
button.style.transform = "none";

button.addEventListener("mouseenter", dodge);
button.addEventListener("touchstart", dodge);

function dodge(e) {
  misses++;
  counter.textContent = `Furry %: ${misses}`;
  taunt.textContent = taunts[Math.floor(Math.random() * taunts.length)];

  const maxX = container.clientWidth - button.clientWidth;
  const maxY = container.clientHeight - button.clientHeight;

  const padding = 20;
  const randX = Math.max(padding, Math.min(Math.random() * maxX, maxX - padding));
  const randY = Math.max(padding, Math.min(Math.random() * maxY, maxY - padding));

  button.style.left = `${randX}px`;
  button.style.top = `${randY}px`;

  createPopup();
}

function createPopup() {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
  popup.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
  popup.textContent = randomPopupText();
  container.appendChild(popup);

  setTimeout(() => popup.remove(), 5000);
}

function randomPopupText() {
  const texts = [
    "⚠️ ERROR: Fail",
    "🤡 System detects a unknown",
    "📢 ALERT: Fat fingers detected",
    "💥 Button successfully outsmarted you",
    "😈 Nice try, human",
    "🧠 Hint: Try being faster",
    "🚫 Access denied: Reflexes too slow",
    "😂 This is painful to watch",
    "🎯 Missed! Again! HAHA!",
    "⌛ Loading… your defeat",
    "🕹️ Maybe gaming isn’t your thing",
    "📉 Accuracy level: Questionable"
  ];
  return texts[Math.floor(Math.random() * texts.length)];
}


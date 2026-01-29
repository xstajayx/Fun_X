const button = document.getElementById("closeBtn");
const taunt = document.getElementById("taunt");
const counter = document.getElementById("counter");
const container = document.querySelector(".main-container");

let misses = 0;
const taunts = [
  "Missed again! 😆",
  "Try harder!",
  "Almost... NOT!",
  "You're really bad at this",
  "Give up yet?",
  "Getting tired?"
];

button.addEventListener("mouseenter", dodge);
button.addEventListener("touchstart", dodge);

function dodge(e) {
  misses++;
  counter.textContent = `Misses: ${misses}`;
  taunt.textContent = taunts[Math.floor(Math.random() * taunts.length)];

  const maxX = container.clientWidth - button.clientWidth;
  const maxY = container.clientHeight - button.clientHeight;

  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;

  button.style.left = `${randX}px`;
  button.style.top = `${randY}px`;

  createPopup(randX, randY);
}

function createPopup(x, y) {
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
    "⚠️ ERROR: You suck",
    "📢 SYSTEM NOTICE: Nope",
    "💥 BUTTON DODGED!",
    "😈 Try again, mortal",
    "🔒 Locked out (just kidding)",
    "🛠️ Reboot required"
  ];
  return texts[Math.floor(Math.random() * texts.length)];
}

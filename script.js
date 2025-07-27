let score = 0;
let perSecond = 0;

const scoreEl = document.getElementById('score');
const clickBtn = document.getElementById('click-btn');
const cpsEl   = document.getElementById('cps');

const autoClickers = [
  { id: 'buy-1', name: 'Slow',      price: 5,    power: 1 },
  { id: 'buy-2', name: 'Okay',      price: 100,  power: 10 },
  { id: 'buy-3', name: 'Good',      price: 500,  power: 25 },
  { id: 'buy-4', name: 'Excellent', price: 1500, power: 50 }
];

// Update UI based on current score and auto-clickers
function updateUI() {
  scoreEl.textContent = score;
  cpsEl.textContent   = `CPS: ${perSecond}`;
  autoClickers.forEach(clicker => {
    const btn = document.getElementById(clicker.id);
    btn.disabled = score < clicker.price;
    btn.textContent = `Buy ${clicker.name} (${clicker.price} pts)`;
  });
}

// Handle manual clicks
clickBtn.addEventListener('click', () => {
  score++;
  updateUI();
});

// Handle purchases
autoClickers.forEach(clicker => {
  document.getElementById(clicker.id).addEventListener('click', () => {
    if (score >= clicker.price) {
      score -= clicker.price;
      perSecond += clicker.power;
      clicker.price = Math.floor(clicker.price * 1.5);  // Increase cost by 50%
      updateUI();
    }
  });
});

// Auto-clicker interval: add points each second
setInterval(() => {
  if (perSecond > 0) {
    score += perSecond;
    updateUI();
  }
}, 1000);

// Initial UI render
updateUI();

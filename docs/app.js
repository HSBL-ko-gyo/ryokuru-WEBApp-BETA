const container = document.getElementById('container');
const leafCount = 300;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomGreen() {
  const r = 0;
  const g = getRandom(100, 255);
  const b = 0;
  return `rgb(${r}, ${g}, ${b})`;
}

function createStrongWind() {
  const strongWindAngle = getRandom(30, 60);
  const strongWindDistance = getRandom(30, 50);

  for (const leaf of container.children) {
    leaf.style.setProperty('--sway-angle', `${strongWindAngle}deg`);
    leaf.style.setProperty('--sway-distance', `${strongWindDistance}px`);
  }
}

function applyCursorWind(event) {
  const cursorX = event.clientX;
  const cursorY = event.clientY;
  const influenceDistance = 100;

  for (const leaf of container.children) {
    const leafRect = leaf.getBoundingClientRect();
    const leafX = leafRect.x + leafRect.width / 2;
    const leafY = leafRect.y + leafRect.height / 2;
    const dx = leafX - cursorX;
    const dy = leafY - cursorY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < influenceDistance) {
      const angle = getRandom(5, 15);
      const distance = getRandom(5, 15);

      leaf.style.setProperty('--sway-angle', `${angle}deg`);
      leaf.style.setProperty('--sway-distance', `${distance}px`);
    }
  }
}

for (let i = 0; i < leafCount; i++) {
  const leaf = document.createElement('div');
  leaf.className = 'leaf';

  const xPos = getRandom(0, window.innerWidth - leaf.clientWidth);
  const yPos = getRandom(0, window.innerHeight - leaf.clientHeight);
  const delay = getRandom(0, 2000);
  const duration = getRandom(2000, 5000);
  const swayAngle = getRandom(5, 15);
  const swayDistance = getRandom(5, 15);

  leaf.style.left = `${xPos}px`;
  leaf.style.top = `${yPos}px`;
  leaf.style.backgroundColor = getRandomGreen();
  leaf.style.animationDelay = `${delay}ms`;
  leaf.style.animationDuration = `${duration}ms`;

  leaf.style.setProperty('--sway-angle', `${swayAngle}deg`);
  leaf.style.setProperty('--sway-distance', `${swayDistance}px`);

  container.appendChild(leaf);
}

// Create strong wind periodically
setInterval(createStrongWind, getRandom(5000, 15000));

// Apply wind effect by cursor
document.addEventListener('mousemove', applyCursorWind);
document.addEventListener('touchmove', (event) => {
  event.preventDefault();
  const touch = event.touches[0];
  applyCursorWind(touch);
});

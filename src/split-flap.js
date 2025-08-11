const phrase = 'FLUID ANIMATION';
const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';

function getRandomChar() {
  return charset[Math.floor(Math.random() * charset.length)];
}

//create individual flaps
function createFlap(char) {
  const flap = document.createElement('div');
  flap.className = 'character-flap';
  flap.dataset.targetChar = char;

  // Top half - shows upper portion of character
  const topHalf = document.createElement('div');
  topHalf.className = 'flap-top';
  const topText = document.createElement('span');
  topText.className = 'char-text';
  topText.textContent = getRandomChar();
  topHalf.appendChild(topText);

  // Bottom half - shows lower portion of SAME character
  const bottomHalf = document.createElement('div');
  bottomHalf.className = 'flap-bottom';
  const bottomText = document.createElement('span');
  bottomText.className = 'char-text';
  bottomText.textContent = topText.textContent; // Same character!
  bottomHalf.appendChild(bottomText);

  // Flip element - animates the transition
  const flipHalf = document.createElement('div');
  flipHalf.className = 'flap-flip';
  const flipText = document.createElement('span');
  flipText.className = 'char-text';
  flipText.textContent = topText.textContent;
  flipHalf.appendChild(flipText);

  flap.appendChild(topHalf);
  flap.appendChild(bottomHalf);
  flap.appendChild(flipHalf);

  return flap;
}

//initialize the display
function initializeDisplay() {
  const container = document.getElementById('displayRow');
  container.innerHTML = '';

  // Create a flap for each character in the phrase
  phrase.split('').forEach(char => {
    const flap = createFlap(char);
    container.appendChild(flap);
  });
}

// animation logic
function animateFlap(flap, targetChar) {
  const topText = flap.querySelector('.flap-top .char-text');
  const bottomText = flap.querySelector('.flap-bottom .char-text');
  const flipText = flap.querySelector('.flap-flip .char-text');
  const flipContainer = flap.querySelector('.flap-flip');

  let shuffleCount = 0;
  const maxShuffles = 3 + Math.floor(Math.random() * 4); // 3-6 shuffles

  function shuffle() {
    if (shuffleCount >= maxShuffles) {
      // Final flip to target character
      flipText.textContent = topText.textContent;
      flipContainer.classList.add('flipping');

      setTimeout(() => {
        // Update all parts to show the target character
        topText.textContent = targetChar;
        bottomText.textContent = targetChar;
        flipText.textContent = targetChar;

        // Reset flip element
        flipContainer.classList.remove('flipping');
        flipContainer.style.transform = '';
      }, 300);

      return;
    }

    // Shuffle to random character
    const currentChar = topText.textContent;
    const nextChar = shuffleCount === maxShuffles - 1 ? targetChar : getRandomChar();

    // Start flip animation
    flipText.textContent = currentChar;
    flipContainer.classList.add('flipping');

    setTimeout(() => {
      // Update to next character
      topText.textContent = nextChar;
      bottomText.textContent = nextChar; // Always the same!

      // Reset flip
      flipContainer.classList.remove('flipping');
      flipContainer.style.transform = '';
      shuffleCount++;

      // Continue shuffling
      setTimeout(shuffle, 150);
    }, 300);
  }

  shuffle();
}

// animate the display
function animateDisplay() {
  const flaps = document.querySelectorAll('.character-flap');

  flaps.forEach((flap, index) => {
    const targetChar = flap.dataset.targetChar;

    // Stagger animation: center-out pattern
    const centerIndex = Math.floor(flaps.length / 2);
    const distanceFromCenter = Math.abs(index - centerIndex);
    const delay = distanceFromCenter * 100; // 100ms per step from center

    setTimeout(() => {
      animateFlap(flap, targetChar);
    }, delay);
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeDisplay();

  // Start animation after a brief delay
  setTimeout(() => {
    animateDisplay();
  }, 1000);
});

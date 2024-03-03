document.addEventListener('DOMContentLoaded', function () {
  const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cards = symbols.concat(symbols);
  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let timerInterval;
  let seconds = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      seconds++;
      document.getElementById('timer').textContent = `Time: ${seconds}s`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function updateScore() {
    document.getElementById('score').textContent = `Moves: ${moves}`;
  }

  function restartGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    updateScore();
    stopTimer();
    seconds = 0;
    document.getElementById('timer').textContent = 'Time: 0s';
    shuffle(cards);

    cards.forEach((symbol, index) => {
      const card = createCard(symbol, index);
      gameBoard.appendChild(card);
    });
  }

  function createCard(symbol, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">${symbol}</div>
        <div class="card-face card-back"></div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card, index));
    return card;
  }

  function flipCard(card, index) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
      card.classList.add('flipped');
      flippedCards.push({ card, index });

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = cards[card1.index];
    const symbol2 = cards[card2.index];

    moves++;
    updateScore();

    if (symbol1 === symbol2) {
      card1.card.removeEventListener('click', () => flipCard(card1.card, card1.index));
      card2.card.removeEventListener('click', () => flipCard(card2.card, card2.index));
      matchedPairs++;

      if (matchedPairs === symbols.length) {
        stopTimer();
        alert(`Congratulations! You matched all pairs in ${seconds} seconds.`);
      }
    } else {
      card1.card.classList.remove('flipped');
      card2.card.classList.remove('flipped');
    }

    flippedCards = [];
  }

  function toggleGameButton() {
    const gameButton = document.getElementById('game-btn');
    if (gameButton.textContent === 'Start Game') {
      gameButton.textContent = 'Restart Game';
      restartGame();
      startTimer();
    } else {
      restartGame();
    }
  }

  const gameButton = document.getElementById('game-btn');
  gameButton.addEventListener('click', toggleGameButton);
});

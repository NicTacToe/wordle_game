const wordList = ["apple", "berry", "crave", "drive", "eagle", "fling", "glide", "house", "igloo", "joker", "music", "nigga", "often", "price", "quake", "right", "start", "track", "under", "viola", "water", "xenon", "yacht", "zebra"]; 
const targetWord = wordList[Math.floor(Math.random() * wordList.length)];
let attempts = 0;
const maxAttempts = 6;

let timerInterval;
let elapsedTime = 0;

function createGrid() {
  const grid = document.getElementById('grid');
  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('div');
      cell.id = `cell-${i}-${j}`;
      grid.appendChild(cell);
    }
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    elapsedTime++;
    const minute = Math.floor(elapsedTime / 60);
    const second = elapsedTime % 60;
    document.getElementById("timer").textContent = `Time: ${minute < 10 ? '0' + minute : minute} : ${second < 10 ? '0' + second : second}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function submitGuess() {
  const guessInput = document.getElementById('guessInput');
  const guess = guessInput.value.toLowerCase();
  guessInput.value = '';

  if (guess.length !== 5) {
    document.getElementById('message').textContent = 'Invalid guess. Try again!';
    return;
  }

  attempts++;
  const feedback = getFeedback(guess);
  displayGuess(guess, feedback);

  if (guess === targetWord) {
    document.getElementById('message').textContent = 'Congratulations! You guessed the word!';
    stopTimer();
    endGame();
  } else if (attempts >= maxAttempts) {
    stopTimer();
    document.getElementById('message').textContent = `Game over! The word was ${targetWord}.`;
    endGame();
  }
}

function getFeedback(guess) {
  const feedback = Array(5).fill('absent');
  for (let i = 0; i < 5; i++) {
    if (guess[i] === targetWord[i]) {
      feedback[i] = 'correct';
    } else if (targetWord.includes(guess[i])) {
      feedback[i] = 'present';
    }
  }
  return feedback;
}

function displayGuess(guess, feedback) {
  for (let i = 0; i < 5; i++) {
    const cell = document.getElementById(`cell-${attempts-1}-${i}`);
    cell.textContent = guess[i];
    cell.className = feedback[i];
  }
}

function endGame() {
  const input = document.getElementById("guessInput");
  const button = document.getElementById("submitGuess");
  input.disabled = true;
  button.disabled = true;
}

document.getElementById('submitGuess').addEventListener('click', submitGuess);

createGrid();
startTimer();
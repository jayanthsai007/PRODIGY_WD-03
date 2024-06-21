const cells = document.querySelectorAll('.cell');
const player1 = 'X';
const player2 = 'O';
let currentPlayer = player1;
let gameBoard = Array(9).fill('');

function handleCellClick(event) {
  const cellIndex = parseInt(event.target.dataset.cellIndex);
  if (gameBoard[cellIndex] === '') {
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
      return; // Early exit if winner found
    }
    switchPlayer();
  }
}

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) {
      alert(`Player ${currentPlayer} Wins!`);
      resetGame();
      return true;
    }
  }

  // Check for tie
  if (!gameBoard.includes('')) {
    alert('It\'s a Tie!');
    resetGame();
    return false;
  }

  return false;
}

function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

function resetGame() {
  gameBoard = Array(9).fill('');
  currentPlayer = player1;
  cells.forEach(cell => cell.textContent = '');
  cells.forEach(cell => cell.addEventListener('click', handleCellClick)); // Re-enable clicks after reset
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetGame);

function Player(params, symbol) {
  let playerName = params;
  let score = 0;
  let playerSymbol = symbol;

  const setPlayer = (params) => {
    playerName = params;
  };

  const getName = () => playerName;

  const increaseScore = () => score++;

  const getScore = () => score;

  const getSymbol = () => playerSymbol;

  const resetScore = () => (score = 0);

  return {
    getName,
    setPlayer,
    increaseScore,
    getScore,
    getSymbol,
    resetScore,
  };
}

function Gameboard() {
  let board = new Array(9).fill("");

  const resetBoard = () => {
    board = new Array(9).fill("");
  };

  const getBoard = () => board;

  const insert = (index, params) => {
    board[index] = params;
  };

  const getField = (num) => board[num];

  return {
    resetBoard,
    getBoard,
    insert,
    getField,
  };
}

let game = (function GameController() {
  const cells = document.querySelectorAll(".cell");
  const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const players = [];
  const board = Gameboard();
  let activePlayer;

  cells.forEach((item) => {
    item.addEventListener("click", cellClicked);
  });

  initializePlayer();

  function initializePlayer() {
    let playerOneName = prompt("insert player one name : ", "PlayerOne");
    let playerOne = Player(playerOneName, "X");
    players[0] = playerOne;
    let playerTwoName = prompt("insert player two name : ", "PlayerTwo");
    let playerTwo = Player(playerTwoName, "O");
    players[1] = playerTwo;
    activePlayer = players[0];
  }

  function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (board.getField(cellIndex) != "") {
      return;
    }
    updateCell(this, cellIndex);
    checkWin();
  }

  function updateCell(cell, index) {
    board.insert(index, activePlayer.getSymbol());
    cell.textContent = activePlayer.getSymbol();
  }

  function switchPlayerTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    printNewRound();
  }

  function getActivePlayer() {
    return activePlayer;
  }

  function printNewRound() {
    console.log(`${getActivePlayer().getName()}'s turn .`);
  }

  function checkWin() {
    let roundWon = false;
    let currentPlayerScore = activePlayer.getScore();
    for (let i = 0; i < winningCondition.length; i++) {
      const condition = winningCondition[i];
      const cellA = board.getField(condition[0]);
      const cellB = board.getField(condition[1]);
      const cellC = board.getField(condition[2]);

      if (cellA == "" || cellB == "" || cellC == "") {
        continue;
      }
      if (cellA == cellB && cellB == cellC) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      console.log(`${activePlayer.getName()} won!`);
      activePlayer.increaseScore();
      restartRound();
      console.log(activePlayer.getScore());
    } else if (!board.getBoard().includes("")) {
      console.log("Draw!");
      restartRound();
    } else if (roundWon && currentPlayerScore == 3) {
      console.log(`${activePlayer.getName()} WIN!`);
      restartGame();
    } else {
      switchPlayerTurn();
    }
  }

  function restartRound() {
    activePlayer = players[0];
    board.resetBoard();
    printNewRound();
    cells.forEach((cell) => (cell.textContent = ""));
  }

  function restartGame() {
    activePlayer = players[0];
    board.resetBoard();
    printNewRound();
    cells.forEach((cell) => (cell.textContent = ""));
    players.forEach((player) => player.resetScore());
  }
})();

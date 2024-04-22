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

  return {
    getName,
    setPlayer,
    increaseScore,
    getScore,
    getSymbol,
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
    switchPlayerTurn();
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

  function checkWin() {}
})();

function Player(params) {
  let playerName = params;
  let score = 0;

  const setPlayer = (params) => {
    playerName = params;
  };

  const getName = () => playerName;

  const increaseScore = () => score++;

  const getScore = () => score;

  return {
    getName,
    setPlayer,
    increaseScore,
    getScore,
  };
}

function Gameboard() {
  const board = [];

  const resetBoard = () => {
    for (let i = 1; i <= 9; i++) {
      board.push("");
    }
  };

  const getBoard = () => board;

  const insert = (index, params) => {
    board[index] = params;
  };

  return {
    resetBoard,
    getBoard,
    insert,
  };
}

function createPlayer(name) {
  let playerName = name;
  let score = 0;

  function getName() {
    return playerName;
  }

  function setName(params) {
    playerName = params;
  }

  function increaseScore() {
    score++;
  }

  function getScore() {
    return score;
  }

  return {
    getName,
    setName,
    increaseScore,
    getScore,
  };
}

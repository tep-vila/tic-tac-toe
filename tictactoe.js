// gameboard array
// player data
// winning combination
// state manage

// round 5 dapat mag start ng checking

// FUNCTION PANG GAWA NG PATTERN
function createWinningCombo(BOARDSIZE) {
  const verticalWinCombo = [];
  const horizontalWinCombo = [];
  const diagonalWinCombo = [];

  function verticalComboGenerator() {
    const maxCombo = 3;
    let comboHolder = [];
    // pattern niya is current column/combo iadd mo sa product ng size * current index(bali 1 to size ng board mo)
    for (let currentCombo = 1; currentCombo <= maxCombo; currentCombo++) {
      for (let i = 0; i < BOARDSIZE; i++) {
        comboHolder.push(i * BOARDSIZE + currentCombo);
        if (comboHolder.length === 3) {
          verticalWinCombo.push(comboHolder);
          comboHolder = [];
        }
      }
    }
  }

  function horizontalComboGenerator() {
    const maxCombo = 3;
    let comboHolder = [];

    for (let currentCombo = 0; currentCombo < maxCombo; currentCombo++) {
      for (let i = 1; i <= BOARDSIZE; i++) {
        comboHolder.push(currentCombo * BOARDSIZE + i);
        if (comboHolder.length === 3) {
          horizontalWinCombo.push(comboHolder);
          comboHolder = [];
        }
      }
    }
  }

  function diagonalComboGenerator() {
    let diag1 = [];
    let diag2 = [];

    for (let i = 0; i < BOARDSIZE; i++) {
      diag1.push(i * BOARDSIZE + i + 1);
    }
    for (let i = 0; i < BOARDSIZE; i++) {
      diag2.push((i + 1) * BOARDSIZE - i);
    }

    diagonalWinCombo.push(diag1);
    diagonalWinCombo.push(diag2);
  }

  //  Populate yung winning combo
  verticalComboGenerator();
  horizontalComboGenerator();
  diagonalComboGenerator();

  return { verticalWinCombo, horizontalWinCombo, diagonalWinCombo };
}

// PANG GAWA NG BOARD DATA

function tictactoe() {
  const BOARDSIZE = 3;

  let currentRound = 1;
  let currentPlayerToken = "x";

  const findCurrentTokenPositionInGameBoard = () => {
    let currentTokenPositionInGameBoard = [];
    for (let i = 0; i < playGame.gameBoard.length; i++) {
      console.log(playGame.gameBoard.length, currentPlayerToken);
      console.log(playGame.gameBoard[i]);
      if (currentPlayerToken === playGame.gameBoard[i]) {
        currentTokenPositionInGameBoard.push(i);
      }
    }
    return currentTokenPositionInGameBoard;
  };

  const whatRoundIsIt = () => {
    return { currentRound };
  };

  function advanceRound() {
    currentRound++;
  }

  const checkWhoWin = () => {};

  const checkIfCurrentPlayerWin = () => {
    console.log(playGame.winningCombos.verticalWinCombo);
    // need ng gameBoard array, currentPlayer toekn
    console.log(playGame.gameBoard);
  };

  const putTokenInTable = (cell, gameBoard) => {
    if (gameBoard[cell] !== "") {
      console.log("already occupied");
    } else {
      gameBoard[cell] = currentPlayerToken;
    }
  };

  const togglePlayer = function () {
    let otherPlayer = "o";
    [currentPlayerToken, otherPlayer] = [otherPlayer, currentPlayerToken];
    console.log(`it is ${currentPlayerToken}'s turn`);
  };

  const createGameBoardArray = (function () {
    const gameBoard = ["", "", "", "", "", "", "", "", ""];
    console.log(`game board created (${BOARDSIZE} by ${BOARDSIZE})`);
    return gameBoard;
  })();

  return {
    createGameBoardArray,
    togglePlayer,
    advanceRound,
    checkWhoWin,
    checkIfCurrentPlayerWin,
    putTokenInTable,
    whatRoundIsIt,
    BOARDSIZE,
    findCurrentTokenPositionInGameBoard,
  };
}

function createPlayer(name1, name2) {
  const player1 = {
    name: name1,
    token: "X",
  };

  const player2 = {
    name: name2,
    token: "o",
  };

  return { name1, name2 };
}

const playGame = (function () {
  const gameLogic = tictactoe();
  const winningCombos = createWinningCombo(gameLogic.BOARDSIZE);

  const gameBoard = gameLogic.createGameBoardArray;

  const placeToken = (where) => {
    playGame.gameLogic.putTokenInTable(where, playGame.gameBoard);

    if (gameLogic.whatRoundIsIt().currentRound >= 5) {
      console.log("tite");
      playGame.gameLogic.checkIfCurrentPlayerWin();
    } else {
      gameLogic.advanceRound();
      console.log(gameLogic.whatRoundIsIt());
    }
  };

  return { gameLogic, gameBoard, placeToken, winningCombos };
})();

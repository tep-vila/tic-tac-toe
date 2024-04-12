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
  let otherPlayer = "o";
  let tie;

  const findCurrentTokenPositionInGameBoard = () => {
    let currentTokenPositionInGameBoard = [];
    for (let i = 0; i < playGame.gameBoard.length; i++) {
      console.log(playGame.gameBoard.length, currentPlayerToken);
      console.log(playGame.gameBoard[i]);
      if (currentPlayerToken === playGame.gameBoard[i]) {
        currentTokenPositionInGameBoard.push(i + 1);
      }
    }
    return currentTokenPositionInGameBoard;
  };

  const resetData = () => {
    currentRound = 1;
    currentPlayerToken = "x";
    otherPlayer = "o";
    tie = undefined;
  };

  const checkIfTie = () => {
    return tie;
  };

  const itsTie = () => {
    tie = true;
  };

  const whatIsTheCurrentToken = () => {
    return currentPlayerToken;
  };

  const whatRoundIsIt = () => {
    return { currentRound };
  };

  function advanceRound() {
    currentRound++;
  }

  const whenSomeoneWin = () => {
    playerData.addScore(currentPlayerToken);
  };

  // dapat mag return to ng boolean. pafix. need din ayusin yung sa placetoken -> pag nag false yung sa checkifsum1 won, mag toggle and add siya ng round.
  const checkIfCurrentPlayerWin = () => {
    const currentPlayerTokenInGameBoardPosition =
      findCurrentTokenPositionInGameBoard();
    let isThereAPattern = false;
    console.log(playGame.winningCombos.diagonalWinCombo);

    function compareHorizontal() {
      for (let i = 0; i < 3; i++) {
        if (
          playGame.winningCombos.horizontalWinCombo[i].every((cellPosition) => {
            return currentPlayerTokenInGameBoardPosition.includes(cellPosition);
          })
        ) {
          isThereAPattern = true;
        } else {
          console.log("bokya-horizontal");
        }
      }
    }

    function compareVertical() {
      for (let i = 0; i < 3; i++) {
        if (
          playGame.winningCombos.verticalWinCombo[i].every((cellPosition) => {
            console.log(
              currentPlayerTokenInGameBoardPosition.includes(cellPosition)
            );
            return currentPlayerTokenInGameBoardPosition.includes(cellPosition);
          })
        ) {
          isThereAPattern = true;
        } else {
          console.log("bokya-vertical");
        }
      }
    }

    function compareDiagonal() {
      for (let i = 0; i < 2; i++) {
        if (
          playGame.winningCombos.diagonalWinCombo[i].every((cellPosition) => {
            console.log(
              currentPlayerTokenInGameBoardPosition.includes(cellPosition)
            );
            return currentPlayerTokenInGameBoardPosition.includes(cellPosition);
          })
        ) {
          isThereAPattern = true;
        } else {
          console.log("bokya-diagonal");
        }
      }
    }
    compareHorizontal();
    compareVertical();
    compareDiagonal();

    console.log(currentPlayerTokenInGameBoardPosition);
    // need ng gameBoard array, currentPlayer toekn
    console.log(playGame.gameBoard);

    return isThereAPattern;
  };

  const putTokenInTable = (cell, gameBoard) => {
    if (gameBoard[cell] !== "") {
      console.log("already occupied");
    } else {
      gameBoard[cell] = currentPlayerToken;
    }
  };

  const resetTable = (gameBoard) => {
    for (let i = 0; i < 9; i++) {
      gameBoard[i] = "";
    }
  };

  // Pag nag IIFE module, yung closure mamamanipulate mo yung variables don
  // thru functions na nireturn mo. pag nag return ka ng outer scope na variables
  // tas nag edit ka thru returned functions, hindi mag rereflect yon

  const togglePlayer = function () {
    console.log(`before toggle: ${currentPlayerToken}`);
    let placeHolder = currentPlayerToken;

    currentPlayerToken = otherPlayer;
    otherPlayer = placeHolder;
    console.log(`it is ${currentPlayerToken}'s turn`);
  };

  const createGameBoardArray = (function () {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    console.log(`game board created (${BOARDSIZE} by ${BOARDSIZE})`);
    return gameBoard;
  })();

  return {
    createGameBoardArray,
    togglePlayer,
    advanceRound,
    whenSomeoneWin,
    checkIfCurrentPlayerWin,
    putTokenInTable,
    whatRoundIsIt,
    BOARDSIZE,
    findCurrentTokenPositionInGameBoard,
    whatIsTheCurrentToken,
    itsTie,
    checkIfTie,
    resetData,
    resetTable,
  };
}

const playerData = (function () {
  const player1 = {
    token: "x",
    score: 0,
  };

  const player2 = {
    token: "o",
    score: 0,
  };

  const addScore = (winner) => {
    switch (winner) {
      case "x":
        player1.score += 1;
        console.log("plus 1");
        break;

      case "o":
        player2.score += 1;
        console.log("plus 1");
        break;
    }
  };

  // array ireturn. walang native way
  // js para mag return ng multiple values so either return [] or {}.
  // bawal comma: return x, y

  const returnScores = () => {
    console.log(player1.score, player2.score);
    return [player1.score, player2.score];
  };

  return { returnScores, addScore };
})();

const playGame = (function () {
  const gameLogic = tictactoe();
  const winningCombos = createWinningCombo(gameLogic.BOARDSIZE);

  let gameBoard = gameLogic.createGameBoardArray;

  const transitionToNextRound = () => {
    gameLogic.advanceRound();
    gameLogic.togglePlayer();
  };

  const newRound = () => {
    for (let i = 0; i < 9; i++)
      playGame.gameLogic.putTokenInTable(i, gameBoard);
  };

  const placeToken = (where) => {
    playGame.gameLogic.putTokenInTable(where, playGame.gameBoard);

    if (gameLogic.whatRoundIsIt().currentRound === 9) {
      console.log("last round");
      if (!playGame.gameLogic.checkIfCurrentPlayerWin()) {
        console.log("so walang nanalo !!!!!!!!!!");
        setTimeout(() => {
          controlDom.displayWhenTie();
        }, 100);
        playGame.gameLogic.itsTie();
        playGame.gameLogic.resetData();
        playGame.gameLogic.resetTable(gameBoard);
        setTimeout(() => {
          controlDom.clearGameBoard();
        }, 2000);

        setTimeout(() => {
          controlDom.resetMessage();
        }, 2000);
        return;
      }
    }

    if (gameLogic.whatRoundIsIt().currentRound >= 5) {
      if (playGame.gameLogic.checkIfCurrentPlayerWin()) {
        playGame.gameLogic.whenSomeoneWin();
        controlDom.tellWhoWin();
        controlDom.updateScoreDisplay();
        console.log("b4 add score");
        playGame.gameLogic.resetData();
        playGame.gameLogic.resetTable(gameBoard);
        setTimeout(() => {
          controlDom.clearGameBoard();
        }, 2000);

        setTimeout(() => {
          controlDom.resetMessage();
        }, 2000);
        return;
        // palitan dapat to ng win logic
      } else {
        transitionToNextRound();

        console.log(gameLogic.whatRoundIsIt());
        console.log("toggled");
      }
    } else {
      transitionToNextRound();
      console.log(gameLogic.whatRoundIsIt());
      console.log("toggled");
    }

    controlDom.displayCurrentPlayer();
    // pwede pa imrpove tong nesting na to, gawing if round 5 pataas na, tas yung checking ng winner gawin sa switch statement
  };

  return { gameLogic, gameBoard, placeToken, winningCombos, newRound };
})();

const controlDom = (function () {
  const message = document.querySelector(".message");
  const player1Score = document.querySelector(".player.one .actual-score");
  const player2score = document.querySelector(".player.two .actual-score");
  const board = document.querySelector(".game-board");

  const defaultMessage = "Click on a cell to place token. Player 1's turn.";

  const clearGameBoard = () => {
    board.querySelectorAll("div").forEach((div) => {
      div.textContent = "";
    });
  };

  const updateScoreDisplay = () => {
    console.log(playGame.gameLogic.whatIsTheCurrentToken());
    switch (playGame.gameLogic.whatIsTheCurrentToken()) {
      case "x":
        player1Score.textContent = playerData.returnScores()[0];
        break;

      case "o":
        player2score.textContent = playerData.returnScores()[1];
        break;
    }
  };

  const tellWhoWin = () => {
    switch (playGame.gameLogic.whatIsTheCurrentToken()) {
      case "x":
        message.textContent = "Player 1 won!";
        break;

      case "o":
        message.textContent = "Player 2 won!";
        break;
    }
  };

  const resetMessage = () => {
    message.textContent = defaultMessage;
  };

  const displayCellAlreadyTaken = () => {
    message.textContent = "Cell is already taken!";
  };

  const displayCurrentPlayer = () => {
    console.log(playGame.gameLogic.whatIsTheCurrentToken());
    if (playGame.gameLogic.whatIsTheCurrentToken() === "x") {
      message.textContent = "It is player 1's turn";
    } else {
      message.textContent = "It is player 2's turn";
    }
  };

  const displayWhenTie = () => {
    message.textContent = "It's a tie";
  };

  const putTokenInGameBoardCell = (cell) => {
    cell.textContent = playGame.gameLogic.whatIsTheCurrentToken();
  };

  //  check kung cell ba yung napindot. also, check kung may laman na yung cell.
  board.addEventListener("click", (event) => {
    console.log(playGame.gameBoard[event.target.id] === "");
    if (!event.target.classList.contains("game-board")) {
      if (playGame.gameBoard[event.target.id] === "") {
        putTokenInGameBoardCell(event.target);

        playGame.placeToken(event.target.id);
      } else displayCellAlreadyTaken();
    }

    if (playGame.gameLogic.checkIfTie()) {
      displayWhenTie();
    }
  });

  return {
    updateScoreDisplay,
    tellWhoWin,
    resetMessage,
    displayCurrentPlayer,
    displayWhenTie,
    clearGameBoard,
  };
})();

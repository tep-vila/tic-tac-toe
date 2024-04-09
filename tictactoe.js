const token = "X";
const cell = `,--------,\n|        |\n|    ${token}   |\n|        |\n'--------'`;

// gameboard array
// player data
// winning combination
// state manage

// round 5 dapat mag start ng checking

function tictactoe() {
  const currentRound = 0;
  const BOARDSIZE = 3;
  const winningCombination = [];

  let currentPlayerToken = "x";

  const togglePlayer = function () {
    let otherPlayer = "o";
    [currentPlayerToken, otherPlayer] = [otherPlayer, currentPlayerToken];
    console.log(`it is ${currentPlayerToken}'s turn`);
  };

  const createGameBoard = (function () {
    const gameBoard = ["", "", "", "", "", "", "", "", ""];
    console.log("game board created");
    return gameBoard;
  })();

  const verticalCombination = function () {
    // for (let i = 0; i < BOARDSIZE; i++){
    //     for()
    // }
  };

  return { createGameBoard, togglePlayer, verticalCombination };
}

//import "./App.css";
import PlayerInfo from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { useGame } from "./hooks/useGame";
//import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialBoard: (string | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

type gameStateValues = {
  winnerSymbol: string | null;
  isDraw: boolean;
};

const initialGameState = {
  winnerSymbol: null,
  isDraw: false,
};
function checkActivePlayerSymbol(gameBoard: (string | null)[][]): string {
  //checking whos turn it is(9 represent a draw)
  const rowNum = gameBoard.length;
  const colNum = gameBoard[0].length;
  let num: number = 0;
  for (let i = 0; i < rowNum; i++) {
    for (let j = 0; j < colNum; j++) {
      if (gameBoard[i][j] !== null) num++;
    }
  }
  if (num === 9) return "Z";
  else {
    if (num % 2 === 0) return "X";
    else return "O";
  }
}

function checkWinner( // winning conditaion
  board: (string | null)[][],
  winLength: number
): string | null {
  const rows = board.length;
  const cols = board[0].length;

  function checkDirection(
    startRow: number,
    startCol: number,
    deltaRow: number,
    deltaCol: number
  ): string | null {
    const symbol = board[startRow][startCol];
    if (!symbol) return null;

    for (let i = 1; i < winLength; i++) {
      const r = startRow + deltaRow * i;
      const c = startCol + deltaCol * i;

      if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== symbol) {
        // not 3 in a row
        return null;
      }
    }
    return symbol;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (
        checkDirection(row, col, 0, 1) || // horizontal
        checkDirection(row, col, 1, 0) || // vertical
        checkDirection(row, col, 1, 1) || // diagonal down-right
        checkDirection(row, col, 1, -1) // diagonal down-left
      ) {
        return board[row][col];
      }
    }
  }

  return null;
}

/*function checkForDraw(
  rowNum: number
  colNum: number,
  gameBoard: (string | null)[][]
): boolean {
  for (let i = 0; i < rowNum; i++) {
    for (let j = 0; j < colNum; j++) {
      if (gameBoard[i][j] === null) return false;
    }
  }
  return true;
}
*/
function App() {
  const [firstPlayerInfo, setFirstPlayerInfo] = useState({
    name: "Player1",
    symbol: "X",
    score: 0,
  });
  const [secondPlayerInfo, setSecondPlayerInfo] = useState({
    name: "Player2",
    symbol: "O",
    score: 0,
  });
  const gameFlow = useGame();
  //const [winnerSymbol, setWinnerSymbol] = useState<string | null>(null);
  //const [gameState, setGameState] = useState<gameStateValues>(initialGameState);
  // const [numOfTurns, setNumOfTurns] = useState<number>(0); // to know if there is a draw
  const [gameBoard, setGameBoard] = useState<(string | null)[][]>(initialBoard);
  //const [activePlayerSymbol, setActivePlayerSymbol] = useState<string>("X"); // which symbol we need to output on the grid

  /* function hanldeClick1() {
    const isCurrentlyEditing = isEdited.X;
    const enteredName = player1Name.current!.value;
    setFirstPlayerInfo((prevValue) => ({
      ...prevValue,
      name: enteredName,
    }));
    setIsEdited((prevValue) => ({
      ...prevValue,
      X: !isCurrentlyEditing,
    }));
  }

  function hanldeClick2() {
    const isCurrentlyEditing = isEdited.O;
    const enteredName = player2Name.current!.value;
    setSecondPlayerInfo((prevValue) => ({
      ...prevValue,
      name: enteredName,
    }));
    setIsEdited((prevValue) => ({
      ...prevValue,
      O: !isCurrentlyEditing,
    }));
  }

  function handleAdd() {
    setNumOfTurns((prevValue) => {
      return ++prevValue;
    });
  }
*/

  //const checkDraw = checkActivePlayerSymbol(gameBoard) === "Z" ? true : false; // if the value is Z meaning its a draw
  /*const getGameState = (gameBoard) => {
    return 1;
  };
*/
  function handleBoardClick(row: number, col: number) {
    setGameBoard((prevValue: (string | null)[][]) => {
      const updatedGameBoard: (string | null)[][] = [
        ...prevValue.map((innerArray) => [...innerArray]),
      ];
      updatedGameBoard[row][col] = checkActivePlayerSymbol(gameBoard);
      getGameState(updatedGameBoard);
      return updatedGameBoard;
    });
    /*
    setActivePlayerSymbol((prevValue: string) => {
      if (prevValue === "X") return "O";
      else return "X";
    });
    */
    //handleAdd();
  }

  function getGameState(gameBoard: (string | null)[][]) {
    const winner = checkWinner(gameBoard, 3);
    const checkDraw = checkActivePlayerSymbol(gameBoard) === "Z" ? true : false;
    setGameState(() => {
      return {
        winnerSymbol: winner,
        isDraw: checkDraw,
      };
    });
  }

  /*function handleRematch(symbol: string, isDraw: boolean, whichButton: string) {
    setGameBoard(() => {
      const updatedGameBoard: (string | null)[][] = [
        ...initialBoard.map((innerArray) => [...innerArray]),
      ];
      return updatedGameBoard;
    });
    //setActivePlayerSymbol("X");
    //setNumOfTurns(0);
    //setWinnerSymbol(null);
    getGameState(gameBoard, true);
    if (whichButton === "rematch") {
      //updating player score
      if (isDraw) return;
      else if (symbol === "X") {
        setFirstPlayerInfo((prevValue) => ({
          ...prevValue,
          score: prevValue.score + 1,
        }));
      } else if (symbol === "O") {
        setSecondPlayerInfo((prevValue) => ({
          ...prevValue,
          score: prevValue.score + 1,
        }));
      }
    } else {
      // meaning the restart button was clicked
      setFirstPlayerInfo((prevValue) => ({
        ...prevValue,
        score: 0,
        name: "Player1",
      }));
      setSecondPlayerInfo((prevValue) => ({
        ...prevValue,
        score: 0,
        name: "Player2",
      }));
    }
  }
*/
  /*useEffect(() => {
    if (winnerSymbol) return; // if its not null than we continiue to the rest of the code

    const winner = checkWinner(gameBoard, 3);
    if (winner) setWinnerSymbol(winner);
  }, [gameBoard, winnerSymbol]);
*/
  /* useEffect(() => {
    // checkig for winning conditaion
    if (winnerSymbol) return;

    for (const combination of WINNING_COMBINATIONS) {
      const first = gameBoard[combination[0].row][combination[0].column];
      const second = gameBoard[combination[1].row][combination[1].column];
      const third = gameBoard[combination[2].row][combination[2].column];

      if (first && first === second && second === third) {
        setWinnerSymbol(first);
        break;
      }
    }
  }, [gameBoard, winnerSymbol]);
*/
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <PlayerInfo // maping the players index/symbol
            playerInformation={gameFlow.players[0]}
            handleNameChange={(name) => {
              console.log(name);
              gameFlow.setFirstPlayerInfo((prevValue) => {
                return {
                  ...prevValue,
                  name,
                };
              });
            }}
          />
          <PlayerInfo
            playerInformation={gameFlow.players[1]}
            handleNameChange={(name) =>
              gameFlow.setSecondPlayerInfo((prevValue) => ({
                ...prevValue,
                name,
              }))
            }
          />
        </ol>
        {(gameFlow.winner || (!gameFlow.winner && gameFlow.isGameOver)) && ( // need to render the gameover screen
          //only check if game is over and based on that logic detemained if there is a winner or a draw
          <GameOver
            winnerNameInfo={
              gameFlow.winner?.symbol === "X"
                ? gameFlow.players[0]
                : gameFlow.players[1]
            }
            isDraw={!gameFlow.winner && gameFlow.isGameOver}
            handleRematch={gameFlow.handleRematch}
            handleRestart={gameFlow.handelRestart}
          />
        )}
        <GameBoard
          gameFlow={gameFlow} // remove
          gameBoard={gameBoard}
          handleClick={handleBoardClick}
        />
      </div>
    </main>
  );
}

export default App;

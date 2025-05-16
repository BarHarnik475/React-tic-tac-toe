//import "./App.css";
import PlayerInfo from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { useRef, useState, useEffect } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialBoard: (string | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

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
  const [winnerSymbol, setWinnerSymbol] = useState<string | null>(null);
  const [numOfTurns, setNumOfTurns] = useState<number>(0); // to know if there is a draw
  const [gameBoard, setGameBoard] = useState<(string | null)[][]>(initialBoard);
  const [activePlayerSymbol, setActivePlayerSymbol] = useState<string>("X"); // which symbol we need to output on the grid
  const [isEdited, setIsEdited] = useState({
    // output the input field or not
    X: false,
    O: false,
  });
  const player1Name = useRef<HTMLInputElement>(null);
  const player2Name = useRef<HTMLInputElement>(null);
  function hanldeClick1() {
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

  function handleBoardClick(row: number, col: number) {
    setGameBoard((prevValue: (string | null)[][]) => {
      const updatedGameBoard: (string | null)[][] = [
        ...prevValue.map((innerArray) => [...innerArray]),
      ];
      updatedGameBoard[row][col] = activePlayerSymbol;
      return updatedGameBoard;
    });
    setActivePlayerSymbol((prevValue: string) => {
      if (prevValue === "X") return "O";
      else return "X";
    });
    handleAdd();
  }

  function handleRematch(
    symbol: string,
    isDraw: string | null,
    whichButton: string
  ) {
    setGameBoard(() => {
      const updatedGameBoard: (string | null)[][] = [
        ...initialBoard.map((innerArray) => [...innerArray]),
      ];
      return updatedGameBoard;
    });
    setActivePlayerSymbol("X");
    setNumOfTurns(0);
    setWinnerSymbol(null);
    if (whichButton === "rematch") {
      if (!isDraw) return;
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
      setIsEdited({
        X: false,
        O: false,
      });
    }
  }

  useEffect(() => {
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

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <PlayerInfo
            playerName={firstPlayerInfo.name}
            playerSymbol="X"
            playerScore={firstPlayerInfo.score}
            handleClick={hanldeClick1}
            ref={player1Name}
            isEdited={isEdited}
          />
          <PlayerInfo
            playerName={secondPlayerInfo.name}
            playerSymbol="O"
            playerScore={secondPlayerInfo.score}
            handleClick={hanldeClick2}
            ref={player2Name}
            isEdited={isEdited}
          />
        </ol>
        {(winnerSymbol || numOfTurns === 9) && (
          <GameOver
            winnerNameInfo={
              winnerSymbol === "X" ? firstPlayerInfo : secondPlayerInfo
            }
            isDraw={winnerSymbol}
            handleRematch={handleRematch}
          />
        )}
        <GameBoard gameBoard={gameBoard} handleClick={handleBoardClick} />
      </div>
    </main>
  );
}

export default App;

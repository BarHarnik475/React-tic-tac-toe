import { GameBoardType, IPlayer } from "../customTypes";
type GameBoardProps = {
  gameBoard: (string | null)[][];
  handleClick: (rowIndex: number, colIndex: number) => void;
  gameFlow: {
    winner: IPlayer | null;
    isGameOver: boolean;
    gameBoard: GameBoardType;
    makeMove: (row: number, col: number) => void;
  };
};

function GameBoard({ gameBoard, handleClick, gameFlow }: GameBoardProps) {
  // need to send as props gameboard state and handleclick func

  return (
    //outputing the grid
    <ol id="game-board">
      {gameFlow.gameBoard.map((row, rowIndex: number) => (
        <li key={rowIndex}>
          <ol>
            {row.map((PlayerSymbol, colIndex: number) => (
              <li key={colIndex}>
                <button
                  onClick={() => gameFlow.makeMove(rowIndex, colIndex)}
                  disabled={PlayerSymbol !== null}
                >
                  {PlayerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;

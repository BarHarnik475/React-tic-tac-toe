import { IPlayer } from "../customTypes";
type GameBoardProps = {
  gameBoard: (IPlayer["symbol"] | null)[][];
  handleClick: (rowIndex: number, colIndex: number) => void;
};

function GameBoard({ gameBoard, handleClick }: GameBoardProps) {
  // need to send as props gameboard state and handleclick func

  return (
    //outputing the grid
    // find another html element to achive the goal of the grid
    <ol id="game-board">
      {gameBoard.map((row, rowIndex: number) => (
        <li key={rowIndex}>
          <ol>
            {row.map((PlayerSymbol, colIndex: number) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleClick(rowIndex, colIndex)}
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

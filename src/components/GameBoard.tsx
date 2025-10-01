//import { useState } from "react";
import { IPlayer } from "../customTypes";
type GameBoardProps = {
  gameBoard: (IPlayer["symbol"] | null)[][];
  handleClick: (rowIndex: number, colIndex: number) => void;
  error: string | null;
};

function GameBoard({ gameBoard, handleClick, error }: GameBoardProps) {
  // remove state and use the info from app
  //const [error, SetError] = useState<null | string>(null);
  return (
    <table id="game-board">
      {error ? <caption className="error-message">⚠ {error}</caption> : null}
      <tbody>
        {gameBoard.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((PlayerSymbol, colIndex) => (
              <td key={colIndex}>
                <button
                  onClick={() => {
                    /*
                    if (flag === false) {
                      SetError(
                        "Cant start the game before enternig both names"
                      );
                      return;
                    } else {
                      if (error) {
                        SetError(null);
                      }
                      
                      
                    }
                    */
                    handleClick(rowIndex, colIndex);
                  }}
                  disabled={PlayerSymbol !== null || error != null}
                >
                  {PlayerSymbol}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GameBoard;

//import { useState } from "react";
import { IPlayer } from "../customTypes";
type GameBoardProps = {
  gameBoard: (IPlayer["symbol"] | null)[][];
  handleClick: (rowIndex: number, colIndex: number) => void;
  error: string | null;
};

function GameBoard({ gameBoard, handleClick, error }: GameBoardProps) {
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

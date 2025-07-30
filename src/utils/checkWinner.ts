import { GameBoardType } from "../customTypes";

export const checkWinner = (board: GameBoardType, winLength: number = 3) => {
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
};

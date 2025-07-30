type GameOverProps = {
  winnerNameInfo: {
    name: string;
    symbol: "X" | "O";
    score: number;
  };
  isDraw: boolean;
  handleRematch: (symbol: string, isDraw: boolean) => void;
  handleRestart: () => void;
};

function GameOver({
  winnerNameInfo,
  isDraw,
  handleRematch,
  handleRestart,
}: GameOverProps) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>
        {!isDraw ? `${winnerNameInfo?.name} won the game` : "This is a draw"}{" "}
        {/* determined if we have a winner */}
      </p>
      <div className="game-over-buttons">
        <button onClick={() => handleRematch(winnerNameInfo.symbol, isDraw)}>
          rematch
        </button>
        <button onClick={() => handleRestart()}>restart</button>
      </div>
    </div>
  );
}

export default GameOver;

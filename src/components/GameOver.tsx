type GameOverProps = {
  winnerNameInfo: {
    name: string;
    symbol: string;
    score: number;
  };
  isDraw: string | null;
  handleRematch: (
    symbol: string,
    isDraw: string | null,
    whichButton: string
  ) => void;
};

function GameOver({ winnerNameInfo, isDraw, handleRematch }: GameOverProps) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>
        {isDraw ? `${winnerNameInfo.name} won the game` : "This is a draw"}{" "}
        {/* determined if we have a winner */}
      </p>
      <div className="game-over-buttons">
        <button
          onClick={() =>
            handleRematch(winnerNameInfo.symbol, isDraw, "rematch")
          }
        >
          rematch
        </button>
        <button
          onClick={() =>
            handleRematch(winnerNameInfo.symbol, isDraw, "restart")
          }
        >
          restart
        </button>
      </div>
    </div>
  );
}

export default GameOver;

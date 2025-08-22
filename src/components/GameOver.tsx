type GameOverProps = {
  winnerNameInfo: {
    name: string;
    symbol: "X" | "O";
    score: number;
  };
  isDraw: boolean;
  handleResetGame: () => void;
  handleResetPlayer: () => void;
};

function GameOver({
  winnerNameInfo,
  isDraw,
  handleResetGame,
  handleResetPlayer,
}: GameOverProps) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>
        {!isDraw ? `${winnerNameInfo?.name} won the game` : "This is a draw"}{" "}
        {/* determined if we have a winner */}
      </p>
      <div className="game-over-buttons">
        <button onClick={() => handleResetGame()}>rematch</button>
        <button
          onClick={() => {
            handleResetGame();
            handleResetPlayer();
          }}
        >
          restart
        </button>
      </div>
    </div>
  );
}

export default GameOver;

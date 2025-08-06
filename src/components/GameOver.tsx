type GameOverProps = {
  winnerNameInfo: {
    name: string;
    symbol: "X" | "O";
    score: number;
  };
  isDraw: boolean;
  handlereset: (flag: number) => void;
};

function GameOver({ winnerNameInfo, isDraw, handlereset }: GameOverProps) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>
        {!isDraw ? `${winnerNameInfo?.name} won the game` : "This is a draw"}{" "}
        {/* determined if we have a winner */}
      </p>
      <div className="game-over-buttons">
        <button onClick={() => handlereset(0)}>rematch</button>
        <button onClick={() => handlereset(1)}>restart</button>
      </div>
    </div>
  );
}

export default GameOver;

import { IPlayer } from "../customTypes";
type GameOverProps = {
  winner: IPlayer | null | undefined;
  handleResetGame: () => void;
  handleResetPlayer: () => void;
};

function GameOver({
  winner,
  handleResetGame,
  handleResetPlayer,
}: GameOverProps) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>
        {winner ? `${winner.name} won the game` : "This is a draw"}
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

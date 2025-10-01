import PlayerInfo from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { useGame } from "./hooks/useGame";
function App() {
  const gameFlow = useGame();
  const isGameOver =
    gameFlow.gameState.winner !== null || gameFlow.gameState.count === 9;
  // no need for tyrany operator and pass an error string or undefind
  const isNameOneChanged = gameFlow.firstPlayerInfo.name !== undefined;

  const isNameSecondChanged = gameFlow.secondPlayerInfo.name !== undefined;

  const error =
    isNameOneChanged === false || isNameSecondChanged === false
      ? "error"
      : null;

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          {gameFlow.players.map(({ playerInfo, handleNameChange }) => (
            <PlayerInfo
              key={playerInfo.symbol}
              playerInformation={playerInfo}
              handleNameChange={handleNameChange}
            />
          ))}
        </ol>
        {isGameOver && (
          <GameOver
            winner={gameFlow.gameState.winner}
            handleResetGame={gameFlow.resetGameBoard}
            handleResetPlayer={gameFlow.resetPlayerInfo}
          />
        )}
        <GameBoard
          gameBoard={gameFlow.gameState.board}
          handleClick={gameFlow.makeMove}
          error={error}
        />
      </div>
    </main>
  );
}

export default App;

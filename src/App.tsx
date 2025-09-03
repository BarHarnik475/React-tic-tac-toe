import PlayerInfo from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { useGame } from "./hooks/useGame";
function App() {
  const gameFlow = useGame();
  const isGameOver =
    gameFlow.gameState.winner !== null || gameFlow.gameState.count === 9;
  const isRestart =
    gameFlow.gameState.count === 0 &&
    gameFlow.firstPlayerInfo.name === "Player1"
      ? true
      : false;
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          {gameFlow.players.map(({ playerInfo, handleNameChange }) => (
            <PlayerInfo
              key={playerInfo.symbol}
              playerInformation={playerInfo}
              handleNameChange={handleNameChange}
              isRestart={isRestart}
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
        />
      </div>
    </main>
  );
}

export default App;

import PlayerInfo from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { useGame } from "./hooks/useGame";
function App() {
  const gameFlow = useGame();
  const isGameOver =
    gameFlow.gameState.winner !== null || gameFlow.gameState.count === 9;
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          {gameFlow.players.map(({ playerInfo, handleNameChange, isValid }) => (
            <PlayerInfo
              key={playerInfo.symbol}
              isValid={isValid}
              playerInformation={playerInfo}
              handleNameChange={handleNameChange}
            />
          ))}
        </ol>
        {isGameOver && ( // need to render the gameover screen
          //only check if game is over and based on that logic detemained if there is a winner or a draw
          <GameOver
            winnerNameInfo={
              gameFlow.gameState.winner
                ? gameFlow.gameState.winner.symbol === "X"
                  ? gameFlow.players[0].playerInfo
                  : gameFlow.players[1].playerInfo
                : { name: "", symbol: "X", score: 0 } // default dummy fallback for draw
            }
            isDraw={!gameFlow.gameState.winner && isGameOver}
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

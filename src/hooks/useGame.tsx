import { useState } from "react";
import { IPlayer, GameBoardType } from "../customTypes";
import { checkWinner } from "../utils/checkWinner";

const getInitialBoard = (size: number = 3) =>
  Array.from({ length: size }).map(() =>
    Array.from({ length: size }).map(() => null)
  );

export const useGame = () => {
  const [firstPlayerInfo, setFirstPlayerInfo] = useState<IPlayer>({
    name: "Player1",
    symbol: "X",
    score: 0,
  });
  const [secondPlayerInfo, setSecondPlayerInfo] = useState<IPlayer>({
    name: "Player2",
    symbol: "O",
    score: 0,
  });
  const [counter, setCounter] = useState(0);
  const players = [firstPlayerInfo, secondPlayerInfo];
  const [playersInfo, setPlayersInfo] = useState<IPlayer[]>(players);
  //const activePlayer = players[counter % 2];

  const [winner, setWinner] = useState<IPlayer | null>(null);

  const [gameBoard, setGameBoard] = useState<GameBoardType>(getInitialBoard);

  const [gameState, setGameState] = useState<{
    board: GameBoardType;
    winner: IPlayer | null;
    count: number;
    isGameOver: boolean;
  }>({
    board: getInitialBoard(),
    winner: null,
    count: 0,
    isGameOver: false,
  });

  function reset(flag: number) {
    setGameState(() => ({
      board: getInitialBoard(),
      winner: null,
      count: 0,
      isGameOver: false,
    }));
    // add the map and create string literal "player + index + 1" and than you need to handle the score somehow
    if (flag === 1) {
      setFirstPlayerInfo((prevValue) => ({
        ...prevValue,
        name: "Player1",
        score: 0,
      }));
      setSecondPlayerInfo((prevValue) => ({
        ...prevValue,
        name: "Player2",
        score: 0,
      }));
    }
  }

  const setPlayerName = (index: number, name: string) => {
    setPlayersInfo((prevValue) =>
      prevValue.map((player, i) => (i === index ? { ...player, name } : player))
    );
  };

  /*function handleRematch(symbol: string, isDraw: boolean) {
    if (isDraw) return;
    if (symbol === "X") {
      setFirstPlayerInfo((prevValue) => ({
        ...prevValue,
        score: prevValue.score + 1,
      }));
    } else {
      setSecondPlayerInfo((prevValue) => ({
        ...prevValue,
        score: prevValue.score + 1,
      }));
    }
  }
*/
  function handelRestart() {
    const newBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    setGameBoard(() => {
      const updatedGameBoard: null[][] = [
        ...newBoard.map((innerArray) => [...innerArray]),
      ];
      const winnerSymbol = checkWinner(updatedGameBoard);
      const winner =
        players.find((player) => player.symbol === winnerSymbol) ?? null;
      setWinner(winner);
      return updatedGameBoard;
    });
    setFirstPlayerInfo((prevValue) => ({
      ...prevValue,
      score: 0,
      name: "Player1",
    }));
    setSecondPlayerInfo((prevValue) => ({
      ...prevValue,
      score: 0,
      name: "Player2",
    }));
  }

  const setFirstPlayerName = (name: string) => {
    setFirstPlayerInfo((prevValue) => ({
      ...prevValue,
      name,
    }));
  };

  const setSecondPlayerName = (name: string) => {
    setSecondPlayerInfo((prevValue) => ({
      ...prevValue,
      name,
    }));
  };

  return {
    gameState,
    playersInfo,
    players,
    reset,
    setPlayerName,
    //handleRematch,
    //handelRestart,
    setFirstPlayerName, //remove
    setSecondPlayerName, // remove
    makeMove: (rowIndex: number, colIndex: number) => {
      const currentPlayer = players[gameState.count % 2];
      const updatedGameBoard = gameState.board.map((r) => [...r]);
      updatedGameBoard[rowIndex][colIndex] = currentPlayer.symbol;
      const winnerSymbol = checkWinner(updatedGameBoard);
      const newCount = gameState.count + 1;
      const winner =
        players.find((player) => player.symbol === winnerSymbol) ?? null;
      const draw = newCount === 9 && !winner;
      setGameState({
        board: updatedGameBoard,
        winner,
        count: newCount,
        isGameOver: winner != null || draw,
      });

      // check winnig condition
      // update count to check whos turn it it
      //setCounter((prevValue) => prevValue + 1);
      if (winnerSymbol === "X") {
        setFirstPlayerInfo((prevValue) => ({
          ...prevValue,
          score: prevValue.score + 1,
        }));
      } else if (winnerSymbol === "O") {
        setSecondPlayerInfo((prevValue) => ({
          ...prevValue,
          score: prevValue.score + 1,
        }));
      }
    },
  };
};

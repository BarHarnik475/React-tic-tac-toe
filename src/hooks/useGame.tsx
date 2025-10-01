import { useState } from "react";
import { IPlayer, GameBoardType } from "../customTypes";
import { checkWinner } from "../utils/checkWinner";

const getInitialBoard = (size: number = 3) =>
  Array.from({ length: size }).map(() =>
    Array.from({ length: size }).map(() => null)
  );

export const useGame = () => {
  const [firstPlayerInfo, setFirstPlayerInfo] = useState<IPlayer>({
    name: undefined,
    symbol: "X",
    score: 0,
    isChanged: false,
  });
  const [secondPlayerInfo, setSecondPlayerInfo] = useState<IPlayer>({
    name: undefined,
    symbol: "O",
    score: 0,
    isChanged: false,
  });
  const [gameState, setGameState] = useState<{
    board: GameBoardType;
    winner: IPlayer | null | undefined;
    count: number;
  }>({
    board: getInitialBoard(),
    winner: null,
    count: 0,
  });
  function resetGameBoard() {
    // sepetare it to two functions
    setGameState(() => ({
      board: getInitialBoard(),
      winner: null,
      count: 0,
    }));
  }

  function resetPlayerInfo() {
    setFirstPlayerInfo((prevValue) => ({
      ...prevValue,
      name: undefined,
      score: 0,
      isChanged: false,
    }));
    setSecondPlayerInfo((prevValue) => ({
      ...prevValue,
      name: undefined,
      score: 0,
      isChanged: false,
    }));
  }

  const setFirstPlayerName = (name: string) => {
    if (name === secondPlayerInfo.name) {
      return "Invalid input two players cant have the same name";
    }
    setFirstPlayerInfo((prevValue) => ({
      ...prevValue,
      name,
      isChanged: !prevValue.isChanged,
    }));
    return null;
  };

  const setSecondPlayerName = (name: string) => {
    if (name === firstPlayerInfo.name) {
      return "Invalid input two players cant have the same name";
    }
    setSecondPlayerInfo((prevValue) => ({
      ...prevValue,
      name,
      isChanged: !prevValue.isChanged,
    }));
    return null;
  };

  const players = [
    {
      playerInfo: firstPlayerInfo,
      handleNameChange: setFirstPlayerName,
    },
    {
      playerInfo: secondPlayerInfo,
      handleNameChange: setSecondPlayerName,
    },
  ];

  return {
    gameState,
    players,
    resetGameBoard,
    resetPlayerInfo,
    firstPlayerInfo,
    secondPlayerInfo,
    setFirstPlayerName,
    setSecondPlayerName,
    makeMove: (rowIndex: number, colIndex: number) => {
      const currentPlayer = players[gameState.count % 2];
      const updatedGameBoard = gameState.board.map((r) => [...r]);
      updatedGameBoard[rowIndex][colIndex] = currentPlayer.playerInfo.symbol;
      const winnerSymbol = checkWinner(updatedGameBoard);
      const newCount = gameState.count + 1;
      const winner =
        players.find((player) => player.playerInfo.symbol === winnerSymbol)
          ?.playerInfo ?? null;
      // if (winnerObject === undefined) winnerObject = null;
      //const winner = winnerObject?.playerInfo;
      //const draw = newCount === 9 && !winner;
      setGameState({
        board: updatedGameBoard,
        winner,
        count: newCount,
      });
      if (winnerSymbol) {
        const setPlayerInfo =
          winnerSymbol === "X" ? setFirstPlayerInfo : setSecondPlayerInfo;
        setPlayerInfo((prevValue) => ({
          ...prevValue,
          score: prevValue.score + 1,
        }));
      }
    },
  };
};

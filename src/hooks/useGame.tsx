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
    isChanged: false,
  });
  const [secondPlayerInfo, setSecondPlayerInfo] = useState<IPlayer>({
    name: "Player2",
    symbol: "O",
    score: 0,
    isChanged: false,
  });
  const [isValid, setIsValid] = useState({
    // unnececeray
    firstInput: true,
    secondInput: true,
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
      name: "Player1",
      score: 0,
      isChanged: false,
    }));
    setSecondPlayerInfo((prevValue) => ({
      ...prevValue,
      name: "Player2",
      score: 0,
      isChanged: false,
    }));
  }
  const setFirstPlayerName = (name: string) => {
    if (name === "" || name === secondPlayerInfo.name) {
      setIsValid((prevValue) => ({
        ...prevValue,
        firstInput: false,
      }));
      setTimeout(() => {
        setIsValid((prevValue) => ({
          ...prevValue,
          firstInput: true,
        }));
      }, 1500);
      return;
    }
    setFirstPlayerInfo((prevValue) => ({
      ...prevValue,
      name,
      isChanged: !prevValue.isChanged,
    }));
  };

  const setSecondPlayerName = (name: string) => {
    if (name === "" || name === firstPlayerInfo.name) {
      setIsValid((prevValue) => ({
        ...prevValue,
        secondInput: false,
      }));
      setTimeout(() => {
        setIsValid((prevValue) => ({
          ...prevValue,
          secondInput: true,
        }));
      }, 1500);
      return;
    }
    setSecondPlayerInfo((prevValue) => ({
      ...prevValue,
      name,
      isChanged: !prevValue.isChanged,
    }));
  };

  const players = [
    {
      playerInfo: firstPlayerInfo,
      handleNameChange: setFirstPlayerName,
      isValid: isValid.firstInput,
    },
    {
      playerInfo: secondPlayerInfo,
      handleNameChange: setSecondPlayerName,
      isValid: isValid.secondInput,
    },
  ];

  return {
    gameState,
    players,
    resetGameBoard,
    resetPlayerInfo,
    isValid,
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
      if (winnerSymbol != null) {
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

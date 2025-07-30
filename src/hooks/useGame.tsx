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
  //const activePlayer = players[counter % 2];

  const [winner, setWinner] = useState<IPlayer | null>(null);

  const [gameBoard, setGameBoard] = useState<GameBoardType>(getInitialBoard);

  function reset() {
    setGameBoard(() => getInitialBoard());
    setWinner(null);
    setCounter(0);
  }

  function handleRematch(symbol: string, isDraw: boolean) {
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

  return {
    winner,
    isGameOver: counter === 9 || winner !== null,
    gameBoard,
    players,
    handleRematch,
    handelRestart,
    setFirstPlayerInfo, //remove
    setSecondPlayerInfo, // remove
    makeMove: (rowIndex: number, colIndex: number) => {
      const currentPlayer = players[counter % 2];
      setGameBoard((prevState) => {
        // change into an object like example is slack
        const updatedGameBoard = prevState.map((r) => [...r]);
        updatedGameBoard[rowIndex][colIndex] = currentPlayer.symbol;
        const winnerSymbol = checkWinner(updatedGameBoard);
        const winner =
          players.find((player) => player.symbol === winnerSymbol) ?? null;
        setWinner(winner);
        return updatedGameBoard;
      });
      // check winnig condition
      // update count to check whos turn it it
      setCounter((prevValue) => prevValue + 1);
    },
  };
};

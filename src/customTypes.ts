export interface IPlayer {
  name: string;
  symbol: "X" | "O";
  score: number;
}

export type GameBoardType = (IPlayer["symbol"] | null)[][];

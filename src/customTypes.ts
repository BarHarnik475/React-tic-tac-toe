export interface IPlayer {
  name: string;
  symbol: "X" | "O";
  score: number;
  isChanged: boolean;
}

export type GameBoardType = (IPlayer["symbol"] | null)[][];

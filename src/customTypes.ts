export interface IPlayer {
  name: string | undefined;
  symbol: "X" | "O";
  score: number;
  isChanged: boolean;
}

export type GameBoardType = (IPlayer["symbol"] | null)[][];

import { useRef } from "react";

type PlayerInfoProps = {
  playerInformation: { name: string; symbol: string; score: number };
  handleNameChange: (name: string) => void;
};

function PlayerInfo({ playerInformation, handleNameChange }: PlayerInfoProps) {
  function whichPlayer(symbol: string): string {
    if (symbol === "X") return "Player1";
    else return "Player2";
  }
  const str: string = whichPlayer(playerInformation.symbol);
  const inputRef = useRef<HTMLInputElement>(null);
  //inputRef.current?.value ?? "Player1"
  let checkEdit: boolean = false;
  if (playerInformation.symbol === "X" && playerInformation.name !== "Player1")
    checkEdit = true;
  else if (
    playerInformation.symbol === "O" &&
    playerInformation.name != "Player2"
  )
    checkEdit = true;
  else checkEdit = false;
  return (
    <div className="player">
      <li>
        <span className="player-name">{playerInformation.score}</span>
        <span className="player-name">{playerInformation.name}</span>
        <span className="player-symbol">{playerInformation.symbol}</span>
        {checkEdit ? null : <input type="text" ref={inputRef} />}
        <button
          onClick={() => handleNameChange(inputRef.current?.value ?? str)}
        >
          {!checkEdit ? "Save" : "Edit"}
        </button>
      </li>
    </div>
  );
}
export default PlayerInfo;
